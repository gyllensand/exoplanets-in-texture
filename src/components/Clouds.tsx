import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, RepeatWrapping } from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";

const Clouds = () => {
  const meshRef = useRef<Mesh>();
  const texture = useTexture({
    map: "/textures/clouds/Map.jpeg",
    displacementMap: "/textures/clouds/DisplacementMap.jpg",
    normalMap: "/textures/clouds/NormalMap.jpg",
    aoMap: "/textures/clouds/AmbientOcclusionMap.jpg",
    // specularMap: "/textures/clouds/SpecularMap.jpg",
  });

  useFrame(({ clock }) => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation.y += 1 / 1500;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[getRandomNumber() * 5, getRandomNumber() * 5, 0]}
    >
      <sphereBufferGeometry args={[WORLD_SIZE + 0.01, 64, 64]} />
      <meshStandardMaterial
        attach="material"
        depthWrite={false}
        transparent
        opacity={0.2}
        {...texture}
        displacementScale={0}
      />
    </mesh>
  );
};

export default Clouds;
