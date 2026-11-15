import React, { useState, useEffect, Suspense } from 'react';
import SceneErrorBoundary from './SceneErrorBoundary';

const LazyCertificateScene = React.lazy(() => import('./CertificateScene'));

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

export function CssCertificateFallback({ story }) {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-navy-900/95 via-navy-950 to-slate-950 border-2 border-space-cyan shadow-[0_0_50px_rgba(34,211,238,0.15)] text-slate-100 flex flex-col justify-between select-none"
    >
      <div className="border border-sky-400/40 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="text-center pb-2 border-b border-navy-700/80">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 block">
            Echoes of Space Archive
          </span>
          <h4 className="font-serif text-2xl font-normal text-white mt-1">
            Mission Certificate
          </h4>
        </div>

        <div className="text-center py-2">
          <div className="font-serif text-3xl sm:text-4xl font-normal text-white">
            {story.name}
          </div>
          <div className="text-xs font-semibold tracking-wider text-space-cyan uppercase mt-1">
            {story.mission} • {story.planet}
          </div>
        </div>

        <div className="space-y-3 text-sm pt-2 border-t border-navy-800">
          {story.plannedLifespan ? (
            <>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                  Planned Lifespan:
                </span>
                <p className="font-medium text-slate-200">{story.plannedLifespan}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                  Actual Exploration:
                </span>
                <p className="font-bold text-space-cyan">{story.actualLifespan}</p>
              </div>
            </>
          ) : (
            <div>
              <span className="text-xs uppercase tracking-wider text-mars-light block font-semibold">
                Mission Legacy: Left Behind
              </span>
              <p className="font-medium text-slate-200">{story.actualLifespan}</p>
              <p className="text-xs text-slate-400 italic mt-0.5">
                Designed to stay behind on the lunar surface
              </p>
            </div>
          )}

          {story.endEvent && (
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                Conclusion / Last Contact:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                {story.endEvent}
              </p>
            </div>
          )}
        </div>

        <div className="text-center pt-3 border-t border-navy-800">
          <p className="text-[11px] text-slate-500 italic">
            Illustrative card, not an official NASA document.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MissionCertificate({ story, className = '' }) {
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
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <SceneErrorBoundary fallback={<CssCertificateFallback story={story} />}>
        {canRender3D ? (
          <Suspense fallback={<CssCertificateFallback story={story} />}>
            <LazyCertificateScene story={story} isTabVisible={isTabVisible} />
          </Suspense>
        ) : (
          <CssCertificateFallback story={story} />
        )}
      </SceneErrorBoundary>
    </div>
  );
}
