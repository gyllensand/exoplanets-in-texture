import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Sampler } from "tone";
import { ZOOM } from "./constants";

console.log(
  "%c * Computer Emotions * ",
  "color: #d80fe7; font-size: 16px; background-color: #000000;"
);

console.log(
  "%c http://www.computeremotions.com ",
  "font-size: 12px; background-color: #000000;"
);

const path = "synth";
const baseUrl = `${process.env.PUBLIC_URL}/audio/${path}/`;

export interface Sample {
  index: number;
  sampler: Sampler;
}

export const BASS: Sample[] = [
  {
    index: 100,
    sampler: new Sampler({
      urls: {
        1: `${path}-a4sB.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 200,
    sampler: new Sampler({
      urls: {
        1: `${path}-c4B.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 300,
    sampler: new Sampler({
      urls: {
        1: `${path}-c4sB.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 400,
    sampler: new Sampler({
      urls: {
        1: `${path}-c5B.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 500,
    sampler: new Sampler({
      urls: {
        1: `${path}-d4sB.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 600,
    sampler: new Sampler({
      urls: {
        1: `${path}-f4B.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 700,
    sampler: new Sampler({
      urls: {
        1: `${path}-g4B.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 800,
    sampler: new Sampler({
      urls: {
        1: `${path}-g4sB.mp3`,
      },
      baseUrl,
    }),
  },
];

export const HITS: Sample[] = [
  {
    index: 0,
    sampler: new Sampler({
      urls: {
        1: `${path}-a5s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 1,
    sampler: new Sampler({
      urls: {
        1: `${path}-c5.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 2,
    sampler: new Sampler({
      urls: {
        1: `${path}-c5s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 3,
    sampler: new Sampler({
      urls: {
        1: `${path}-c6.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 4,
    sampler: new Sampler({
      urls: {
        1: `${path}-c6s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 5,
    sampler: new Sampler({
      urls: {
        1: `${path}-c7.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 6,
    sampler: new Sampler({
      urls: {
        1: `${path}-c7s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 7,
    sampler: new Sampler({
      urls: {
        1: `${path}-d5s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 8,
    sampler: new Sampler({
      urls: {
        1: `${path}-d6s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 9,
    sampler: new Sampler({
      urls: {
        1: `${path}-d7s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 10,
    sampler: new Sampler({
      urls: {
        1: `${path}-f5.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 11,
    sampler: new Sampler({
      urls: {
        1: `${path}-f6.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 12,
    sampler: new Sampler({
      urls: {
        1: `${path}-f7.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 13,
    sampler: new Sampler({
      urls: {
        1: `${path}-g4s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 14,
    sampler: new Sampler({
      urls: {
        1: `${path}-g5.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 15,
    sampler: new Sampler({
      urls: {
        1: `${path}-g5s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 16,
    sampler: new Sampler({
      urls: {
        1: `${path}-g6.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 17,
    sampler: new Sampler({
      urls: {
        1: `${path}-g6s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 18,
    sampler: new Sampler({
      urls: {
        1: `${path}-g7.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 19,
    sampler: new Sampler({
      urls: {
        1: `${path}-g7s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 20,
    sampler: new Sampler({
      urls: {
        1: `${path}-a4s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 21,
    sampler: new Sampler({
      urls: {
        1: `${path}-a6s.mp3`,
      },
      baseUrl,
    }),
  },
  {
    index: 22,
    sampler: new Sampler({
      urls: {
        1: `${path}-a7s.mp3`,
      },
      baseUrl,
    }),
  },
];

// export const BasicShadowMap: ShadowMapType;
// export const PCFShadowMap: ShadowMapType;
// export const PCFSoftShadowMap: ShadowMapType;
// export const VSMShadowMap: ShadowMapType;

const App = () => {
  return (
    // <Canvas linear flat shadows camera={{ position: [0, 0, 100], fov: 100 }}>
    <Canvas
      // gl={{ preserveDrawingBuffer: true }}
      // dpr={1.5}
      dpr={window.devicePixelRatio}
      shadows
      camera={{ position: [0, 0, 4], fov: 35 }}
    >
      {/* <Canvas
      shadows
      // dpr={[1, 2]}
      camera={{ position: [0, 0, 20], fov: 35}}
    > */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default App;

// import { useTexture } from "@react-three/drei";
// import { useRef, RefObject, useEffect, useCallback } from "react";
// import { Mesh, SphereBufferGeometry, Vector3 } from "three";
// import { WORLD_SIZE } from "../Scene";
// import { getRandomNumber } from "../utils";

// interface Layer {
//   color: string;
//   index: number;
// }

// const NORTH_POLE_END = Math.PI - 2.6;
// const SEGMENTS = 64;

// const Layer = ({
//   earthRef,
//   color,
//   layers,
// }: {
//   earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
//   color: string;
//   layers: Layer[];
// }) => {
//   const meshRef = useRef<Mesh>();

//   const texture = useTexture({
//     map: "/textures/grass.jpeg",
//     displacementMap: "/textures/mountains/VAR_01/landscape_4k_displacement.png",
//     normalMap: "/textures/green_hedge_normal.jpg",
//     aoMap: "/textures/green_hedge_ao.jpg",
//   });

//   useEffect(() => {
//     if (!earthRef?.current || !meshRef?.current) {
//       return;
//     }
//   }, [earthRef]);

//   const getLayerArgs = useCallback(
//     (index: number): [number, number, number, number] => {
//       switch (index) {
//         // case 0:
//         //   return [0, Math.PI * 2, 0, 1.2];
//         case 1:
//           return [
//             -Math.PI / 2,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 2:
//           return [
//             0,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 3:
//           return [
//             Math.PI / 2,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 4:
//           return [
//             Math.PI,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 5:
//           return [
//             -Math.PI / 3,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 6:
//           return [
//             Math.PI / 6,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 7:
//           return [
//             Math.PI / 1.5,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 8:
//           return [
//             Math.PI + Math.PI / 6,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 9:
//           return [
//             -Math.PI / 6,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 10:
//           return [
//             Math.PI / 3,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 11:
//           return [
//             Math.PI / 1.2,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];
//         case 12:
//           return [
//             Math.PI + Math.PI / 3,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ];

//         case 13:
//           return [0, Math.PI * 2, 2.6, 1.2];

//         default:
//           return [0, 0, 0, 0];
//       }
//     },
//     []
//   );

//   const getLayers = useCallback(() => {
//     return layers.map((o, i) => {
//       return (
//         <mesh ref={meshRef}>
//           <sphereBufferGeometry
//             args={[
//               WORLD_SIZE + 0.01,
//               SEGMENTS,
//               SEGMENTS,
//               ...getLayerArgs(o.index),
//             ]}
//           />
//           <meshStandardMaterial
//             color={o.color}
//             transparent
//             opacity={0.5}
//             // {...texture}
//             // displacementScale={0.01}
//           />
//         </mesh>
//       );
//     });
//   }, [getLayerArgs, layers]);

//   return (
//     <>
//       {/* <mesh ref={meshRef} rotation={[Math.PI, 0, 0]}>
//         <sphereBufferGeometry
//           args={[WORLD_SIZE + 0.01, 64, 64, 0, Math.PI * 2, 2.6, 1.2]}
//         />
//         <meshStandardMaterial
//           color={"red"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             -Math.PI / 2,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"blue"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             0,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"purple"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI / 2,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"yellow"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI,
//             Math.PI / 2,
//             NORTH_POLE_END,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"orange"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             -Math.PI / 3,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"red"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI / 6,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"aqua"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI / 1.5,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"blue"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI + Math.PI / 6,
//             Math.PI / 2,
//             NORTH_POLE_END + (Math.PI - NORTH_POLE_END * 2) / 3,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"teal"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/*<mesh ref={meshRef} rotation={[0, 0, 0]}>
//          <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             -Math.PI / 6,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"white"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI / 3,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"darkgreen"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}

//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI / 1.2,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"darkorange"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}

//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[
//             WORLD_SIZE + 0.01,
//             64,
//             64,
//             Math.PI + Math.PI / 3,
//             Math.PI / 2,
//             NORTH_POLE_END + ((Math.PI - NORTH_POLE_END * 2) / 3) * 2,
//             (Math.PI - NORTH_POLE_END * 2) / 3,
//           ]}
//         />
//         <meshStandardMaterial
//           color={"black"}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}

//       {/* <mesh ref={meshRef} rotation={[0, 0, 0]}>
//         <sphereBufferGeometry
//           args={[WORLD_SIZE + 0.01, 64, 64, 0, Math.PI * 2, 2.6, 1.2]}
//         />
//         <meshStandardMaterial
//           color={color}
//           transparent
//           opacity={0.5}
//           // {...texture}
//           // displacementScale={0.01}
//         />
//       </mesh> */}
//       {getLayers()}
//     </>
//   );
// };

// export default Layer;
