import { useMemo, useRef, useEffect, RefObject } from "react";
import {
  Color,
  Object3D,
  InstancedMesh,
  Mesh,
  SphereBufferGeometry,
} from "three";
import { WORLD_SIZE } from "../../Scene";
import { TreeData } from "./Trees";

const Stems = ({
  objects,
  earthRef,
}: {
  objects: TreeData[];
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const tempColor = useMemo(() => new Color(), []);
  const tempObject = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>();
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(objects.length)
          .fill(null)
          // @ts-ignore
          .flatMap((o, i) => tempColor.set(objects[i].colorStem).toArray())
      ),
    [tempColor, objects]
  );

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    objects.forEach((o, i) => {
      if (!earthRef?.current || !meshRef.current) {
        return;
      }
      tempObject.position.setFromSphericalCoords(
        WORLD_SIZE + 0.01,
        o.v3.y,
        o.v3.x
      );
      tempObject.scale.set(0.03, 0.03, o.scale);
      tempObject.lookAt(earthRef.current.position);
      tempObject.updateMatrix();

      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [earthRef, objects, tempObject]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, objects.length]}>
      <icosahedronBufferGeometry args={[0.1, 0]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </icosahedronBufferGeometry>
      <meshStandardMaterial attach="material" vertexColors />
    </instancedMesh>
  );
};

export default Stems;
