import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createCertificateTexture } from '../../lib/certificateTexture';

function CertificateCard({ story }) {
  const meshRef = useRef();
  const { gl } = useThree();
  const texture = useMemo(() => createCertificateTexture(story), [story]);
  const isTouchRef = useRef(false);
  const targetRot = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(2.9, 3.9, 24, 24);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = -Math.pow(x / 1.45, 2) * 0.16 + Math.pow(y / 1.95, 2) * 0.05;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
    }

    const canvas = gl.domElement;
    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') {
        isTouchRef.current = true;
        return;
      }
      isTouchRef.current = false;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRot.current = { x: -ny * 0.28, y: nx * 0.35 };
    };

    const handlePointerLeave = () => {
      targetRot.current = { x: 0, y: 0 };
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (isTouchRef.current) {
      const t = state.clock.getElapsedTime();
      const targetX = Math.sin(t * 1.1) * 0.08;
      const targetY = Math.cos(t * 0.8) * 0.12;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, delta * 3);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, delta * 3);
    } else {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRot.current.x, delta * 6);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRot.current.y, delta * 6);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        map={texture}
        roughness={0.55}
        metalness={0.1}
        transparent
        opacity={0.95}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function CertificateScene({ story, isTabVisible = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      dpr={[1, 2]}
      frameloop={isTabVisible ? 'always' : 'never'}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      className="w-full h-full cursor-pointer"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} />
      <directionalLight position={[-3, -3, -2]} intensity={0.3} color="#22d3ee" />
      <CertificateCard story={story} />
    </Canvas>
  );
}
