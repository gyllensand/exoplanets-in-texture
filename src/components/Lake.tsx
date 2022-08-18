import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Vector3,
  Vector2,
  MathUtils,
  Mesh,
  PlaneGeometry,
  Scene,
  RepeatWrapping,
  TextureLoader,
  WebGLRenderer,
  SphereBufferGeometry,
  BackSide,
  Color,
  Shape,
} from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber, pickRandomDecimalFromInterval } from "../utils";
import { Water } from "three-stdlib";
import { useTexture } from "@react-three/drei";
extend({ Water });

const Lake = () => {
  const size = useMemo(() => pickRandomDecimalFromInterval(2.6, 3), []);
  const rotationX = useMemo(() => getRandomNumber() * 5, []);

  const texture = useTexture({
    map: "/textures/water/Map.jpeg",
    displacementMap: "/textures/water/Map.jpeg",
    normalMap: "/textures/water/Map.jpeg",
    aoMap: "/textures/water/AmbientOcclusionMap.jpg",
  });

  Object.keys(texture).forEach((key) => {
    texture[key as keyof typeof texture].wrapS = RepeatWrapping;
    texture[key as keyof typeof texture].wrapT = RepeatWrapping;
    texture[key as keyof typeof texture].repeat.x = 4;
    texture[key as keyof typeof texture].repeat.y = 4;
  });

  useFrame(() => {
    Object.keys(texture).forEach((key) => {
      texture[key as keyof typeof texture].offset.x += 1 / 3000;
      texture[key as keyof typeof texture].offset.y += 1 / 3000;
    });
  });

  const x = 0;
  const y = 0;

  const shape = new Shape();

  shape.moveTo(x + 2, y + 2);
  shape.moveTo(x + 2, y + 2);
  // shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  // shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  // shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  // shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  // shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  // shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  // return (
  //   <mesh receiveShadow rotation={[rotationX, rotationY, 0]}>
  //     <sphereBufferGeometry
  //       args={[WORLD_SIZE - depth, 64, 64, 0, size, 1, size]}
  //     />
  //     <meshStandardMaterial
  //       attach="material"
  //       roughness={0.8}
  //       {...texture}
  //       displacementScale={1}
  //     />
  //   </mesh>
  // );

  return (
    <mesh rotation={[-2, 0, 0]}>
      <sphereBufferGeometry
        args={[WORLD_SIZE + 0.015, 64, 64, 0, Math.PI * 2, size, 1.2]}
      />
      <meshPhongMaterial
        color="#005eb8"
        shininess={100}
        {...texture}
        displacementScale={0}
      />
    </mesh>
  );
};

export default Lake;
