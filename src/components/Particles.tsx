import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Color, Mesh, Object3D } from "three";
import { RESP_COLORS } from "../constants";
import { WORLD_SIZE, earthType } from "../Scene";
import { pickRandomHash, pickRandomSphericalPos } from "../utils";

const Particles = ({ count }: { count: number }) => {
  const mesh = useRef<Mesh>();
  const dummy = useMemo(() => new Object3D(), []);
  const tempColor = useMemo(() => new Color(), []);
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(count)
          .fill(null)
          .flatMap((o, i) =>
            tempColor.set(pickRandomHash(RESP_COLORS[earthType])).toArray()
          )
      ),
    [tempColor, count]
  );

  const particles = useMemo(() => {
    const temp = [];

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.001 + Math.random() / 200;
      const { x, y, z } = pickRandomSphericalPos();

      temp.push({
        t,
        factor,
        speed,
        mx: 0,
        my: 0,
        x,
        y,
        z,
      });
    }

    return temp;
  }, [count]);

  useFrame(() => {
    const timeFactor = 1000;

    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y } = particle;
      t = particle.t += speed / 2;

      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      particle.mx += particle.mx * 0.01;
      particle.my += -1 - particle.my * 0.01;

      dummy.position.setFromSphericalCoords(
        WORLD_SIZE + 20,
        (particle.my / timeFactor) * b +
          y +
          Math.sin((t / timeFactor) * factor) +
          (Math.cos(t * 2) * factor) / timeFactor,
        (particle.my / timeFactor) * b +
          x +
          Math.cos((t / timeFactor) * factor) +
          (Math.sin(t * 3) * factor) / timeFactor
      );

      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // @ts-ignore
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    // @ts-ignore
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronBufferGeometry attach="geometry" args={[0.1, 0]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </dodecahedronBufferGeometry>
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
};

export default Particles;
