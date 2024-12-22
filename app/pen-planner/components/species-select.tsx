import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SpeciesSelectData } from "@/resources/component-types";
import { allSpecies } from "@/resources/dino-species";
import { Biome, Diet, DinoSpecies, FarmSkill, FoodType, Size, Social, WildSkill } from "@/resources/types";

export default function SpeciesSelect(data: SpeciesSelectData) {
    const defaultFilterOptions = {
        biome: "",
        food: "",
        social: "",
        farmSkill: "",
        wildSkill: ""
    }

    const [filteredSpecies, setFilteredSpecies] = useState<DinoSpecies[]>(allSpecies);
    const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

    const onBiomeFilterSelected = (biomeFilter: string) => {
        setFilterOptions((prevOptions) => {
            return {
                ...prevOptions,
                biome: biomeFilter
            }
        })
    }

    const onFoodFilterSelected = (dietFilter: string) => {
        setFilterOptions((prevOptions) => {
            return {
                ...prevOptions,
                food: dietFilter
            }
        })
    }
    
    const onSocialFilterSelected = (socialFilter: string) => {
        setFilterOptions((prevOptions) => {
            return {
                ...prevOptions,
                social: socialFilter
            }
        })
    }
    
    const onFarmSkillFilterSelected = (farmSkillFilter: string) => {
        setFilterOptions((prevOptions) => {
            return {
                ...prevOptions,
                farmSkill: farmSkillFilter
            }
        })
    }
    
    const onWildSkillFilterSelected = (wildSkillFilter: string) => {
        setFilterOptions((prevOptions) => {
            return {
                ...prevOptions,
                wildSkill: wildSkillFilter
            }
        })
    }

    const passesBiomeFilter = (species: DinoSpecies): boolean => {
        return filterOptions.biome === "" || species.biome === filterOptions.biome;
    }

    const passesDietFilter = (species: DinoSpecies): boolean => {
        return filterOptions.food === "" ||
            species.diet === Diet.Omnivore ||
            (species.diet === Diet.Herbivore && filterOptions.food === FoodType.Plant) ||
            (species.diet === Diet.Carnivore && filterOptions.food === FoodType.Meat);
    }
    
    const passesSocialFilter = (species: DinoSpecies): boolean => {
        return filterOptions.social === "" ||
            species.social === filterOptions.social ||
            (filterOptions.social === `${Social.Pack}|${Social.Herd}` && (species.social === Social.Pack || species.social === Social.Herd));
    }
    
    const passesFarmSkillFilter = (species: DinoSpecies): boolean => {
        return filterOptions.farmSkill === "" || species.farmSkill === filterOptions.farmSkill;
    }
    
    const passesWildSkillFilter = (species: DinoSpecies): boolean => {
        return filterOptions.wildSkill === "" || species.wildSkill === filterOptions.wildSkill;
    }

    const resetFilters = () => {
        setFilterOptions(defaultFilterOptions);
    }

    const onClose = () => {
        resetFilters();
        data.onCloseSpeciesSelect();
    }

    useEffect(() => {
        setFilteredSpecies(
            allSpecies.filter((dinoSpecies) => {
                return passesBiomeFilter(dinoSpecies) &&
                       passesDietFilter(dinoSpecies) &&
                       passesSocialFilter(dinoSpecies) &&
                       passesFarmSkillFilter(dinoSpecies) &&
                       passesWildSkillFilter(dinoSpecies)
            })
        )
    }, [filterOptions]);

    const dinoSpeciesElements = filteredSpecies.map(dinoSpecies => (
        <div key={dinoSpecies.name}
            className="flex flex-row items-center min-h-18 w-full bg-amber-200 gap-2 py-1 px-2 rounded"
            onClick={() => {data.onSpeciesClicked(dinoSpecies)}}>
            <div className="flex place-content-center h-[50px] w-[50px]">
                <Image
                    src={dinoSpecies.image}
                    width={50}
                    height={50}
                    alt={`${dinoSpecies.name} icon`}
                    className="w-auto h-auto max-w-full max-h-full m-auto"
                />
            </div>
            <div className="flex grow flex-col">
                <div className="flex w-full items-center justify-between flex-row">
                    {dinoSpecies.name}
                    <div className="grid w-9 h-9 rounded-full bg-white">
                        <Image
                            src="/images/Dreamstone.png"
                            width={dinoSpecies.size == Size.Small ? 24 : 32}
                            height={dinoSpecies.size == Size.Small ? 24 : 32}
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

    return (
        <div id="species-select-overlay"
            className={`flex flex-col bg-amber-100 min-h-0 p-3 h-full w-full gap-2 rounded-lg ${data.hidden ? "hidden" : ""}`}>
            <div className="flex flex-row p-1">
                <div className="flex flex-row flex-wrap gap-2">
                    <select id="biome-filter"
                        onChange={(event) => onBiomeFilterSelected(event.target.value)} value={filterOptions.biome}
                        className="h-6 rounded bg-amber-50 border-2 border-amber-300">
                        <option value={""}>Biome</option>
                        <option value={Biome.Valley}>{Biome.Valley}</option>
                        <option value={Biome.Forest}>{Biome.Forest}</option>
                        <option value={Biome.Desert}>{Biome.Desert}</option>
                    </select>
                    <select id="food-filter"
                        onChange={(event) => onFoodFilterSelected(event.target.value)} value={filterOptions.food}
                        className="h-6 rounded bg-amber-50 border-2 border-amber-300">
                        <option value={""}>Food Type</option>
                        <option value={FoodType.Plant}>{FoodType.Plant}</option>
                        <option value={FoodType.Meat}>{FoodType.Meat}</option>
                    </select>
                    <select id="social-filter"
                        onChange={(event) => onSocialFilterSelected(event.target.value)} value={filterOptions.social}
                        className="h-6 rounded bg-amber-50 border-2 border-amber-300">
                        <option value={""}>Social</option>
                        <option value={Social.Loner}>{Social.Loner}</option>
                        <option value={Social.Pack}>{Social.Pack}</option>
                        <option value={Social.Herd}>{Social.Herd}</option>
                        <option value={`${Social.Pack}|${Social.Herd}`}>{Social.Pack}/{Social.Herd}</option>
                    </select>
                    <select id="farm-skill-filter"
                        onChange={(event) => onFarmSkillFilterSelected(event.target.value)} value={filterOptions.farmSkill}
                        className="h-6 rounded bg-amber-50 border-2 border-amber-300">
                        <option value={""}>Farm Skill</option>
                        <option value={FarmSkill.Clearer}>{FarmSkill.Clearer}</option>
                        <option value={FarmSkill.Harvester}>{FarmSkill.Harvester}</option>
                        <option value={FarmSkill.Tender}>{FarmSkill.Tender}</option>
                        <option value={FarmSkill.Tiller}>{FarmSkill.Tiller}</option>
                        <option value={FarmSkill.Waterer}>{FarmSkill.Waterer}</option>
                    </select>
                    <select id="wild-skill-filter"
                        onChange={(event) => onWildSkillFilterSelected(event.target.value)} value={filterOptions.wildSkill}
                        className="h-6 rounded bg-amber-50 border-2 border-amber-300">
                        <option value={""}>Wild Skill</option>
                        <option value={WildSkill.Discoverer}>{WildSkill.Discoverer}</option>
                        <option value={WildSkill.Slasher}>{WildSkill.Slasher}</option>
                        <option value={WildSkill.Smasher}>{WildSkill.Smasher}</option>
                        <option value={WildSkill.Sprinter}>{WildSkill.Sprinter}</option>
                        <option value={WildSkill.Stomper}>{WildSkill.Stomper}</option>
                    </select>
                    <button className="font-bold px-2" onClick={() => resetFilters()}>Reset</button>
                </div>
            </div>
            <div className="flex flex-col grow pt-0 overflow-scroll gap-1">
                {dinoSpeciesElements}
            </div>
            <button className="justify-self-end font-bold" onClick={onClose}>Close</button>
        </div>
    )
}