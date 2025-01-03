"use client"; // This is a client component

import React, { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import { nanoid } from "nanoid";
import { saveAs } from 'file-saver';
import { setTileObject, setTileType, clearFences, placeFences } from './ranch-layout-updater';
import { generateLayout, standardLayout } from './ranch-setup';
import { ToolbarSetting, ToolbarButton, toolbarButtonGroups } from './toolbar-buttons';
import { Position, Tile, TileObject, TileType } from './ranch-constants';
import { canvasToLayoutPosition, drawBackground, drawLayout, drawSelection, clearCanvas, createRanchImage } from "./canvas-draw-util";

enum ZoomLevel {
    XSmall = 0,
    Small,
    Medium,
    Large,
    XLarge,
    Full
}

export default function RanchPlanner() {
    const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(ZoomLevel.Medium);
    const [toolbarSetting, setToolbarSetting] = useState<ToolbarSetting>(ToolbarSetting.None);
    const [layout, setLayout] = useState<Tile[][]>(standardLayout);
    const [initialTilePos, setInitialClickTilePos] = useState<Position|null>(null);
    const [currentTilePos, setCurrentTilePos] = useState<Position|null>(null);

    const reset = () => {
        setToolbarSetting(ToolbarSetting.None);
        setInitialClickTilePos(null);
        setCurrentTilePos(null);
    }

    const saveConfig = () => {
        const config = JSON.stringify({
            layout: layout,
            colorPalette: null
        });
        const file = new Blob([config], { type: 'text/plain;charset=utf-8' });
        saveAs(file, 'Paleo Planner Ranch Save.txt');
    }
    
    const loadConfig = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const reader = new FileReader()
        reader.onload = async (e) => { 
            try {
                const config = (e.target?.result) as string;
                const configObj: {layout: Tile[][], colorPalette: null} = JSON.parse(config);
                setLayout(configObj.layout);
                reset();
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

    const decreaseZoomLevel = () => {
        if (zoomLevel > ZoomLevel.XSmall) {
            setZoomLevel((prevLevel) => prevLevel - 1);
        }
    }
    
    const increaseZoomLevel = () => {
        if (zoomLevel < ZoomLevel.Full) {
            setZoomLevel((prevLevel) => prevLevel + 1);
        }
    }

    const onToolbarButtonClicked = (button: ToolbarButton) => {
        if (button.label === "Zoom Out") {
            decreaseZoomLevel();
        }
        else if (button.label === "Zoom In") {
            increaseZoomLevel();
        }
        else {
            const newSetting = button.setting !== toolbarSetting ? button.setting : ToolbarSetting.None;
            setToolbarSetting(newSetting);
        }
    }

    const generateButtonElements = () => {
        const elements = [];

        for (let i = 0; i < toolbarButtonGroups.length; i++) {
            const buttonGroup = toolbarButtonGroups[i];
            // Entry is a button group
            const buttonGroupElements = [];

            for (let j = 0; j < buttonGroup.buttons.length; j++) {
                const button = buttonGroup.buttons[j];
                let borderColor = "rgb(217 119 6 / var(--tw-bg-opacity, 1))";
                let backgroundColor = "rgb(252 211 77 / var(--tw-bg-opacity, 1))";
                
                if (button.setting && button.setting !== ToolbarSetting.None && toolbarSetting === button.setting) {
                    borderColor = "rgb(16 185 129 / var(--tw-bg-opacity, 1))";
                    backgroundColor = "rgb(209 250 229 / var(--tw-bg-opacity, 1))";
                }

                const buttonStyle = {
                    borderColor: borderColor,
                    backgroundColor: backgroundColor
                }

                buttonGroupElements.push(
                    <div key={nanoid()}>
                    <Tooltip id={`${button.label}-tooltip`} />
                    <a
                        data-tooltip-id={`${button.label}-tooltip`}
                        data-tooltip-content={button.label}
                        data-tooltip-place="top"
                    >
                        <button className="grid w-10 h-10 p-1 border-2 rounded-lg place-content-center"
                                style={buttonStyle}
                                onClick={() => onToolbarButtonClicked(button)}>
                            <img className="max-h-6" src={button.iconURL} alt={button.label} />
                        </button>
                    </a>
                    </div>
                )
            }

            elements.push(
                <div key={nanoid()}
                    className="flex flex-col place-content-center text-center m-auto">
                    <div>{buttonGroup.label}</div>
                        <div className="flex flex-row gap-2 place-content-center px-2">
                            {buttonGroupElements}
                        </div>
                </div>
            )
        }

        return elements;
    }
    
    const resetLayout = () => {
        if (confirm("Are you sure you want to reset this ranch layout?")) {
            setLayout(generateLayout());
            reset();
        }
    }

    const generateLayoutImage = () => {
        const ranchImageCanvas = createRanchImage(layout);
        const newTab = window.open();
        if (newTab) {
            newTab.document.body.append(ranchImageCanvas);
        }
    }

    const getCanvasWidth = () => {
        switch (zoomLevel) {
            case ZoomLevel.XSmall:
                return 1400;
            case ZoomLevel.Small:
                return 2000;
            case ZoomLevel.Medium:
                return 2800;
            case ZoomLevel.Large:
                return 3600;
            case ZoomLevel.XLarge:
                return 4500;
            default:
                return 5612;
        }
    }

    const getCanvasHeight = () => {
        switch (zoomLevel) {
            case ZoomLevel.XSmall:
                return 873;
            case ZoomLevel.Small:
                return 1247;
            case ZoomLevel.Medium:
                return 1746;
            case ZoomLevel.Large:
                return 2245;
            case ZoomLevel.XLarge:
                return 2806;
            default:
                return 3500;
        }
    }

    const onCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const rect = (e.target as Element).getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;

        const layoutPosition = canvasToLayoutPosition(canvasX, canvasY, getCanvasWidth(), getCanvasHeight());
        setInitialClickTilePos(layoutPosition);
        setCurrentTilePos(layoutPosition);
    }

    const onCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const rect = (e.target as Element).getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;

        const layoutPosition = canvasToLayoutPosition(canvasX, canvasY, getCanvasWidth(), getCanvasHeight());
        setCurrentTilePos(layoutPosition);
    }

    const onCanvasMouseUp = () => {
        // draw tiles
        const setTile = (type: TileType) => {
            if (initialTilePos && currentTilePos) {
                setLayout(setTileType(layout, initialTilePos, currentTilePos, type));
            }
        }

        const setObject = (object: TileObject) => {
            if (initialTilePos && currentTilePos) {
                setLayout(setTileObject(layout, initialTilePos, currentTilePos, object));
            }
        }

        const setFences = () => {
            if (initialTilePos && currentTilePos) {
                setLayout(placeFences(layout, initialTilePos, currentTilePos));
            }
        }

        const removeFences = () => {
            if (initialTilePos && currentTilePos) {
                setLayout(clearFences(layout, initialTilePos, currentTilePos));
            }
        }

        if (toolbarSetting !== ToolbarSetting.None) {
            switch (toolbarSetting) {
                case (ToolbarSetting.ObjectEraser):
                    setObject(TileObject.None);
                    break;
                case (ToolbarSetting.FenceEraser):
                    removeFences();
                    break;
                case (ToolbarSetting.Fence):
                    setFences();
                    break;
                case (ToolbarSetting.Gate):
                    setObject(TileObject.Gate);
                    break;
                case (ToolbarSetting.Ranch):
                    setTile(TileType.Ranch);
                    break;
                case (ToolbarSetting.Valley):
                    setTile(TileType.Valley);
                    break;
                case (ToolbarSetting.Forest):
                    setTile(TileType.Forest);
                    break;
                case (ToolbarSetting.Desert):
                    setTile(TileType.Desert);
                    break;
                case (ToolbarSetting.DirtPath):
                    setTile(TileType.DirtPath);
                    break;
                case (ToolbarSetting.StonePath):
                    setTile(TileType.StonePath);
                    break;
                case (ToolbarSetting.CeramicPath):
                    setTile(TileType.CeramicPath);
                    break;
                case (ToolbarSetting.Crop):
                    setTile(TileType.Crop);
                    break;
                case (ToolbarSetting.TenderPot):
                    setObject(TileObject.TenderPot);
                    break;
                case (ToolbarSetting.Water):
                    setObject(TileObject.Water);
                    break;
                case (ToolbarSetting.Bush):
                    setObject(TileObject.Bush);
                    break;
                case (ToolbarSetting.FruitTree):
                    setObject(TileObject.FruitTree);
                    break;
                case (ToolbarSetting.Tree):
                    setObject(TileObject.Tree);
                    break;
                case (ToolbarSetting.Dreamstone):
                    setObject(TileObject.Dreamstone);
                    break;
                case (ToolbarSetting.Chest):
                    setObject(TileObject.Chest);
                    break;
                case (ToolbarSetting.CookingPot):
                    setObject(TileObject.CookingPot);
                    break;
                case (ToolbarSetting.FeedingTrough):
                    setObject(TileObject.FeedingTrough);
                    break;
                case (ToolbarSetting.Composter):
                    setObject(TileObject.Composter);
                    break;
                case (ToolbarSetting.Decoration):
                    setObject(TileObject.Decoration);
                    break;
            }
        }

        setInitialClickTilePos(null);
        setCurrentTilePos(null);
    }

    useEffect(() => {
        const bgCanvas = document.getElementById('background-canvas') as HTMLCanvasElement;
        drawBackground(bgCanvas);
    }, []);

    useEffect(() => {
        const drawCanvas = document.getElementById('drawing-canvas') as HTMLCanvasElement;
        drawLayout(drawCanvas, layout);
    }, [layout]);

    useEffect(() => {
        const selectCanvas = document.getElementById('selection-canvas') as HTMLCanvasElement;
        if (initialTilePos && currentTilePos) {
            drawSelection(selectCanvas, initialTilePos, currentTilePos);
        }
        else {
            clearCanvas(selectCanvas);
        }
    }, [initialTilePos, currentTilePos]);

    return (
      <div className="h-screen p-4 items-center justify-items-center">
        <div className="flex flex-col text-amber-900 bg-amber-50 h-full w-full rounded-lg p-4 items-center flex-none overflow-hidden gap-3">
          <div className="flex px-2 justify-between w-full text-lg font-bold">
                <button className="text-red-700 w-32" onClick={() => resetLayout()}>
                    Reset
                </button>
                <div className="flex flex-grow place-content-center">
                    <h1 className="text-2xl font-bold m-auto">Ranch Planner</h1>
                </div>
                <div className="flex flex-col gap-2 w-32 place-content-center">
                    <div className="flex gap-2 place-content-center">
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
                    <button className="" onClick={generateLayoutImage}>
                        View As Image
                    </button>
                </div>
            </div>
          <div className="flex flex-col flex-grow border-4 border-amber-400 w-full rounded flex-nowrap overflow-hidden">
            <div className="flex flex-row flex-nowrap w-full overflow-x-auto content-center py-1 px-5 gap-2 bg-amber-200 border-b-3 border-amber-400 shrink-0">
                {generateButtonElements()}
            </div>
            <div className="grid flex-grow bg-amber-100 overflow-scroll w-full">
                <div className="flex place-content-center h-full relative" style={{width: getCanvasWidth(), height: getCanvasHeight()}}>
                    <p></p>
                    <canvas id="background-canvas"
                        className="w-full h-full absolute top-0 left-0"/>
                    <canvas id="drawing-canvas"
                        className="w-full h-full absolute top-0 left-0 z-10"/>
                    <canvas id="selection-canvas"
                        className="w-full h-full absolute top-0 left-0 z-20"
                        onMouseDown={onCanvasMouseDown}
                        onMouseUp={onCanvasMouseUp}
                        onMouseMove={onCanvasMouseMove}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
