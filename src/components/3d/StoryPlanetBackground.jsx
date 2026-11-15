import React, { useState, useEffect, Suspense } from 'react';
import SceneErrorBoundary from './SceneErrorBoundary';

const LazyStoryScene = React.lazy(() => import('./StoryScene'));

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

function CssFallbackPlanet({ body = 'mars' }) {
  const isMars = body === 'mars';
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`w-64 h-64 sm:w-96 sm:h-96 rounded-full transition-transform duration-700 ${
          isMars
            ? 'shadow-[0_0_80px_rgba(249,115,22,0.25)] border border-orange-500/20'
            : 'shadow-[0_0_80px_rgba(203,213,225,0.2)] border border-slate-400/20'
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

export default function StoryPlanetBackground({ body = 'mars', activeChapter = 0 }) {
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
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 3D Scene or CSS Fallback */}
      <div className="absolute inset-0 opacity-40 sm:opacity-50">
        <SceneErrorBoundary fallback={<CssFallbackPlanet body={body} />}>
          {canRender3D ? (
            <Suspense fallback={<CssFallbackPlanet body={body} />}>
              <LazyStoryScene body={body} activeChapter={activeChapter} isTabVisible={isTabVisible} />
            </Suspense>
          ) : (
            <CssFallbackPlanet body={body} />
          )}
        </SceneErrorBoundary>
      </div>

      {/* Dark contrast gradient overlay so text is never covered or unreadable */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/85 to-navy-950 pointer-events-none" />
    </div>
  );
}
