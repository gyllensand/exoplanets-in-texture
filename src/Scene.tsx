import { Float, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { Mesh, PointLight, SphereBufferGeometry, Vector3 } from "three";
import Earth from "./components/Earth";
import Pyramid from "./components/Pyramid";
import Clouds from "./components/Clouds";
import Mountain from "./components/Mountain";
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
  AMBIENT_LIGHT,
  TEXTURE_TYPES,
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
  range,
} from "./utils";
import Trees from "./components/Trees/Trees";
import Crystal from "./components/Crystal";
import Moon from "./components/Moon";
import Particles from "./components/Particles";
import { Player, start } from "tone";

export const WORLD_SIZE = 0.8;
export const earthType = pickRandomHash(EARTHS);
const earthTypeNames = ["mixed", "dry", "wet", "vegetative"];

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

const AUDIO_PATHS = [
  `/audio/outdoor.mp3`,
  `/audio/desert.mp3`,
  `/audio/arctic.mp3`,
  `/audio/forest.mp3`,
  `/audio/ocean.mp3`,
  `/audio/outdoor2.mp3`,
];

const audioPath =
  primaryTexture === TEXTURE_TYPES.WATER
    ? AUDIO_PATHS[4]
    : earthType === EARTH_TYPES.MIXED
    ? pickRandomHash([AUDIO_PATHS[0], AUDIO_PATHS[5]])
    : AUDIO_PATHS[earthType];

const AUDIO = new Player({
  url: audioPath,
  loop: true,
});

const treeTheme = pickRandomHash(TREE_THEMES);
const sunTheme = pickRandomHash(LIGHT_THEMES);
const bgTheme = pickRandomHash(BG_THEMES);
const mountains = pickRandomHash(MOUNTAINS_AMOUNT);
const pyramids = pickRandomHash(PYRAMIDS_AMOUNT);
const particles = pickRandomHash(PARTICLES_AMOUNT);
const trees = pickRandomHash(TREES_AMOUNT);
const moons = pickRandomHash(MOONS);
const ambientLightIntensity = pickRandomHash(AMBIENT_LIGHT);
const clouds = pickRandomHash(CLOUD_TYPES);
const earthRotation = getRandomNumber() * Math.PI;
const sunRotation = pickRandomHash(SUN_ROTATION);

const layers = new Array(14).fill(null).map((o, i) => {
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
  const composition = texture + color.charCodeAt(6) + i;

  return {
    index: i,
    texture,
    composition,
    color,
  };
});

export const getRandomEarthPoints = (count: number) =>
  new Array(count).fill(null).map(() => pickRandomSphericalPos());

// @ts-ignore
window.$fxhashFeatures = {
  earthType: earthTypeNames[earthType],
  primaryTexture,
  colorTheme,
  sunTheme,
  bgTheme,
  cloudTheme: clouds,
  ambientLightIntensity,
  particlesCount: particles,
  shapeComposition: layers.reduce(
    (total, value) => (total += value.composition),
    0
  ),
};

const Scene = ({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement> }) => {
  const earthRef = useRef<Mesh<SphereBufferGeometry>>(null);
  const lightRef = useRef<PointLight>();
  const controlsRef = useRef(null);
  const toneInitialized = useRef(false);
  const { aspect } = useThree((state) => ({
    aspect: state.viewport.aspect,
  }));

  useFrame(({ clock }) => {
    if (lightRef?.current) {
      lightRef.current.position.set(
        Math.cos(clock.getElapsedTime() / 4) * 10,
        Math.sin(clock.getElapsedTime() / 8) * 2,
        Math.sin(clock.getElapsedTime() / 4) * 10
      );
    }

    if (controlsRef?.current) {
      const interpolatedVolume = range(
        2,
        6,
        primaryTexture === TEXTURE_TYPES.WATER ||
          earthType === EARTH_TYPES.VEGETATIVE
          ? -5
          : 0,
        primaryTexture === TEXTURE_TYPES.WATER ||
          earthType === EARTH_TYPES.VEGETATIVE
          ? -20
          : -15,
        // @ts-ignore
        controlsRef.current.getDistance()
      );

      AUDIO.volume.value = Math.round(interpolatedVolume * 100) / 100;
    }
  });

  const onPointerDown = useCallback(async () => {
    if (!toneInitialized.current) {
      await start();
      toneInitialized.current = true;
    }

    if (AUDIO.state !== "started" && AUDIO.loaded) {
      AUDIO.start();
    }
  }, []);

  useEffect(() => {
    AUDIO.toDestination();
  }, []);

  useEffect(() => {
    const ref = canvasRef?.current;

    if (!ref) {
      return;
    }

    ref.addEventListener("pointerdown", onPointerDown);

    return () => {
      ref.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onPointerDown, canvasRef]);

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

  return (
    <>
      <color attach="background" args={[bgTheme]} />
      <OrbitControls
        ref={controlsRef}
        enabled={true}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
        maxDistance={6}
        minDistance={2}
      />
      <ambientLight intensity={ambientLightIntensity} />
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
            <Pyramid earthRef={earthRef} data={o} key={i} />
          ))}
          {crystalPoints.flat().map((o, i) => (
            <Crystal earthRef={earthRef} data={o} key={i} />
          ))}
          {new Array(moons).fill(null).map((o, i) => (
            <Moon color={secondaryColorTheme} index={i} key={i} />
          ))}
          {new Array(mountains).fill(null).map((o, i) => (
            <Mountain key={i} />
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
