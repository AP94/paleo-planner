export enum TileType {
    Background,
    Border,
    Unplaceable,
    Farm,
    Path,
    Crop,
    Valley,
    Ranch,
    Desert,
}

export enum TileObject {
    Tree,
    Fence,
    Gate,
    FruitTree,
    Bush,
    TenderPot,
    Object
}

export interface Tile {
    type: TileType;
    object: TileObject | null;
}

// Farm: #70a656
// Valley: #3baf50
// Forest: #126d43
// Desert: #f1ca85
// Fence: #5b2b0e

// #df9b5a
// #1b5f50

export const getTile = (layout: Tile[][], row: number, col: number): Tile => {
    return layout[row][col];
}

export const setTileType = (layout: Tile[][], row: number, col: number, tile: TileType): Tile[][] => {
    const newLayout = {...layout};

    if (newLayout[row][col].type !== TileType.Border &&
        newLayout[row][col].type !== TileType.Background
    ) {
        newLayout[row][col].type = tile;
    }

    return newLayout;
}

export const setTileObject = (layout: Tile[][], row: number, col: number, object: TileObject|null): Tile[][] => {
    const newLayout = {...layout};

    if (newLayout[row][col].type !== TileType.Border &&
        newLayout[row][col].type !== TileType.Background &&
        newLayout[row][col].type !== TileType.Unplaceable &&
        newLayout[row][col].object !== TileObject.Tree) {
            newLayout[row][col].object = object;
    }

    return newLayout;
}

export const setTileTypeRange = (layout: Tile[][], x1: number, x2: number, y1: number, y2: number, type: TileType): Tile[][] => {
    let newLayout = {...layout};
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const top = Math.min(y1, y2);
    const bottom = Math.max(y1, y2);
    
    for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
            newLayout = setTileType(layout, row, col, type);
        }
    }

    return newLayout;
}

export const setTileObjectRange = (layout: Tile[][], x1: number, x2: number, y1: number, y2: number, obj: TileObject): Tile[][] => {
    let newLayout = {...layout};
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const top = Math.min(y1, y2);
    const bottom = Math.max(y1, y2);
    
    for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
            newLayout = setTileObject(layout, row, col, obj);
        }
    }

    return newLayout;
}
