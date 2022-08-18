import { useMemo, useRef, useEffect, RefObject } from "react";
import {
  Color,
  Object3D,
  InstancedMesh,
  Vector3,
  Mesh,
  SphereBufferGeometry,
} from "three";
import { WORLD_SIZE } from "../../Scene";

interface TreeData {
  v3: Vector3;
  colorLeaves?: string;
  colorStem?: string;
}

const Trees = ({
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
          .flatMap((o, i) => tempColor.set(objects[i].colorLeaves).toArray())
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
        WORLD_SIZE + 0.1,
        o.v3.y,
        o.v3.x
      );
      tempObject.scale.set(1, 1, 1);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
      meshRef.current.lookAt(earthRef.current.position);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [earthRef, objects, tempObject]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, objects.length]}>
      <sphereBufferGeometry attach="geometry" args={[0.03, 4, 4]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </sphereBufferGeometry>
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
};

export default Trees;
