"use client"; // This is a client component

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import React, { useState } from "react";
import { CellData } from '@/resources/component-types';
import { setTileObject, setTileObjectRange, TileObject, TileType } from './ranch-layout-updater';
import { generateLayout, Position } from './ranch-setup';

enum ToolbarSetting {
    None,
    Eraser,
    Fence,
    Gate,
}

export default function RanchPlanner() {
    const zoomLevels = [8, 12, 16, 20, 24];
    const [zoomLevel, setZoomLevel] = useState(2);
    const [toolbarSetting, setToolbarSetting] = useState<ToolbarSetting>(ToolbarSetting.None);
    const [layout, setLayout] = useState(generateLayout());

    let initialClickLocation: Position|null;

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
        const tileType = layout[data.rowIndex][data.columnIndex].type;
        const tileObject = layout[data.rowIndex][data.columnIndex].object;

        let backgroundColor = "transparent";
        switch (tileType) {
            case (TileType.Background):
                backgroundColor = "transparent";
                break;
            case (TileType.Border):
                backgroundColor = "neutral-800";
                break;
            case (TileType.Unplaceable):
                backgroundColor = "neutral-400";
                break;
            case (TileType.Farm):
                backgroundColor = "[#7ebb60]";
                break;
        }

        let objectElement = null;
        switch (tileObject) {
            case (TileObject.Tree):
                objectElement = (
                    <div className="w-full h-full rounded-full bg-[#1b5f50]"></div>
                );
                break;
            case (TileObject.Fence):
                objectElement = (
                    <div className="w-1/2 h-1/2 rounded-full bg-[#5b2b0e]"></div>
                );
                break;
        }

        const onTileMouseDown = () => {
            initialClickLocation = { x: data.columnIndex, y: data.rowIndex };
        }
        
        const onTileMouseUp = () => {
            if (!initialClickLocation||
                (data.columnIndex === initialClickLocation.x &&
                data.rowIndex === initialClickLocation.y)) {
                    const newLayout = setTileObject(layout, data.rowIndex, data.columnIndex, TileObject.Fence);
                    setLayout(newLayout);
            } else {
                setLayout(setTileObjectRange(layout, initialClickLocation.x, data.columnIndex, initialClickLocation.y, data.rowIndex, TileObject.Fence));
                initialClickLocation = null;
            }
        }

        return (
        <div id={`${data.columnIndex}x${data.rowIndex}y`}
            className={`flex place-items-center place-content-center border-1 ${tileType === TileType.Background || tileType === TileType.Border ? "border-transparent" : "border-neutral-600"} bg-${backgroundColor}`}
            style={data.style}
            onMouseDown={onTileMouseDown}
            onMouseUp={onTileMouseUp}>
            {objectElement}
        </div>
    )}

    return (
      <div className="h-screen p-4 items-center justify-items-center">
        <div className="flex flex-col text-amber-900 bg-amber-50 h-full w-full rounded-lg p-4 items-center flex-none overflow-hidden gap-3">
          <h1 className="text-xl font-bold">Ranch Planner</h1>
          <div className="flex flex-col border-4 border-amber-400 w-full h-full rounded">
            <div className="flex flex-row h-10 w-full bg-amber-200 border-b-3 border-amber-400 shrink-0">
                <button className="w-6 h-6" onClick={() => decreaseZoomLevel()}>-</button>
                <button className="w-6 h-6" onClick={() => increaseZoomLevel()}>+</button>
                <button className="h-6" onClick={() => onToolbarButtonClicked(ToolbarSetting.Eraser)}>Eraser</button>
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
