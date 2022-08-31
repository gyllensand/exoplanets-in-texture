import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Group,
  Mesh,
  PointLight,
  PointLightHelper,
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
  MOONS,
  MOUNTAINS,
  MIXED_TEXTURES,
  THEME_COLORS,
  TREE_THEMES,
  EARTHS,
  EARTH_TYPES,
  DRY_COLORS,
  DRY_TEXTURES,
  WET_TEXTURES,
  VEGETATIVE_COLORS,
  VEGETATIVE_TEXTURES,
  WET_COLORS,
  RESP_TEXTURES,
  RESP_COLORS,
} from "./constants";
import {
  getRandomNumber,
  pickRandomColorWithTheme,
  pickRandomDecimalFromInterval,
  pickRandomHash,
  pickRandomIntFromInterval,
  pickRandomSphericalPos,
  pickRandomTextureWithTheme,
} from "./utils";
import Trees from "./components/Trees/Trees";
import Crystals from "./components/Crystals";
import Bird from "./components/Bird";
import Moon from "./components/Moon";

export const WORLD_SIZE = 0.8;

const earthType = pickRandomHash(EARTHS);
let colorTheme: string;
let secondaryColorTheme: string;
let primaryTexture: number;

switch (earthType) {
  case EARTH_TYPES.DRY:
    colorTheme = pickRandomHash(DRY_COLORS);
    secondaryColorTheme = pickRandomHash(DRY_COLORS);
    primaryTexture = pickRandomHash(DRY_TEXTURES);
    break;
  case EARTH_TYPES.WET:
    colorTheme = pickRandomHash(WET_COLORS);
    secondaryColorTheme = pickRandomHash(WET_COLORS);
    primaryTexture = pickRandomHash(WET_TEXTURES);
    break;
  case EARTH_TYPES.VEGETATIVE:
    colorTheme = pickRandomHash(VEGETATIVE_COLORS);
    secondaryColorTheme = pickRandomHash(VEGETATIVE_COLORS);
    primaryTexture = pickRandomHash(VEGETATIVE_TEXTURES);
    break;

  default:
    colorTheme = pickRandomHash(THEME_COLORS);
    secondaryColorTheme = pickRandomHash(THEME_COLORS);
    primaryTexture = pickRandomHash(MIXED_TEXTURES);
    break;
}

const treeTheme = pickRandomHash(TREE_THEMES);
const mountains = pickRandomHash(MOUNTAINS);
const moons = pickRandomHash(MOONS);
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

  const texture = pickRandomTextureWithTheme(
    primaryTexture,
    RESP_TEXTURES[earthType],
    14
  );
  const color = pickRandomColorWithTheme(
    colorTheme,
    RESP_COLORS[earthType],
    25
  );

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

  const groupRef = useRef<Group>(null);
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
    // if (lightRef?.current) {
    //   lightRef.current.position.x =
    //     -2 + Math.sin(clock.getElapsedTime() / 2) * -5;
    //   lightRef.current.position.y =
    //     2 + Math.cos(clock.getElapsedTime() / 2) * -5;
    // }
    if (lightRef?.current) {
      lightRef.current.position.set(
        Math.cos(clock.getElapsedTime() / 4) * 5,
        Math.sin(clock.getElapsedTime() / 8) * 2,
        Math.sin(clock.getElapsedTime() / 4) * 5
      );
    }

    if (groupRef.current) {
      groupRef.current.position.set(
        Math.sin(clock.getElapsedTime()) / 100,
        Math.cos(clock.getElapsedTime() / 2) / 20,
        0
      );
    }
  });

  const treePoints = useMemo(
    () =>
      getRandomEarthPoints(10).map((v3) => {
        const itemCount = Math.round(pickRandomIntFromInterval(10, 25));
        const colorLeaves = pickRandomHash(treeTheme);

        return new Array(itemCount).fill(null).map((o, i) => ({
          v3: new Vector3(
            v3.x + getRandomNumber() / 1.75,
            v3.y + getRandomNumber() / 1.75,
            0
          ),
          colorLeaves,
          colorStem: "#aa4807",
          scale: pickRandomDecimalFromInterval(0.3, 1),
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
        // position={[-2, 2, 10]}
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
      <group ref={groupRef}>
        <Earth color={colorTheme} ref={earthRef} />
        {/* <House earthRef={earthRef} /> */}

        <Clouds type={clouds} color={colorTheme} />
        <Bird />
        {crystalPoints.flat().map((o, i) => (
          <Crystals earthRef={earthRef} data={o} key={i} />
        ))}
        {new Array(moons).fill(null).map((o, i) => (
          <Moon color={secondaryColorTheme} index={i} key={i} />
        ))}
        {new Array(mountains).fill(null).map((o, i) => (
          <Mountains key={i} />
        ))}
        <Trees objects={treePoints.flat()} earthRef={earthRef} />
        {/* <Lake /> */}
        {/* <Road earthRef={earthRef} /> */}
        <Layers earthRef={earthRef} layers={layers} />
      </group>
    </>
  );
};

export default Scene;
