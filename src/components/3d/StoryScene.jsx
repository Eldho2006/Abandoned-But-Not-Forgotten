import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getCameraPreset } from '../../lib/cameraPresets';

function pseudoNoise(x, y, z) {
  return (
    Math.sin(x * 2.5 + y * 1.7) * 0.4 +
    Math.cos(y * 2.8 + z * 2.2) * 0.35 +
    Math.sin(z * 3.1 + x * 1.9) * 0.25
  );
}

function ProceduralPlanet({ body = 'mars', activeChapter = 0 }) {
  const meshRef = useRef();
  const idleSpin = useRef(0);

  const { geometry } = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1.85, 2);
    geom.computeVertexNormals();

    const pos = geom.attributes.position;
    const count = pos.count;
    const colors = new Float32Array(count * 3);

    const isMars = body === 'mars';
    // Terracotta tones for Mars, Silver tones for Moon
    const c1 = isMars ? new THREE.Color('#6E3A24') : new THREE.Color('#2C323B');
    const c2 = isMars ? new THREE.Color('#995235') : new THREE.Color('#5A626E');
    const c3 = isMars ? new THREE.Color('#C97B5A') : new THREE.Color('#B8BEC6');
    const cHigh = isMars ? new THREE.Color('#E8B89C') : new THREE.Color('#EDE8DC');

    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const n = (pseudoNoise(x, y, z) + 1) / 2;

      if (isMars && y > 1.6) {
        tempColor.set('#EDE8DC');
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

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const preset = getCameraPreset(activeChapter);

    idleSpin.current += delta * 0.03;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, preset.cameraPosition[0], 2.0, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, preset.cameraPosition[1], 2.0, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, preset.cameraPosition[2], 2.0, delta);
    state.camera.lookAt(0, 0, 0);

    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, preset.planetRotation[0], 2.0, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      preset.planetRotation[1] + idleSpin.current,
      2.0,
      delta
    );
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, preset.planetRotation[2], 2.0, delta);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial vertexColors roughness={0.85} metalness={0.1} flatShading />
    </mesh>
  );
}

function Starfield() {
  const { positions, colors } = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cIvory = new THREE.Color('#EDE8DC');
    const cSilver = new THREE.Color('#B8BEC6');

    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = Math.random() > 0.8 ? cSilver : cIvory;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.35} />
    </points>
  );
}

export default function StoryScene({ body = 'mars', activeChapter = 0, isTabVisible = true }) {
  const isMars = body === 'mars';
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 45 }}
      dpr={[1, 2]}
      frameloop={isTabVisible ? 'always' : 'never'}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      className="w-full h-full pointer-events-none"
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 4, 4]} intensity={1.5} />
      <directionalLight
        position={[-4, -3, -3]}
        intensity={0.25}
        color={isMars ? '#C97B5A' : '#B8BEC6'}
      />
      <ProceduralPlanet body={body} activeChapter={activeChapter} />
      <Starfield />
    </Canvas>
  );
}
