import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Vector3,
  Vector2,
  MathUtils,
  Mesh,
  PlaneGeometry,
  Scene,
  RepeatWrapping,
  TextureLoader,
  WebGLRenderer,
  SphereBufferGeometry,
  BackSide,
  Color,
  Shape,
} from "three";
import { WORLD_SIZE } from "../Scene";
import { getRandomNumber, pickRandomDecimalFromInterval } from "../utils";
import { Water } from "three-stdlib";
import { useTexture } from "@react-three/drei";
extend({ Water });

const Lake = () => {
  const size = useMemo(() => pickRandomDecimalFromInterval(2.6, 3), []);
  const rotationX = useMemo(() => getRandomNumber() * 5, []);

  const texture = useTexture({
    map: "/textures/water/Map.jpeg",
    displacementMap: "/textures/water/Map.jpeg",
    normalMap: "/textures/water/Map.jpeg",
    aoMap: "/textures/water/AmbientOcclusionMap.jpg",
  });

  Object.keys(texture).forEach((key) => {
    texture[key as keyof typeof texture].wrapS = RepeatWrapping;
    texture[key as keyof typeof texture].wrapT = RepeatWrapping;
    texture[key as keyof typeof texture].repeat.x = 4;
    texture[key as keyof typeof texture].repeat.y = 4;
  });

  useFrame(() => {
    Object.keys(texture).forEach((key) => {
      texture[key as keyof typeof texture].offset.x += 1 / 3000;
      texture[key as keyof typeof texture].offset.y += 1 / 3000;
    });
  });

  const x = 0;
  const y = 0;

  const shape = new Shape();

  shape.moveTo(x + 2, y + 2);
  shape.moveTo(x + 2, y + 2);
  // shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  // shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  // shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  // shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  // shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  // shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  return (
    <mesh rotation={[0, 0, 0]} position={[0, 2, 0]}>
      <shapeGeometry args={[shape]}  />
      <meshPhongMaterial
        color="#005eb8"
        shininess={100}
        {...texture}
        displacementScale={0}
      />
    </mesh>
  );

  // return (
  //   <mesh rotation={[-2, 0, 0]}>
  //     <sphereBufferGeometry
  //       args={[WORLD_SIZE + 0.015, 64, 64, 0, Math.PI * 2, size, 1.2]}
  //     />
  //     <meshPhongMaterial
  //       color="#005eb8"
  //       shininess={100}
  //       {...texture}
  //       displacementScale={0}
  //     />
  //   </mesh>
  // );
};

// const Lake = () => {
//   const meshRef = useRef<Mesh>();
//   const v3 = useMemo(() => new Vector3(), []);
//   const vertData: { initH: number; amplitude: number; phase: number }[] =
//     useMemo(() => [], []);

//   const geometry = meshRef?.current?.geometry;

//   useEffect(() => {
//     if (!geometry) {
//       return;
//     }

//     for (let i = 0; i < geometry.attributes.position.count; i++) {
//       v3.fromBufferAttribute(geometry.attributes.position, i);
//       vertData.push({
//         initH: v3.y,
//         amplitude: MathUtils.randFloatSpread(0.01),
//         phase: MathUtils.randFloat(0, Math.PI),
//       });
//     }
//   }, [geometry, v3, vertData]);

//   useFrame(({ clock }) => {
//     if (!geometry) {
//       return;
//     }

//     const time = clock.getElapsedTime();

//     vertData.forEach((vd, idx) => {
//       const y = vd.initH + Math.sin(time + vd.phase) * vd.amplitude;
//       geometry.attributes.position.setY(idx, y);
//     });

//     geometry.attributes.position.needsUpdate = true;
//     geometry.computeVertexNormals();
//   });

//   return (
//     <mesh ref={meshRef} rotation={[-Math.PI * 2, 0, 0]}>
//       <sphereBufferGeometry
//         args={[WORLD_SIZE + 0.01, 64, 64, 0, Math.PI * 2, 4.7, 0.2]}
//       />
//       <meshPhongMaterial color="aqua" side={BackSide} />
//     </mesh>
//   );
// };

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
