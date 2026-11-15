import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group, Color } from "three";

function Sculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const time = useRef(0);
  const [gold, setGold] = useState("gold");
  const [stone, setStone] = useState("gray");
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setGold(new Color(css.getPropertyValue("--scene-gold").trim()).getStyle());
    setStone(new Color(css.getPropertyValue("--scene-stone").trim()).getStyle());
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
      <RoundedBox args={[0.23, 2.7, 0.28]} radius={0.035} smoothness={4} position={[0, 0.05, 0.35]}>
        <meshStandardMaterial color={gold} metalness={0.85} roughness={0.24} />
      </RoundedBox>
      <RoundedBox args={[1.5, 0.23, 0.28]} radius={0.035} smoothness={4} position={[0, 0.64, 0.35]}>
        <meshStandardMaterial color={gold} metalness={0.85} roughness={0.24} />
      </RoundedBox>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, 0.15, -0.22 - i * 0.2]}
          rotation={[0, 0, -0.23 + i * 0.09]}
          scale={[1, 1.3, 1]}
        >
          <torusGeometry args={[1.55 + i * 0.14, 0.026 + i * 0.005, 8, 120, Math.PI * 1.83]} />
          <meshStandardMaterial color={i === 1 ? gold : stone} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -1.85, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.025, 8, 96]} />
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
  if (!supported)
    return (
      <div className="scene-fallback" aria-label="Golden cross">
        ✝
      </div>
    );
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.2], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={3} />
      <directionalLight position={[-4, 0, 2]} intensity={1.4} />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[5, 5, 1]} />
        <Lightformer
          intensity={2}
          position={[-5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[8, 3, 1]}
        />
      </Environment>
      <Sculpture reduced={reduced} />
    </Canvas>
  );
}
