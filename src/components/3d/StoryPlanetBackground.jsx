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
            ? 'shadow-[0_0_60px_rgba(201,123,90,0.18)] border border-terracotta/20'
            : 'shadow-[0_0_60px_rgba(184,190,198,0.18)] border border-silver/20'
        }`}
        style={{
          background: isMars
            ? 'radial-gradient(circle at 35% 30%, #E8B89C 0%, #C97B5A 35%, #995235 65%, #0B0F14 100%)'
            : 'radial-gradient(circle at 35% 30%, #EDE8DC 0%, #B8BEC6 35%, #5A626E 65%, #0B0F14 100%)',
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

      {/* Dark contrast gradient overlay in new background color */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/75 via-bg/85 to-bg pointer-events-none" />
    </div>
  );
}
