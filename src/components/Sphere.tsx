import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { WORLD_SIZE } from "../Scene";
import * as THREEi from "../THREEi_holes";

const Sphere = ({ scene }: { scene: THREE.Scene }) => {
  const g = new THREE.BufferGeometry();
  const parameters = {
    d: 0.07, // rough side length of the triangles, radius calculated from d and div4
    div4: 25, // division of the quarter of the great circle (orthodrome)
    holes: [
      // circular hole, 3 elements: [ theta, phi, div4Hole ], div4Hole <= div4
      [1.57, -0.25, 9],
      [0.44, 4.84, 18],
      [1.23, 1.62, 11],
      // points hole,: array of points theta, phi, ...  (last point is connected to first)
      [1.7, -1.2, 1.7, -2.1, 2.6, -2.1],
    ],
  };

  // @ts-ignore
  g.createSphereWithHoles = THREEi.createSphereWithHoles;
  // @ts-ignore
  g.createSphereWithHoles(parameters); // parameter object

  const texture = useTexture({
    map: "/textures/grass/Map.jpeg",
    displacementMap: "/textures/grass/DisplacementMap.jpg",
    normalMap: "/textures/grass/NormalMap.jpg",
    aoMap: "/textures/grass/AmbientOcclusionMap.jpg",
  });

  Object.keys(texture).forEach((key) => {
    texture[key as keyof typeof texture].wrapS = THREE.RepeatWrapping;
    texture[key as keyof typeof texture].wrapT = THREE.RepeatWrapping;
    texture[key as keyof typeof texture].repeat.x = 10;
    texture[key as keyof typeof texture].repeat.y = 10;
  });

  return (
    <mesh receiveShadow geometry={g}>
      <meshPhongMaterial color="red" />
    </mesh>
  );
};

export default Sphere;
