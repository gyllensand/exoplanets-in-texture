export const MOUNTAINS = [1, 2, 3];
export const CLOUDS = [0, 1];

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
  COBBLESTONE = 11
}

export const TEXTURES = [
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

export const THEME_COLORS = [
  "#e0feff",
  "#FCEEB5",
  "#ffce00",
  "#eb3434",
  "#30f8a0",
  "#A2CCB6",
  "lightpink",
  "#f97b9c",
  "#EE786E",
  "#fe7418",
  "lightblue",
  "#00f7fb",
  "#497fff",
  "#344df2",
  "#dc0fc0",
  "#75007e",
  "#aa4807",
  "#800b0b",
  "#1b4225",
  "#1b3342",
  "#0c0c7a",
];

export const LIGHT_THEMES = [
  ...new Array(40).fill(null).map(() => "#ffffff"),
  "#EE786E",
  "#344df2",
  "#eb3434",
  "#dc0fc0",
];

export const FLASH_LIGHT_COLORS = [
  ...new Array(20).fill(null).map(() => "#ffffff"),
  "#ffce00",
  "#30f8a0",
  "#eb3434",
  "#fe7418",
  "lightpink",
  "#00f7fb",
  "#dc0fc0",
];

export const SUMMER_COLORS = ["green", "green", "#5ca806"];

export const TREE_COLORS = ["green", "green", "#5ca806"];
export const TREE_COLORS2 = [
  "white",
  "#dc0fc0",
  "#75007e",
  "#f97b9c",
  "#EE786E",
];
export const TREE_THEMES = [TREE_COLORS, TREE_COLORS2];

export const EARTH_THEMES = ["dry", "wet", "vegetative"];

export const VEGETATIVE_COLORS = ["green", "#5ca806"];
