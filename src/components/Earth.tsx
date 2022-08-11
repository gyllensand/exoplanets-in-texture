import { RoundedBox, useTexture } from "@react-three/drei";
import { forwardRef } from "react";
import THREE, { RepeatWrapping, Mesh, SphereBufferGeometry } from "three";
import { WORLD_SIZE } from "../Scene";

const Earth = forwardRef<Mesh<SphereBufferGeometry>>((props, ref) => {
  const texture = useTexture({
    map: "/textures/grass.jpeg",
    displacementMap: "/textures/green_hedge_disp.jpg",
    normalMap: "/textures/green_hedge_normal.jpg",
    aoMap: "/textures/green_hedge_ao.jpg",
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
        // wireframe
        {...texture}
        displacementScale={0.01}
      />
    </mesh>
  );
});

export default Earth;
