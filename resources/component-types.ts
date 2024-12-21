import { Biome, Dino, DinoSpecies, FoodType, Pen } from "./types";

export interface dinoListData {
    dinos: Dino[];
    selectedDino: Dino|null;
    onDinoClicked: (dinoID: string) => void;
    onRemoveDinoClicked: (dino: Dino) => void;
    onAddDinoClicked: () => void;
    onMoveToNewPenClicked: () => void;
}

export interface PenListData {
    pens: Pen[];
    onPenClicked: (penID: string) => void;
    setPenBiome: (penID: string, biome: Biome) => void;
    setPenFoodType: (penID: string, foodType: FoodType) => void;
    onRemovePenClicked: (pen: Pen) => void;
    onRemoveDinoClicked: (penID: string, dino: Dino) => void;
}

export interface SpeciesSelectData {
    onSpeciesClicked: (species: DinoSpecies) => void;
    onCloseSpeciesSelect: () => void;
}