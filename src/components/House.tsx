import { RefObject, useEffect, useRef } from "react";
import { BoxBufferGeometry, Mesh, SphereBufferGeometry } from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber, pickRandomSphericalPos } from "../utils";

const House = ({
  earthRef,
}: {
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const meshRef = useRef<Mesh<BoxBufferGeometry>>();
  //   function createTree() {
  //     let tree = [];

  //     for (var i = 0; i < 30; i++) {
  //       tree[i] = new Tree();
  //       let rx = Math.random() * Math.PI * 2;
  //       let ry = Math.random() * Math.PI;
  //       tree[i].mesh.position.setFromSphericalCoords(1 + 0.01, ry, rx);
  //       tree[i].mesh.lookAt(sphere.position);
  //       //don't works
  //       //tree[i].mesh.rotation.x=-Math.PI/2

  //       //scene.add(tree[i].mesh);
  //       sphere.add(tree[i].mesh);
  //     }
  //   }

  useEffect(() => {
    if (!earthRef?.current || !meshRef.current) {
      return;
    }

    const position = pickRandomSphericalPos();

    meshRef.current.position.setFromSphericalCoords(
      WORLD_SIZE + 0.01,
      position.y,
      position.x
    );
    meshRef.current.lookAt(earthRef.current.position);
  }, [earthRef]);

  return (
    <group ref={meshRef}>
      <mesh receiveShadow>
        <boxBufferGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial attach="material" color="#EE786E" />
      </mesh>
      <mesh receiveShadow position={[0.005, 0, -0.05]}>
        <boxBufferGeometry args={[0.06, 0.06, 0.04]} />
        <meshStandardMaterial attach="material" color="#FCEEB5" />
      </mesh>
      <mesh receiveShadow position={[-0.005, -0.005, -0.09]}>
        <boxBufferGeometry args={[0.06, 0.06, 0.04]} />
        <meshStandardMaterial attach="material" color="lightblue" />
      </mesh>
      {/* <mesh
        receiveShadow
        rotation={[-Math.PI / 2, Math.PI / 4, 0]}
        position={[0, 0, -0.045]}
      >
        <coneBufferGeometry args={[0.05, 0.03, 4, 1]} />
        <meshStandardMaterial attach="material" color="lightblue" />
      </mesh> */}
    </group>
  );
};

export default House;
