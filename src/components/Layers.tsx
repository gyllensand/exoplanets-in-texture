import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, RefObject, useEffect, useCallback, useMemo } from "react";
import { Mesh, RepeatWrapping, SphereBufferGeometry } from "three";
import { TEXTURE_TYPES } from "../constants";
import { WORLD_SIZE } from "../Scene";

interface Layer {
  color: string;
  index: number;
  texture: number;
}

const NORTH_POLE_END = Math.PI - 2.6;
const SEGMENTS = 64;

const Layers = ({
  earthRef,
  layers,
}: {
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
  layers: Layer[];
}) => {
  const meshRef = useRef<Mesh>();

  const desertTexture = useTexture({
    map: "/textures/desert/Map.jpeg",
    displacementMap: "/textures/desert/DisplacementMap.jpg",
    normalMap: "/textures/desert/NormalMap.jpg",
    aoMap: "/textures/desert/AmbientOcclusionMap.jpg",
  });

  const tracksTexture = useTexture({
    map: "/textures/tracks/Map.jpg",
    displacementMap: "/textures/tracks/DisplacementMap.jpg",
    normalMap: "/textures/tracks/NormalMap.jpg",
    aoMap: "/textures/tracks/AmbientOcclusionMap.jpg",
  });

  const stitchTexture = useTexture({
    map: "/textures/stitch/Map.jpg",
    displacementMap: "/textures/stitch/DisplacementMap.png",
    normalMap: "/textures/stitch/NormalMap.jpg",
    aoMap: "/textures/stitch/AmbientOcclusionMap.jpg",
  });

  const pavementTexture = useTexture({
    map: "/textures/pavement/Map.png",
    displacementMap: "/textures/pavement/DisplacementMap.png",
    normalMap: "/textures/pavement/NormalMap.png",
    aoMap: "/textures/pavement/AmbientOcclusionMap.png",
  });

  const iceTexture = useTexture({
    // map: "/textures/ice/Map.png",
    displacementMap: "/textures/ice/DisplacementMap.png",
    normalMap: "/textures/ice/NormalMap.jpg",
    aoMap: "/textures/ice/AmbientOcclusionMap.jpg",
  });

  const snowTexture = useTexture({
    map: "/textures/snow/Map.png",
    displacementMap: "/textures/snow/DisplacementMap.png",
    normalMap: "/textures/snow/NormalMap.png",
    aoMap: "/textures/snow/AmbientOcclusionMap.jpg",
  });

  const waterTexture = useTexture({
    map: "/textures/water/Map.jpeg",
    displacementMap: "/textures/water/Map.jpeg",
    normalMap: "/textures/water/Map.jpeg",
    aoMap: "/textures/water/AmbientOcclusionMap.jpg",
  });

  const checkerboardTexture = useTexture({
    // map: "/textures/checkerboard/Map.png",
    displacementMap: "/textures/checkerboard/DisplacementMap.png",
    normalMap: "/textures/checkerboard/NormalMap.png",
    aoMap: "/textures/checkerboard/AmbientOcclusionMap.png",
  });

  const sandTexture = useTexture({
    map: "/textures/sand/Map.png",
    displacementMap: "/textures/sand/DisplacementMap.png",
    normalMap: "/textures/sand/NormalMap.png",
    aoMap: "/textures/sand/AmbientOcclusionMap.png",
  });

  const mossTexture = useTexture({
    // map: "/textures/moss/Map.png",
    displacementMap: "/textures/moss/DisplacementMap.png",
    normalMap: "/textures/moss/NormalMap.png",
    aoMap: "/textures/moss/AmbientOcclusionMap.png",
  });

  const cobblestoneTexture = useTexture({
    displacementMap: "/textures/cobblestone/DisplacementMap.png",
    normalMap: "/textures/cobblestone/NormalMap.png",
    aoMap: "/textures/cobblestone/AmbientOcclusionMap.png",
  });

  const forestTexture = useTexture({
    displacementMap: "/textures/forest/DisplacementMap.jpg",
    normalMap: "/textures/forest/NormalMap.jpg",
    aoMap: "/textures/forest/AmbientOcclusionMap.jpg",
  });

  useEffect(() => {
    if (!earthRef?.current || !meshRef?.current) {
      return;
    }
  }, [earthRef]);

  const getLayerArgs = useCallback(
    (index: number): [number, number, number, number] => {
      switch (index) {
        case 1:
          return [
            -Math.PI / 2,
            Math.PI / 2,
            NORTH_POLE_END,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 2:
          return [
            0,
            Math.PI / 2,
            NORTH_POLE_END,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 3:
          return [
            Math.PI / 2,
            Math.PI / 2,
            NORTH_POLE_END,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 4:
          return [
            Math.PI,
            Math.PI / 2,
            NORTH_POLE_END,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 5:
          return [
            -Math.PI / 3,
            Math.PI / 2,
            NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 6:
          return [
            Math.PI / 6,
            Math.PI / 2,
            NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 7:
          return [
            Math.PI / 1.5,
            Math.PI / 2,
            NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 8:
          return [
            Math.PI + Math.PI / 6,
            Math.PI / 2,
            NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 9:
          return [
            -Math.PI / 6,
            Math.PI / 2,
            NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 10:
          return [
            Math.PI / 3,
            Math.PI / 2,
            NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 11:
          return [
            Math.PI / 1.2,
            Math.PI / 2,
            NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];
        case 12:
          return [
            Math.PI + Math.PI / 3,
            Math.PI / 2,
            NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
            (Math.PI - NORTH_POLE_END * 2) / 3,
          ];

        default:
          return [0, Math.PI * 2, 2.6, 1.2];
      }
    },
    []
  );

  const getMaterial = useCallback(
    ({ texture, color }: Layer) => {
      switch (texture) {
        case TEXTURE_TYPES.DESERT:
          Object.keys(desertTexture).forEach((key) => {
            desertTexture[key as keyof typeof desertTexture].wrapS =
              RepeatWrapping;
            desertTexture[key as keyof typeof desertTexture].wrapT =
              RepeatWrapping;
            desertTexture[key as keyof typeof desertTexture].repeat.x = 2;
            desertTexture[key as keyof typeof desertTexture].repeat.y = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.5}
              {...desertTexture}
              displacementScale={0}
            />
          );
        case TEXTURE_TYPES.TRACKS:
          Object.keys(tracksTexture).forEach((key) => {
            tracksTexture[key as keyof typeof tracksTexture].wrapS =
              RepeatWrapping;
            tracksTexture[key as keyof typeof tracksTexture].repeat.x = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.5}
              {...tracksTexture}
              displacementScale={0}
            />
          );
        case TEXTURE_TYPES.STITCH:
          Object.keys(stitchTexture).forEach((key) => {
            stitchTexture[key as keyof typeof stitchTexture].wrapS =
              RepeatWrapping;
            stitchTexture[key as keyof typeof stitchTexture].wrapT =
              RepeatWrapping;
            stitchTexture[key as keyof typeof stitchTexture].repeat.x = 4;
            stitchTexture[key as keyof typeof stitchTexture].repeat.y = 2;
          });

          return (
            <meshPhongMaterial
              color={color}
              shininess={50}
              {...stitchTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.PAVEMENT:
          Object.keys(pavementTexture).forEach((key) => {
            pavementTexture[key as keyof typeof pavementTexture].wrapS =
              RepeatWrapping;
            pavementTexture[key as keyof typeof pavementTexture].wrapT =
              RepeatWrapping;
            pavementTexture[key as keyof typeof pavementTexture].repeat.x = 4;
            pavementTexture[key as keyof typeof pavementTexture].repeat.y = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.5}
              {...pavementTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.ICE:
          Object.keys(iceTexture).forEach((key) => {
            iceTexture[key as keyof typeof iceTexture].wrapS = RepeatWrapping;
            iceTexture[key as keyof typeof iceTexture].wrapT = RepeatWrapping;
            iceTexture[key as keyof typeof iceTexture].repeat.x = 8;
            iceTexture[key as keyof typeof iceTexture].repeat.y = 4;
          });

          return (
            <meshStandardMaterial
              color={color}
              roughness={0.2}
              {...iceTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.WINDY_SNOW:
          Object.keys(snowTexture).forEach((key) => {
            snowTexture[key as keyof typeof snowTexture].wrapS = RepeatWrapping;
            snowTexture[key as keyof typeof snowTexture].wrapT = RepeatWrapping;
            snowTexture[key as keyof typeof snowTexture].repeat.x = 4;
            snowTexture[key as keyof typeof snowTexture].repeat.y = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              roughness={0.6}
              {...snowTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.WATER:
          Object.keys(waterTexture).forEach((key) => {
            waterTexture[key as keyof typeof waterTexture].wrapS =
              RepeatWrapping;
            waterTexture[key as keyof typeof waterTexture].wrapT =
              RepeatWrapping;
            waterTexture[key as keyof typeof waterTexture].repeat.x = 4;
            waterTexture[key as keyof typeof waterTexture].repeat.y = 2;
          });

          return (
            <meshStandardMaterial
              color={"#005eb8"}
              roughness={0.1}
              {...waterTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.CHECKERBOARD:
          Object.keys(checkerboardTexture).forEach((key) => {
            checkerboardTexture[key as keyof typeof checkerboardTexture].wrapS =
              RepeatWrapping;
            checkerboardTexture[key as keyof typeof checkerboardTexture].wrapT =
              RepeatWrapping;
            checkerboardTexture[
              key as keyof typeof checkerboardTexture
            ].repeat.x = 32;
            checkerboardTexture[
              key as keyof typeof checkerboardTexture
            ].repeat.y = 16;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.5}
              {...checkerboardTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.SAND:
          Object.keys(sandTexture).forEach((key) => {
            sandTexture[key as keyof typeof sandTexture].wrapS = RepeatWrapping;
            sandTexture[key as keyof typeof sandTexture].repeat.x = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.5}
              {...sandTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.MOSS:
          Object.keys(mossTexture).forEach((key) => {
            mossTexture[key as keyof typeof mossTexture].wrapS = RepeatWrapping;
            mossTexture[key as keyof typeof mossTexture].repeat.x = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.8}
              {...mossTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.COBBLESTONE:
          Object.keys(cobblestoneTexture).forEach((key) => {
            cobblestoneTexture[key as keyof typeof cobblestoneTexture].wrapS =
              RepeatWrapping;
            cobblestoneTexture[
              key as keyof typeof cobblestoneTexture
            ].repeat.x = 2;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.8}
              {...cobblestoneTexture}
              displacementScale={0}
            />
          );

        case TEXTURE_TYPES.FOREST:
          Object.keys(forestTexture).forEach((key) => {
            forestTexture[key as keyof typeof forestTexture].wrapS =
              RepeatWrapping;
            forestTexture[key as keyof typeof forestTexture].wrapT =
              RepeatWrapping;
            forestTexture[key as keyof typeof forestTexture].repeat.x = 8;
            forestTexture[key as keyof typeof forestTexture].repeat.y = 4;
          });

          return (
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.5}
              {...forestTexture}
              displacementScale={0}
            />
          );

        default:
          return (
            <meshStandardMaterial color={color} transparent opacity={0.5} />
          );
      }
    },
    [
      stitchTexture,
      desertTexture,
      tracksTexture,
      pavementTexture,
      iceTexture,
      snowTexture,
      waterTexture,
      checkerboardTexture,
      sandTexture,
      mossTexture,
      cobblestoneTexture,
      forestTexture,
    ]
  );

  const getLayers = useCallback(() => {
    return layers.map((o, i) => {
      return (
        <group key={i}>
          <mesh
            ref={meshRef}
            receiveShadow
            rotation={[i === 0 ? Math.PI : 0, 0, 0]}
          >
            <sphereBufferGeometry
              args={[
                WORLD_SIZE + 0.01,
                SEGMENTS,
                SEGMENTS,
                ...getLayerArgs(o.index),
              ]}
            />
            {(i === 0 || i === layers.length - 1) &&
            o.texture === TEXTURE_TYPES.WATER
              ? getMaterial({ ...o, texture: TEXTURE_TYPES.WINDY_SNOW })
              : getMaterial(o)}
          </mesh>
        </group>
      );
    });
  }, [getLayerArgs, layers, getMaterial]);

  const waterLayers = useMemo(
    () => layers.filter((o) => o.texture === TEXTURE_TYPES.WATER),
    [layers]
  );

  useFrame(() => {
    if (waterLayers.length)
      Object.keys(waterTexture).forEach((key) => {
        waterTexture[key as keyof typeof waterTexture].offset.x += 1 / 3000;
        waterTexture[key as keyof typeof waterTexture].offset.y += 1 / 3000;
      });
  });

  return <>{getLayers()}</>;
};

export default Layers;
