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
    Eraser = "Eraser",
    Fence = "Fence",
    Gate = "Gate",
    Farm = "Farm",
    Valley = "Valley",
    Forest = "Forest",
    Desert = "Desert",
    DirtPath = "Dirt Path",
    StonePath = "Stone Path",
    CeramicPath = "Ceramic Path",
    Crop = "Crop",
    TenderPot = "Tender Pot",
    Bush = "Bush",
    FruitTree = "Fruit Tree",
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
            setting: ToolbarSetting.Eraser,
            label: "Eraser",
            iconURL: "svg-repo/eraser.svg"
            }
        ],
        label: "Eraser"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.Fence,
                label: "Fence",
                iconURL: "images/toolbar-icons/Fence.png"
            },
            {
                setting: ToolbarSetting.Gate,
                label: "Gate",
                iconURL: "images/toolbar-icons/Gate.png"
            }
        ],
        label: "Fencing"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.Valley,
                label: "Valley",
                iconURL: "images/toolbar-icons/Valley-Icon.png"
            },
            {
                setting: ToolbarSetting.Forest,
                label: "Forest",
                iconURL: "images/toolbar-icons/Forest-Icon.png"
            },
            {
                setting: ToolbarSetting.Desert,
                label: "Desert",
                iconURL: "images/toolbar-icons/Desert-Icon.png"
            },
        ],
        label: "Ground Tile"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.Crop,
                label: "Crop",
                iconURL: "images/toolbar-icons/Crops.png"
            },
            {
                setting: ToolbarSetting.TenderPot,
                label: "Tender Pot",
                iconURL: "images/toolbar-icons/Pot.png"
            },
            {
                setting: ToolbarSetting.Bush,
                label: "Bush",
                iconURL: "images/toolbar-icons/Bush.png"
            },
            {
                setting: ToolbarSetting.FruitTree,
                label: "Fruit Tree",
                iconURL: "images/toolbar-icons/FruitTree.png"
            }
        ],
        label: "Farming"
    },
    {
        buttons: [
            {
                setting: ToolbarSetting.DirtPath,
                label: "Dirt Path",
                iconURL: "images/toolbar-icons/Dirt-Path.png"
            },
            {
                setting: ToolbarSetting.StonePath,
                label: "Stone Path",
                iconURL: "images/toolbar-icons/Stone-Path.png"
            },
            {
                setting: ToolbarSetting.CeramicPath,
                label: "Ceramic Path",
                iconURL: "images/toolbar-icons/Ceramic-Path.png"
            },
        ],
        label: "Paths"
    },
    // Trees, fruit trees, bushes, tender pots, generic object
];
