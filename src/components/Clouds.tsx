import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";

const Clouds = ({ type, color }: { type: number; color: string }) => {
  const meshRef = useRef<Mesh>();
  const texture = useTexture({
    map: `${process.env.PUBLIC_URL}/textures/clouds/Map.jpeg`,
    displacementMap: `${process.env.PUBLIC_URL}/textures/clouds/DisplacementMap.jpg`,
    normalMap: `${process.env.PUBLIC_URL}/textures/clouds/NormalMap.jpg`,
    aoMap: `${process.env.PUBLIC_URL}/textures/clouds/AmbientOcclusionMap.jpg`,
  });
  const texture2 = useTexture({
    map: `${process.env.PUBLIC_URL}/textures/stripes/Map.jpg`,
    displacementMap: `${process.env.PUBLIC_URL}/textures/stripes/DisplacementMap.jpg`,
    normalMap: `${process.env.PUBLIC_URL}/textures/stripes/NormalMap.jpg`,
    aoMap: `${process.env.PUBLIC_URL}/textures/stripes/AmbientOcclusionMap.jpg`,
  });

  const rotationX = useMemo(() => getRandomNumber() * 5, []);
  const rotationY = useMemo(() => getRandomNumber() * 5, []);
  const currentTexture = useMemo(
    () => (type === 0 ? texture : texture2),
    [texture, texture2, type]
  );

  useFrame(({ clock }) => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation.y += 1 / 1500;
  });

  return (
    <mesh ref={meshRef} rotation={[rotationX, rotationY, 0]}>
      <sphereBufferGeometry args={[WORLD_SIZE + 0.02, 64, 64]} />
      <meshStandardMaterial
        attach="material"
        depthWrite={false}
        transparent
        opacity={0.2}
        {...currentTexture}
        displacementScale={0}
      />
    </mesh>
  );
};

export default Clouds;
