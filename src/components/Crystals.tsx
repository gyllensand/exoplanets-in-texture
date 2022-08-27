import { RefObject, useEffect, useMemo, useRef } from "react";
import { Group, Mesh, PointLight, SphereBufferGeometry, Vector3 } from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber, pickRandomDecimalFromInterval } from "../utils";

export interface CrystalData {
  v3: Vector3;
  color?: string;
}

const Crystals = ({
  data,
  earthRef,
}: {
  data: CrystalData;
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const groupRef = useRef<Group>();
  const size = useMemo(() => pickRandomDecimalFromInterval(0.02, 0.04), []);
  const rotation = useMemo(() => getRandomNumber() * 5, []);

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
          scale={[3, 1, 1]}
          rotation={[-Math.PI / 2, 12, Math.PI / 2]}
        >
          <dodecahedronBufferGeometry args={[1, 0]} />
          <meshStandardMaterial
            attach="material"
            roughness={0.5}
            metalness={2}
            color={data.color}
          />
        </mesh>
        <mesh
          receiveShadow
          position={[0, 0.7, 5.3]}
          scale={[1, 1, 1]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <dodecahedronBufferGeometry args={[1, 0]} />
          <meshStandardMaterial
            attach="material"
            roughness={0.5}
            metalness={2}
            color={data.color}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Crystals;
