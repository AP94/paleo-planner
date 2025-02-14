"use client"; // This is a client component

import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { saveAs } from 'file-saver';
import { Biome, Dino, Diet, DinoSpecies, FarmSkill, Flavor, Size, Social, WildSkill, Pen, FoodType } from "@/resources/types";
import DinoList from "./components/dino-list"
import PenList from "./components/pen-list";
import SpeciesSelect from "./components/species-select";
import DreamstoneCounter from "./components/dreamstone-counter";
import { LuckySpecies } from "@/resources/dino-species";

const lucky: Dino = {
    id: nanoid(),
    name: "Lucky",
    species: LuckySpecies
}

const largeDreamstoneLimit = 28;
const smallDreamstoneLimit = 19;

export default function PenPlanner() {
    const [showDinoSelection, setShowDinoSelection] = useState(false);
    const [dinos, setDinos] = useState<Dino[]>([lucky]);
    const [selectedDinoID, setSelectedDinoID] = useState<string>("");
    const [pens, setPens] = useState<Pen[]>([]);
    const [largeDreamstoneCount, setLargeDreamstoneCount] = useState(largeDreamstoneLimit - 1);
    const [smallDreamstoneCount, setSmallDreamstoneCount] = useState(smallDreamstoneLimit);
    const [hideLucky, setHideLucky] = useState<boolean>(false);
    
    const hasLucky = (pen: Pen): boolean => {
        for (let i = 0; i < pen.dinos.length; i++) {
            if (pen.dinos[i].species.name === LuckySpecies.name)
            {
                return true;
            }
        }

        return false;
    }

    const toggleHideLucky = () => {
        // Re-add lucky
        if (hideLucky) {
            setDinos(dinos => [...dinos, lucky]);
            setLargeDreamstoneCount(count => count - 1);
        }
        // Remove lucky
        else {
            setDinos(dinos => {
                return dinos.filter(ranchDino => ranchDino.species.name !== LuckySpecies.name);
            });
            setPens(pens => {
                return pens.map(pen => {
                    return hasLucky(pen) ? {
                        ...pen,
                        dinos: pen.dinos.filter(dino => dino.species.name !== LuckySpecies.name)
                    } : pen
                })
            })
            setLargeDreamstoneCount(count => count + 1);
        }
        setHideLucky(hide => !hide);
    }

    const toggleShowDinoSelection = () => {
        setShowDinoSelection(show => !show);
    }

    const onSpeciesClicked = (species: DinoSpecies) => {
        setDinos(dinos => [...dinos, {
            id: nanoid(),
            name: species.name,
            species: species
        }]);
        if (species.size === Size.Small) {
            setSmallDreamstoneCount(count => count - 1);
        } else {
            setLargeDreamstoneCount(count => count - 1);
        }
        toggleShowDinoSelection();
    }

    const selectOrDeselectDino = (dinoID: string) => {
        if (selectedDinoID === dinoID) {
            setSelectedDinoID("");
            return;
        } else {
            setSelectedDinoID(dinoID);
        }
    }

    const updateDinoName = (dinoID: string, name: string) => {
        setDinos((dinos) => {
            return dinos.map((dino) => {
                return dino.id !== dinoID ? dino : {
                    ...dino,
                    name: name
                }
            })
        })
    }

    const updatePenDinoName = (penID: string, dinoID: string, name:string) => {
        setPens((pens) => {
            return pens.map((pen) => {
                return pen.id !== penID ? pen : {
                    ...pen,
                    dinos: pen.dinos.map((dino) => {
                        return dino.id !== dinoID ? dino :
                        {
                            ...dino,
                            name: name
                        }
                    })
                }
            })
        })
    }

    const removeDino = (dino: Dino) => {
        setDinos(dinos => {
            return dinos.filter(ranchDino => ranchDino.id !== dino.id);
        });
        if (dino.species.size === Size.Small) {
            setSmallDreamstoneCount(count => count + 1);
        } else {
            setLargeDreamstoneCount(count => count + 1);
        }
    }

    const removePen = (pen: Pen) => {
        setDinos((dinos) => {
            return [...dinos,
                ...pen.dinos
            ]
        })
        setPens((pens) => {
            return pens.filter((prevPen) => prevPen.id != pen.id)
        });
        let largeDreamstones = 0;
        let smallDreamstones = 0;
        for (let i = 0; i < pen.dinos.length; i++) {
            if (pen.dinos[i].species.size === Size.Small) {
                smallDreamstones = smallDreamstones + 1;
            }
            else {
                largeDreamstones = largeDreamstones + 1;
            }
        }
    }

    const setPenBiome = (penID: string, biome: Biome) => {
        setPens((pens) => {
            return pens.map((pen) => {
                return pen.id !== penID ? pen : {
                    ...pen,
                    biome: biome
                }
            })
        })
    }

    const setPenFoodType = (penID: string, foodType: FoodType) => {
        setPens((pens) => {
            return pens.map((pen) => {
                return pen.id !== penID ? pen : {
                    ...pen,
                    foodType: foodType
                }
            })
        })
    }

    const calculateMinSize = (dinos: Dino[]) => {
        let size = 0;
        for (let i = 0; i < dinos.length; i++) {
            if (dinos[i].species.size == Size.Small) {
                size = size + 12;
            }
            else if (dinos[i].species.size == Size.Medium) {
                size = size + 25;
            }
            else {
                size = size + 50;
            }
        }
        return size;
    }

    const calculateFoodPerDay = (dinos: Dino[]) => {
        let FPD = 0;
        for (let i = 0; i < dinos.length; i++) {
            if (dinos[i].species.size == Size.Small) {
                FPD = FPD + 1;
            }
            else if (dinos[i].species.size == Size.Medium) {
                FPD = FPD + 2;
            }
            else {
                FPD = FPD + 5;
            }
        }
        return FPD;
    }

    const addSelectedDinoToPen = (penID: string | null) => {
        if (selectedDinoID) {
            let selectedDino = null;

            for (let i = 0; i < dinos.length; i++) {
                if (dinos[i].id === selectedDinoID) {
                    selectedDino = dinos[i];
                    break;
                }
            }
            if (selectedDino) {
                // If a pen is selected, add the dino to the pen
                if (!!penID) {
                    setPens((pens) => {
                        return pens.map((pen) => {
                            return pen.id != penID ? pen : 
                            {...pen,
                                dinos: [...pen.dinos, selectedDino],
                                minSize: calculateMinSize([...pen.dinos, selectedDino]),
                                foodPerDay: calculateFoodPerDay([...pen.dinos, selectedDino])
                            }
                        })
                    });
                } else {
                    // If no pen is selected, add new pen with dino, then set pen's food and biome
                    setPens((pens) => {
                        return [...pens,
                            {
                            id: nanoid(),
                            biome: selectedDino.species.biome,
                            minSize: calculateMinSize([selectedDino]),
                            foodType: selectedDino.species.diet == Diet.Carnivore ? FoodType.Meat : FoodType.Plant,
                            foodPerDay: calculateFoodPerDay([selectedDino]),
                            dinos: [selectedDino]
                        }
                    ]})
                }

                // Remove selected dino from dino list
                setDinos((dinos) => {
                    return dinos.filter(dino => dino.id !== selectedDinoID);
                })

                // Deselect selected dino
                setSelectedDinoID("");
            }
        }
    }

    const removeDinoFromPen = (penID: string, dino: Dino) => {
        setDinos((dinos) => {
            return [...dinos, dino];
        });
        setPens((prevPens) => {
            const nextPens = [];
            for (let i = 0; i < prevPens.length; i++) {
                if (prevPens[i].id !== penID) {
                    nextPens.push(prevPens[i]);
                }
                else {
                    const updatedPen = {...prevPens[i]}
                    updatedPen.dinos = updatedPen.dinos.filter((penDino) => penDino.id !== dino.id);
                    if (updatedPen.dinos.length > 0) {
                        updatedPen.foodPerDay = calculateFoodPerDay(updatedPen.dinos);
                        updatedPen.minSize = calculateMinSize(updatedPen.dinos);
                        nextPens.push(updatedPen);
                    }
                }
            }
            return nextPens;
        })
    }

    const convertSmallDSToLarge = () => {
        setSmallDreamstoneCount(count => count - 1);
        setLargeDreamstoneCount(count => count + 1);
    }

    const convertLargeDSToSmall = () => {
        setLargeDreamstoneCount(count => count - 1);
        setSmallDreamstoneCount(count => count + 1);
    }

    const loadConfigString = (config: string) => {
        try {
            const configObj: {dinos: Dino[], pens: Pen[]} = JSON.parse(config);
            setDinos(configObj.dinos);
            setPens(configObj.pens);
            setSelectedDinoID("");

            let dinoCount = configObj.dinos.length;
            let smallDSCount = 0;
            for (let i = 0; i < configObj.dinos.length; i++) {
                if (configObj.dinos[i].species.size === Size.Small) {
                    smallDSCount = smallDSCount + 1;
                }
            }
            for (let i = 0; i < configObj.pens.length; i++) {
                const pen = configObj.pens[i];
                dinoCount = dinoCount + pen.dinos.length;
                for (let j = 0; j < pen.dinos.length; j++) {
                    if(pen.dinos[j].species.size === Size.Small) {
                        smallDSCount = smallDSCount + 1;
                    }
                }
            }
            const largeDSCount = dinoCount - smallDSCount;
            setSmallDreamstoneCount(smallDreamstoneLimit - smallDSCount);
            setLargeDreamstoneCount(largeDreamstoneLimit - largeDSCount);

        } catch {
            console.error("Failed to load save");
        }
    }
    
    const getCookieValue = (name: string) =>  
    {
        const regex = new RegExp(`(^| )${name}=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
        return match[2]
        }
        return null;
    }

    const updateCookies = () => {
        const config = JSON.stringify({
            dinos: dinos,
            pens: pens
        });
        document.cookie = "paleo-pen-planner=" + config; 
    }

    const saveConfig = () => {
        const config = JSON.stringify({
            dinos: dinos,
            pens: pens
        });
        const file = new Blob([config], { type: 'text/plain;charset=utf-8' });
        saveAs(file, 'Paleo Planner Pen Save.txt');
    }

    const loadConfig = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const reader = new FileReader()
        reader.onload = async (e) => { 
            try {
                const config = (e.target?.result) as string;
                loadConfigString(config);
            } catch {
                alert("Failed to load save file");
            }

        };
        const files = e.target?.files;
        if (files) {
            const file = files[0];
            reader.readAsText(file);
        }
    }
        
    const resetConfig = () => {
        if (confirm("Are you sure you want to reset?")) {
            setDinos([lucky]);
            setPens([]);
            setSelectedDinoID("");
            setLargeDreamstoneCount(largeDreamstoneLimit - 1);
            setSmallDreamstoneCount(smallDreamstoneLimit);
        }
    }

    useEffect(() => {
        const cachedSetup = getCookieValue("paleo-pen-planner");

        if (cachedSetup) {
            loadConfigString(cachedSetup);
        }
    }, []);

    useEffect(() => {
        if (selectedDinoID) {
            for (let i = 0; i < dinos.length; i++) {
                if (dinos[i].id == selectedDinoID) {
                    return;
                }
            }
            // If the selected dino is no longer in the list, unset the selected dino
            setSelectedDinoID("");
        }
    }, [dinos, selectedDinoID]);

    useEffect(() => {
        updateCookies();
    }, [dinos, pens]);

    return (
    <div className="h-screen p-4 items-center justify-items-center sm:p-6">
        <div className="flex flex-col text-amber-900 bg-amber-50 h-full w-full rounded-lg p-2 items-center flex-none overflow-hidden sm:p-4 sm:text-lg">
            <div className={`px-2 h-0 justify-between w-full font-bold ${showDinoSelection ? "hidden" : "flex"}`}>
                <button className="text-red-700" onClick={() => resetConfig()}>
                    Reset
                </button>
                <div className="flex gap-2">
                    <button className="" onClick={() => saveConfig()}>
                        Save
                    </button>
                    <label htmlFor="file-upload"
                        className="cursor-pointer">
                        Load
                    </label>
                    <input id="file-upload"
                        className="hidden"
                        type="file"
                        onChange={(event) => loadConfig(event)}/>
                </div>
            </div>
            <h1 className="text-xl font-bold sm:text-2xl sm:pb-1">Pen Planner</h1>
            
            <div className={`flex flex-col w-full gap-2 min-h-0 grow ${showDinoSelection && "hidden"} sm:gap-4`}>
                <div className="flex flex-col flex-none">
                    <DinoList 
                        dinos={dinos}
                        selectedDinoID={selectedDinoID}
                        hideLucky={hideLucky}
                        onDinoClicked={selectOrDeselectDino}
                        onRemoveDinoClicked={removeDino}
                        onAddDinoClicked={toggleShowDinoSelection}
                        onMoveToNewPenClicked={() => addSelectedDinoToPen(null)}
                        updateDinoName={updateDinoName}
                    />
                </div>
                <PenList
                    pens={pens}
                    hideLucky={hideLucky}
                    onPenClicked={addSelectedDinoToPen}
                    onRemovePenClicked={removePen}
                    onRemoveDinoClicked={removeDinoFromPen}
                    setPenBiome={setPenBiome}
                    setPenFoodType={setPenFoodType}
                    updatePenDinoName={updatePenDinoName}
                />
            </div>
            <DreamstoneCounter
                hidden={showDinoSelection}
                largeDSCount={largeDreamstoneCount}
                smallDSCount={smallDreamstoneCount}
                ignoreLucky={hideLucky}
                onIgnoreLuckyToggled={toggleHideLucky}
                convertSmallDSToLarge={convertSmallDSToLarge}
                convertLargeDSToSmall={convertLargeDSToSmall}                
            />
            <SpeciesSelect
                hidden={!showDinoSelection}
                onSpeciesClicked={onSpeciesClicked}
                onCloseSpeciesSelect={toggleShowDinoSelection}
            />
        </div>
    </div>
    )
  }
