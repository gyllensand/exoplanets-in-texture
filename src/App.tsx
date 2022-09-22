import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

console.log(
  "%c * Computer Emotions * ",
  "color: #d80fe7; font-size: 14px; background-color: #000000;"
);

console.log(
  "%c http://www.computeremotions.com ",
  "font-size: 12px; background-color: #000000;"
);

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      ref={canvasRef}
      dpr={window.devicePixelRatio}
      shadows
      camera={{ position: [0, 0, 4], fov: 35 }}
    >
      <Suspense fallback={null}>
        <Scene canvasRef={canvasRef} />
      </Suspense>
    </Canvas>
  );
};

export default App;
