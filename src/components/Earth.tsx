import { useTexture } from "@react-three/drei";
import { forwardRef } from "react";
import { RepeatWrapping, Mesh, SphereBufferGeometry } from "three";
import { WORLD_SIZE } from "../Scene";

const Earth = forwardRef<Mesh<SphereBufferGeometry>, { color: string }>(
  ({ color }, ref) => {
    const texture = useTexture({
      // map: "/textures/grass/Map.jpeg",
      map: "/textures/grass/MapDesat.jpg",
      displacementMap: "/textures/grass/DisplacementMap.jpg",
      normalMap: "/textures/grass/NormalMap.jpg",
      aoMap: "/textures/grass/AmbientOcclusionMap.jpg",
    });

    Object.keys(texture).forEach((key) => {
      texture[key as keyof typeof texture].wrapS = RepeatWrapping;
      texture[key as keyof typeof texture].wrapT = RepeatWrapping;
      texture[key as keyof typeof texture].repeat.x = 10;
      texture[key as keyof typeof texture].repeat.y = 10;
    });

    return (
      <mesh receiveShadow ref={ref}>
        <sphereBufferGeometry args={[WORLD_SIZE, 64, 64]} />
        <meshStandardMaterial
          attach="material"
          // color={color}
          // emissive={color}
          // emissiveIntensity={0.2}
          // transparent
          // opacity={0.9}
          {...texture}
          displacementScale={0.01}
        />
      </mesh>
    );
  }
);

export default Earth;
