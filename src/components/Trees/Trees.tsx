import { RefObject } from "react";
import { Vector3, Mesh, SphereBufferGeometry } from "three";
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
  return (
    <group>
      <Leaves objects={objects} earthRef={earthRef} />
      <Stems objects={objects} earthRef={earthRef} />
    </group>
  );
};

export default Trees;
