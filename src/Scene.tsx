import {
  GradientTexture,
  OrbitControls,
  Backdrop,
  useHelper,
  useTexture,
  RoundedBox,
} from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Mesh,
  PointLight,
  PointLightHelper,
  RepeatWrapping,
  SphereBufferGeometry,
  Vector3,
} from "three";
import Earth from "./components/Earth";
import House from "./components/House";
import Lake from "./components/Lake";
import Layers from "./components/Layers";
import Road from "./components/Road";
import { MountainInstances, Mountain } from "./components/Mountain";
import { TreeInstances, Tree } from "./components/Tree";
import {
  COLORS,
  COLORS_DARK,
  COLORS_LIGHT,
  SUMMER_TREES,
  TEXTURES,
} from "./constants";
import {
  getRandomNumber,
  pickRandomHash,
  pickRandomIntFromInterval,
  pickRandomSphericalPos,
} from "./utils";
import Clouds from "./components/Clouds";
import Mountains from "./components/Mountains";

export const WORLD_SIZE = 0.8;

// @ts-ignore
// window.$fxhashFeatures = {
//   instrument,
//   primaryBgColor,
//   secondaryBgColor,
//   lightingTheme: mainTheme,
//   shapeThemeColor: themeColor,
//   shapeThemeColor2: themeColor2,
//   shapeThemeColor3: themeColor3,
//   shapeThemeColor4: themeColor4,
//   shapeCount: shapes.length,
//   shapeComposition: objects.reduce(
//     (total, value) => (total += value.composition),
//     0
//   ),
// };

const layers = new Array(14).fill(null).map((o, i) => {
  // const color1 = pickRandomColorWithTheme(
  //   themeColor,
  //   colorTheme,
  //   shapes.length
  // );
  // const color2 = pickRandomColorWithTheme(
  //   themeColor2,
  //   colorTheme,
  //   shapes.length
  // );
  // const color3 = pickRandomColorWithTheme(
  //   themeColor3,
  //   colorTheme,
  //   shapes.length
  // );
  // const color4 = pickRandomColorWithTheme(
  //   themeColor4,
  //   colorTheme,
  //   shapes.length
  // );
  // const currentColor =
  //   i < shapes.length / 4
  //     ? color1
  //     : i < shapes.length / 2
  //     ? color2
  //     : i < shapes.length / 1.5
  //     ? color3
  //     : color4;

  // const secondColor = pickRandomHash(colorTheme);
  // const composition =
  //   shape +
  //   currentColor.charCodeAt(6) +
  //   secondColor.charCodeAt(6) +
  //   i +
  //   (objectMeta[i].coveringIndexes?.length || 0);

  const color = pickRandomHash(COLORS_DARK);
  const texture = pickRandomHash(TEXTURES);

  return {
    index: i,
    texture,
    color,
    // secondColor,
    // shape,
  };
});

const getRandomEarthPoints = (count: number) =>
  new Array(count).fill(null).map(() => pickRandomSphericalPos());

const Scene = () => {
  const { viewport, aspect, scene, gl } = useThree((state) => ({
    viewport: state.viewport,
    aspect: state.viewport.aspect,
    scene: state.scene,
    gl: state.gl,
  }));

  const earthRef = useRef<Mesh<SphereBufferGeometry>>(null);

  // const toneInitialized = useRef(false);

  // useEffect(() => {
  //   BASS.forEach((bass) => bass.sampler.toDestination());
  //   HITS.forEach((hit) => {
  //     hit.sampler.toDestination();
  //   });
  // }, []);

  // const initializeTone = useCallback(async () => {
  //   await start();
  //   toneInitialized.current = true;
  // }, []);

  const lightRef = useRef<PointLight>();
  useHelper(lightRef, PointLightHelper, 1, "red");

  const lightRef2 = useRef<PointLight>();
  useHelper(lightRef2, PointLightHelper, 1, "blue");

  useFrame(({ clock }) => {
    if (lightRef?.current) {
      lightRef.current.position.x =
        -2 + Math.sin(clock.getElapsedTime() / 2) * -5;
      lightRef.current.position.y =
        2 + Math.cos(clock.getElapsedTime() / 2) * -5;
    }
  });

  const treePoints = useMemo(
    () =>
      getRandomEarthPoints(10).map((v3) => {
        const itemCount = Math.round(pickRandomIntFromInterval(10, 25));

        return new Array(itemCount).fill(null).map((o, i) => ({
          v3: new Vector3(
            v3.x + getRandomNumber() / 1.75,
            v3.y + getRandomNumber() / 1.75,
            0
          ),
          colorLeaves: pickRandomHash(SUMMER_TREES),
          colorStem: "",
        }));
      }),
    []
  );

  const mountainPoints = useMemo(() => getRandomEarthPoints(2), []);

  return (
    <>
      <OrbitControls enabled={true} />
      <ambientLight intensity={0.2} />
      {/* <ambientLight intensity={1} /> */}
      <pointLight
        ref={lightRef}
        intensity={2}
        position={[-2, 2, 10]}
        color="#FCEEB5"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        // shadow-camera-near={0.1}
        // shadow-camera-far={20}
        // shadow-camera-left={-10}
        // shadow-camera-right={10}
        // shadow-camera-top={10}
        // shadow-camera-bottom={-10}
      />
      {/* <fog attach="fog" args={["white", 1, 400]} /> */}

      {/* <group rotation={[0, 0, Math.PI / 4]}> */}
      <group>
        <Earth ref={earthRef} />
        <House earthRef={earthRef} />
        <Clouds />
        <Mountains />

        {/* <Lake gl={gl} /> */}
        {/* <Road earthRef={earthRef} /> */}

        <Layers earthRef={earthRef} layers={layers} />
        <TreeInstances>
          {treePoints.flat().map((o, i) => (
            <Tree earthRef={earthRef} data={o} key={i} />
          ))}
        </TreeInstances>

        {/* <MountainInstances>
          {mountainPoints.map((o, i) => (
            <Mountain earthRef={earthRef} v3={o} key={i} />
          ))}
        </MountainInstances> */}
      </group>
    </>
  );
};

export default Scene;
