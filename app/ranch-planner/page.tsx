"use client"; // This is a client component

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import React, { useState } from "react";
import { saveAs } from 'file-saver';
import { CellData } from '@/resources/component-types';
import { setTileObject, setTileObjectRange, TileObject, TileType, Position, isInRange, setTileType, setTileTypeRange, getTileColor, getObjectColor, Tile } from './ranch-layout-updater';
import { generateLayout } from './ranch-setup';

enum ToolbarSetting {
    None = "None",
    Eraser = "Eraser",
    Fence = "Fence",
    Gate = "Gate",
    Valley = "Valley",
    Forest = "Forest",
    Desert = "Desert",
    DirtPath = "Dirt Path",
    StonePath = "Stone Path",
    CeramicPath = "Ceramic Path",
    Crop = "Crop"
}

export default function RanchPlanner() {
    const zoomLevels = [8, 12, 16, 20, 24];
    const [zoomLevel, setZoomLevel] = useState(2);
    const [toolbarSetting, setToolbarSetting] = useState<ToolbarSetting>(ToolbarSetting.None);
    const [layout, setLayout] = useState<Tile[][]>(generateLayout());
    const [currentMouseLocation, setCurrentMouseLocation] = useState<Position|null>(null)
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
    
    const increaseZoomLevel = () => {
        if (zoomLevel < 4) {
            setZoomLevel((prevLevel) => prevLevel + 1);
        }
    }

    const decreaseZoomLevel = () => {
        if (zoomLevel > 0) {
            setZoomLevel((prevLevel) => prevLevel - 1);
        }
    }

    const onToolbarButtonClicked = (setting: ToolbarSetting) => {
        const newSetting = setting !== toolbarSetting ? setting : ToolbarSetting.None;
        setToolbarSetting(newSetting);
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
                    )
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
            let object = null;
            let tileType = null;

            // If ToolbarSetting is Eraser, set object to null
            if (toolbarSetting !== ToolbarSetting.None) {
                switch (toolbarSetting) {
                    case (ToolbarSetting.Eraser):
                        tileType = TileType.Ranch;
                        object = TileObject.None;
                        break;
                    case (ToolbarSetting.Fence):
                        object = TileObject.Fence;
                        break;
                    case (ToolbarSetting.Gate):
                        object = TileObject.Gate;
                        break;
                    case (ToolbarSetting.Valley):
                        tileType = TileType.Valley;
                        break;
                    case (ToolbarSetting.Forest):
                        tileType = TileType.Forest;
                        break;
                    case (ToolbarSetting.Desert):
                        tileType = TileType.Desert;
                        break;
                    case (ToolbarSetting.DirtPath):
                        tileType = TileType.DirtPath;
                        break;
                    case (ToolbarSetting.StonePath):
                        tileType = TileType.StonePath;
                        break;
                    case (ToolbarSetting.CeramicPath):
                        tileType = TileType.CeramicPath;
                        break;
                    case (ToolbarSetting.Crop):
                        tileType = TileType.Crop;
                        break;
                }
            }

            if (!initialClickLocation ||
                (data.columnIndex === initialClickLocation.x &&
                data.rowIndex === initialClickLocation.y)) {
                    if (object) {
                        setLayout(setTileObject(layout, tilePos, object));
                    }
                    if (tileType) {
                        setLayout(setTileType(layout, tilePos, tileType));
                    }
            } else if (currentMouseLocation) {
                if (object) {
                    setLayout(setTileObjectRange(layout, initialClickLocation, currentMouseLocation, object));
                }
                if (tileType) {
                    setLayout(setTileTypeRange(layout, initialClickLocation, currentMouseLocation, tileType));
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

    const generateToolbarSettingButton = (setting: ToolbarSetting) => {
        const buttonStyle = {
            borderColor: toolbarSetting === setting ? "rgb(251 191 36 / var(--tw-bg-opacity, 1))" : "transparent"
        }
        return (
            <div className="flex flex-col place-content-center h-full">
                <button className="h-6 border-2 rounded"
                    onClick={() => onToolbarButtonClicked(setting)}
                    style={buttonStyle}>
                    {setting}
                </button>
            </div>
        )
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
            </div><h1 className="text-xl font-bold">Ranch Planner</h1>
          <div className="flex flex-col border-4 border-amber-400 w-full h-full rounded">
            <div className="flex flex-row w-full justify-evenly content-center bg-amber-200 border-b-3 border-amber-400 shrink-0">
                <div className="flex flex-col place-content-center h-full">
                    <div className="flex flex-row place-content-center">
                    <button className="w-6 h-6" onClick={() => decreaseZoomLevel()}>-</button>
                    Zoom
                    <button className="w-6 h-6" onClick={() => increaseZoomLevel()}>+</button>
                    </div>
                </div>
                {generateToolbarSettingButton(ToolbarSetting.Eraser)}
                <div className="flex flex-col place-content-center h-full">
                    {generateToolbarSettingButton(ToolbarSetting.Fence)}
                    {generateToolbarSettingButton(ToolbarSetting.Gate)}
                </div>
                <div className="flex flex-col place-content-center h-full">
                    {generateToolbarSettingButton(ToolbarSetting.Valley)}
                    {generateToolbarSettingButton(ToolbarSetting.Forest)}
                    {generateToolbarSettingButton(ToolbarSetting.Desert)}
                </div>
                {generateToolbarSettingButton(ToolbarSetting.Crop)}
                <div className="flex flex-col place-content-center h-full">
                {generateToolbarSettingButton(ToolbarSetting.DirtPath)}
                {generateToolbarSettingButton(ToolbarSetting.StonePath)}
                {generateToolbarSettingButton(ToolbarSetting.CeramicPath)}
                </div>
                <div className="flex flex-col place-content-center h-full">
                    <button className="h-6" onClick={resetLayout}>Reset</button>
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
