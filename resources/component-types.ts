import { DinoSpecies } from "./types";

export interface SpeciesSelectData {
    onSpeciesClicked: (species: DinoSpecies) => void;
    onCloseSpeciesSelect: () => void;
}