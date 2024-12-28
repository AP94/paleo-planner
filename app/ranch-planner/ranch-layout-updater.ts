export enum TileType {
    Background,
    Border,
    Unplaceable,
    Farm,
    Valley,
    Forest,
    Desert,
    Crop,
    DirtPath,
    StonePath,
    CeramicPath,
}

export enum TileObject {
    None = "None",
    Tree = "Tree",
    Fence = "Fence",
    Gate = "Gate",
    FruitTree = "FruitTree",
    Bush = "Bush",
    TenderPot = "TenderPot"
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

export const getTileColor = (type: TileType) => {
    switch (type) {
        case (TileType.Background):
            return "transparent";
        case (TileType.Border):
            return "#262626";
        case (TileType.Unplaceable):
            return "#a3a3a3";
        case (TileType.Farm):
            return "#7ebb60";
        case (TileType.Valley):
            return "#3baf50";
        case (TileType.Forest):
            return "#198050";
        case (TileType.Desert):
            return "#f1ca85";
        case (TileType.DirtPath):
            return "#8b644f";
        case (TileType.StonePath):
            return "#a2afdb";
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
        case (TileObject.Bush):
            return "#378e65";
        case (TileObject.TenderPot):
            return "#dc9668";
    }
}

export const getTile = (layout: Tile[][], row: number, col: number): Tile => {
    return layout[row][col];
}

const canChangeTileType = (layout: Tile[][], row: number, col: number, type: TileType): boolean => {
    if (type === TileType.Unplaceable) {
        return true;
    }
    
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

    if (canChangeTileType(layout, row, col, type)) {
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
            if (canChangeTileType(layout, row, col, type)) {
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
            if (canChangeTileObject(layout, top, col)) {
                newLayout[top][col].object = obj;
            }
            if (canChangeTileObject(layout, bottom, col)) {
                newLayout[bottom][col].object = obj;
            }
        }
        for (let row = top; row <= bottom; row++) {
            if (canChangeTileObject(layout, row, left)) {
                newLayout[row][left].object = obj;
            }
            if (canChangeTileObject(layout, row, right)) {
                newLayout[row][right].object = obj;
            }
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