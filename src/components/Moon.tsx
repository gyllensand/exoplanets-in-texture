import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { pickRandomDecimalFromInterval } from "../utils";

const Moon = ({ color, index }: { color: string; index: number }) => {
  const meshRef = useRef<Mesh>();
  const texture = useTexture({
    displacementMap: "/textures/moss/DisplacementMap.png",
    normalMap: "/textures/moss/NormalMap.png",
    aoMap: "/textures/moss/AmbientOcclusionMap.png",
  });
  const scale = useMemo(() => pickRandomDecimalFromInterval(0.04, 0.08), []);
  const rotationX = useMemo(() => pickRandomDecimalFromInterval(1, 2), []);
  const rotationY = useMemo(() => pickRandomDecimalFromInterval(1, 2), []);
  const rotationZ = useMemo(() => pickRandomDecimalFromInterval(1, 2), []);
  const displacementScale = useMemo(
    () => pickRandomDecimalFromInterval(0.02, 0.05),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.position.set(
      Math.cos(clock.getElapsedTime() / 8) * rotationX,
      Math.sin(clock.getElapsedTime() / 8) * rotationY,
      Math.sin(clock.getElapsedTime() / 4) * rotationZ
    );

    meshRef.current.rotation.set(
      clock.getElapsedTime() / 2,
      clock.getElapsedTime() / 2,
      clock.getElapsedTime() / 2
    );
  });

  return (
    <group>
      <mesh ref={meshRef} receiveShadow>
        <sphereBufferGeometry args={[scale, 64, 64]} />
        <meshStandardMaterial
          attach="material"
          color={color}
          {...texture}
          displacementScale={displacementScale}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
};

export default Moon;
