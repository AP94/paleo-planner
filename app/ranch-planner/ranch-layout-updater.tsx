import { nanoid } from "nanoid";

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
                    <div className="w-3/5 h-3/5 rounded-full"
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
                    <div className="w-3/4 h-3/5 rounded-lg"
                        style={objectStyle}></div>
                );
                break;
            case (TileObject.FruitTree):
                objectElement = (
                    <div className="w-full h-full rounded-full"
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
    const padding = 50;
    const tileSize = 22;
    const tileBorderWidth = 1;

    const ranchWidth = 117;
    const ranchHeight = 73;

    const width = padding * 2 + ranchWidth * tileSize + (ranchWidth - 1) * tileBorderWidth * 2
    const height = padding * 2 + ranchHeight * tileSize + (ranchHeight - 1) * tileBorderWidth * 2

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.id = nanoid();
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (context) {
        const backgroundColor = "#FEF3C7";
        // Fill padding
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, padding);
        context.fillRect(0, 0, padding, height);
        context.fillRect(0, height - padding, width, padding);
        context.fillRect(width - padding, 0, padding, height);

        // Fill tiles
        for (let col = 0; col < ranchWidth; col++) {
            for (let row = 0; row < ranchHeight; row++) {
                const tile = layout[row][col];
                const tileOriginX = padding + col * (tileSize + tileBorderWidth*2);
                const tileOriginY = padding + row * (tileSize + tileBorderWidth*2);
                
                context.fillStyle = gridLineColor;
                context.fillRect(tileOriginX, tileOriginY, tileSize + tileBorderWidth*2, tileSize + tileBorderWidth*2);

                if (tile.type === TileType.Background) {
                    context.fillStyle = backgroundColor;
                    context.fillRect(tileOriginX, tileOriginY, tileSize + tileBorderWidth*2, tileSize + tileBorderWidth*2);
                }
                else if (tile.type === TileType.Border) {
                    context.fillStyle = getTileColor(tile.type);
                    context.fillRect(tileOriginX, tileOriginY, tileSize + tileBorderWidth*2, tileSize + tileBorderWidth*2);
                }
                else {
                    context.fillStyle = getTileColor(tile.type);
                    context.fillRect(tileOriginX + 1, tileOriginY + 1, tileSize, tileSize);
                }

                // Fill objects, if they exist
                const object = tile.object;

                if (object) {
                    const objectColor = getObjectColor(object) || "#000";
                    const objectBorderColor = getBorderColor(object) || "#000";

                    if (object === TileObject.Water) {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 2;
                        let y = tileOriginY + 1;
                        context.fillRect(x, y, tileSize - 2, tileSize);
                        x = tileOriginX + 1;
                        y = tileOriginY + 2;
                        context.fillRect(x, y, tileSize, tileSize - 2);
                    }
                    if (object === TileObject.Bush) {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 9;
                        let y = tileOriginY + 7;
                        context.fillRect(x, y, 6, 10);
                        x = tileOriginX + 6;
                        y = tileOriginY + 10;
                        context.fillRect(x, y, 12, 4);
                        x = tileOriginX + 7;
                        y = tileOriginY + 8;
                        context.fillRect(x, y, 10, 8);

                        context.fillStyle = objectBorderColor;
                        x = tileOriginX + 8;
                        y = tileOriginY + 5;
                        context.fillRect(x, y, 8, 2);
                        y = tileOriginY + 17;
                        context.fillRect(x, y, 8, 2);
                        x = tileOriginX + 4;
                        y = tileOriginY + 9;
                        context.fillRect(x, y, 2, 6);
                        x = tileOriginX + 18;
                        context.fillRect(x, y, 2, 6);
                        x = tileOriginX + 6;
                        y = tileOriginY + 6;
                        context.fillRect(x, y, 3, 2);
                        x = tileOriginX + 15;
                        context.fillRect(x, y, 3, 2);
                        y = tileOriginY + 16;
                        context.fillRect(x, y, 3, 2);
                        x = tileOriginX + 6;
                        context.fillRect(x, y, 3, 2);
                        x = tileOriginX + 5;
                        y = tileOriginY + 7;
                        context.fillRect(x, y, 2, 3);
                        x = tileOriginX + 17;
                        context.fillRect(x, y, 2, 3);
                        y = tileOriginY + 14;
                        context.fillRect(x, y, 2, 3);
                        x = tileOriginX + 5;
                        context.fillRect(x, y, 2, 3);
                    }
                    if (object === TileObject.Tree ||
                        object === TileObject.FruitTree) {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 6;
                        let y = tileOriginY + 2;
                        context.fillRect(x, y, 12, 20);
                        x = tileOriginX + 2;
                        y = tileOriginY + 6;
                        context.fillRect(x, y, 20, 12);
                        x = tileOriginX + 4;
                        y = tileOriginY + 4;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 18;
                        context.fillRect(x, y, 2, 2);
                        y = tileOriginY + 18;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 4;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 8;
                        y = tileOriginY + 1;
                        context.fillRect(x, y, 8, 1);
                        y = tileOriginY + 22;
                        context.fillRect(x, y, 8, 1);
                        x = tileOriginX + 1;
                        y = tileOriginY + 8;
                        context.fillRect(x, y, 1, 8);
                        x = tileOriginX + 22;
                        context.fillRect(x, y, 1, 8);
                        x = tileOriginX + 5;
                        y = tileOriginY + 3;
                        context.fillRect(x, y, 14, 1);
                        y = tileOriginY + 20;
                        context.fillRect(x, y, 14, 1);
                        x = tileOriginX + 3;
                        y = tileOriginY + 5;
                        context.fillRect(x, y, 1, 14);
                        x = tileOriginX + 20;
                        context.fillRect(x, y, 1, 14);

                        if (object === TileObject.FruitTree) {
                            context.fillStyle = objectBorderColor;
                            x = tileOriginX + 8;
                            y = tileOriginY + 1;
                            context.fillRect(x, y, 8, 2);
                            y = tileOriginY + 21;
                            context.fillRect(x, y, 8, 2);
                            x = tileOriginX + 1;
                            y = tileOriginY + 8;
                            context.fillRect(x, y, 2, 8);
                            x = tileOriginX + 21;
                            context.fillRect(x, y, 2, 8);
                            x = tileOriginX + 6;
                            y = tileOriginY + 2;
                            context.fillRect(x, y, 3, 2);
                            x = tileOriginX + 15;
                            context.fillRect(x, y, 3, 2);
                            y = tileOriginY + 20;
                            context.fillRect(x, y, 3, 2);
                            x = tileOriginX + 6;
                            context.fillRect(x, y, 3, 2);
                            x = tileOriginX + 2;
                            y = tileOriginY + 6;
                            context.fillRect(x, y, 2, 3);
                            x = tileOriginX + 20;
                            context.fillRect(x, y, 2, 3);
                            y = tileOriginY + 15;
                            context.fillRect(x, y, 2, 3);
                            x = tileOriginX + 2;
                            context.fillRect(x, y, 2, 3);
                            x = tileOriginX + 3;
                            y = tileOriginY + 5;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 3;
                            context.fillRect(x, y, 2, 2);
                            y = tileOriginY + 17;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 3;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 5;
                            y = tileOriginY + 3;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 17;
                            context.fillRect(x, y, 2, 2);
                            y = tileOriginY + 19;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 5;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 4;
                            y = tileOriginY + 4;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 18;
                            context.fillRect(x, y, 2, 2);
                            y = tileOriginY + 18;
                            context.fillRect(x, y, 2, 2);
                            x = tileOriginX + 4;
                            context.fillRect(x, y, 2, 2);
                        }
                    }
                    if (object === TileObject.CookingPot ||
                        object === TileObject.TenderPot ||
                        object === TileObject.Dreamstone ||
                        object === TileObject.Fence)
                    {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 8;
                        let y = tileOriginY + 6;
                        context.fillRect(x, y, 8, 12);
                        x = tileOriginX + 6;
                        y = tileOriginY + 8;
                        context.fillRect(x, y, 12, 8);
                        x = tileOriginX + 5;
                        y = tileOriginY + 10;
                        context.fillRect(x, y, 1, 4);
                        x = tileOriginX + 18;
                        context.fillRect(x, y, 1, 4);
                        x = tileOriginX + 10;
                        y = tileOriginY + 5;
                        context.fillRect(x, y, 4, 1);
                        y = tileOriginY + 18;
                        context.fillRect(x, y, 4, 1);
                        x = tileOriginX + 7;
                        y = tileOriginY + 7;
                        context.fillRect(x, y, 1, 1);
                        x = tileOriginX + 16;
                        context.fillRect(x, y, 1, 1);
                        y = tileOriginY + 16;
                        context.fillRect(x, y, 1, 1);
                        x = tileOriginX + 7;
                        context.fillRect(x, y, 1, 1);

                        if (object !== TileObject.Fence)
                        {
                            context.fillStyle = objectBorderColor;
                            x = tileOriginX + 3;
                            y = tileOriginY + 9;
                            context.fillRect(x, y, 2, 6);
                            x = tileOriginX + 19;
                            context.fillRect(x, y, 2, 6);
                            x = tileOriginX + 9;
                            y = tileOriginY + 3;
                            context.fillRect(x, y, 6, 2);
                            y = tileOriginY + 19;
                            context.fillRect(x, y, 6, 2);
                            x = tileOriginX + 4;
                            y = tileOriginY + 7;
                            context.fillRect(x, y, 2, 3);
                            x = tileOriginX + 18;
                            context.fillRect(x, y, 2, 3);
                            y = tileOriginY + 14;
                            context.fillRect(x, y, 2, 3);
                            x = tileOriginX + 4;
                            context.fillRect(x, y, 2, 3);
                            x = tileOriginX + 7;
                            y = tileOriginY + 4;
                            context.fillRect(x, y, 3, 2);
                            x = tileOriginX + 14;
                            context.fillRect(x, y, 3, 2);
                            y = tileOriginY + 18;
                            context.fillRect(x, y, 3, 2);
                            x = tileOriginX + 7;
                            context.fillRect(x, y, 3, 2);
                            x = tileOriginX + 5;
                            y = tileOriginY + 6;
                            context.fillRect(x, y, 3, 1);
                            x = tileOriginX + 16;
                            context.fillRect(x, y, 3, 1);
                            y = tileOriginY + 17;
                            context.fillRect(x, y, 3, 1);
                            x = tileOriginX + 5;
                            context.fillRect(x, y, 3, 1);
                            x = tileOriginX + 6;
                            y = tileOriginY + 5;
                            context.fillRect(x, y, 1, 3);
                            x = tileOriginX + 17;
                            context.fillRect(x, y, 1, 3);
                            y = tileOriginY + 16;
                            context.fillRect(x, y, 1, 3);
                            x = tileOriginX + 6;
                            context.fillRect(x, y, 1, 3);
                        }
                    }
                    if (object === TileObject.Gate) {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 5;
                        let y = tileOriginY + 5;
                        context.fillRect(x, y, 14, 14);
                        x = tileOriginX + 6;
                        y = tileOriginY + 4;
                        context.fillRect(x, y, 12, 1);
                        y = tileOriginY + 19;
                        context.fillRect(x, y, 12, 1);
                        x = tileOriginX + 4;
                        y = tileOriginY + 6;
                        context.fillRect(x, y, 1, 12);
                        x = tileOriginX + 19;
                        context.fillRect(x, y, 1, 12);

                    }
                    if (object === TileObject.Composter) {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 5;
                        let y = tileOriginY + 5;
                        context.fillRect(x, y, 14, 14);
                        context.fillStyle = objectBorderColor;
                        x = tileOriginX + 4;
                        y = tileOriginY + 3;
                        context.fillRect(x, y, 16, 2);
                        y = tileOriginY + 19;
                        context.fillRect(x, y, 16, 2);
                        x = tileOriginX + 3;
                        y = tileOriginY + 4;
                        context.fillRect(x, y, 2, 16);
                        x = tileOriginX + 19;
                        context.fillRect(x, y, 2, 16);
                    }
                    if (object === TileObject.Chest ||
                        object === TileObject.FeedingTrough) {
                            context.fillStyle = objectColor;
                            let x = tileOriginX + 3;
                            let y = tileOriginY + 5;
                            context.fillRect(x, y, 18, 14);
                            context.fillStyle = objectBorderColor;

                            if (object === TileObject.Chest) {
                                x = tileOriginX + 3;
                                y = tileOriginY + 3;
                                context.fillRect(x, y, 18, 2);
                                y = tileOriginY + 19;
                                context.fillRect(x, y, 18, 2);
                                x = tileOriginX + 1;
                                y = tileOriginY + 5;
                                context.fillRect(x, y, 2, 14);
                                x = tileOriginX + 21;
                                context.fillRect(x, y, 2, 14);
                                x = tileOriginX + 2;
                                y = tileOriginY + 4;
                                context.fillRect(x, y, 2, 2);
                                x = tileOriginX + 20;
                                context.fillRect(x, y, 2, 2);
                                y = tileOriginY + 18;
                                context.fillRect(x, y, 2, 2);
                                x = tileOriginX + 2;
                                context.fillRect(x, y, 2, 2);
                            } else {
                                x = tileOriginX + 2;
                                y = tileOriginY + 3;
                                context.fillRect(x, y, 20, 2);
                                y = tileOriginY + 19;
                                context.fillRect(x, y, 20, 2);
                                x = tileOriginX + 1;
                                y = tileOriginY + 4;
                                context.fillRect(x, y, 2, 16);
                                x = tileOriginX + 21;
                                context.fillRect(x, y, 2, 16);
                            }
                    }
                    if (object === TileObject.Decoration) {
                        context.fillStyle = objectColor;
                        let x = tileOriginX + 3;
                        let y = tileOriginY + 3;
                        context.fillRect(x, y, 18, 18);

                        context.fillStyle = objectBorderColor;
                        x = tileOriginX + 4;
                        y = tileOriginY + 1;
                        context.fillRect(x, y, 16, 2);
                        y = tileOriginY + 21;
                        context.fillRect(x, y, 16, 2);
                        x = tileOriginX + 1;
                        y = tileOriginY + 4;
                        context.fillRect(x, y, 2, 16);
                        x = tileOriginX + 21;
                        context.fillRect(x, y, 2, 16);
                        x = tileOriginX + 2;
                        y = tileOriginY + 3;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 20;
                        context.fillRect(x, y, 2, 2);
                        y = tileOriginY + 19;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 2;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 3;
                        y = tileOriginY + 2;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 19;
                        context.fillRect(x, y, 2, 2);
                        y = tileOriginY + 20;
                        context.fillRect(x, y, 2, 2);
                        x = tileOriginX + 3;
                        context.fillRect(x, y, 2, 2);
                    }
                }
            }
        }
    }

    return canvas;
}