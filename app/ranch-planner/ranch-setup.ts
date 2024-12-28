import { Tile, TileType, getTile, setTileTypeRange, setTileType, setTileObject, TileObject, Direction, Line, Position } from "./ranch-layout-updater";

const ranchWidth = 117;
const ranchHeight = 73;

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

export const internalFarmPoint: Position = { x: 50, y: 25 }

export const generateLayout = (): Tile[][] => {
    let layout: Tile[][] = [];

    // Initialize with background tiles
    for (let i = 0; i < ranchHeight; i++) {
        layout[i] = [];
        for (let j = 0; j < ranchWidth; j++) {
            layout[i].push({ type: TileType.Background, object: TileObject.None });
        }
    }

    // Set border
    for (let i = 0; i < border.length; i++) {
        const borderLine = border[i];
        if (borderLine.direction === Direction.Horizontal) {
            for (let col = borderLine.origin.x; col < borderLine.origin.x + borderLine.length; col++) {
                layout[borderLine.origin.y][col].type = TileType.Border;
            }
        } else {
            for (let row = borderLine.origin.y; row < borderLine.origin.y + borderLine.length; row++) {
                layout[row][borderLine.origin.x].type = TileType.Border;
            }
        }
    }

    // Fill farm tiles
    // Iterate over each row, ignoring the outermost border as those tiles will always be either background or border
    for (let row = 1; row < ranchHeight - 1; row++) {
        // The top left is background, so start the row scan with this
        let farmTile = false;
        let cornerDirection = null;
        for (let col = 0; col < ranchWidth - 1; col++) {
            const currentTileType = getTile(layout, row, col).type;
            const rightTileType = getTile(layout, row, col+1).type;
            const topTileType = getTile(layout, row-1, col).type;
            const bottomTileType = getTile(layout, row+1, col).type;
            const leftTileType = col > 0 ? getTile(layout, row, col-1).type : null;
            // At each tile, if the tile is a border tile:
            if (currentTileType === TileType.Border) {
                // If the next tile is not a border tile, we're at a vertical line, so flip the fill
                if (rightTileType !== TileType.Border && 
                    (leftTileType && leftTileType !== TileType.Border)) {
                    farmTile = !farmTile;
                } else {
                    // If the next tile is a border tile, we're on a horizontal line
                    // Check if we are entering the line
                    if (!leftTileType || leftTileType !== TileType.Border) {
                        // If so, track the direction the corner is facing
                        if (topTileType === TileType.Border) {
                            cornerDirection = 1;
                        }
                        else {
                            cornerDirection = -1;
                        }
                    }
                    // Check if we are exiting the line
                    if (rightTileType !== TileType.Border) {
                        // If so, check the direction the corner is facing
                        // If the direction changes, flip the fill
                        if (topTileType === TileType.Border && cornerDirection === -1 ||
                            bottomTileType === TileType.Border && cornerDirection === 1) {
                            farmTile = !farmTile;
                            cornerDirection = null;
                        }
                    }
                }
            } else {
                if (farmTile) {
                    layout[row][col].type = TileType.Farm;
                }
            }
        }
    }

    // Set house/entrance tiles
    layout = setTileTypeRange(layout, houseArea[0], houseArea[1], TileType.Border);

    for (let i = 0; i < unplaceableLocations.length; i++) {
        layout = setTileType(layout, unplaceableLocations[i], TileType.Unplaceable);
    }
    
    // Set trees
    for (let i = 0; i < treeLocations.length; i++) {
        layout = setTileObject(layout, treeLocations[i], TileObject.Tree);
    }

    return layout;
}