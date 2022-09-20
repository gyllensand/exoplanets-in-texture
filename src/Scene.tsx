import { Float, OrbitControls, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Mesh,
  PointLight,
  PointLightHelper,
  SphereBufferGeometry,
  Vector3,
} from "three";
import Earth from "./components/Earth";
import Pyramids from "./components/Pyramids";
import Clouds from "./components/Clouds";
import Mountains from "./components/Mountains";
import Layers from "./components/Layers";
import {
  CLOUD_TYPES,
  MOONS,
  MOUNTAINS_AMOUNT,
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
  SUN_ROTATION,
  PYRAMIDS_AMOUNT,
  TREES_AMOUNT,
  PARTICLES_AMOUNT,
  LIGHT_THEMES,
  BG_THEMES,
} from "./constants";
import {
  getRandomNumber,
  getSizeByAspect,
  pickRandomColorWithTheme,
  pickRandomDecimalFromInterval,
  pickRandomHash,
  pickRandomIntFromInterval,
  pickRandomSphericalPos,
  pickRandomTextureWithTheme,
} from "./utils";
import Trees from "./components/Trees/Trees";
import Crystals from "./components/Crystals";
import Moon from "./components/Moon";
import Particles from "./components/Particles";

export const WORLD_SIZE = 0.8;
export const earthType = pickRandomHash(EARTHS);

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
const sunTheme = pickRandomHash(LIGHT_THEMES);
const bgTheme = pickRandomHash(BG_THEMES);
const mountains = pickRandomHash(MOUNTAINS_AMOUNT);
const pyramids = pickRandomHash(PYRAMIDS_AMOUNT);
const particles = pickRandomHash(PARTICLES_AMOUNT);
const trees = pickRandomHash(TREES_AMOUNT);
const moons = pickRandomHash(MOONS);
const clouds = pickRandomHash(CLOUD_TYPES);
const earthRotation = getRandomNumber() * Math.PI;
const sunRotation = pickRandomHash(SUN_ROTATION);

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
    RESP_TEXTURES.length
  );
  const color = pickRandomColorWithTheme(
    colorTheme,
    RESP_COLORS[earthType],
    THEME_COLORS.length
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
  const earthRef = useRef<Mesh<SphereBufferGeometry>>(null);
  const { viewport, aspect, scene, gl } = useThree((state) => ({
    viewport: state.viewport,
    aspect: state.viewport.aspect,
    scene: state.scene,
    gl: state.gl,
  }));

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

  useFrame(({ clock }) => {
    if (lightRef?.current) {
      lightRef.current.position.set(
        Math.cos(clock.getElapsedTime() / 4) * 10,
        Math.sin(clock.getElapsedTime() / 8) * 2,
        Math.sin(clock.getElapsedTime() / 4) * 10
      );
    }
  });

  const treePoints = useMemo(
    () =>
      getRandomEarthPoints(trees).map((v3) => {
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
          scale: pickRandomDecimalFromInterval(0.2, 1),
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

  const pyramidPoints = useMemo(
    () =>
      getRandomEarthPoints(pyramids).map((v3) => {
        const color = pickRandomHash(RESP_COLORS[earthType]);
        const size = pickRandomDecimalFromInterval(0.075, 0.1);

        return {
          v3: new Vector3(
            v3.x + getRandomNumber() / 1.75,
            v3.y + getRandomNumber() / 1.75,
            0
          ),
          color,
          size,
        };
      }),
    []
  );

  console.log(gl.info.render);

  return (
    <>
      <color attach="background" args={[bgTheme]} />
      <OrbitControls
        enabled={true}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
        maxDistance={6}
        minDistance={2}
      />
      <ambientLight intensity={0.2} />
      <group
        scale={[
          getSizeByAspect(1, aspect),
          getSizeByAspect(1, aspect),
          getSizeByAspect(1, aspect),
        ]}
        rotation={[0, sunRotation, 0]}
      >
        <pointLight
          ref={lightRef}
          intensity={2}
          color={sunTheme}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      </group>

      <Particles count={particles} />
      <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
        <group
          scale={[
            getSizeByAspect(1, aspect),
            getSizeByAspect(1, aspect),
            getSizeByAspect(1, aspect),
          ]}
          rotation={[0, earthRotation, 0]}
        >
          <Earth color={colorTheme} ref={earthRef} />

          {pyramidPoints.flat().map((o, i) => (
            <Pyramids earthRef={earthRef} data={o} key={i} />
          ))}
          {crystalPoints.flat().map((o, i) => (
            <Crystals earthRef={earthRef} data={o} key={i} />
          ))}
          {new Array(moons).fill(null).map((o, i) => (
            <Moon color={secondaryColorTheme} index={i} key={i} />
          ))}
          {new Array(mountains).fill(null).map((o, i) => (
            <Mountains key={i} />
          ))}

          <Clouds type={clouds} color={colorTheme} />
          <Trees objects={treePoints.flat()} earthRef={earthRef} />
          <Layers earthRef={earthRef} layers={layers} />
        </group>
      </Float>
    </>
  );
};

export default Scene;
