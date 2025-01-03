import { Tile, TileType, TileObject, Position } from "./ranch-constants";

export const getTile = (layout: Tile[][], row: number, col: number): Tile => {
    return layout[row][col];
}

const canChangeTileType = (layout: Tile[][], row: number, col: number, type: TileType): boolean => {
    if (type === TileType.Unplaceable) {
        return true;
    }
    
    if (layout[row][col].type === TileType.Background ||
        layout[row][col].type === TileType.Border ||
        layout[row][col].type === TileType.Unplaceable) {
            return false;
    }
    return true;
}

const canChangeTileObject = (layout: Tile[][], row: number, col: number): boolean => {
    if (layout[row][col].type === TileType.Background ||
        layout[row][col].type === TileType.Border ||
        layout[row][col].type === TileType.Unplaceable) {
            return false;
    }
    return true;
}

export const setTileType = (layout: Tile[][], pos1: Position, pos2: Position, type: TileType): Tile[][] => {
    const newLayout = {...layout};
    const left = Math.min(pos1.x, pos2.x);
    const right = Math.max(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const bottom = Math.max(pos1.y, pos2.y);
    
    for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
            if (canChangeTileType(layout, row, col, type)) {
                newLayout[row][col].type = type;
            }
        }
    }

    return newLayout;
}

export const setTileObject = (layout: Tile[][], pos1: Position, pos2: Position, obj: TileObject): Tile[][] => {
    const newLayout = {...layout};
    const left = Math.min(pos1.x, pos2.x);
    const right = Math.max(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const bottom = Math.max(pos1.y, pos2.y);

    for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
            if (canChangeTileObject(layout, row, col)) {
                newLayout[row][col].object = obj;
            }
        }
    }

    return newLayout;
}

export const clearFences = (layout: Tile[][], pos1: Position, pos2: Position): Tile[][] => {
    const newLayout = {...layout};
    const left = Math.min(pos1.x, pos2.x);
    const right = Math.max(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const bottom = Math.max(pos1.y, pos2.y);

    for (let col = left; col <= right; col++) {
        for (let row = top ; row <= bottom; row++) {
            if (newLayout[row][col].object === TileObject.Fence ||
                newLayout[row][col].object === TileObject.Gate) {
                newLayout[row][col].object = TileObject.None;
            }
        }
    }

    return newLayout;
}

export const placeFences = (layout: Tile[][], pos1: Position, pos2: Position): Tile[][] => {
    let newLayout = {...layout};
    const left = Math.min(pos1.x, pos2.x);
    const right = Math.max(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const bottom = Math.max(pos1.y, pos2.y);

    // For fences, place them around the border of the area rather than filling it in
    const width = right - left + 1;
    const height = bottom - top + 1;

    for (let col = left; col <= right; col++) {
        if (canChangeTileObject(layout, top, col)) {
            newLayout[top][col].object = TileObject.Fence;
        }
        if (canChangeTileObject(layout, bottom, col)) {
            newLayout[bottom][col].object = TileObject.Fence;
        }
    }
    for (let row = top; row <= bottom; row++) {
        if (canChangeTileObject(layout, row, left)) {
            newLayout[row][left].object = TileObject.Fence;
        }
        if (canChangeTileObject(layout, row, right)) {
            newLayout[row][right].object = TileObject.Fence;
        }
    }

    // Clear fence tiles within the selected area
    if (width > 2 && height > 2) {
        newLayout = clearFences(newLayout, { x: left + 1, y: top + 1 }, { x: right - 1, y: bottom - 1 });
    }

    return newLayout;
}
