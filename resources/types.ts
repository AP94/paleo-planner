export interface Dino {
    id: string;
    name: string;
    species: DinoSpecies;
}

export interface DinoSpecies {
    name: string;
    image: string;
    size: Size;
    social: Social;
    diet: Diet;
    biome: Biome;
    flavor: Flavor;
    farmSkill: FarmSkill;
    wildSkill: WildSkill;
}

export interface Pen {
    id: string;
    biome: Biome;
    minSize: number;
    foodType: FoodType;
    foodPerDay: number;
    dinos: Dino[];
}

export enum Social {
    Loner = "Loner",
    Pack = "Pack",
    Herd = "Herd"
}

export enum WildSkill {
    Sprinter = "Sprinter",
    Smasher = "Smasher",
    Stomper = "Stomper",
    Slasher = "Slasher",
    Discoverer = "Discoverer"
}

export enum FarmSkill {
    Clearer = "Clearer",
    Tiller = "Tiller",
    Waterer = "Waterer",
    GroundHarvester = "GroundHarvester",
    Tender = "Tender"
}

export enum Size {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

export enum Flavor {
    Crunchy = "Crunchy",
    Earthy = "Earthy",
    Juicy = "Juicy",
    Fragrant = "Fragrant",
    Spicy = "Spicy"
}

export enum Diet {
    Carnivore = "Carnivore",
    Omnivore = "Omnivore",
    Herbivore = "Herbivore"
}

export enum FoodType {
    Plant = "Herbivore",
    Meat = "Carnivore"
}

export enum Biome {
    Farm = "Farm",
    Valley = "Valley",
    Forest = "Forest",
    Desert = "Desert"
}