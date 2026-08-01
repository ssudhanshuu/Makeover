"use client";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useMemo } from "react";

function Lipstick(props) {
  return (
    <group {...props} scale={0.4}>
      {/* Base */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Middle band */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.3, 32]} />
        <meshPhysicalMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Bullet */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 1.5, 32]} />
        <meshPhysicalMaterial color="#be185d" metalness={0.1} roughness={0.3} clearcoat={0.5} />
      </mesh>
      {/* Slanted Tip */}
      <mesh position={[0, 1.45, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.35, 0.35, 0.5, 32]} />
        <meshPhysicalMaterial color="#be185d" metalness={0.1} roughness={0.3} clearcoat={0.5} />
      </mesh>
    </group>
  );
}

function MakeupBrush(props) {
  return (
    <group {...props} scale={0.5}>
      {/* Handle */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 3, 32]} />
        <meshPhysicalMaterial color="#f9a8d4" metalness={0.2} roughness={0.1} />
      </mesh>
      {/* Ferrule (Metal part) */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.2, 1, 32]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bristles */}
      <mesh position={[0, 1.5, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
        <meshPhysicalMaterial color="#333" roughness={0.8} />
      </mesh>
    </group>
  );
}

function MakeupPalette(props) {
  return (
    <group {...props} scale={0.5}>
      {/* Case Bottom */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshPhysicalMaterial color="#222" roughness={0.5} />
      </mesh>
      {/* Pans */}
      <mesh position={[-1, 0.11, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshPhysicalMaterial color="#fca5a5" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshPhysicalMaterial color="#fcd34d" roughness={0.6} />
      </mesh>
      <mesh position={[1, 0.11, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshPhysicalMaterial color="#d8b4fe" roughness={0.6} />
      </mesh>
    </group>
  );
}

function RandomFloatingObjects() {
  const items = useMemo(() => {
    const list = [];
    // 5 Lipsticks
    for (let i = 0; i < 5; i++) {
      list.push({
        type: "lipstick",
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 2],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        floatSpeed: 1 + Math.random(),
        rotationSpeed: 0.5 + Math.random(),
      });
    }
    // 4 Brushes
    for (let i = 0; i < 4; i++) {
      list.push({
        type: "brush",
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 2],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        floatSpeed: 1 + Math.random(),
        rotationSpeed: 0.5 + Math.random(),
      });
    }
    // 3 Palettes
    for (let i = 0; i < 3; i++) {
      list.push({
        type: "palette",
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 3],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        floatSpeed: 1 + Math.random(),
        rotationSpeed: 0.5 + Math.random(),
      });
    }
    return list;
  }, []);

  return (
    <>
      {items.map((item, index) => (
        <Float key={index} speed={item.floatSpeed} rotationIntensity={item.rotationSpeed} floatIntensity={1}>
          {item.type === "lipstick" && <Lipstick position={item.position} rotation={item.rotation} />}
          {item.type === "brush" && <MakeupBrush position={item.position} rotation={item.rotation} />}
          {item.type === "palette" && <MakeupPalette position={item.position} rotation={item.rotation} />}
        </Float>
      ))}
    </>
  );
}

export default function BackgroundAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" style={{ background: "linear-gradient(-45deg, #fce7f3, #fbcfe8, #f3e8ff, #fae8ff, #fff1f2)" }}>
      {/* 2D background blobs to retain the soft colorful feel behind the 3D items */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-400/30 blur-[80px] mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-400/30 blur-[80px] mix-blend-multiply" />
      <div className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-rose-300/30 blur-[80px] mix-blend-multiply" />
      <div className="absolute bottom-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-yellow-200/30 blur-[80px] mix-blend-multiply" />

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffe4e6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e0e7ff" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <RandomFloatingObjects />
        </Suspense>
      </Canvas>
    </div>
  );
}
