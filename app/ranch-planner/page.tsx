"use client"; // This is a client component

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { saveAs } from 'file-saver';
import { CellData } from '@/resources/component-types';
import { setTileObject, TileObject, TileType, Position, isInRange, setTileType, getTileColor, getObjectColor, Tile, clearFences, placeFences } from './ranch-layout-updater';
import { generateLayout } from './ranch-setup';
import { ToolbarSetting, ToolbarButton, toolbarButtonGroups } from './toolbar-buttons';


export default function RanchPlanner() {
    const zoomLevels = [8, 12, 16, 20, 24];
    const [zoomLevel, setZoomLevel] = useState(2);
    const [toolbarSetting, setToolbarSetting] = useState<ToolbarSetting>(ToolbarSetting.None);
    const [layout, setLayout] = useState<Tile[][]>(generateLayout());
    const [currentMouseLocation, setCurrentMouseLocation] = useState<Position|null>(null);
    const [initialClickLocation, setInitialClickLocation] = useState<Position|null>(null);

    const reset = () => {
        setZoomLevel(2);
        setToolbarSetting(ToolbarSetting.None);
        setInitialClickLocation(null);
        setCurrentMouseLocation(null);
    }

    const saveConfig = () => {
        const config = JSON.stringify({
            layout: layout
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
                const configObj: {layout: Tile[][]} = JSON.parse(config);
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
        if (zoomLevel > 0) {
            setZoomLevel((prevLevel) => prevLevel - 1);
        }
    }
    
    const increaseZoomLevel = () => {
        if (zoomLevel < 4) {
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

    const Cell = (data: CellData) => {
        const tile = layout[data.rowIndex][data.columnIndex];
        const tilePos = { x: data.columnIndex, y: data.rowIndex };

        let backgroundColor = "transparent";

        if (tile.type !== TileType.Background &&
            tile.type !== TileType.Border &&
            initialClickLocation &&
            currentMouseLocation &&
            isInRange(initialClickLocation, currentMouseLocation, tilePos)) {
            backgroundColor = "rgb(167 243 208 / var(--tw-bg-opacity, 1))";
        } else {
            backgroundColor = getTileColor(tile.type);
        }

        let objectElement = null;

        if (tile.object !== TileObject.None) {
            const objectStyle = {
                backgroundColor: getObjectColor(tile.object)
            }
    
            switch (tile.object) {
                case (TileObject.Tree):
                    objectElement = (
                        <div className="w-full h-full rounded-full"
                            style={objectStyle}></div>
                    );
                    break;
                case (TileObject.Fence):
                    objectElement = (
                        <div className="w-1/2 h-1/2 rounded-full"
                            style={objectStyle}></div>
                    );
                    break;
                case (TileObject.Gate):
                    objectElement = (
                        <div className="w-3/4 h-3/4 rounded"
                            style={objectStyle}></div>
                    );
                    break;
                case (TileObject.TenderPot):
                    objectElement = (
                        <div className="w-4/5 h-4/5 rounded-full border-2 border-[#8C5C3E]"
                            style={objectStyle}></div>
                    );
                    break;
                case (TileObject.Bush):
                    objectElement = (
                        <div className="w-3/4 h-3/5 rounded border-2 border-[#1b5f50]"
                            style={objectStyle}></div>
                    );
                    break;
                case (TileObject.FruitTree):
                    objectElement = (
                        <div className="w-4/5 h-4/5 rounded-full border-2 border-[#1b5f50]"
                            style={objectStyle}></div>
                    );
                    break;
            }
        }

        const dyanmicStyle = {
            ...data.style,
            borderColor: `${tile.type === TileType.Background || tile.type === TileType.Border ? "transparent" : "rgb(82 82 82 / var(--tw-bg-opacity, 1))"}`,
            backgroundColor: backgroundColor
        }

        const onTileMouseDown = () => {
            setInitialClickLocation(tilePos);
        }

        const onTileMouseUp = () => {
            const setTile = (type: TileType) => {
                if (initialClickLocation && currentMouseLocation) {
                    setLayout(setTileType(layout, initialClickLocation, currentMouseLocation, type));
                }
            }

            const setObject = (object: TileObject) => {
                if (initialClickLocation && currentMouseLocation) {
                    setLayout(setTileObject(layout, initialClickLocation, currentMouseLocation, object));
                }
            }

            const setFences = () => {
                if (initialClickLocation && currentMouseLocation) {
                    setLayout(placeFences(layout, initialClickLocation, currentMouseLocation));
                }
            }

            const removeFences = () => {
                if (initialClickLocation && currentMouseLocation) {
                    setLayout(clearFences(layout, initialClickLocation, currentMouseLocation));
                }
            }

            // If ToolbarSetting is Eraser, set object to null
            if (toolbarSetting !== ToolbarSetting.None) {
                switch (toolbarSetting) {
                    case (ToolbarSetting.TileEraser):
                        setTile(TileType.Farm);
                        break;
                    case (ToolbarSetting.FenceEraser):
                        removeFences();
                        break;
                    case (ToolbarSetting.ObjectEraser):
                        setObject(TileObject.None);
                        break;
                    case (ToolbarSetting.Fence):
                        setFences();
                        break;
                    case (ToolbarSetting.Gate):
                        setObject(TileObject.Gate);
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
                    case (ToolbarSetting.Bush):
                        setObject(TileObject.Bush);
                        break;
                    case (ToolbarSetting.FruitTree):
                        setObject(TileObject.FruitTree);
                        break;
                    case (ToolbarSetting.Tree):
                        setObject(TileObject.Tree);
                        break;
                }
            }

            setInitialClickLocation(null);
        }

        const onTileMouseEnter = () => {
            setCurrentMouseLocation(tilePos);
        }

        return (
        <div id={`${data.columnIndex}x${data.rowIndex}y`}
            className="flex place-items-center place-content-center border-1"
            style={dyanmicStyle}
            onMouseDown={onTileMouseDown}
            onMouseUp={onTileMouseUp}
            onMouseEnter={onTileMouseEnter}>
            {objectElement}
        </div>
    )}

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
                    <button key={nanoid()}
                            className="grid w-8 h-8 p-1 border-2 rounded-lg place-content-center"
                            style={buttonStyle}
                            onClick={() => onToolbarButtonClicked(button)}>
                        <img className="max-h-6" src={button.iconURL} alt={button.label} />
                    </button>
                )
            }

            elements.push(
                <div key={nanoid()}
                    className="flex flex-col place-content-center text-center">
                    <div>{buttonGroup.label}</div>
                    <div className="flex flex-row gap-2 place-content-center">
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

    return (
      <div className="h-screen p-4 items-center justify-items-center">
        <div className="flex flex-col text-amber-900 bg-amber-50 h-full w-full rounded-lg p-4 items-center flex-none overflow-hidden gap-3">
          <div className="flex px-2 h-0 justify-between w-full font-bold">
                <button onClick={() => saveConfig()}>
                    Save
                </button>
                <label htmlFor="file-upload" className="cursor-pointer">
                    Load
                </label>
                <input id="file-upload"
                    className="hidden"
                    type="file"
                    onChange={(event) => loadConfig(event)}/>
            </div><h1 className="text-2xl font-bold">Ranch Planner</h1>
          <div className="flex flex-col border-4 border-amber-400 w-full h-full rounded">
            <div className="flex flex-row w-full justify-around content-center py-1 px-5 bg-amber-200 border-b-3 border-amber-400 shrink-0">
                {generateButtonElements()}
                <div className="flex flex-col place-content-center h-full font-bold">
                    <button className="h-8 w-20" onClick={resetLayout}>Reset</button>
                </div>
            </div>
            <div className="flex grow bg-amber-100">
              <AutoSizer>
                {({ height, width }) => (
                  <Grid
                    columnCount={117}
                    columnWidth={zoomLevels[zoomLevel]}
                    height={height}
                    rowCount={73}
                    rowHeight={zoomLevels[zoomLevel]}
                    width={width}
                  >
                    {Cell}
                  </Grid>
                )}
              </AutoSizer>
            </div>
          </div>
        </div>
      </div>
    )
  }
