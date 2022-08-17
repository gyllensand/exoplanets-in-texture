import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";

const Clouds = () => {
  const meshRef = useRef<Mesh>();
  const texture = useTexture({
    map: "/textures/clouds/Map.jpeg",
    displacementMap: "/textures/clouds/DisplacementMap.jpg",
    normalMap: "/textures/clouds/NormalMap.jpg",
    aoMap: "/textures/clouds/AmbientOcclusionMap.jpg",
  });
  const texture2 = useTexture({
    map: "/textures/stripes/Map.jpg",
    displacementMap: "/textures/stripes/DisplacementMap.jpg",
    normalMap: "/textures/stripes/NormalMap.jpg",
    aoMap: "/textures/stripes/AmbientOcclusionMap.jpg",
  });

  const rotationX = useMemo(() => getRandomNumber() * 5, []);
  const rotationY = useMemo(() => getRandomNumber() * 5, []);

  useFrame(({ clock }) => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation.y += 1 / 1500;
  });

  return (
    <mesh ref={meshRef} rotation={[rotationX, rotationY, 0]}>
      <sphereBufferGeometry args={[WORLD_SIZE + 0.01, 64, 64]} />
      <meshStandardMaterial
        attach="material"
        depthWrite={false}
        transparent
        opacity={0.2}
        {...texture2}
        displacementScale={0}
      />
    </mesh>
  );
};

export default Clouds;
