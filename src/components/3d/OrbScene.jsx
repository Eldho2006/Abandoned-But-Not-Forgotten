import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const HIGHLIGHTS = {
  18: { id: 'opportunity', name: 'Opportunity', color: '#f97316' },
  28: { id: 'apollo11-eagle', name: 'Apollo 11 Eagle', color: '#22d3ee' },
  38: { id: 'sojourner', name: 'Sojourner', color: '#fb923c' },
};

function createPlateTexture(name, isHigh, color) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 140;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = isHigh ? '#081226' : '#070d19';
  if (ctx.roundRect) {
    ctx.beginPath(); ctx.roundRect(4, 4, 248, 132, 10); ctx.fill();
    ctx.lineWidth = isHigh ? 6 : 2; ctx.strokeStyle = isHigh ? color || '#22d3ee' : '#1e293b'; ctx.stroke();
  } else {
    ctx.fillRect(4, 4, 248, 132);
    ctx.lineWidth = isHigh ? 6 : 2; ctx.strokeStyle = isHigh ? color || '#22d3ee' : '#1e293b'; ctx.strokeRect(4, 4, 248, 132);
  }
  if (isHigh && name) {
    ctx.fillStyle = color || '#22d3ee'; ctx.fillRect(20, 20, 216, 3);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(name, 128, 68);
    ctx.fillStyle = color || '#22d3ee'; ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('CLICK TO OPEN STORY →', 128, 106);
  } else {
    ctx.fillStyle = '#1e293b'; ctx.fillRect(24, 24, 30, 4); ctx.fillRect(60, 24, 48, 4);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function Panel({ pos, normal, quat, highlight, onSelect, dragRef }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isHigh = Boolean(highlight);
  const texture = useMemo(() => createPlateTexture(highlight?.name, isHigh, highlight?.color), [highlight, isHigh]);
  const baseVec = useMemo(() => new THREE.Vector3(...pos), [pos]);
  const normVec = useMemo(() => new THREE.Vector3(...normal), [normal]);
  const currentPos = useRef(baseVec.clone());

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = baseVec.clone().add(normVec.clone().multiplyScalar(hovered ? 0.4 : 0));
    currentPos.current.lerp(target, delta * 12);
    meshRef.current.position.copy(currentPos.current);
  });

  return (
    <mesh
      ref={meshRef}
      quaternion={quat}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        if (isHigh && onSelect && dragRef.current.dragDist < 8) {
          e.stopPropagation();
          onSelect(highlight.id);
        }
      }}
    >
      <planeGeometry args={[0.56, 0.32]} />
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} transparent opacity={isHigh ? 0.98 : 0.65} side={THREE.DoubleSide} />
    </mesh>
  );
}

function SphereOfPlates({ onSelect }) {
  const groupRef = useRef();
  const { gl } = useThree();
  const dragRef = useRef({ isDragging: false, dragDist: 0, velX: 0, velY: 0 });

  const panels = useMemo(() => {
    const items = [];
    const count = 60, R = 2.45, goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const px = Math.cos(theta) * radiusAtY * R;
      const py = y * R;
      const pz = Math.sin(theta) * radiusAtY * R;
      const norm = new THREE.Vector3(px, py, pz).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), norm);
      items.push({ id: i, pos: [px, py, pz], normal: [norm.x, norm.y, norm.z], quat, highlight: HIGHLIGHTS[i] || null });
    }
    return items;
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    let isDown = false, lastX = 0, lastY = 0;
    const onDown = (e) => {
      isDown = true; lastX = e.clientX; lastY = e.clientY;
      dragRef.current.isDragging = true; dragRef.current.dragDist = 0;
    };
    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      dragRef.current.dragDist += Math.abs(dx) + Math.abs(dy);
      dragRef.current.velX = dy * 0.004; dragRef.current.velY = dx * 0.004;
      if (groupRef.current) {
        groupRef.current.rotation.x += dy * 0.004;
        groupRef.current.rotation.y += dx * 0.004;
      }
    };
    const onUp = () => { isDown = false; dragRef.current.isDragging = false; };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!dragRef.current.isDragging) {
      groupRef.current.rotation.x += dragRef.current.velX;
      groupRef.current.rotation.y += dragRef.current.velY + delta * 0.07;
      dragRef.current.velX *= 0.92;
      dragRef.current.velY *= 0.92;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0.4, 0]}>
      <mesh>
        <sphereGeometry args={[2.22, 24, 24]} />
        <meshBasicMaterial color="#040814" />
      </mesh>
      {panels.map((p) => (
        <Panel key={p.id} pos={p.pos} normal={p.normal} quat={p.quat} highlight={p.highlight} onSelect={onSelect} dragRef={dragRef} />
      ))}
    </group>
  );
}

export default function OrbScene({ onSelectStory, isTabVisible = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 2]}
      frameloop={isTabVisible ? 'always' : 'never'}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <directionalLight position={[-5, -4, -4]} intensity={0.4} color="#22d3ee" />
      <SphereOfPlates onSelect={onSelectStory} />
    </Canvas>
  );
}
