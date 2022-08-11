import { useTexture } from "@react-three/drei";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";

const Mountain = () => {
  const texture = useTexture({
    map: "/textures/mountains.jpeg",
    displacementMap: "/textures/mountains/VAR_01/DisplacementMap.jpg",
    normalMap: "/textures/mountains/VAR_01/NormalMap.jpg",
    aoMap: "/textures/mountains/VAR_01/AmbientOcclusionMap.jpg",
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
        color="white"
        {...texture}
        displacementScale={1}
      />
    </mesh>
  );
};

export default Mountain;
