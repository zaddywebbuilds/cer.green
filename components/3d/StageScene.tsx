'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useWebGL } from './useWebGL';

export type StageType = 'crystalise' | 'economise' | 'revitalise';

// ── Crystalise — dual-shell rotating gem ────────────────────────────────────

function CrystalStage({ reduced }: { reduced: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    outerRef.current.rotation.y = t * 0.42;
    outerRef.current.rotation.x = Math.sin(t * 0.32) * 0.22;
    innerRef.current.rotation.y = -t * 0.26;
    innerRef.current.rotation.z = t * 0.18;
  });

  return (
    <group>
      <mesh ref={innerRef} scale={1.05}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#0d3d2e"
          emissive="#123c32"
          emissiveIntensity={0.5}
          roughness={0.08}
          metalness={0.25}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh ref={outerRef} scale={1.45}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.52} />
      </mesh>
    </group>
  );
}

// ── Economise — illuminated network graph ───────────────────────────────────

const ECON_NODES: [number, number, number][] = [
  [0, 0, 0],      [1.1, 0.65, 0],   [-1.0, 0.6, 0.2],
  [0.3, -0.95, 0.1], [-0.4, 1.25, -0.2], [1.45, -0.5, 0.3],
  [-1.25, -0.55, 0.1], [0.65, 0.3, 0.75], [-0.2, -0.4, 0.85],
  [0.85, 1.35, 0.4],
];

function buildNetwork(nodes: [number, number, number][], threshold: number) {
  const arr: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const ni = nodes[i]!;
      const nj = nodes[j]!;
      const dx = ni[0] - nj[0];
      const dy = ni[1] - nj[1];
      const dz = ni[2] - nj[2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
        arr.push(...ni, ...nj);
      }
    }
  }
  return new Float32Array(arr);
}

function EconomiseStage({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const linePositions = useMemo(() => buildNetwork(ECON_NODES, 1.38), []);

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.32;
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.1;
  });

  return (
    <group ref={groupRef} scale={0.92}>
      {ECON_NODES.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.09, 6, 6]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#34d399" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// ── Revitalise — animated topographic terrain ────────────────────────────────

function RevitaliseStage({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reduced || !meshRef.current) return;
    const geo = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 1.7 + t * 0.85) * 0.19 + Math.cos(y * 1.4 + t * 0.65) * 0.14);
    }
    pos.needsUpdate = true;
  });

  return (
    <group rotation={[-0.52, 0.28, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[4.5, 3.5, 26, 20]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// ── Shared lighting ──────────────────────────────────────────────────────────

function Lights() {
  return (
    <>
      <ambientLight intensity={0.38} />
      <pointLight position={[2, 3, 2]} intensity={3.5} color="#34d399" distance={10} />
      <pointLight position={[-2, -1.5, 1]} intensity={1.8} color="#0d4f3a" distance={8} />
    </>
  );
}

// ── Public component ─────────────────────────────────────────────────────────

export function StageScene({ stage, active = true }: { stage: StageType; active?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGL();

  if (!webgl) return null;

  /*
   * `never` stops the render loop outright. Reduced motion renders one frame
   * and then holds it -- the geometry is still there, it just does not move --
   * and scrolling the scene out of view stops it rendering frames nobody sees.
   */
  const frameloop = reduced ? 'demand' : active ? 'always' : 'never';

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
      frameloop={frameloop}
      style={{ height: '100%' }}
    >
      <Lights />
      {stage === 'crystalise' && <CrystalStage reduced={reduced} />}
      {stage === 'economise' && <EconomiseStage reduced={reduced} />}
      {stage === 'revitalise' && <RevitaliseStage reduced={reduced} />}
    </Canvas>
  );
}
