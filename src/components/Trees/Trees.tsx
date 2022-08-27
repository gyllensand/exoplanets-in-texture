import { useRef, useEffect, RefObject } from "react";
import { Vector3, Mesh, SphereBufferGeometry, Group } from "three";
import { WORLD_SIZE } from "../../Scene";
import Leaves from "./Leaves";
import Stems from "./Stems";

export interface TreeData {
  v3: Vector3;
  colorLeaves?: string;
  colorStem?: string;
  scale: number;
}

const Trees = ({
  objects,
  earthRef,
}: {
  objects: TreeData[];
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const groupRef = useRef<Group>();

  useEffect(() => {
    if (!earthRef?.current || !groupRef?.current) {
      return;
    }

    // groupRef.current.lookAt(earthRef.current.position);

    // @ts-ignore
    // groupRef.current.instanceMatrix.needsUpdate = true;
  }, [earthRef, objects]);

  return (
    <group ref={groupRef}>
      <Leaves objects={objects} earthRef={earthRef} />
      <Stems objects={objects} earthRef={earthRef} />
    </group>
  );
};

export default Trees;

// var tree = new THREE.Group();

// //trunk
// var geo_trunk = new THREE.IcosahedronGeometry(9, 0);
// var trunk = new THREE.Mesh(geo_trunk, mat_grey);
// var a = new THREE.Vector3(1, 0, 10);
// trunk.rotation.x = pi / 2;
// trunk.position.y = 5;
// trunk.scale.set(0.03, 0.03, 1);
// trunk.castShadow = true;
// trunk.receiveShadow = true;
// tree.add(trunk);

// //crown
// var geo_crown = new THREE.IcosahedronGeometry(2.5, 0);
// var crown = new THREE.Mesh(geo_crown, mat_yellow);
// crown.scale.y = 0.4;
// crown.rotation.z = -0.5;
// crown.rotation.x = -0.2;
// crown.position.set(trunk.position.x, 12, trunk.position.z);
// crown.castShadow = true;
// tree.add(crown);
