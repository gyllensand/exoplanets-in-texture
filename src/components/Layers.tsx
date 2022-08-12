import { useTexture } from "@react-three/drei";
import { useRef, RefObject, useEffect, useCallback } from "react";
import { Mesh, RepeatWrapping, SphereBufferGeometry, Vector3 } from "three";
import { TEXTURE_TYPES } from "../constants";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";

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
            stitchTexture[key as keyof typeof stitchTexture].repeat.x = 2;
          });

          return (
            <meshPhongMaterial
              color={color}
              shininess={100}
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
        default:
          return (
            <meshStandardMaterial color={color} transparent opacity={0.5} />
          );
      }
    },
    [stitchTexture, desertTexture, tracksTexture, pavementTexture]
  );

  const getLayers = useCallback(() => {
    return layers.map((o, i) => (
      <mesh
        ref={meshRef}
        key={i}
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
        {getMaterial(o)}
      </mesh>
    ));
  }, [getLayerArgs, layers, getMaterial]);

  return <>{getLayers()}</>;
};

export default Layers;
