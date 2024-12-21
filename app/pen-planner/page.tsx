"use client"; // This is a client component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Checkbox, cn } from "@nextui-org/react";
import { nanoid } from "nanoid";
import { Biome, Dino, Diet, DinoSpecies, FarmSkill, Flavor, Size, Social, WildSkill, Pen, FoodType } from "@/resources/types";
import DinoList from "./components/dino-list"
import PenList from "./components/pen-list";
import SpeciesSelect from "./components/species-select";

const LuckySpecies: DinoSpecies = {
    name: "Lucky",
    image: "/images/dinos/Lucky.png",
    size: Size.Medium,
    social: Social.Herd,
    diet: Diet.Herbivore,
    biome: Biome.Farm, // "None"
    flavor: Flavor.Juicy,
    wildSkill: WildSkill.Sprinter,
    farmSkill: FarmSkill.Clearer
};

const lucky: Dino = {
    id: nanoid(),
    name: "Lucky",
    species: LuckySpecies
}

export default function PenPlanner() {
    const [showDinoSelection, setShowDinoSelection] = useState(false);
    const [dinos, setDinos] = useState<Dino[]>([lucky]);
    const [selectedDino, setSelectedDino] = useState<Dino|null>(null);
    const [pens, setPens] = useState<Pen[]>([]);
    const [largeDreamstoneCount, setLargeDreamstoneCount] = useState(27);
    const [smallDreamstoneCount, setSmallDreamstoneCount] = useState(19);
    const [ignoreDreamstoneLimit, setIgnoreDreamstoneLimit] = useState(false);
    
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

    const selectOrDeselectDino = (dinoID: string) => {
        if (selectedDino?.id === dinoID) {
            setSelectedDino(null);
            return;
        }
        for (let i = 0; i < dinos.length; i++) {
            if (dinos[i].id == dinoID) {
                setSelectedDino(dinos[i]);
                return;
            }
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
        if (selectedDino) {
            if (!!penID) {
                // add dino to pen
                setPens((pens) => {
                    if (pens) {
                        return pens.map((pen) => {
                            return pen.id != penID ? pen : 
                            {...pen,
                                dinos: [...pen.dinos, selectedDino],
                                minSize: calculateMinSize([...pen.dinos, selectedDino]),
                                foodPerDay: calculateFoodPerDay([...pen.dinos, selectedDino])
                            }
                        })
                    }
                    return [];
                })
            } else {
                // add new pen with dino, set pen's food and biome
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
                return dinos.filter(dino => dino.id !== selectedDino.id);
            })

            // Deselect selected dino
            setSelectedDino(null);
        }
    }

    const removeDinoFromPen = (penID: string, dino: Dino) => {
        setDinos((dinos) => {
            return [...dinos, dino];
        });
        setPens((prevPens) => {
            let nextPens = [];
            for (let i = 0; i < prevPens.length; i++) {
                if (prevPens[i].id !== penID) {
                    nextPens.push(prevPens[i]);
                }
                else {
                    let updatedPen = {...prevPens[i]}
                    updatedPen.dinos = updatedPen.dinos.filter((penDino) => penDino.id !== dino.id);
                    if (updatedPen.dinos.length > 0) {
                        nextPens.push(updatedPen);
                    }
                }
            }
            return nextPens;
        })
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

    const toggleIgnoreDSLimit = () => {
        setIgnoreDreamstoneLimit(ignore => !ignore);
    }

    const convertSmallDSToLarge = () => {
        setSmallDreamstoneCount(count => count - 1);
        setLargeDreamstoneCount(count => count + 1);
    }

    const convertLargeDSToSmall = () => {
        setLargeDreamstoneCount(count => count - 1);
        setSmallDreamstoneCount(count => count + 1);
    }

    useEffect(() => {
        if (selectedDino) {
            for (let i = 0; i < dinos.length; i++) {
                if (dinos[i].id == selectedDino.id) {
                    return;
                }
            }
            // If the selected dino is no longer in the list, unset the selected dino
            setSelectedDino(null);
        }
    }, [dinos, selectedDino]);

    return (
    <div className="h-screen p-4 items-center justify-items-center">
        <div className="flex flex-col text-amber-900 bg-amber-50 h-full w-full rounded-lg p-2 items-center flex-none overflow-hidden">
            <h1 className="text-xl font-bold">Pen Planner</h1>
            {
                !showDinoSelection &&
                <div className="flex flex-col w-full gap-2 min-h-0 grow">
                    <div className="flex flex-col flex-none">
                        <DinoList 
                            dinos={dinos}
                            selectedDino={selectedDino}
                            onDinoClicked={selectOrDeselectDino}
                            onRemoveDinoClicked={removeDino}
                            onAddDinoClicked={toggleShowDinoSelection}
                            onMoveToNewPenClicked={() => addSelectedDinoToPen(null)}
                        />
                    </div>
                    <PenList
                        pens={pens}
                        onPenClicked={addSelectedDinoToPen}
                        onRemovePenClicked={removePen}
                        onRemoveDinoClicked={removeDinoFromPen}
                        setPenBiome={setPenBiome}
                        setPenFoodType={setPenFoodType}
                    />
                </div>
            }
            {
                !showDinoSelection &&
                <div id="dreamstone-container" className="flex flex-row w-full font-bold items-center gap-2 h-11">
                    <div className={`flex flex-row h-[36] items-center gap-1 ${largeDreamstoneCount < 0 ? "text-red-600" : ""} ${ignoreDreamstoneLimit ? "hidden" : ""}`}>
                        <Image
                            src="/images/Dreamstone.png"
                            width={36}
                            height={36}
                            alt="Large Dreamstone"
                        />
                        {largeDreamstoneCount}
                    </div>
                    <div className={`flex flex-col gap-1 ${ignoreDreamstoneLimit ? "hidden" : ""}`}>
                        <button
                            className="flex text-4xl justify-center items-center leading-5"
                            onClick={convertSmallDSToLarge}
                            >
                            ←
                        </button>
                        <button className="flex text-4xl justify-center items-center leading-5"
                            onClick={convertLargeDSToSmall}
                            >
                            →
                        </button>
                    </div>
                    <div className={`flex flex-row h-[24] items-center gap-1 ${smallDreamstoneCount < 0 ? "text-red-600" : ""} ${ignoreDreamstoneLimit ? "hidden" : ""}`}>
                        <Image
                            src="/images/Dreamstone.png"
                            width={24}
                            height={24}
                            alt="Small Dreamstone"
                        />
                        {smallDreamstoneCount}
                    </div>
                    <div className="flex items-center grow justify-center min-h-6">
                        <Checkbox
                        classNames={{
                                base: cn(
                                "inline-flex ml-1",
                                "items-center justify-start",
                                "cursor-pointer w-full rounded-lg p-0 mr-0"
                                ),
                                label: "text-inherit text-center w-24 grow",
                            }}
                            size="md"
                            radius="sm"
                            isSelected={ignoreDreamstoneLimit}
                            onValueChange={toggleIgnoreDSLimit}
                            >
                            Ignore limit
                        </Checkbox>
                    </div>
                </div>
            }
            {
                showDinoSelection &&
                <SpeciesSelect
                    onSpeciesClicked={onSpeciesClicked}
                    onCloseSpeciesSelect={toggleShowDinoSelection}
                />
            }
        </div>
    </div>
    )
  }
