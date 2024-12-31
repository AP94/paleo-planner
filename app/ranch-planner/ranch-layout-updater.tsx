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
    Water = "Water",
    TenderPot = "TenderPot",
    Dreamstone = "Dreamstone",
    Chest = "Chest",
    CookingPot = "Cooking Pot",
    FeedingTrough = "Trough",
    Composter = "Composter",
    Decoration = "Decoration"
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

export const gridLineColor = "#525252";

export const getTileColor = (type: TileType) => {
    switch (type) {
        case (TileType.Background):
            return "transparent";
        case (TileType.Border):
            return "#262626";
        case (TileType.Unplaceable):
            return "#797878";
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
            return "#103c32";
        case (TileObject.Fence):
        case (TileObject.Gate):
            return "#5b2b0e";
        case (TileObject.FruitTree):
        case (TileObject.Bush):
            return "#378e65";
        case (TileObject.FeedingTrough):
        case (TileObject.TenderPot):
            return "#dc9668";
        case (TileObject.Water):
            case (TileObject.CookingPot):
            return "#5dadec";
        case (TileObject.Dreamstone):
            return "#ffb7c1";
        case (TileObject.Chest):
            return "#d0803c";
        case (TileObject.Composter):
            return "#8C5C3E";
        case (TileObject.Decoration):
            return "#fef0af";
    }
}

export const getBorderColor = (object: TileObject) => {
    switch (object) {
        case (TileObject.FeedingTrough):
            case (TileObject.TenderPot):
            return "#5b2b0e";
        case (TileObject.FruitTree):
            return "#1b5f50";
        case (TileObject.Bush):
            return "#1b5f50";
        case (TileObject.Dreamstone):
            return "#b36170";
        case (TileObject.Chest):
            return "#5b2b0e";
        case (TileObject.CookingPot):
            return "#2c323e";
        case (TileObject.Composter):
            return "#703624";
        case (TileObject.Decoration):
            return "#d0803c";
        default:
            return null;
    }
}

export const getObjectElement = (object: TileObject) => {
    let objectElement = null;
    
    if (object !== TileObject.None) {
        const borderColor = getBorderColor(object);

        const objectStyle = {
            backgroundColor: getObjectColor(object),
            border: borderColor ? `2px solid ${borderColor}` : "none"
        }

        switch (object) {
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
                    <div className="w-4/5 h-4/5 rounded-full"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.Water):
                objectElement = (
                    <div className="w-full h-full rounded-sm"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.Bush):
                objectElement = (
                    <div className="w-3/4 h-3/5 rounded"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.FruitTree):
                objectElement = (
                    <div className="w-4/5 h-4/5 rounded-full"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.Dreamstone):
                objectElement = (
                    <div className="w-4/5 h-4/5 rounded-full"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.Chest):
                objectElement = (
                    <div className="w-full h-4/5 rounded"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.CookingPot):
                objectElement = (
                    <div className="w-4/5 h-4/5 rounded-full"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.FeedingTrough):
                objectElement = (
                    <div className="w-full h-4/5 rounded-sm"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.Composter):
                objectElement = (
                    <div className="w-4/5 h-4/5 rounded-sm"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.Decoration):
                objectElement = (
                    <div className="w-full h-full rounded-md"
                        style={objectStyle}></div>
                );
                break;
        }
    }

    return objectElement;
}

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

export const isInRange = (startPos: Position, endPos: Position, pos: Position): boolean => {
    const left = Math.min(startPos.x, endPos.x);
    const right = Math.max(startPos.x, endPos.x);
    const top = Math.min(startPos.y, endPos.y);
    const bottom = Math.max(startPos.y, endPos.y);

    return (left <= pos.x && pos.x <= right && top <= pos.y && pos.y <= bottom);
}

export const createRanchImage = (layout: Tile[][]) => {
    // const padding = 25;
    // const tileSize = 10;
    // const tileBorderWidth = 1;

    // const width = padding * 2 + layout[0].length * tileSize + (layout[0].length - 1) * tileBorderWidth * 2
    // const height = padding * 2 + layout.length * tileSize + (layout.length - 1) * tileBorderWidth * 2

    // const canvas: HTMLCanvasElement = document.createElement('canvas');
    // canvas.width = width;
    // canvas.height = height;

    // const context = canvas.getContext('2d');
    // if (context) {
    //     const backgroundColor = "#fef3c7";
    //     // Fill padding
    //     context.fillStyle = backgroundColor;
    //     context.fillRect(0, 0, width, padding);
    //     context.fillRect(0, 0, padding, height);
    //     context.fillRect(0, height - padding, width, padding);
    //     context.fillRect(width - padding, 0, padding, height);

    //     // Fill tiles

    //     for (let row = 0; row < layout.length; row++) {
    //         for (let col = 0; col < layout[0].length; col++) {
    //             const tile = layout[row][col];

    //             context.fillStyle = gridLineColor;

    //         }
    //     }

    // }
    // return canvas.toDataURL('image/png');
}