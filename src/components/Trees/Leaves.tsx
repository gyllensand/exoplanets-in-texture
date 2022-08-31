import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useEffect, RefObject } from "react";
import {
  Color,
  Object3D,
  InstancedMesh,
  Mesh,
  SphereBufferGeometry,
  RepeatWrapping,
} from "three";
import { WORLD_SIZE } from "../../Scene";
import { getRandomNumber } from "../../utils";
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

      const rotationX = getRandomNumber() * 5;

      tempObject.position.setFromSphericalCoords(
        WORLD_SIZE + o.scale / 10,
        o.v3.y,
        o.v3.x
      );

      tempObject.scale.set(o.scale, o.scale, o.scale / 1.5);
      tempObject.rotation.set(0, 0, rotationX);
      tempObject.lookAt(earthRef.current.position);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [earthRef, objects, tempObject]);

  const texture = useTexture({
    normalMap: "/textures/desert/NormalMap.jpg",
    aoMap: "/textures/desert/AmbientOcclusionMap.jpg",
  });

  Object.keys(texture).forEach((key) => {
    texture[key as keyof typeof texture].wrapS = RepeatWrapping;
    texture[key as keyof typeof texture].wrapT = RepeatWrapping;
    texture[key as keyof typeof texture].repeat.x = 2;
    texture[key as keyof typeof texture].repeat.y = 2;
  });

  return (
    <instancedMesh
      ref={meshRef}
      receiveShadow
      args={[undefined, undefined, objects.length]}
    >
      <icosahedronBufferGeometry attach="geometry" args={[0.025, 0]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </icosahedronBufferGeometry>
      <meshStandardMaterial vertexColors {...texture} />
    </instancedMesh>
  );
};

export default Leaves;
