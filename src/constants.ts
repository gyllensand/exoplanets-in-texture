export const MOUNTAINS = [1, 2, 3, 4];

export enum TEXTURE_TYPES {
  EMPTY = 0,
  DESERT = 1,
  TRACKS = 2,
  STITCH = 3,
  PAVEMENT = 4
}

export const TEXTURES = [
  ...new Array(10).fill(null).map(() => 0),
  ...new Array(2).fill(null).map(() => 1),
  ...new Array(2).fill(null).map(() => 2),
  ...new Array(1).fill(null).map(() => 3),
  ...new Array(2).fill(null).map(() => 4),
];

export const BG_DARK = ["#000000", "#0b0b4b", "#1b3342", "#1b4225", "#632331"];
export const BG_LIGHT = ["#497fff", "#30f8a0", "#f97b9c", "#fe7418", "#75007e"];

export const BG_COLORS = [BG_DARK, BG_DARK, BG_LIGHT];

export const COLORS_LIGHT = [
  "#ffffff",
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
];

export const COLORS_DARK = [
  "#FCEEB5",
  "#ffce00",
  "#eb3434",
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
  "#0b0b4b",
];

export const COLORS = [COLORS_LIGHT, COLORS_DARK];

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

export const SUMMER_TREES = ["green", "#30f8a0", "#5ca806"];
