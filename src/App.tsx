import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Stats } from "@react-three/drei";

console.log(
  "%c * Computer Emotions * ",
  "color: #d80fe7; font-size: 14px; background-color: #000000;"
);

console.log(
  "%c http://www.computeremotions.com ",
  "font-size: 12px; background-color: #000000;"
);

const App = () => {
  return (
    <Canvas
      dpr={window.devicePixelRatio}
      shadows
      camera={{ position: [0, 0, 4], fov: 35 }}
    >
      <Suspense fallback={null}>
        <Scene />
        <Stats showPanel={0} />
      </Suspense>
    </Canvas>
  );
};

export default App;
