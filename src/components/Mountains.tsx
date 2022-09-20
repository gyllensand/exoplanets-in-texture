import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { EARTH_TYPES, MOUNTAIN_TYPES, RESP_COLORS } from "../constants";
import { earthType, WORLD_SIZE } from "../Scene";
import {
  getRandomNumber,
  pickRandomDecimalFromInterval,
  pickRandomHash,
} from "../utils";

const Mountains = () => {
  const type = useMemo(() => pickRandomHash(MOUNTAIN_TYPES), []);

  const texture = useTexture({
    displacementMap: `/textures/mountains/${type}/DisplacementMap.jpg`,
    normalMap: `/textures/mountains/${type}/NormalMap.jpg`,
    aoMap: `/textures/mountains/${type}/AmbientOcclusionMap.jpg`,
  });

  const size = useMemo(() => pickRandomDecimalFromInterval(0.8, 1.2), []);
  const depth = useMemo(() => pickRandomDecimalFromInterval(0.002, 0.02), []);
  const rotationX = useMemo(() => getRandomNumber() * 5, []);
  const rotationY = useMemo(() => getRandomNumber() * 5, []);
  // const color = useMemo(() => pickRandomHash(RESP_COLORS[earthType]), []);
  const color = useMemo(
    () =>
      earthType === EARTH_TYPES.DRY
        ? "#aa4807"
        : earthType === EARTH_TYPES.WET
        ? "#ffffff"
        : "#777777",
    []
  );

  return (
    <mesh receiveShadow rotation={[rotationX, rotationY, 0]}>
      <sphereBufferGeometry
        args={[WORLD_SIZE - depth, 64, 64, 0, size, 1, size]}
      />
      {/* <meshPhysicalMaterial
        attach="material"
        roughness={0.8}
        {...texture}
        displacementScale={1}
        reflectivity={1}
        color={color}
      /> */}
      <meshStandardMaterial
        attach="material"
        roughness={0.8}
        {...texture}
        color={color}
        displacementScale={1}
      />
    </mesh>
  );
};

export default Mountains;
