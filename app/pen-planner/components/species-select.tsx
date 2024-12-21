import React from "react";
import Image from "next/image";
import { SpeciesSelectData } from "@/resources/component-types";
import { allSpecies } from "@/resources/dino-species";
import { Diet, Size } from "@/resources/types";

export default function SpeciesSelect(data: SpeciesSelectData) {

    const dinoSpeciesElements = allSpecies.map(dinoSpecies => (
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

    return (
        <div id="species-select-overlay"
            className={`flex flex-col bg-amber-100 min-h-0 h-full w-full gap-2 rounded-lg ${data.hidden ? "hidden" : ""}`}>
            <div className="flex flex-col grow p-4 overflow-scroll gap-1">
                {dinoSpeciesElements}
            </div>
            <button className="justify-self-end font-bold" onClick={data.onCloseSpeciesSelect}>Close</button>
        </div>
    )
}