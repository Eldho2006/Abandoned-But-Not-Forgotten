import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function pseudoNoise(x, y, z) {
  return (
    Math.sin(x * 2.5 + y * 1.7) * 0.4 +
    Math.cos(y * 2.8 + z * 2.2) * 0.35 +
    Math.sin(z * 3.1 + x * 1.9) * 0.25
  );
}

function ProceduralPlanet({ body = 'mars' }) {
  const meshRef = useRef();

  const { geometry } = useMemo(() => {
    // Low-poly icosahedron: detail 2 gives distinct geometric faceted look
    const geom = new THREE.IcosahedronGeometry(1.85, 2);
    geom.computeVertexNormals();

    const pos = geom.attributes.position;
    const count = pos.count;
    const colors = new Float32Array(count * 3);

    const isMars = body === 'mars';
    const c1 = isMars ? new THREE.Color('#7c2d12') : new THREE.Color('#1e293b');
    const c2 = isMars ? new THREE.Color('#ea580c') : new THREE.Color('#475569');
    const c3 = isMars ? new THREE.Color('#f97316') : new THREE.Color('#94a3b8');
    const cHigh = isMars ? new THREE.Color('#fef3c7') : new THREE.Color('#e2e8f0');

    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Procedural height noise
      const n = (pseudoNoise(x, y, z) + 1) / 2; // 0 to 1

      // Polar cap for Mars if near north pole
      if (isMars && y > 1.6) {
        tempColor.set('#ffffff');
      } else if (n < 0.35) {
        tempColor.lerpColors(c1, c2, n / 0.35);
      } else if (n < 0.75) {
        tempColor.lerpColors(c2, c3, (n - 0.35) / 0.4);
      } else {
        tempColor.lerpColors(c3, cHigh, (n - 0.75) / 0.25);
      }

      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return { geometry: geom };
  }, [body]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        vertexColors
        roughness={0.85}
        metalness={0.1}
        flatShading
      />
    </mesh>
  );
}

function Starfield() {
  const { positions, colors } = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cWhite = new THREE.Color('#ffffff');
    const cCyan = new THREE.Color('#22d3ee');

    for (let i = 0; i < count; i++) {
      const radius = 18 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = Math.random() > 0.8 ? cCyan : cWhite;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.75} />
    </points>
  );
}

export default function PlanetScene({ body = 'mars', isTabVisible = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop={isTabVisible ? 'always' : 'never'}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      className="w-full h-full pointer-events-none"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 4, 4]} intensity={1.6} />
      <directionalLight position={[-4, -3, -3]} intensity={0.25} color="#22d3ee" />
      <ProceduralPlanet body={body} />
      <Starfield />
    </Canvas>
  );
}
