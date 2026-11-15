import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import SceneErrorBoundary from './SceneErrorBoundary';

const LazyOrbScene = React.lazy(() => import('./OrbScene'));

function checkWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function CssOrbFallback() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center pointer-events-none select-none"
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center border border-space-cyan/20 shadow-[0_0_80px_rgba(34,211,238,0.15)] bg-gradient-to-br from-navy-900/80 via-navy-950 to-space-black">
        <div className="absolute inset-4 rounded-full border border-dashed border-space-cyan/30" />
        <div className="absolute inset-12 rounded-full border border-slate-700/50" />
        <div className="text-center p-4">
          <div className="font-serif text-slate-300 text-lg sm:text-xl font-normal">
            Echoes of Space
          </div>
          <div className="text-xs text-space-cyan uppercase tracking-wider font-semibold mt-1">
            Archival Spheres
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeOrb({ className = '' }) {
  const navigate = useNavigate();
  const [canRender3D, setCanRender3D] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasWebGL = checkWebGL();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setCanRender3D(hasWebGL && !prefersReduced);
    setIsTabVisible(!document.hidden);

    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotion = (e) => {
      setCanRender3D(hasWebGL && !e.matches);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    media.addEventListener?.('change', handleMotion);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      media.removeEventListener?.('change', handleMotion);
    };
  }, []);

  const handleSelectStory = (storyId) => {
    if (storyId) {
      navigate(`/story/${storyId}`);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <SceneErrorBoundary fallback={<CssOrbFallback />}>
        {canRender3D ? (
          <Suspense fallback={<CssOrbFallback />}>
            <LazyOrbScene
              onSelectStory={handleSelectStory}
              isTabVisible={isTabVisible}
            />
          </Suspense>
        ) : (
          <CssOrbFallback />
        )}
      </SceneErrorBoundary>
    </div>
  );
}
