import { RefObject, useEffect, useRef } from "react";
import {
  Vector3,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Scene,
  Mesh,
  SphereBufferGeometry,
} from "three";

function setArc3D(
  pointStart: Vector3,
  pointEnd: Vector3,
  smoothness: number,
  color: string,
  clockWise: boolean
) {
  // calculate normal
  var cb = new Vector3(),
    ab = new Vector3(),
    normal = new Vector3();
  cb.subVectors(new Vector3(), pointEnd);
  ab.subVectors(pointStart, pointEnd);
  cb.cross(ab);
  normal.copy(cb).normalize();

  // get angle between vectors
  var angle = pointStart.angleTo(pointEnd);
  if (clockWise) angle = angle - Math.PI * 2;
  var angleDelta = angle / (smoothness - 1);

  //var geometry = new Geometry();
  var pts = [];
  for (var i = 0; i < smoothness; i++) {
    pts.push(pointStart.clone().applyAxisAngle(normal, angleDelta * i));
  }

  return pts;
  //   var geometry = new BufferGeometry().setFromPoints(pts);

  //   var arc = new Line(
  //     geometry,
  //     new LineBasicMaterial({
  //       color: color,
  //       linewidth: 10,
  //     })
  //   );
  //   return arc;
}

const Road = ({
  earthRef,
}: {
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) => {
  //   var zeroPoint = new Vector3();
  //   var pointStart = new Vector3(
  //     Math.random() * 2 - 1,
  //     Math.random() * 2 - 1,
  //     Math.random() * 2 - 1
  //   )
  //     .normalize()
  //     .multiplyScalar(1);
  //   var pointEnd = new Vector3(
  //     Math.random() * 2 - 1,
  //     Math.random() * 2 - 1,
  //     Math.random() * 2 - 1
  //   )
  //     .normalize()
  //     .multiplyScalar(1);

  //   var newArc1 = setArc3D(pointStart, pointEnd, 50, "red", false);

  //   //   scene.add(newArc1);
  //   // var newArc2 = setArc3D(pointStart, pointEnd, 50, "skyblue", true);
  //   // sphere.add(newArc2);
  //   var geometry = new BufferGeometry().setFromPoints(newArc1);
  //   return (
  //     <mesh geometry={geometry}>
  //       <lineBasicMaterial color="red" />
  //     </mesh>
  //   );

  const meshRef = useRef<Mesh>();

  useEffect(() => {
    if (!earthRef?.current || !meshRef.current) {
      return;
    }

    const center = new Vector3().copy(earthRef.current.position);
    const localCenter = new Vector3();
    const v3 = new Vector3();

    meshRef.current.worldToLocal(localCenter.copy(center));
    let pos = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      v3.sub(localCenter);
      v3.setLength(2).add(localCenter);
      pos.setXYZ(i, v3.x, v3.y, v3.z);
    }
    console.log('123')
    meshRef.current.geometry.computeVertexNormals();
    pos.needsUpdate = true;
  }, [earthRef]);

  //   planes.forEach((p) => {
  //     p.worldToLocal(localCenter.copy(center));
  //     let pos = p.geometry.attributes.position;
  //     for (let i = 0; i < pos.count; i++) {
  //       v3.fromBufferAttribute(pos, i);
  //       v3.sub(localCenter);
  //       v3.setLength(2).add(localCenter);
  //       pos.setXYZ(i, v3.x, v3.y, v3.z);
  //     }
  //     p.geometry.computeVertexNormals();
  //     pos.needsUpdate = true;
  //   });

  return (
    <mesh ref={meshRef}>
      <planeBufferGeometry args={[2, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Road;
