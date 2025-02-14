import React, { useState } from "react";
import Image from "next/image";
import { Checkbox, cn } from "@nextui-org/react";
import { DreamstoneCounterData } from "@/resources/component-types";

export default function DreamstoneCounter(data: DreamstoneCounterData) {
    const [ignoreDSLimit, setIgnoreDSLimit] = useState(false);
    
    const toggleIgnoreDSLimit = () => {
        setIgnoreDSLimit(ignore => !ignore);
    }
    
    return (
        <div id="dreamstones-container"
            className={`flex flex-row w-full font-bold items-center h-11 place-content-around ${data.hidden ? "hidden" : ""} sm:text-lg sm:h-14`}>
            <div className={`flex flex-row items-center gap-2 ${ignoreDSLimit ? "hidden" : ""} sm:gap-3`}>
                <div className={`flex flex-row h-[36] items-center gap-1 ${data.largeDSCount < 0 ? "text-red-600" : ""} sm:gap-2`}>
                    <Image
                        src="/images/Dreamstone.png"
                        width={36}
                        height={36}
                        alt="Large Dreamstone"
                    />
                    {data.largeDSCount}
                </div>
                <div className="flex flex-col gap-1 sm:gap-2">
                    <button
                        className="flex text-4xl justify-center items-center leading-5"
                        onClick={data.convertSmallDSToLarge}
                        >
                        ←
                    </button>
                    <button className="flex text-4xl justify-center items-center leading-5"
                        onClick={data.convertLargeDSToSmall}
                        >
                        →
                    </button>
                </div>
                <div className={`flex flex-row h-[24] items-center gap-1 ${data.smallDSCount < 0 ? "text-red-600" : ""} sm:gap-2`}>
                    <Image
                        src="/images/Dreamstone.png"
                        width={24}
                        height={24}
                        alt="Small Dreamstone"
                    />
                    {data.smallDSCount}
                </div>
            </div>
            <div className="flex items-center justify-center min-h-6">
                <Checkbox
                    classNames={{
                        base: cn(
                        "inline-flex ml-1",
                        "items-center justify-start",
                        "cursor-pointer w-full rounded-lg p-0 mr-0"
                        ),
                        label: "text-inherit text-center w-24 sm:w-28 sm:text-lg",
                    }}
                    size="md"
                    radius="sm"
                    isSelected={data.ignoreLucky}
                    onValueChange={data.onIgnoreLuckyToggled}
                    >
                    Hide lucky
                </Checkbox>
            </div>
            <div className="flex items-center justify-center min-h-6">
                <Checkbox
                    classNames={{
                        base: cn(
                        "inline-flex ml-1",
                        "items-center justify-start",
                        "cursor-pointer w-full rounded-lg p-0 mr-0"
                        ),
                        label: "text-inherit text-center w-24 sm:w-28 sm:text-lg",
                    }}
                    size="md"
                    radius="sm"
                    isSelected={ignoreDSLimit}
                    onValueChange={toggleIgnoreDSLimit}
                    >
                    Ignore limit
                </Checkbox>
            </div>
        </div>
    )
}