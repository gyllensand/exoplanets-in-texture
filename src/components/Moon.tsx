import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const Moon = ({ secondaryColorTheme }: { secondaryColorTheme: string }) => {
  const meshRef = useRef<Mesh>();
  const texture = useTexture({
    map: "/textures/moss/Map.png",
    displacementMap: "/textures/moss/DisplacementMap.png",
    normalMap: "/textures/moss/NormalMap.png",
    aoMap: "/textures/moss/AmbientOcclusionMap.png",
  });

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.position.set(
      Math.cos(clock.getElapsedTime() / 2),
      Math.sin(clock.getElapsedTime() / 2),
      Math.sin(clock.getElapsedTime())
    );

    meshRef.current.rotation.set(
      clock.getElapsedTime() / 2,
      clock.getElapsedTime() / 2,
      clock.getElapsedTime() / 2
    );
  });

  return (
    <mesh ref={meshRef} receiveShadow position={[0, 0, 1]}>
      <sphereBufferGeometry args={[0.08, 64, 64]} />
      <meshStandardMaterial
        attach="material"
        emissive={secondaryColorTheme}
        emissiveIntensity={0.05}
        {...texture}
        displacementScale={0.03}
      />
    </mesh>
  );
};

export default Moon;
