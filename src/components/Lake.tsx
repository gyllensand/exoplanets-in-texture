import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Vector3,
  MathUtils,
  Mesh,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
  WebGLRenderer,
  SphereBufferGeometry,
  BackSide
} from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber } from "../utils";
import { Water } from "three-stdlib";

extend({ Water });

const Lake = ({ gl }: { gl?: WebGLRenderer }) => {
  const meshRef = useRef<Mesh>();
  const v3 = useMemo(() => new Vector3(), []);
  const vertData: { initH: number; amplitude: number; phase: number }[] =
    useMemo(() => [], []);

  const geometry = meshRef?.current?.geometry;

  useEffect(() => {
    if (!geometry) {
      return;
    }

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      v3.fromBufferAttribute(geometry.attributes.position, i);
      vertData.push({
        initH: v3.y,
        amplitude: MathUtils.randFloatSpread(0.01),
        phase: MathUtils.randFloat(0, Math.PI),
      });
    }
  }, [geometry, v3, vertData]);

  useFrame(({ clock }) => {
    if (!geometry) {
      return;
    }

    const time = clock.getElapsedTime();

    vertData.forEach((vd, idx) => {
      const y = vd.initH + Math.sin(time + vd.phase) * vd.amplitude;
      geometry.attributes.position.setY(idx, y);
    });

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 2, 0, 0]}>
      <sphereBufferGeometry
        args={[WORLD_SIZE + 0.01, 64, 64, 0, Math.PI * 2, 4.7, 0.2]}
      />
      <meshPhongMaterial color="aqua" side={BackSide} />
    </mesh>
  );
};

// const Lake = ({ gl }: { gl: WebGLRenderer }) => {
//   const ref = useRef<Mesh>();
//   const waterNormals = useLoader(TextureLoader, "/textures/water.jpeg");
//   waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;

//   const geom = useMemo(
//     () =>
//       new SphereBufferGeometry(
//         WORLD_SIZE + 0.01,
//         64,
//         64,
//         0,
//         Math.PI * 2,
//         2.4,
//         1.2
//       ),
//     []
//   );

//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x00f7fb,
//       distortionScale: 3.7,
//       fog: false,
//       // size: 10,
//       // @ts-ignore
//       format: gl.encoding,
//     }),
//     // @ts-ignore
//     [waterNormals, gl.encoding]
//   );

//   useFrame((state, delta) => {
//     if (!ref.current) {
//       return;
//     }

//     // @ts-ignore
//     ref.current.material.uniforms.siza = 1000;

//     // @ts-ignore
//     ref.current.material.uniforms.time.value += delta;
//   });
//   // @ts-ignore
//   return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
// }

export default Lake;
