import { Biome, Dino, DinoSpecies, FoodType, Pen } from "./types";

export interface DinoListData {
    dinos: Dino[];
    selectedDino: Dino|null;
    onDinoClicked: (dinoID: string) => void;
    onRemoveDinoClicked: (dino: Dino) => void;
    onAddDinoClicked: () => void;
    onMoveToNewPenClicked: () => void;
    updateDinoName: (dinoID: string, name: string) => void;
}

export interface DreamstoneCounterData {
    hidden: boolean;
    largeDSCount: number;
    smallDSCount: number;
    convertSmallDSToLarge: () => void;
    convertLargeDSToSmall: () => void;
}

export interface PenListData {
    pens: Pen[];
    onPenClicked: (penID: string) => void;
    setPenBiome: (penID: string, biome: Biome) => void;
    setPenFoodType: (penID: string, foodType: FoodType) => void;
    onRemovePenClicked: (pen: Pen) => void;
    onRemoveDinoClicked: (penID: string, dino: Dino) => void;
    updatePenDinoName: (penID: string, dinoID: string, name: string) => void;
}

export interface SpeciesSelectData {
    hidden: boolean;
    onSpeciesClicked: (species: DinoSpecies) => void;
    onCloseSpeciesSelect: () => void;
}

export interface CellData {
    columnIndex: number,
    rowIndex: number,
    style: any
}