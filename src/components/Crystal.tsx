import { useTexture } from "@react-three/drei";
import { RefObject, useEffect, useMemo, useRef } from "react";
import {
  Group,
  Mesh,
  SphereBufferGeometry,
  Vector3,
  RepeatWrapping,
} from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber, pickRandomDecimalFromInterval } from "../utils";

export interface CrystalData {
  v3: Vector3;
  color?: string;
}

const Crystal = ({
  data,
  earthRef,
}: {
  data: CrystalData;
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const groupRef = useRef<Group>();
  const size = useMemo(() => pickRandomDecimalFromInterval(0.02, 0.04), []);
  const rotation = useMemo(() => getRandomNumber() * 5, []);

  const texture = useTexture({
    normalMap: `${process.env.PUBLIC_URL}/textures/ice/NormalMap.jpg`,
    aoMap: `${process.env.PUBLIC_URL}/textures/ice/AmbientOcclusionMap.jpg`,
  });

  Object.keys(texture).forEach((key) => {
    texture[key as keyof typeof texture].wrapS = RepeatWrapping;
    texture[key as keyof typeof texture].wrapT = RepeatWrapping;
    texture[key as keyof typeof texture].repeat.x = 2;
    texture[key as keyof typeof texture].repeat.y = 2;
  });

  useEffect(() => {
    if (!groupRef.current || !earthRef?.current) {
      return;
    }

    groupRef.current.position.setFromSphericalCoords(
      WORLD_SIZE + size * 6,
      data.v3.y,
      data.v3.x
    );

    groupRef.current?.lookAt(earthRef?.current?.position);
  }, [earthRef, data.v3, size]);

  return (
    <group ref={groupRef} scale={[size, size, size]}>
      <group rotation={[0, 0, rotation]}>
        <mesh
          receiveShadow
          position={[-1, 1, 4.6]}
          scale={[3, 0.8, 0.8]}
          rotation={[-Math.PI / 2, 12, Math.PI / 2]}
        >
          <dodecahedronBufferGeometry args={[1, 0]} />
          <meshStandardMaterial
            attach="material"
            roughness={0.3}
            metalness={1.5}
            color={data.color}
            {...texture}
            displacementScale={0}
          />
        </mesh>
        <mesh
          receiveShadow
          position={[0, 0.7, 5.3]}
          scale={[0.8, 0.8, 0.8]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <dodecahedronBufferGeometry args={[1, 0]} />
          <meshStandardMaterial
            attach="material"
            roughness={0.3}
            metalness={1.5}
            color={data.color}
            {...texture}
            displacementScale={0}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Crystal;
