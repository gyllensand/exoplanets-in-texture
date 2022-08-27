import { useTexture } from "@react-three/drei";
import { forwardRef } from "react";
import { RepeatWrapping, Mesh, SphereBufferGeometry } from "three";
import { WORLD_SIZE } from "../Scene";

const Bird = () => {
  return (
    <mesh receiveShadow>
      <sphereBufferGeometry args={[WORLD_SIZE, 64, 64]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};

export default Bird;
