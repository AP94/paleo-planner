import React from "react";
import Image from "next/image";
import { DinoListData } from "@/resources/component-types";
import { Diet, Size } from "@/resources/types";

export default function dinoList(data: DinoListData) {
    
    const onDinoNameChange = (dinoID: string, name: string) => {
        data.updateDinoName(dinoID, name);
    } 

    const dinoListElements = data.dinos.map(dino => (
        <div key={dino.id}
            className={`flex flex-col items-center place-content-between bg-amber-200 p-1 w-40 shrink-0 rounded border-3 ${data.selectedDinoID == dino.id ? "border-[#34A983]" : "border-transparent"} sm:p-2 sm:w-44`}
            onClick={() => data.onDinoClicked(dino.id)}>
            <div className="flex flex-row h-0 w-full place-content-between">
                <div className="grid w-9 h-9 rounded-full bg-white sm:w-10 sm:h-10">
                    <Image
                        src="/images/Dreamstone.png"
                        width={dino.species.size == Size.Small ? 24 : 32}
                        height={dino.species.size == Size.Small ? 24 : 32}
                        alt={`${dino.species.size == Size.Small ? "Small" : "Large"} dreamstone icon`}
                        className="place-self-center"
                    />
                </div>
                {dino.species.name !== "Lucky" &&
                <button className="w-5 h-5 sm:text-xl sm:w-6 sm:h-6" onClick={() => {data.onRemoveDinoClicked(dino)}}>x</button>
                }
            </div>
            <div className="flex place-content-center h-[50px] w-[50px] shrink-0 sm:h-[75px] w-[75px]">
                <Image
                    src={dino.species.image}
                    width={50}
                    height={50}
                    alt={`${dino.species.name} icon`}
                    className="w-auto h-auto max-w-full max-h-full m-auto"
                />
            </div>
            <div className="flex flex-row sm:text-xl">
                <input value={dino.name}
                    onChange={(event) => { onDinoNameChange(dino.id, event.target.value) }}
                    className="text-center w-full my-1 bg-amber-200">
                </input>
            </div>
            <div className="flex flex-row w-full place-content-center gap-2">
                <Image
                    src={`/images/biomes/${dino.species.biome}.png`}
                    width={30}
                    height={30}
                    alt={`${dino.species.biome} Icon`}
                    className="place-self-center rounded-full border-2 border-[#35A983] h-9 w-9 sm:h-11 sm:w-11"
                />
                <div className="grid grid-rows-2 grid-cols-2 gap-1 sm:gap-2">
                    <Image
                        src={`/images/food/${dino.species.diet}.png`}
                        width={30}
                        height={30}
                        alt={`${dino.species.diet} Icon`}
                        className={`place-self-center rounded-lg border-2 sm:w-9 ${
                            dino.species.diet === Diet.Carnivore ?
                            "border-[#CD303D]" :
                            dino.species.diet === Diet.Herbivore ?
                            "border-[#83BA4F]" :
                            "border-b-[#CD303D] border-r-[#CD303D] border-t-[#83BA4F] border-l-[#83BA4F]"
                        }`}
                    />
                    <Image
                        src={`/images/social/${dino.species.social}.png`}
                        width={30}
                        height={30}
                        alt={`${dino.species.social} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#703D1C] sm:w-9"
                    />
                    <Image
                        src={`/images/farm-skills/${dino.species.farmSkill}.png`}
                        width={30}
                        height={30}
                        alt={`${dino.species.farmSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983] sm:w-9"
                    />
                    <Image
                        src={`/images/wild-skills/${dino.species.wildSkill}.png`}
                        width={30}
                        height={30}
                        alt={`${dino.species.wildSkill} Icon`}
                        className="place-self-center rounded-lg border-2 border-[#34A983] sm:w-9"
                    />
                </div>
            </div>
        </div>
    ));

    return (
        <div id="dinos-list-container" className="flex flex-col bg-amber-100 h-full w-full rounded p-2 flex-none sm:p-4">
            <div id="dinos-list" className="flex flex-row min-w-0 grow gap-1 overflow-x-auto sm:gap-2">
                {dinoListElements}
            </div>
            <div className="flex flex-row w-full justify-around items-center">
                <button
                    className="font-bold"
                    onClick={data.onAddDinoClicked}>
                    Add New Dino
                </button>
                <button
                    className={`font-bold ${data.selectedDinoID !== "" ? "" : "disabled opacity-50"}`}
                    onClick={data.onMoveToNewPenClicked}>
                    Move to New Pen
                </button>
            </div>
        </div>
    )
}