import { useTexture } from "@react-three/drei";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";

const Mountains = () => {
  const texture = useTexture({
    map: "/textures/mountains/1/Map.png",
    displacementMap: "/textures/mountains/1/DisplacementMap.jpg",
    normalMap: "/textures/mountains/1/NormalMap.jpg",
    aoMap: "/textures/mountains/1/AmbientOcclusionMap.jpg",
  });

  return (
    <mesh
      receiveShadow
      rotation={[getRandomNumber() * 5, getRandomNumber() * 5, 0]}
    >
      <sphereBufferGeometry
        args={[WORLD_SIZE - 0.01, 64, 64, 0, 1.2, 1, 1.2]}
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
