import { useTexture } from "@react-three/drei";
import { RefObject, useEffect, useRef } from "react";
import {
  BoxBufferGeometry,
  Mesh,
  RepeatWrapping,
  SphereBufferGeometry,
  Vector3,
} from "three";
import { WORLD_SIZE } from "../Scene";

export interface PyramidData {
  v3: Vector3;
  color: string;
  size: number;
}

const Pyramid = ({
  data,
  earthRef,
}: {
  data: PyramidData;
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const meshRef = useRef<Mesh<BoxBufferGeometry>>();

  const texture = useTexture({
    displacementMap: "/textures/cobblestone/DisplacementMap.png",
    normalMap: "/textures/cobblestone/NormalMap.png",
    aoMap: "/textures/cobblestone/AmbientOcclusionMap.png",
  });

  Object.keys(texture).forEach((key) => {
    texture[key as keyof typeof texture].wrapS = RepeatWrapping;
    texture[key as keyof typeof texture].wrapT = RepeatWrapping;
    texture[key as keyof typeof texture].repeat.x = 4;
    texture[key as keyof typeof texture].repeat.y = 4;
  });

  useEffect(() => {
    if (!earthRef?.current || !meshRef.current) {
      return;
    }

    meshRef.current.position.setFromSphericalCoords(
      WORLD_SIZE + 0.01,
      data.v3.y,
      data.v3.x
    );
    meshRef.current.lookAt(earthRef.current.position);
  }, [earthRef, data.v3]);

  return (
    <group ref={meshRef}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0, data.size * 2, data.size, 3, 1]} />
        <meshStandardMaterial
          attach="material"
          color={data.color}
          roughness={0.2}
          {...texture}
          displacementScale={0}
        />
      </mesh>
    </group>
  );
};

export default Pyramid;
