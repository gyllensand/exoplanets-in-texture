import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import { RepeatWrapping, Mesh, SphereBufferGeometry } from "three";
import { WORLD_SIZE } from "../Scene";

const Bird = () => {
  const meshRef = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.position.set(
      Math.cos(clock.getElapsedTime() / 2),
      Math.sin(clock.getElapsedTime() / 2),
      0
    );

    // pivotPoint.rotation.y += 0.05;
  });

  return (
    <mesh ref={meshRef} receiveShadow position={[0, 0, 0]}>
      <sphereBufferGeometry args={[0.02, 64, 64]} />
      <meshStandardMaterial attach="material" color="blue" />
    </mesh>
  );
};

export default Bird;

// var AirPlane = function () {
//   this.mesh = new THREE.Object3D();

//   // Create the cabin
//   var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
//   var matCockpit = new THREE.MeshPhongMaterial({
//     color: Colors.red,
//     shading: THREE.FlatShading,
//   });
//   // we can access a specific vertex of a shape through
//   // the vertices array, and then move its x, y and z property:
//   geomCockpit.vertices[4].y -= 10;
//   geomCockpit.vertices[4].z += 20;
//   geomCockpit.vertices[5].y -= 10;
//   geomCockpit.vertices[5].z -= 20;
//   geomCockpit.vertices[6].y += 30;
//   geomCockpit.vertices[6].z += 20;
//   geomCockpit.vertices[7].y += 30;
//   geomCockpit.vertices[7].z -= 20;

//   var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
//   cockpit.castShadow = true;
//   cockpit.receiveShadow = true;
//   this.mesh.add(cockpit);

//   // Create the engine
//   var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
//   var matEngine = new THREE.MeshPhongMaterial({
//     color: Colors.white,
//     shading: THREE.FlatShading,
//   });
//   var engine = new THREE.Mesh(geomEngine, matEngine);
//   engine.position.x = 40;
//   engine.castShadow = true;
//   engine.receiveShadow = true;
//   this.mesh.add(engine);

//   // Create the tail
//   var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
//   var matTailPlane = new THREE.MeshPhongMaterial({
//     color: Colors.red,
//     shading: THREE.FlatShading,
//   });
//   var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
//   tailPlane.position.set(-35, 25, 0);
//   tailPlane.castShadow = true;
//   tailPlane.receiveShadow = true;
//   this.mesh.add(tailPlane);

//   // Create the wing
//   var geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
//   var matSideWing = new THREE.MeshPhongMaterial({
//     color: Colors.red,
//     shading: THREE.FlatShading,
//   });
//   var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
//   sideWing.castShadow = true;
//   sideWing.receiveShadow = true;
//   this.mesh.add(sideWing);

//   // propeller
//   var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
//   var matPropeller = new THREE.MeshPhongMaterial({
//     color: Colors.brown,
//     shading: THREE.FlatShading,
//   });
//   this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
//   this.propeller.castShadow = true;
//   this.propeller.receiveShadow = true;

//   // blades
//   var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
//   var matBlade = new THREE.MeshPhongMaterial({
//     color: Colors.brownDark,
//     shading: THREE.FlatShading,
//   });

//   var blade = new THREE.Mesh(geomBlade, matBlade);
//   blade.position.set(8, 0, 0);
//   blade.castShadow = true;
//   blade.receiveShadow = true;
//   this.propeller.add(blade);
//   this.propeller.position.set(50, 0, 0);
//   this.mesh.add(this.propeller);
// };
// var airplane;

// function createPlane() {
//   airplane = new AirPlane();
//   airplane.mesh.scale.set(0.25, 0.25, 0.25);
//   airplane.mesh.position.y = 100;
//   scene.add(airplane.mesh);
// }
