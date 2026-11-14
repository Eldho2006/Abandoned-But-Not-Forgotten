import React, { useState, useEffect, Suspense } from 'react';

const LazyPlanetScene = React.lazy(() => import('./PlanetScene'));

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

function CssPlanetFallback({ body = 'mars' }) {
  const isMars = body === 'mars';
  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center pointer-events-none select-none"
    >
      <div
        className={`w-44 h-44 sm:w-60 sm:h-60 rounded-full transition-transform duration-700 ${
          isMars
            ? 'shadow-[0_0_60px_rgba(249,115,22,0.3)] border border-orange-500/20'
            : 'shadow-[0_0_60px_rgba(203,213,225,0.25)] border border-slate-400/20'
        }`}
        style={{
          background: isMars
            ? 'radial-gradient(circle at 35% 30%, #fed7aa 0%, #f97316 25%, #c2410c 60%, #431407 100%)'
            : 'radial-gradient(circle at 35% 30%, #f8fafc 0%, #cbd5e1 30%, #64748b 65%, #0f172a 100%)',
        }}
      />
    </div>
  );
}

export default function HeroPlanet({ body = 'mars', className = '' }) {
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

  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
    >
      {canRender3D ? (
        <Suspense fallback={<CssPlanetFallback body={body} />}>
          <LazyPlanetScene body={body} isTabVisible={isTabVisible} />
        </Suspense>
      ) : (
        <CssPlanetFallback body={body} />
      )}
    </div>
  );
}
