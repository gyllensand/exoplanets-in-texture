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
import { TreeData } from "./Trees";

const Leaves = ({
  objects,
  earthRef,
}: {
  objects: TreeData[];
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  const tempColor = useMemo(() => new Color(), []);
  const tempObject = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>();
  const meshRef2 = useRef<InstancedMesh>();
  const meshRef3 = useRef<InstancedMesh>();
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
      // tempObject.scale.set(o.leafScale, o.leafScale, o.leafScale);
      tempObject.scale.set(o.scale, o.scale, o.scale);
      // tempObject.rotation.set(Math.PI / 2, 0, 0);

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
      // meshRef.current.lookAt(earthRef.current.position);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [earthRef, objects, tempObject]);

  return (
    <>
      <instancedMesh
        ref={meshRef}
        receiveShadow
        args={[undefined, undefined, objects.length]}
      >
        <icosahedronBufferGeometry attach="geometry" args={[0.03, 0]}>
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </icosahedronBufferGeometry>
        <meshPhongMaterial vertexColors shininess={50} />
      </instancedMesh>
      {/* <instancedMesh
        ref={meshRef2}
        receiveShadow
        args={[undefined, undefined, objects.length]}
      >
        <sphereBufferGeometry attach="geometry" args={[0.015, 4, 4]}>
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </sphereBufferGeometry>
        <meshStandardMaterial vertexColors />
      </instancedMesh>
      <instancedMesh
        ref={meshRef3}
        receiveShadow
        args={[undefined, undefined, objects.length]}
      >
        <sphereBufferGeometry attach="geometry" args={[0.01, 4, 4]}>
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </sphereBufferGeometry>
        <meshStandardMaterial vertexColors />
      </instancedMesh> */}
    </>
  );
};

export default Leaves;
