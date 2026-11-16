import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, Group } from "three";
import logoCutout from "@/assets/logo/chapel-frame-134-cutout.svg";

function Rings({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const time = useRef(0);
  const [gold, setGold] = useState("#cbb478");
  const [stone, setStone] = useState("#6e8178");

  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const goldValue = css.getPropertyValue("--scene-gold").trim();
    const stoneValue = css.getPropertyValue("--scene-stone").trim();
    if (goldValue) setGold(new Color(goldValue).getStyle());
    if (stoneValue) setStone(new Color(stoneValue).getStyle());
  }, []);

  useFrame(({ pointer }, rawDelta) => {
    if (!group.current || reduced) return;
    const dt = Math.min(rawDelta, 0.05);
    time.current += dt;
    group.current.rotation.y +=
      (pointer.x * 0.18 - group.current.rotation.y) * (1 - Math.exp(-2 * dt));
    group.current.rotation.z = Math.sin(time.current * 0.25) * 0.025;
    group.current.position.y = Math.sin(time.current * 0.5) * 0.065;
  });

  return (
    <group ref={group} rotation={[0.03, -0.13, -0.03]}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, 0.15, -0.28 - i * 0.24]}
          rotation={[0, 0, -0.23 + i * 0.09]}
          scale={[1, 1.3, 1]}
        >
          <torusGeometry args={[1.85 + i * 0.17, 0.03 + i * 0.006, 8, 120, Math.PI * 1.83]} />
          <meshStandardMaterial color={i === 1 ? gold : stone} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -2.2, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.03, 8, 96]} />
        <meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function SacredScene() {
  const [reduced, setReduced] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const canvas = document.createElement("canvas");
    setSupported(Boolean(canvas.getContext("webgl2")));
  }, []);

  return (
    <div className="scene-art" aria-hidden="true">
      <img className="scene-logo" src={logoCutout} alt="" />
      {supported ? (
        <Canvas
          className="scene-canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 7.2], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          frameloop={reduced ? "demand" : "always"}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={3} />
          <directionalLight position={[-4, 0, 2]} intensity={1.4} />
          <pointLight position={[2, 1, 5]} intensity={2.2} color="#fff0c2" />
          <Rings reduced={reduced} />
        </Canvas>
      ) : (
        <div className="scene-rings-fallback" />
      )}
    </div>
  );
}
