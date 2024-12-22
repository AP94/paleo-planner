import React from "react";
import Image from "next/image";
import { PenListData } from "@/resources/component-types";
import { Biome, Diet, FoodType, Pen, Size, Social } from "@/resources/types";

export default function PenList(data: PenListData) {

    const onPenBiomeSelected = (biome: string, penID: string) => {
        switch (biome) {
            case (Biome.Valley):
                data.setPenBiome(penID, Biome.Valley);
                break;
            case (Biome.Forest):
                data.setPenBiome(penID, Biome.Forest);
                break;
            case (Biome.Desert):
                data.setPenBiome(penID, Biome.Desert);
                break;
            default:
                data.setPenBiome(penID, Biome.Farm);
                break;
        }
    }

    const onPenFoodSelected = (foodType: string, penID: string) => {
        switch (foodType) {
            case (FoodType.Meat):
                data.setPenFoodType(penID, FoodType.Meat);
                break;
            default:
                data.setPenFoodType(penID, FoodType.Plant);
                break;
        }
    }

    const onDinoNameChange = (penID: string, dinoID: string, name: string) => {
        data.updatePenDinoName(penID, dinoID, name);
    }

    const getPenDinoElements = (pen: Pen) => {
        return pen.dinos.map((dino) => (
            <div key={dino.id}
                className="flex flex-col items-center w-full place-content-between bg-amber-300 border-3 rounded border-amber-400 p-1">
                <div className="flex flex-row self-end h-0">
                    <button className="h-5 w-5" onClick={() => data.onRemoveDinoClicked(pen.id, dino)}>X</button>
                </div>
                <div className="flex flex-row h-0 w-full place-content-between">
                    <div className="grid w-9 h-9 rounded-full bg-white">
                        <Image
                            src="/images/Dreamstone.png"
                            width={dino.species.size == Size.Small ? 24 : 32}
                            height={dino.species.size == Size.Small ? 24 : 32}
                            alt={`${dino.species.size == Size.Small ? "Small" : "Large"} dreamstone icon`}
                            className="place-self-center"
                        />
                    </div>
                </div>
                <div className="flex place-content-center h-16 w-16 shrink-0">
                    <Image
                        src={dino.species.image}
                        width={64}
                        height={64}
                        alt={`${dino.species.name} icon`}
                        className="w-auto h-auto max-h-full m-auto"
                    />
                </div>
                <div className="flex flex-row my-1">
                    <input value={dino.name}
                        onChange={(event) => { onDinoNameChange(pen.id, dino.id, event.target.value) }}
                        className="text-center w-full bg-amber-300">
                    </input>
                </div>
                <div className="flex flex-row w-full place-content-center gap-2">
                    <Image
                        src={`/images/biomes/${dino.species.biome}.png`}
                        width={36}
                        height={36}
                        alt={`${dino.species.biome} Icon`}
                        className="place-self-center rounded-full border-2 border-[#35A983] h-9 w-9"
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
                </div>
                <div className="flex flex-col font-bold text-red-700">
                    <ul>
                        <li>{(dino.species.biome !== Biome.Farm && dino.species.biome !== pen.biome) && `❗ Dino prefers a ${dino.species.biome} biome`}</li>
                        <li>{(dino.species.diet !== Diet.Omnivore && dino.species.diet as string != pen.foodType as string) && `❗ Dino needs ${dino.species.diet} food`}</li>
                        <li>{(dino.species.social === Social.Loner && pen.dinos.length > 1) && "❗ Dino wants no penmates"}</li>
                        <li>{(dino.species.social === Social.Pack && pen.dinos.length < 2) && "❗ Dino wants at least 1 penmate"}</li>
                        <li>{(dino.species.social === Social.Pack && pen.dinos.length > 3) && "❗ Dino wants no more than 2 penmates"}</li>
                        <li>{(dino.species.social === Social.Herd && pen.dinos.length < 3) && "❗ Dino wants at least 2 penmates"}</li>
                    </ul>
                </div>
            </div>
        ));
    }

    const penElements = data.pens.map(pen => (
        <div key={pen.id}
            className="flex flex-col w-full bg-amber-200 border-3 rounded border-amber-400 p-2"
            onClick={() => data.onPenClicked(pen.id)}>
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
                        <select key="pen-biome-select"
                            onChange={(event) => onPenBiomeSelected(event.target.value, pen.id)}
                            value={pen.biome}
                            className="h-6 rounded bg-amber-100 border-2 border-amber-400">
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
                            className={`place-self-center h-full rounded-full border-2 ${
                                pen.foodType === FoodType.Meat ?
                                "border-[#CD303D]" :
                                "border-[#83BA4F]"}`}
                        />
                        <select key="pen-food-select"
                            onChange={(event) => onPenFoodSelected(event.target.value, pen.id)}
                            value={pen.foodType}
                            className="h-6 rounded bg-amber-100 border-2 border-amber-400">
                            <option value={FoodType.Plant}>{FoodType.Plant}</option>
                            <option value={FoodType.Meat}>{FoodType.Meat}</option>
                        </select>
                    </div>
                </div>
                <button className="justify-self-end h-4" onClick={() => {data.onRemovePenClicked(pen)}}>X</button>
            </div>
            <div className="flex flex-row flex-wrap text-small gap-x-2">
                <div>• Food per day: {pen.foodPerDay}</div>
                <div>• Min size: {pen.minSize} m²</div>
                <div>• +Happiness: {Math.ceil(pen.minSize * 1.5)}m²</div>
                <div>• ++Happiness: {pen.minSize * 2}m²</div>
            </div>
            <div className="flex flex-row grow flex-wrap gap-2">
                {getPenDinoElements(pen)}
            </div>
        </div>
    ))

    return (
        <div id="pens-list-container" className="flex flex-col min-h-0 grow bg-amber-100 rounded p-2 gap-2 overflow-scroll">
            {penElements}
        </div>
    )
}