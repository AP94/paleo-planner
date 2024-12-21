"use client"; // This is a client component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { nanoid } from "nanoid";
import { Biome, Dino, Diet, DinoSpecies, FarmSkill, Flavor, Size, Social, WildSkill, Pen, FoodType } from "@/resources/types";
import { allSpecies } from "@/resources/dino-species";

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
    const [ranchDinos, setRanchDinos] = useState<Dino[]>([lucky]);
    const [selectedDino, setSelectedDino] = useState<Dino|null>(null);
    const [pens, setPens] = useState<Pen[]>([]);
    const [largeDreamstoneCount, setLargeDreamstoneCount] = useState(27);
    const [smallDreamstoneCount, setSmallDreamstoneCount] = useState(19);
    const [ignoreDreamstoneLimit, setIgnoreDreamstoneLimit] = useState(false);
    
    const toggleShowDinoSelection = () => {
        // close the selection popup
        setShowDinoSelection(show => !show);
    }

    const addDino = (species: DinoSpecies) => {
        setRanchDinos(dinos => [...dinos, {
            id: nanoid(),
            name: species.name,
            species: species
        }]);
    }

    const removeDino = (id: string) => {
        setRanchDinos(dinos => {
            return dinos.filter(dino => dino.id !== id);
        });
    }

    const selectDino = (dinoID: string) => {
        for (let i = 0; i < ranchDinos.length; i++) {
            if (ranchDinos[i].id == dinoID) {
                setSelectedDino(ranchDinos[i]);
                return;
            }
        }
    }

    const removePen = (pen: Pen) => {
        setRanchDinos((dinos) => {
            return [...dinos,
                ...pen.dinos
            ]
        })
        setPens((pens) => {
            return pens.filter((pen) => pen.id != pen.id)
        });
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
                                dinos: [...pen.dinos,
                                    selectedDino],
                                minSize: calculateMinSize(pen.dinos),
                                foodPerDay: calculateFoodPerDay(pen.dinos)
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
            setRanchDinos((dinos) => {
                return dinos.filter(dino => dino.id !== selectedDino.id);
            })

            // Deselect selected dino
            setSelectedDino(null);
        }
    }

    const removeDinoFromPen = (penID: string, dino: Dino) => {
        setRanchDinos((dinos) => {
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

    const onPenBiomeSelected = (event: React.ChangeEvent<HTMLSelectElement>, penID: string) => {
        switch (event.target.value) {
            case (Biome.Valley):
                setPenBiome(penID, Biome.Valley);
                break;
            case (Biome.Forest):
                setPenBiome(penID, Biome.Forest);
                break;
            case (Biome.Desert):
                setPenBiome(penID, Biome.Desert);
                break;
            default:
                setPenBiome(penID, Biome.Farm);
                break;
        }
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

    const onPenFoodSelected = (event: React.ChangeEvent<HTMLSelectElement>, penID: string) => {
        switch (event.target.value) {
            case (FoodType.Meat):
                setPenFoodType(penID, FoodType.Meat);
                break;
            default:
                setPenFoodType(penID, FoodType.Plant);
                break;
        }
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
        console.log(pens);
    }, [pens])

    useEffect(() => {
        if (selectedDino) {
            for (let i = 0; i < ranchDinos.length; i++) {
                if (ranchDinos[i].id == selectedDino.id) {
                    return;
                }
            }
            // If the selected dino is no longer in the list, unset the selected dino
            setSelectedDino(null);
        }
    }, [ranchDinos, selectedDino]);

    const dinoListElements = ranchDinos.map(dino => (
        <div key={dino.id}
            className={`flex flex-row items-center min-h-18 w-full bg-amber-200 gap-2 p-1 rounded border-3 ${selectedDino?.id == dino.id ? "border-[#34A983]" : "border-transparent"}`}
            onClick={() => selectDino(dino.id)}>
            <Image
                src={dino.species.image}
                width={50}
                height={50}
                alt={`${dino.species.name} icon`}
            />
            <div className="flex grow flex-col">
                <div className="flex w-full items-center justify-between flex-row">
                    {dino.name}
                    {dino.species.name !== "Lucky" ? <button className="" onClick={() => {removeDino(dino.id)}}>X</button> : <></>}
                </div>
                <div className="flex w-full flex-row gap-1">
                    <Image
                        src={`/images/biomes/${dino.species.biome}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.biome} Icon`}
                        className="place-self-center rounded-full border-2 border-[#35A983]"
                    />
                    <Image
                        src={`/images/food/${dino.species.diet}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.diet} Icon`}
                        className={`place-self-center rounded-lg border-2 ${
                            dino.species.diet === Diet.Carnivore ?
                            "border-[#CD303D]" :
                            dino.species.diet === Diet.Herbivore ?
                            "border-[#83BA4F]" :
                            "border-b-[#CD303D] border-r-[#CD303D] border-t-[#83BA4F] border-l-[#83BA4F]"
                        }`}
                    />
                    <Image
                        src={`/images/social/${dino.species.social}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.social} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#703D1C]"
                    />
                    <Image
                        src={`/images/farm-skills/${dino.species.farmSkill}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.farmSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983]"
                    />
                    <Image
                        src={`/images/wild-skills/${dino.species.wildSkill}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.wildSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983]"
                    />
                    <div className="grid w-9 h-9">
                        {dino.species.size === Size.Small ?
                            <Image
                                    src="/images/Dreamstone.png"
                                    width={24}
                                    height={24}
                                    alt="Small Dreamstone"
                                    className="place-self-center"
                                />
                            :
                            <Image
                                    src="/images/Dreamstone.png"
                                    width={36}
                                    height={36}
                                    alt="Large Dreamstone"
                                    className="place-self-center"
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    ));
    
    const dinoSpeciesElements = allSpecies.map(dinoSpecies => (
        <div key={dinoSpecies.name}
            className="flex flex-row items-center min-h-18 w-full bg-amber-200 gap-2 p-1 rounded"
            onClick={() => {addDino(dinoSpecies); toggleShowDinoSelection();}}>
            <Image
                src={dinoSpecies.image}
                width={50}
                height={50}
                alt={`${dinoSpecies.name} icon`}
            />
            <div className="flex grow flex-col">
                <div className="flex w-full items-center justify-between flex-row">
                    {dinoSpecies.name}
                    <div className="grid w-9 h-9">
                        <Image
                            src="/images/Dreamstone.png"
                            width={dinoSpecies.size == Size.Small ? 24 : 36}
                            height={dinoSpecies.size == Size.Small ? 24 : 36}
                            alt={`${dinoSpecies.size == Size.Small ? "Small" : "Large"} dreamstone icon`}
                            className="place-self-center"
                        />
                    </div>
                </div>
                <div className="flex w-full flex-row gap-1">
                    <Image
                        src={`/images/biomes/${dinoSpecies.biome}.png`}
                        width={36}
                        height={36}
                        alt={`${dinoSpecies.biome} Icon`}
                        className="place-self-center rounded-full border-2 border-[#35A983]"
                    />
                    <Image
                        src={`/images/food/${dinoSpecies.diet}.png`}
                        width={36}
                        height={36}
                        alt={`${dinoSpecies.diet} Icon`}
                        className={`place-self-center rounded-lg border-2 ${
                            dinoSpecies.diet === Diet.Carnivore ?
                            "border-[#CD303D]" :
                            dinoSpecies.diet === Diet.Herbivore ?
                            "border-[#83BA4F]" :
                            "border-b-[#CD303D] border-r-[#CD303D] border-t-[#83BA4F] border-l-[#83BA4F]"
                        }`}
                    />
                    <Image
                        src={`/images/social/${dinoSpecies.social}.png`}
                        width={36}
                        height={36}
                        alt={`${dinoSpecies.social} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#703D1C]"
                    />
                    <Image
                        src={`/images/farm-skills/${dinoSpecies.farmSkill}.png`}
                        width={36}
                        height={36}
                        alt={`${dinoSpecies.farmSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983]"
                    />
                    <Image
                        src={`/images/wild-skills/${dinoSpecies.wildSkill}.png`}
                        width={36}
                        height={36}
                        alt={`${dinoSpecies.wildSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983]"
                    />
                </div>
            </div>
        </div>
    ));

    const getPenDinoElements = (pen: Pen) => {
        return pen.dinos.map((dino) => (
            <div key={dino.id}
                className="flex flex-col items-center gap-1 min-w-20 max-w-1/2 rounded bg-amber-300 p-1">
                <div className="flex flex-row self-end">
                    <button className="h-5 w-5" onClick={() => removeDinoFromPen(pen.id, dino)}>X</button>
                </div>
                <div className="content-center h-14">
                    <Image
                        src={dino.species.image}
                        width={50}
                        height={50}
                        alt={`${dino.species.name} icon`}
                    />
                </div>
                {dino.name}
                <div className="flex flex-row gap-1">
                    <div className="grid w-9 h-9">
                        <Image
                            src="/images/Dreamstone.png"
                            width={dino.species.size == Size.Small ? 24 : 36}
                            height={dino.species.size == Size.Small ? 24 : 36}
                            alt={`${dino.species.size == Size.Small ? "Small" : "Large"} dreamstone icon`}
                            className="place-self-center"
                        />
                    </div>
                    <Image
                        src={`/images/farm-skills/${dino.species.farmSkill}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.farmSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983]"
                    />
                    <Image
                        src={`/images/wild-skills/${dino.species.wildSkill}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.wildSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983]"
                    />
                </div>
                <div className="flex flex-row gap-1">
                <Image
                        src={`/images/biomes/${dino.species.biome}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.biome} Icon`}
                        className="place-self-center rounded-full border-2 border-[#35A983]"
                    />
                    <Image
                        src={`/images/food/${dino.species.diet}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.diet} Icon`}
                        className={`place-self-center rounded-lg border-2 ${
                            dino.species.diet === Diet.Carnivore ?
                            "border-[#CD303D]" :
                            dino.species.diet === Diet.Herbivore ?
                            "border-[#83BA4F]" :
                            "border-b-[#CD303D] border-r-[#CD303D] border-t-[#83BA4F] border-l-[#83BA4F]"
                        }`}
                    />
                    <Image
                        src={`/images/social/${dino.species.social}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.social} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#703D1C]"
                    />
                </div>
                <div className="flex flex-col">
                    {(dino.species.biome !== Biome.Farm && dino.species.biome !== pen.biome) && `Dino prefers a ${dino.species.biome} biome`}
                    {(dino.species.diet !== Diet.Omnivore && dino.species.diet as string != pen.foodType as string) && `Dino prefers ${dino.species.diet} food`}

                </div>
            </div>
        ));
    }

    const penElements = pens.map(pen => (
        <div key={pen.id}
            className="flex flex-col w-full bg-amber-200 border-3 rounded border-amber-400 p-2"
            onClick={() => addSelectedDinoToPen(pen.id)}>
            <div className="flex flex-row w-full">
                <div className="flex flex-row flex-wrap grow gap-2 text-small">
                    <div className="flex flex-row items-center gap-2">
                        <Image
                            src={`/images/biomes/${pen.biome}.png`}
                            width={36}
                            height={36}
                            alt={`${pen.biome} Icon`}
                            className="place-self-center rounded-full border-2 border-[#35A983]"
                        />
                        <select onChange={(event) => onPenBiomeSelected(event, pen.id)}>
                            <option value={Biome.Farm}>{Biome.Farm}</option>
                            <option value={Biome.Valley}>{Biome.Valley}</option>
                            <option value={Biome.Forest}>{Biome.Forest}</option>
                            <option value={Biome.Desert}>{Biome.Desert}</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Image
                            src={`/images/food/${pen.foodType}.png`}
                            width={36}
                            height={36}
                            alt={`${pen.foodType} Icon`}
                            className="place-self-center rounded-full border-2 border-[#35A983]"
                        />
                        <select onChange={(event) => onPenFoodSelected(event, pen.id)}>
                            <option value={FoodType.Plant}>{FoodType.Plant}</option>
                            <option value={FoodType.Meat}>{FoodType.Meat}</option>
                        </select>
                    </div>
                    <div>Foor per day: {pen.foodPerDay}</div>
                    <div>• Min size: {pen.minSize} m²</div>
                    <div>• + Happiness: {Math.ceil(pen.minSize * 1.5)}m²</div>
                    <div>• ++ Happiness: {pen.minSize * 2}m²</div>
                </div>
                <button className="justify-self-end h-4" onClick={() => {removePen(pen)}}>X</button>
            </div>
            <div className="flex flex-row grow flex-wrap gap-2">
                {getPenDinoElements(pen)}
            </div>
        </div>
    ))

    return (
    <div className="min-h-screen h-64 p-4 items-center justify-items-center">
        <div className="flex flex-col text-amber-900 bg-amber-50 h-full w-full rounded-lg p-3 items-center flex-none">
            <h1 className="text-xl font-bold">Pen Planner</h1>
            <div className={`flex flex-col w-full grow ${!showDinoSelection ? '' : 'hidden'}`}>
                <div>
                    Instructions v
                    [collapsible container]
                </div>
                <h2 className="font-bold self-center">Dinos</h2>
                <div id="ranch-dinos-list-container" className="flex flex-col h-2/6 flex-none grow-0">
                    <div className="flex flex-col bg-amber-100 h-full w-full rounded gap-2 p-2 flex-none grow-0">
                        <div id="ranch-dinos-list" className="flex flex-col min-h-0 w-full gap-2 overflow-scroll">
                            {dinoListElements}
                        </div>
                        <button
                            className="font-bold"
                            onClick={toggleShowDinoSelection}>
                            + Add dino
                        </button>
                    </div>
                </div>
                <h2 className="font-bold self-center">Pens</h2>
                <div id="pens-list-container" className="flex flex-col h-1/2 bg-amber-100 rounded p-2 gap-2 overflow-scroll">
                    {penElements}
                    <button
                        className={`font-bold ${selectedDino ? "" : "hidden"}`}
                        onClick={() => addSelectedDinoToPen(null)}>
                        + New Pen
                    </button>
                </div>
                    <div className={`flex flex-row w-full font-bold items-center gap-2 ${ignoreDreamstoneLimit ? "mt-2" : ""}`}>
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
            </div>
            <div className={`flex flex-col bg-amber-100 min-h-0 h-full w-full gap-2 rounded-lg ${showDinoSelection ? '' : 'hidden'}`}>
                <div className="flex flex-col grow p-4 overflow-scroll gap-1">
                    {dinoSpeciesElements}
                </div>
                <button className="justify-self-end font-bold" onClick={toggleShowDinoSelection}>Close</button>
            </div>
        </div>
    </div>
    )
  }
