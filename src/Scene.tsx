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
import { a, useSpring } from "@react-spring/three";
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
import Clouds from "./components/Clouds";
import Mountains from "./components/Mountains";
import Lake from "./components/Lake";
import Layers from "./components/Layers";
import Road from "./components/Road";
import {
  CLOUDS,
  MOUNTAINS,
  SUMMER_COLORS,
  TEXTURES,
  THEME_COLORS,
  TREE_COLORS,
  TREE_THEMES,
} from "./constants";
import {
  getRandomNumber,
  pickRandomColorWithTheme,
  pickRandomDecimalFromInterval,
  pickRandomHash,
  pickRandomIntFromInterval,
  pickRandomSphericalPos,
} from "./utils";
import Trees from "./components/Trees/Trees";
import { easings } from "react-spring";
import Crystals from "./components/Crystals";

export const WORLD_SIZE = 0.8;

const colorTheme = pickRandomHash(THEME_COLORS);
const treeTheme = pickRandomHash(TREE_THEMES);
const mountains = pickRandomHash(MOUNTAINS);
const clouds = pickRandomHash(CLOUDS);

// @ts-ignore
// window.$fxhashFeatures = {
//   instrument,
//   primaryBgColor,
//   secondaryBgColor,
//   lightingTheme: mainTheme,
//   shapeCount: shapes.length,
//   shapeComposition: objects.reduce(
//     (total, value) => (total += value.composition),
//     0
//   ),
// };

const layers = new Array(14).fill(null).map((o, i) => {
  // const composition =
  //   shape +
  //   currentColor.charCodeAt(6) +
  //   secondColor.charCodeAt(6) +
  //   i +
  //   (objectMeta[i].coveringIndexes?.length || 0);

  const primaryColor = pickRandomHash(THEME_COLORS);
  const color = pickRandomColorWithTheme(colorTheme, THEME_COLORS, 14);
  const texture = pickRandomHash(TEXTURES);

  return {
    index: i,
    texture,
    color,
  };
});

export const getRandomEarthPoints = (count: number) =>
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

  const [{ earthPosition }, setIdle] = useSpring(() => ({
    earthPosition: [0, 0, 0],
  })) as any;

  useEffect(() => {
    setIdle.start(() => ({
      from: {
        earthPosition: [0, 0, 0],
      },
      to: {
        earthPosition: [0, 0.05, 0],
      },
      loop: { reverse: true },
      config: { easing: easings.easeInOutSine, duration: 5000 },
    }));
  }, [setIdle]);

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
        const itemCount = Math.round(pickRandomIntFromInterval(5, 10));
        const colorLeaves = pickRandomHash(treeTheme);

        return new Array(itemCount).fill(null).map((o, i) => ({
          v3: new Vector3(
            v3.x + getRandomNumber() / 1.75,
            v3.y + getRandomNumber() / 1.75,
            0
          ),
          colorLeaves,
          colorStem: "brown",
          scale: pickRandomDecimalFromInterval(0.5, 1.2),
        }));
      }),
    []
  );

  const crystalPoints = useMemo(
    () =>
      getRandomEarthPoints(3).map((v3) => {
        const itemCount = Math.round(pickRandomIntFromInterval(2, 6));
        const color = pickRandomHash(THEME_COLORS);

        return new Array(itemCount).fill(null).map((o, i) => ({
          v3: new Vector3(
            v3.x + getRandomNumber() / 1.75,
            v3.y + getRandomNumber() / 1.75,
            0
          ),
          color,
        }));
      }),
    []
  );

  console.log(gl.info.render);

  return (
    <>
      {/* <color attach="background" args={["#000000"]} /> */}
      <OrbitControls
        enabled={true}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
        // maxDistance={6}
        // minDistance={2}
      />
      <ambientLight intensity={0.2} />
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
      <a.group position={earthPosition}>
        <Earth color={colorTheme} ref={earthRef} />
        {/* <House earthRef={earthRef} /> */}
        <Clouds type={clouds} />
        {crystalPoints.flat().map((o, i) => (
          <Crystals earthRef={earthRef} data={o} key={i} />
        ))}

        {/* {new Array(mountains).fill(null).map((o, i) => (
          <Mountains key={i} />
        ))} */}
        <Trees objects={treePoints.flat()} earthRef={earthRef} />
        {/* <Lake /> */}
        {/* <Road earthRef={earthRef} /> */}
        <Layers earthRef={earthRef} layers={layers} />
      </a.group>
    </>
  );
};

export default Scene;
