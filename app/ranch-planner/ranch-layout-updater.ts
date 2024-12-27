export enum TileType {
    Background,
    Border,
    Unplaceable,
    Ranch,
    Valley,
    Forest,
    Desert,
    DirtPath,
    StonePath,
    CeramicPath,
    Crop,
}

export enum TileObject {
    None = "None",
    Tree = "Tree",
    Fence = "Fence",
    Gate = "Gate",
    FruitTree = "FruitTree",
    Bush = "Bush",
    TenderPot = "TenderPot",
    Object = "Object"
}

export interface Tile {
    type: TileType;
    object: TileObject;
}

export interface Position {
    x: number;
    y: number;
}

export enum Direction {
    Horizontal,
    Vertical
}

export interface Line {
    origin: Position;
    length: number;
    direction: Direction;
}

// Farm: #70a656
// Valley: #3baf50
// Forest: #198050
// Desert: #f1ca85
// Fence: #5b2b0e

// #df9b5a
// #1b5f50

export const getTileColor = (type: TileType) => {
    switch (type) {
        case (TileType.Background):
            return "transparent";
        case (TileType.Border):
            return "rgb(38 38 38 / var(--tw-bg-opacity, 1))";
        case (TileType.Unplaceable):
            return "rgb(163 163 163 / var(--tw-bg-opacity, 1))";
        case (TileType.Ranch):
            return "#7ebb60";
        case (TileType.Valley):
            return "#3baf50";
        case (TileType.Forest):
            return "#198050";
        case (TileType.Desert):
            return "#f1ca85";
        case (TileType.DirtPath):
            return "rgb(139 100 79 / var(--tw-bg-opacity, 1))";
        case (TileType.StonePath):
            return "rgb(162 175 219 / var(--tw-bg-opacity, 1))";
        case (TileType.CeramicPath):
            return "#9c7f74";
        case (TileType.Crop):
            return "#b3754f";
    }
}

export const getObjectColor = (object: TileObject) => {
    switch (object) {
        case (TileObject.Tree):
            return "#1b5f50";
        case (TileObject.Fence):
        case (TileObject.Gate):
            return "#5b2b0e";
        case (TileObject.FruitTree):
            return "";
        case (TileObject.Bush):
            return "";
        case (TileObject.TenderPot):
            return "";
        case (TileObject.Object):
            return "";
    }
}

export const getTile = (layout: Tile[][], row: number, col: number): Tile => {
    return layout[row][col];
}

const canChangeTileType = (layout: Tile[][], row: number, col: number): boolean => {
    if (layout[row][col].type === TileType.Background ||
        layout[row][col].type === TileType.Border) {
            return false;
    }
    return true;
}

const canChangeTileObject = (layout: Tile[][], row: number, col: number): boolean => {
    if (layout[row][col].type === TileType.Background ||
        layout[row][col].type === TileType.Border ||
        layout[row][col].type === TileType.Unplaceable ||
        layout[row][col].object === TileObject.Tree) {
            return false;
    }
    return true;
}

export const setTileType = (layout: Tile[][], pos: Position, type: TileType): Tile[][] => {
    const newLayout = {...layout};
    const row = pos.y;
    const col = pos.x;

    if (canChangeTileType(layout, row, col)) {
        newLayout[row][col].type = type;
    }

    return newLayout;
}

export const setTileObject = (layout: Tile[][], pos: Position, obj: TileObject): Tile[][] => {
    const newLayout = {...layout};
    const row = pos.y;
    const col = pos.x;

    if (canChangeTileObject(layout, row, col)) {
        newLayout[row][col].object = obj;
    }

    return newLayout;
}

export const setTileTypeRange = (layout: Tile[][], pos1: Position, pos2: Position, type: TileType): Tile[][] => {
    const newLayout = {...layout};
    const left = Math.min(pos1.x, pos2.x);
    const right = Math.max(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const bottom = Math.max(pos1.y, pos2.y);
    
    for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
            if (canChangeTileType(layout, row, col)) {
                newLayout[row][col].type = type;
            }
        }
    }

    return newLayout;
}

export const setTileObjectRange = (layout: Tile[][], pos1: Position, pos2: Position, obj: TileObject): Tile[][] => {
    const newLayout = {...layout};
    const left = Math.min(pos1.x, pos2.x);
    const right = Math.max(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const bottom = Math.max(pos1.y, pos2.y);

    // For fences, place them around the border of the area rather than filling it in
    if (obj === TileObject.Fence) {
        for (let col = left; col <= right; col++) {
            newLayout[top][col].object = obj;
            newLayout[bottom][col].object = obj;
        }
        for (let row = top; row <= bottom; row++) {
            newLayout[row][left].object = obj;
            newLayout[row][right].object = obj;
        }
    }
    
    else {
        for (let row = top; row <= bottom; row++) {
            for (let col = left; col <= right; col++) {
                if (canChangeTileObject(layout, row, col)) {
                    newLayout[row][col].object = obj;
                }
            }
        }
    }

    return newLayout;
}

export const isInRange = (startPos: Position, endPos: Position, pos: Position): boolean => {
    const left = Math.min(startPos.x, endPos.x);
    const right = Math.max(startPos.x, endPos.x);
    const top = Math.min(startPos.y, endPos.y);
    const bottom = Math.max(startPos.y, endPos.y);

    return (left <= pos.x && pos.x <= right && top <= pos.y && pos.y <= bottom);
}