import { Biome, Dino, DinoSpecies, FoodType, Pen } from "./types";

export interface PensListData {
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