import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber, pickRandomDecimalFromInterval } from "../utils";

const Mountains = () => {
  const texture = useTexture({
    map: "/textures/mountains/1/Map.png",
    displacementMap: "/textures/mountains/1/DisplacementMap.jpg",
    normalMap: "/textures/mountains/1/NormalMap.jpg",
    aoMap: "/textures/mountains/1/AmbientOcclusionMap.jpg",
  });

  const size = useMemo(() => pickRandomDecimalFromInterval(0.8, 1.2), [])
  const depth = useMemo(() => pickRandomDecimalFromInterval(0.002, 0.02), [])
  const rotationX = useMemo(() => getRandomNumber() * 5, []);
  const rotationY = useMemo(() => getRandomNumber() * 5, []);

  return (
    <mesh receiveShadow rotation={[rotationX, rotationY, 0]}>
      <sphereBufferGeometry
        args={[WORLD_SIZE - depth, 64, 64, 0, size, 1, size]}
      />
      <meshStandardMaterial
        attach="material"
        roughness={0.8}
        {...texture}
        displacementScale={1}
      />
    </mesh>
  );
};

export default Mountains;
