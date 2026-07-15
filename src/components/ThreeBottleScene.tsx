"use client";

import { useRef, useMemo, useCallback, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function SkincareBottle({ scrollY = 0 }: { scrollY: number }) {
  const bottleRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  const [labelTexture, setLabelTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background - Warm Cream
    ctx.fillStyle = "#FAF5EF";
    ctx.fillRect(0, 0, 512, 512);

    // Gold borders
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 472, 472);
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 448, 448);

    // Brand Name (AURELIA)
    ctx.fillStyle = "#111111";
    ctx.font = "normal 38px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("A U R E L I A", 256, 120);

    // Subtitle
    ctx.fillStyle = "#8F9779";
    ctx.font = "bold 13px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText("BOTANICAL SCIENCE", 256, 160);

    // Separator line
    ctx.strokeStyle = "rgba(17, 17, 17, 0.12)";
    ctx.beginPath();
    ctx.moveTo(120, 200);
    ctx.lineTo(392, 200);
    ctx.stroke();

    // Product Name
    ctx.fillStyle = "#111111";
    ctx.font = "normal 30px Georgia, serif";
    ctx.fillText("AURA RADIANCE", 256, 260);
    ctx.fillText("SERUM", 256, 305);

    // Active ingredients info
    ctx.fillStyle = "#444444";
    ctx.font = "italic 16px Georgia, serif";
    ctx.fillText("Vitamin C • Niacinamide • Green Tea", 256, 365);

    // Dermal proof badge
    ctx.fillStyle = "#8F9779";
    ctx.font = "bold 11px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText("CLINICALLY PROVEN FORMULA", 256, 420);

    // Volume
    ctx.fillStyle = "#666666";
    ctx.font = "normal 14px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText("30ml / 1.0 fl. oz.", 256, 455);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    setLabelTexture(texture);

    return () => {
      texture.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!bottleRef.current) return;

    // Mouse hover tilt
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    // Scroll-based rotation
    const scrollRotationY = scrollY * 0.003;
    const scrollRotationX = scrollY * 0.001;
    const scrollScale = Math.max(0.7, 1.25 - scrollY * 0.0004);

    const dt = state.clock.getDelta();
    const lerpFactor = Math.min(1, 8 * dt); // frame-rate independent lerp

    bottleRef.current.rotation.x = THREE.MathUtils.lerp(
      bottleRef.current.rotation.x,
      targetY + scrollRotationX + 0.1,
      lerpFactor
    );
    bottleRef.current.rotation.y = THREE.MathUtils.lerp(
      bottleRef.current.rotation.y,
      targetX + scrollRotationY,
      lerpFactor
    );
    bottleRef.current.scale.setScalar(
      THREE.MathUtils.lerp(bottleRef.current.scale.x, scrollScale, lerpFactor)
    );

    // Animate fluid slightly
    if (liquidRef.current) {
      liquidRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03 - 0.25;
    }
  });

  return (
    <group ref={bottleRef}>
      <Center>
        {/* Cap – Champagne Gold Pump */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.6, 32]} />
          <meshStandardMaterial
            color="#E6D3B6"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={2}
          />
        </mesh>

        {/* Cap Nozzle */}
        <mesh position={[0, 2.3, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
          <meshStandardMaterial
            color="#E6D3B6"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={2}
          />
        </mesh>

        {/* Pump Collar */}
        <mesh position={[0, 1.7, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.2, 32]} />
          <meshStandardMaterial color="#111111" metalness={0.2} roughness={0.8} />
        </mesh>

        {/* Inner Serum – no shadow (inside the bottle) */}
        <mesh ref={liquidRef} position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 2.7, 32]} />
          <meshStandardMaterial
            color="#FCE1D4"
            roughness={0.4}
            metalness={0.0}
            opacity={0.9}
            transparent
          />
        </mesh>

        {/* Dip Tube (Serum pump tube) inside serum */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.7, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.9}
            thickness={0.1}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Glass Bottle Body */}
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.05, 3.4, 64]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.92}
            thickness={0.8}
            roughness={0.05}
            ior={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            transparent
            opacity={0.35}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Curved Elegance Label wrapped around bottle */}
        {labelTexture ? (
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[1.06, 1.06, 1.7, 32, 1, true, -Math.PI / 3.5, (2 * Math.PI) / 3.5]} />
            <meshStandardMaterial
              map={labelTexture}
              roughness={0.8}
              metalness={0.0}
              transparent
            />
          </mesh>
        ) : (
          <mesh position={[0, -0.3, 1.02]}>
            <planeGeometry args={[1.1, 1.6]} />
            <meshStandardMaterial
              color="#FAF5EF"
              roughness={0.95}
              metalness={0.0}
            />
          </mesh>
        )}
      </Center>
    </group>
  );
}

// Lightweight botanical particle system
function Particles({ count = 60 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sp[i] = 0.008 + Math.random() * 0.012;
    }
    return [pos, sp];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i]; // Bug fix: was 'sp' — variable is named 'speeds'
      if (arr[i * 3 + 1] < -4) arr[i * 3 + 1] = 4;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] + i) * 0.002;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8F9779"
        size={0.055}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// Helper to auto-restore WebGL context on crash / GPU switching
function WebGLContextHandler() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvasEl = gl.domElement;
    if (!canvasEl) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Attempting to restore context...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored successfully.");
    };

    canvasEl.addEventListener("webglcontextlost", handleContextLost, false);
    canvasEl.addEventListener("webglcontextrestored", handleContextRestored, false);

    return () => {
      canvasEl.removeEventListener("webglcontextlost", handleContextLost);
      canvasEl.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl]);

  return null;
}

export default function ThreeBottleScene({ scrollY = 0 }: { scrollY: number }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false, // Bug fix: was true → major GPU overhead
        }}
        shadows
        dpr={[1, 2]} // Auto-cap DPR at 2× for performance
      >
        <WebGLContextHandler />
        <ambientLight intensity={1.4} />
        {/* Key light */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[512, 512]} // Reduced from 1024 – visually identical
        />
        {/* Warm fill */}
        <directionalLight
          position={[-5, -2, -5]}
          intensity={0.9}
          color="#FFF0E5"
        />
        {/* Soft bounce */}
        <directionalLight
          position={[0, -5, 5]}
          intensity={0.4}
          color="#FAF5EF"
        />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.2}>
            <SkincareBottle scrollY={scrollY} />
          </Float>
        </Suspense>

        <Particles count={60} />
      </Canvas>
    </div>
  );
}
