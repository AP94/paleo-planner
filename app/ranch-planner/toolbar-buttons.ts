export interface ButtonGroup {
    buttons: ToolbarButton[];
    label: string;
}

export interface ToolbarButton {
    setting: ToolbarSetting;
    label: string;
    iconURL: string;
}

export enum ToolbarSetting {
    None = "None",
    ObjectEraser = "Remove Objects",
    FenceEraser = "Clear Fencing",
    Fence = "Fence",
    Gate = "Gate",
    Ranch = "Ranch",
    Valley = "Valley",
    Forest = "Forest",
    Desert = "Desert",
    Water = "Water Feature",
    DirtPath = "Dirt Path",
    StonePath = "Stone Path",
    CeramicPath = "Ceramic Path",
    Crop = "Crop",
    TenderPot = "Tender Pot",
    Bush = "Bush",
    FruitTree = "Fruit Tree",
    Tree = "Tree",
    Dreamstone = "Dreamstone",
    Chest = "Chest",
    CookingPot = "Cooking Pot",
    FeedingTrough = "Trough",
    Composter = "Composter",
    Decoration = "Decoration"
}

export const toolbarButtonGroups: (ButtonGroup)[] = [
    {
        buttons: [
            {
                setting: ToolbarSetting.None,
                label: "Zoom Out",
                iconURL: "svg-repo/zoom-out.svg"
            },
            {
                setting: ToolbarSetting.None,
                label: "Zoom In",
                iconURL: "svg-repo/zoom-in.svg"
            }
        ],
        label: "Zoom"
    },
    {
        buttons: [
            {
            setting: ToolbarSetting.ObjectEraser,
            label: ToolbarSetting.ObjectEraser,
            iconURL: "svg-repo/eraser.svg"
            }
        ],
        label: "Eraser"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.FenceEraser,
                label: ToolbarSetting.FenceEraser,
                iconURL: "svg-repo/cross.svg"
            },
            {
                setting: ToolbarSetting.Fence,
                label: ToolbarSetting.Fence,
                iconURL: "images/toolbar-icons/Fence.png"
            },
            {
                setting: ToolbarSetting.Gate,
                label: ToolbarSetting.Gate,
                iconURL: "images/toolbar-icons/Gate.png"
            }
        ],
        label: "Fencing"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.Ranch,
                label: ToolbarSetting.Ranch,
                iconURL: "images/toolbar-icons/Farm-Icon.png"
            },
            {
                setting: ToolbarSetting.Valley,
                label: ToolbarSetting.Valley,
                iconURL: "images/toolbar-icons/Valley-Icon.png"
            },
            {
                setting: ToolbarSetting.Forest,
                label: ToolbarSetting.Forest,
                iconURL: "images/toolbar-icons/Forest-Icon.png"
            },
            {
                setting: ToolbarSetting.Desert,
                label: ToolbarSetting.Desert,
                iconURL: "images/toolbar-icons/Desert-Icon.png"
            }
        ],
        label: "Ground Tile"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.DirtPath,
                label: ToolbarSetting.DirtPath,
                iconURL: "images/toolbar-icons/Dirt-Path.png"
            },
            {
                setting: ToolbarSetting.StonePath,
                label: ToolbarSetting.StonePath,
                iconURL: "images/toolbar-icons/Stone-Path.png"
            },
            {
                setting: ToolbarSetting.CeramicPath,
                label: ToolbarSetting.CeramicPath,
                iconURL: "images/toolbar-icons/Ceramic-Path.png"
            }
        ],
        label: "Paths"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.Crop,
                label: ToolbarSetting.Crop,
                iconURL: "images/toolbar-icons/Crops.png"
            },
            {
                setting: ToolbarSetting.TenderPot,
                label: ToolbarSetting.TenderPot,
                iconURL: "images/toolbar-icons/Pot.png"
            },
            {
                setting: ToolbarSetting.Composter,
                label: ToolbarSetting.Composter,
                iconURL: "images/toolbar-icons/CompostBin.png"
            },
            {
                setting: ToolbarSetting.Water,
                label: ToolbarSetting.Water,
                iconURL: "images/toolbar-icons/Pond.png"
            },
            {
                setting: ToolbarSetting.Bush,
                label: ToolbarSetting.Bush,
                iconURL: "images/toolbar-icons/Bush.png"
            },
            {
                setting: ToolbarSetting.FruitTree,
                label: ToolbarSetting.FruitTree,
                iconURL: "images/toolbar-icons/FruitTree.png"
            },
            {
                setting: ToolbarSetting.Tree,
                label: ToolbarSetting.Tree,
                iconURL: "images/toolbar-icons/Tree.png"
            }
        ],
        label: "Farming"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.Dreamstone,
                label: ToolbarSetting.Dreamstone,
                iconURL: "images/Dreamstone.png"
            },
            {
                setting: ToolbarSetting.Chest,
                label: ToolbarSetting.Chest,
                iconURL: "images/toolbar-icons/Chest.png"
            },
            {
                setting: ToolbarSetting.CookingPot,
                label: ToolbarSetting.CookingPot,
                iconURL: "images/toolbar-icons/CookingPot.png"
            },
            {
                setting: ToolbarSetting.FeedingTrough,
                label: ToolbarSetting.FeedingTrough,
                iconURL: "images/toolbar-icons/Trough.png"
            },
            {
                setting: ToolbarSetting.Decoration,
                label: ToolbarSetting.Decoration,
                iconURL: "images/toolbar-icons/Decoration.png"
            }
        ],
        label: "Objects"
    },
];
