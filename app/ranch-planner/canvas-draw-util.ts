import { getBorderColor, getObjectColor, getTileColor, gridLineColor, Position, ranchHeight, ranchWidth, Tile, TileObject, TileType } from "./ranch-constants";

import { nanoid } from "nanoid";
import { standardLayout } from "./ranch-setup";

export const canvasToLayoutPosition = (canvasX: number, canvasY: number, canvasWidth: number, canvasHeight: number): Position => {
    const tileWidthInPixels = canvasWidth/ranchWidth;
    const tileHeightInPixels = canvasHeight/ranchHeight;

    const layoutX = Math.floor(canvasX/tileWidthInPixels);
    const layoutY = Math.floor(canvasY/tileHeightInPixels);

    return { x: layoutX, y: layoutY };
}

export const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export const drawBackground = (canvas: HTMLCanvasElement) => {
    const tileSize = 44;
    const tileBorderWidth = 2;

    const width = ranchWidth * tileSize + (ranchWidth - 1) * tileBorderWidth * 2
    const height = ranchHeight * tileSize + (ranchHeight - 1) * tileBorderWidth * 2

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (context) {
        // Fill tiles
        for (let col = 0; col < ranchWidth; col++) {
            for (let row = 0; row < ranchHeight; row++) {
                const tile = standardLayout[row][col];
                const tileOriginX = col * (tileSize + tileBorderWidth*2);
                const tileOriginY = row * (tileSize + tileBorderWidth*2);
                
                context.fillStyle = gridLineColor;
                context.fillRect(tileOriginX, tileOriginY, tileSize + tileBorderWidth*2, tileSize + tileBorderWidth*2);
                context.fillStyle = getTileColor(tile.type);

                if (tile.type === TileType.Background ||
                    tile.type === TileType.Border) {
                    context.fillRect(tileOriginX, tileOriginY, tileSize + tileBorderWidth*2, tileSize + tileBorderWidth*2);
                }
                else {
                    context.fillRect(tileOriginX + tileBorderWidth, tileOriginY + tileBorderWidth, tileSize, tileSize);
                }
            }
        }
    }

    return context;
}

export const drawLayout = (canvas: HTMLCanvasElement, layout: Tile[][], resetCanvas: boolean = true) => {
    const tileSize = 44;
    const tileBorderWidth = 2;

    const width = ranchWidth * tileSize + (ranchWidth - 1) * tileBorderWidth * 2
    const height = ranchHeight * tileSize + (ranchHeight - 1) * tileBorderWidth * 2

    if (resetCanvas) {
        canvas.width = width;
        canvas.height = height;
    }

    const context = canvas.getContext('2d');
    if (context) {
        // Fill tiles
        if (resetCanvas) {
            context.clearRect(0, 0, width, height);
        }
        for (let col = 0; col < ranchWidth; col++) {
            for (let row = 0; row < ranchHeight; row++) {
                const tile = layout[row][col];
                const tileOriginX = col * (tileSize + tileBorderWidth*2);
                const tileOriginY = row * (tileSize + tileBorderWidth*2);
                
                context.fillStyle = getTileColor(tile.type);
                if (tile.type !== TileType.Background &&
                    tile.type !== TileType.Border &&
                    tile.type !== TileType.Unplaceable &&
                    tile.type !== TileType.Ranch) {
                        context.fillRect(tileOriginX + tileBorderWidth, tileOriginY + tileBorderWidth, tileSize, tileSize);
                }

                // Fill objects, if they exist
                const object = tile.object;

                if (object) {
                    const centralPointX = tileOriginX + 24;
                    const centralPointY = tileOriginY + 24;

                    const objectColor = getObjectColor(object) || "#000";
                    const objectBorderColor = getBorderColor(object) || "#000";
                    context.fillStyle = objectColor;

                    if (object === TileObject.Water) {
                        context.beginPath();
                        context.roundRect(tileOriginX + 2, tileOriginY + 2, 44, 44, 4);
                        context.fill();
                    }
                    if (object === TileObject.Tree ||
                        object === TileObject.FruitTree) {
                        const radius = 22;
                        context.beginPath();
                        context.arc(centralPointX, centralPointY, radius, 0, 2 * Math.PI);
                        context.fill();
                        
                        if (object === TileObject.FruitTree) {
                            context.strokeStyle = objectBorderColor;
                            context.beginPath();
                            context.arc(centralPointX, centralPointY, radius - 2, 0, 2 * Math.PI);
                            context.lineWidth = 4;
                            context.stroke();
                        }
                    }
                    if (object === TileObject.Bush) {
                        const radius = 10;
                        const offset = 4;
                        const borderThickness = 4;
                        context.beginPath();
                        context.arc(centralPointX - offset, centralPointY, radius, 0.5 * Math.PI, 1.5 * Math.PI);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.beginPath();
                        context.arc(centralPointX - offset, centralPointY, radius, 0.5 * Math.PI, 1.5 * Math.PI);
                        context.lineWidth = borderThickness;
                        context.stroke();
                        
                        context.beginPath();
                        context.arc(centralPointX + offset, centralPointY, radius, 1.5 * Math.PI, 0.5 * Math.PI);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.beginPath();
                        context.arc(centralPointX + offset, centralPointY, radius, 1.5 * Math.PI, 0.5 * Math.PI);
                        context.lineWidth = borderThickness;
                        context.stroke();

                        context.fillStyle = objectBorderColor;
                        context.fillRect(centralPointX - offset, centralPointY - radius - borderThickness/2, offset * 2, radius * 2 + borderThickness);
                        
                        context.fillStyle = objectColor;
                        context.fillRect(centralPointX - offset, centralPointY - radius + borderThickness/2, offset * 2, radius * 2 - borderThickness);
                    }
                    if (object === TileObject.Fence) {
                        const radius = 12;
                        context.beginPath();
                        context.arc(centralPointX, centralPointY, radius, 0, 2 * Math.PI);
                        context.fill();
                    }
                    if (object === TileObject.CookingPot ||
                        object === TileObject.TenderPot ||
                        object === TileObject.Dreamstone)
                    {
                        const radius = 16;
                        context.beginPath();
                        context.arc(centralPointX, centralPointY, radius, 0, 2 * Math.PI);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.lineWidth = 4;
                        context.stroke();
                    }
                    if (object === TileObject.Gate) {
                        context.beginPath();
                        context.roundRect(tileOriginX + 7, tileOriginY + 7, 34, 34, 6);
                        context.fill();
                    }
                    if (object === TileObject.Composter) {
                        context.beginPath();
                        context.roundRect(tileOriginX + 8, tileOriginY + 9, 32, 30, 2);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.lineWidth = 4;
                        context.stroke();
                    }
                    if (object === TileObject.FeedingTrough) {
                        context.beginPath();
                        context.roundRect(tileOriginX + 4, tileOriginY + 9, 40, 30, 2);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.lineWidth = 4;
                        context.stroke();
                    }
                    if (object === TileObject.Chest) {
                        context.beginPath();
                        context.roundRect(tileOriginX + 4, tileOriginY + 9, 40, 30, 6);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.lineWidth = 4;
                        context.stroke();
                    }
                    if (object === TileObject.Decoration) {
                        context.beginPath();
                        context.roundRect(tileOriginX + 4, tileOriginY + 4, 40, 40, 10);
                        context.fill();

                        context.strokeStyle = objectBorderColor;
                        context.lineWidth = 4;
                        context.stroke();
                    }
                }
            }
        }
    }

    return context;
}

export const drawSelection = (canvas: HTMLCanvasElement, pos1: Position, pos2: Position) => {
    const tileSize = 44;
    const tileBorderWidth = 2;

    const width = ranchWidth * tileSize + (ranchWidth - 1) * tileBorderWidth * 2
    const height = ranchHeight * tileSize + (ranchHeight - 1) * tileBorderWidth * 2

    canvas.width = width;
    canvas.height = height;

    const left = Math.min(pos1.x, pos2.x) * (tileSize + tileBorderWidth * 2);
    const right = (Math.max(pos1.x, pos2.x) + 1) * (tileSize + tileBorderWidth * 2);
    const top = Math.min(pos1.y, pos2.y) * (tileSize + tileBorderWidth * 2);
    const bottom = (Math.max(pos1.y, pos2.y) + 1) * (tileSize + tileBorderWidth * 2);

    const context = canvas.getContext('2d');
    if (context) {
        context.rect(left, top, right - left, bottom - top);

        context.fillStyle = "rgba(81, 221, 236, 0.5)";
        context.fill();
        context.strokeStyle = "#51ddec";
        context.lineWidth = 4;
        context.stroke();
    }
}

export const createRanchImage = (layout: Tile[][]) => {
    const ranchCanvas: HTMLCanvasElement = document.createElement('canvas');
    const finalCanvas: HTMLCanvasElement = document.createElement('canvas');
    drawBackground(ranchCanvas);
    drawLayout(ranchCanvas, layout, false);

    const padding = 50;

    finalCanvas.id = nanoid();
    const width = padding * 2 + ranchCanvas.width;
    const height = padding * 2 + ranchCanvas.height;
    finalCanvas.width = width;
    finalCanvas.height = height;

    const ranchContext = ranchCanvas.getContext('2d');
    const finalContext = finalCanvas.getContext('2d');

    if (ranchContext && finalContext) {
        const backgroundColor = getTileColor(TileType.Background);
        finalContext.fillStyle = backgroundColor;
        finalContext.fillRect(0, 0, width, height);

        const ranchImageData = ranchContext.getImageData(0, 0, ranchCanvas.width, ranchCanvas.height);

        finalContext.putImageData(ranchImageData, padding, padding);
    }

    return finalCanvas;
}
