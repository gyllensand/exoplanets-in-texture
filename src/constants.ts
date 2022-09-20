export const MOUNTAINS_AMOUNT = [0, 1, 2, 3];
export const MOUNTAIN_TYPES = [1, 2];
export const PARTICLES_AMOUNT = [0, 0, 250, 500];
export const MOONS = [0, 1];
export const CLOUD_TYPES = [0, 1];
export const PYRAMIDS_AMOUNT = [0, 1, 2, 3, 4];
export const TREES_AMOUNT = [5, 10, 10, 20, 30];
export const SUN_ROTATION = [-1, -2];

export enum TEXTURE_TYPES {
  EMPTY = 0,
  DESERT = 1,
  TRACKS = 2,
  STITCH = 3,
  PAVEMENT = 4,
  ICE = 5,
  WINDY_SNOW = 6,
  WATER = 7,
  CHECKERBOARD = 8,
  SAND = 9,
  MOSS = 10,
  COBBLESTONE = 11,
  FOREST = 12,
}

export enum EARTH_TYPES {
  MIXED = 0,
  DRY = 1,
  WET = 2,
  VEGETATIVE = 3,
}

export const EARTHS = [
  ...new Array(6).fill(null).map(() => 0),
  ...new Array(1).fill(null).map(() => 1),
  ...new Array(1).fill(null).map(() => 2),
  ...new Array(1).fill(null).map(() => 3),
];

export const DRY_TEXTURES = [
  ...new Array(1).fill(null).map(() => 1),
  ...new Array(1).fill(null).map(() => 2),
  ...new Array(1).fill(null).map(() => 9),
];

export const WET_TEXTURES = [
  ...new Array(1).fill(null).map(() => 7),
  ...new Array(2).fill(null).map(() => 5),
  ...new Array(2).fill(null).map(() => 6),
];

export const VEGETATIVE_TEXTURES = [
  ...new Array(1).fill(null).map(() => 12),
  ...new Array(1).fill(null).map(() => 10),
  ...new Array(1).fill(null).map(() => 11),
];

export const MIXED_TEXTURES = [
  ...new Array(15).fill(null).map(() => 0),
  ...new Array(3).fill(null).map(() => 1),
  ...new Array(3).fill(null).map(() => 2),
  ...new Array(1).fill(null).map(() => 3),
  ...new Array(3).fill(null).map(() => 4),
  ...new Array(1).fill(null).map(() => 5),
  ...new Array(3).fill(null).map(() => 6),
  ...new Array(1).fill(null).map(() => 7),
  ...new Array(3).fill(null).map(() => 8),
  ...new Array(3).fill(null).map(() => 9),
  ...new Array(3).fill(null).map(() => 10),
  ...new Array(3).fill(null).map(() => 11),
];

export const RESP_TEXTURES = [
  MIXED_TEXTURES,
  DRY_TEXTURES,
  WET_TEXTURES,
  VEGETATIVE_TEXTURES,
];

export const THEME_COLORS = [
  "#e0feff",
  "#FCEEB5",
  "#ffce00",
  "#eb3434",
  "#30f8a0",
  "#3dfe00",
  "#5ca806",
  "lightpink",
  "#f97b9c",
  "#EE786E",
  "#fe7418",
  "lightblue",
  "#00f7fb",
  "#497fff",
  "#005eb8",
  "#344df2",
  "#dc0fc0",
  "#75007e",
  "#aa4807",
  "#800b0b",
];

export const BG_THEMES = [
  ...new Array(10).fill(null).map(() => "#ffffff"),
  "#fff6d1",
  "#d8ffdd",
]

export const LIGHT_THEMES = [
  ...new Array(10).fill(null).map(() => "#ffffff"),
  "#e0feff",
  "#FCEEB5",
  "#ffce00",
];

export const TREE_COLORS = ["green", "green", "#5ca806"];
export const TREE_COLORS2 = [
  "white",
  "#dc0fc0",
  "#75007e",
  "#f97b9c",
  "#EE786E",
];
export const TREE_COLORS3 = ["#fe7418", "#ffce00", "#eb3434"];

export const TREE_THEMES = [TREE_COLORS, TREE_COLORS2, TREE_COLORS3];

export const DRY_COLORS = [
  "#aa4807",
  "#fe7418",
  "#EE786E",
  "#ffce00",
  "#eb3434",
  "#FCEEB5",
  "#dc0fc0",
];

export const WET_COLORS = [
  "#e0feff",
  "#00f7fb",
  "#497fff",
  "#344df2",
  "#005eb8",
  "lightblue",
];

export const VEGETATIVE_COLORS = [
  "green",
  "#5ca806",
  "#3dfe00",
  "#30f8a0",
  "lightpink",
  "#f97b9c",
];

export const RESP_COLORS = [
  THEME_COLORS,
  DRY_COLORS,
  WET_COLORS,
  VEGETATIVE_COLORS,
];
