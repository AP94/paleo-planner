export const ranchWidth = 117;
export const ranchHeight = 73;

export enum TileType {
    Background,
    Border,
    Unplaceable,
    Ranch,
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
            return "#FEF3C7";
        case (TileType.Border):
            return "#262626";
        case (TileType.Unplaceable):
            return "#797878";
        case (TileType.Ranch):
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

export const border: Line[] = [
    {
        origin: { x: 39, y: 0 },
        length: 8,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 39, y: 0 },
        length: 15,
        direction: Direction.Vertical
    },
    {
        origin: { x: 46, y: 0 },
        length: 4,
        direction: Direction.Vertical
    },
    {
        origin: { x: 46, y: 3 },
        length: 24,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 69, y: 3 },
        length: 5,
        direction: Direction.Vertical
    },
    {
        origin: { x: 69, y: 7 },
        length: 4,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 72, y: 7 },
        length: 8,
        direction: Direction.Vertical
    },
    {
        origin: { x: 72, y: 14 },
        length: 7,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 78, y: 9 },
        length: 6,
        direction: Direction.Vertical
    },
    {
        origin: { x: 78, y: 9 },
        length: 10,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 87, y: 9 },
        length: 4,
        direction: Direction.Vertical
    },
    {
        origin: { x: 87, y: 12 },
        length: 18,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 104, y: 9 },
        length: 4,
        direction: Direction.Vertical
    },
    {
        origin: { x: 104, y: 9 },
        length: 13,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 116, y: 9 },
        length: 10,
        direction: Direction.Vertical
    },
    {
        origin: { x: 111, y: 18 },
        length: 6,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 111, y: 18 },
        length: 21,
        direction: Direction.Vertical
    },
    {
        origin: { x: 106, y: 38 },
        length: 6,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 106, y: 38 },
        length: 5,
        direction: Direction.Vertical
    },
    {
        origin: { x: 98, y: 42 },
        length: 9,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 86, y: 43 },
        length: 13,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 86, y: 43 },
        length: 4,
        direction: Direction.Vertical
    },
    {
        origin: { x: 81, y: 46 },
        length: 6,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 81, y: 22 },
        length: 25,
        direction: Direction.Vertical
    },
    {
        origin: { x: 78, y: 22 },
        length: 4,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 78, y: 20 },
        length: 3,
        direction: Direction.Vertical
    },
    {
        origin: { x: 72, y: 20 },
        length: 7,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 72, y: 20 },
        length: 17,
        direction: Direction.Vertical
    },
    {
        origin: { x: 67, y: 36 },
        length: 6,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 67, y: 36 },
        length: 16,
        direction: Direction.Vertical
    },
    {
        origin: { x: 64, y: 51 },
        length: 4,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 64, y: 51 },
        length: 16,
        direction: Direction.Vertical
    },
    {
        origin: { x: 43, y: 66 },
        length: 22,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 43, y: 66 },
        length: 7,
        direction: Direction.Vertical
    },
    {
        origin: { x: 24, y: 72 },
        length: 20,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 24, y: 50 },
        length: 23,
        direction: Direction.Vertical
    },
    {
        origin: { x: 16, y: 50 },
        length: 9,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 16, y: 45 },
        length: 5,
        direction: Direction.Vertical
    },
    {
        origin: { x: 0, y: 45 },
        length: 17,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 0, y: 23 },
        length: 23,
        direction: Direction.Vertical
    },
    {
        origin: { x: 0, y: 23 },
        length: 9,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 8, y: 15 },
        length: 9,
        direction: Direction.Vertical
    },
    {
        origin: { x: 8, y: 15 },
        length: 28,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 35, y: 15 },
        length: 10,
        direction: Direction.Vertical
    },
    {
        origin: { x: 35, y: 24 },
        length: 9,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 43, y: 14 },
        length: 11,
        direction: Direction.Vertical
    },
    {
        origin: { x: 39, y: 14 },
        length: 5,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 43, y: 29 },
        length: 8,
        direction: Direction.Vertical
    },
    {
        origin: { x: 43, y: 36 },
        length: 13,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 55, y: 36 },
        length: 7,
        direction: Direction.Vertical
    },
    {
        origin: { x: 41, y: 42 },
        length: 15,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 41, y: 42 },
        length: 10,
        direction: Direction.Vertical
    },
    {
        origin: { x: 34, y: 51 },
        length: 8,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 34, y: 51 },
        length: 8,
        direction: Direction.Vertical
    },
    {
        origin: { x: 28, y: 58 },
        length: 6,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 28, y: 50 },
        length: 9,
        direction: Direction.Vertical
    },
    {
        origin: { x: 29, y: 45 },
        length: 6,
        direction: Direction.Vertical
    },
    {
        origin: { x: 29, y: 45 },
        length: 7,
        direction: Direction.Horizontal
    },
    {
        origin: { x: 35, y: 29 },
        length: 17,
        direction: Direction.Vertical
    },
    {
        origin: { x: 35, y: 29 },
        length: 9,
        direction: Direction.Horizontal
    }
];

export const houseArea: Position[] = [{ x: 56, y: 37 }, { x: 61, y: 42 }];

export const unplaceableLocations: Position[] = [
    { x: 59, y: 3 },
    { x: 60, y: 3 },
    { x: 57, y: 34 },
    { x: 58, y: 34 },
    { x: 59, y: 34 },
    { x: 57, y: 35 },
    { x: 58, y: 35 },
    { x: 59, y: 35 },
    { x: 56, y: 36 },
    { x: 57, y: 36 },
    { x: 58, y: 36 },
    { x: 59, y: 36 },
    { x: 60, y: 36 },
    { x: 61, y: 36 },
    { x: 62, y: 36 },
    { x: 62, y: 37 },
    { x: 62, y: 38 },
    { x: 62, y: 39 },
    { x: 62, y: 40 },
    { x: 62, y: 41 },
    { x: 61, y: 42 },
];

export const treeLocations: Position[] = [
    { x: 4, y: 27 },
    { x: 4, y: 42 },
    { x: 12, y: 19 },
    { x: 32, y: 19 },
    { x: 26, y: 33 },
    { x: 27, y: 68 },
    { x: 36, y: 54 },
    { x: 61, y: 64 },
    { x: 87, y: 24 },
    { x: 85, y: 40 },
    { x: 101, y: 40 },
    { x: 108, y: 35 },
    { x: 111, y: 14 },
    { x: 44, y: 4 },
    { x: 41, y: 11 },
    { x: 46, y: 12 },
    { x: 47, y: 16 },
    { x: 54, y: 14 },
    { x: 65, y: 7 },
    { x: 69, y: 11 },
    { x: 69, y: 32 },
    { x: 45, y: 33 },
];
