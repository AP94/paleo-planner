import { Tile, ranchHeight, ranchWidth, TileType, TileObject, Position, border, Direction, houseArea, unplaceableLocations, treeLocations } from "./ranch-constants";
import { getTile, setTileType, setTileObject } from "./ranch-layout-updater";

export const internalFarmPoint: Position = { x: 50, y: 25 };

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
                    layout[row][col].type = TileType.Ranch;
                }
            }
        }
    }

    // Set house/entrance tiles
    layout = setTileType(layout, houseArea[0], houseArea[1], TileType.Border);

    for (let i = 0; i < unplaceableLocations.length; i++) {
        layout = setTileType(layout, unplaceableLocations[i], unplaceableLocations[i], TileType.Unplaceable);
    }
    
    // Set trees
    for (let i = 0; i < treeLocations.length; i++) {
        layout = setTileObject(layout, treeLocations[i], treeLocations[i], TileObject.Tree);
    }

    return layout;
};

export const standardLayout = generateLayout();
