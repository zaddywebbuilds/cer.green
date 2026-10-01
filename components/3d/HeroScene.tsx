'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useWebGL } from './useWebGL';

function Crystal({ reduced }: { reduced: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    outerRef.current.rotation.y = t * 0.14;
    outerRef.current.rotation.x = Math.sin(t * 0.22) * 0.14;
    innerRef.current.rotation.y = -t * 0.09;
    innerRef.current.rotation.z = t * 0.07;
  });

  return (
    <group position={[2.4, 0.2, -1]}>
      {/* Solid core */}
      <mesh ref={innerRef} scale={1.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#0d3d2e"
          emissive="#0a2218"
          roughness={0.08}
          metalness={0.18}
          transparent
          opacity={0.65}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh ref={outerRef} scale={1.94}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function FloatingShards({ reduced }: { reduced: boolean }) {
  const refs = [
    useRef<THREE.Mesh>(null!),
    useRef<THREE.Mesh>(null!),
    useRef<THREE.Mesh>(null!),
  ];
  const config = useMemo(() => [
    { pos: [-3.8, 1.6, -0.4] as [number, number, number], speed: 0.38, amp: 0.09 },
    { pos: [4.8, -1.3, 0.4] as [number, number, number], speed: 0.28, amp: 0.06 },
    { pos: [0.6, 2.8, -1.4] as [number, number, number], speed: 0.46, amp: 0.11 },
  ], []);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const c = config[i];
      if (!c) return;
      ref.current.rotation.y = t * c.speed;
      ref.current.rotation.x = Math.sin(t * c.speed * 0.7) * 0.3;
      ref.current.position.y = c.pos[1]! + Math.sin(t * c.speed + i * 1.2) * c.amp;
    });
  });

  return (
    <>
      {config.map((c, i) => (
        <mesh key={i} ref={refs[i]} position={c.pos} scale={0.28}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

/**
 * Seeded PRNG. The scatter needs to look random, not be random -- a fixed seed
 * keeps the field identical on every load and keeps the geometry a pure
 * function of `count`.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const random = mulberry32(0x5e3d);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (random() - 0.5) * 24;
      arr[i * 3 + 1] = (random() - 0.5) * 13;
      arr[i * 3 + 2] = (random() - 0.5) * 9 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (reduced || !pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.022;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.042} color="#34d399" transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

function CameraParallax({ reduced }: { reduced: boolean }) {
  // Camera and pointer are read from the per-frame state rather than captured
  // from useThree, so nothing owned by render is mutated here.
  useFrame((state) => {
    if (reduced) return;
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.012;
    camera.position.y += (pointer.y * 0.45 - camera.position.y) * 0.012;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const reduced = usePrefersReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <color attach="background" args={['#081b16']} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[6, 8, 5]} intensity={0.45} color="#c8fce8" />
      <pointLight position={[-4, 2.5, 2]} intensity={5} color="#34d399" distance={15} />
      <pointLight position={[5, -3, -2]} intensity={2.2} color="#0d4f3a" distance={12} />

      <Crystal reduced={reduced} />
      {!isMobile && <FloatingShards reduced={reduced} />}
      <Particles count={isMobile ? 55 : 95} reduced={reduced} />
      <CameraParallax reduced={reduced} />
    </>
  );
}

export function HeroScene({ active = true }: { active?: boolean }) {
  const webgl = useWebGL();
  const reduced = usePrefersReducedMotion();

  if (!webgl) return null;

  // Holds a single frame under reduced motion, and stops entirely once the
  // hero is scrolled past.
  const frameloop = reduced ? 'demand' : active ? 'always' : 'never';

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={[1, 1.5]}
      frameloop={frameloop}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
