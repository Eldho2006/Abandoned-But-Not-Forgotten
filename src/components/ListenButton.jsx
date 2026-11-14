import { useState, useEffect, useRef } from 'react';
import { isSpeechSupported, speakText, pauseSpeech, resumeSpeech, stopSpeech } from '../lib/speech';

export default function ListenButton({ text, title }) {
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState('idle'); // 'idle' | 'playing' | 'paused'
  const [highlightIdx, setHighlightIdx] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setSupported(isSpeechSupported());
    return () => {
      mountedRef.current = false;
      stopSpeech();
    };
  }, []);

  const handlePlay = () => {
    if (status === 'paused') {
      resumeSpeech();
      setStatus('playing');
      return;
    }

    const started = speakText(text, {
      onStart: () => {
        if (mountedRef.current) setStatus('playing');
      },
      onEnd: () => {
        if (mountedRef.current) {
          setStatus('idle');
          setHighlightIdx(0);
        }
      },
      onError: () => {
        if (mountedRef.current) {
          setStatus('idle');
          setHighlightIdx(0);
        }
      },
      onBoundary: (event) => {
        if (mountedRef.current && event.name === 'word') {
          setHighlightIdx(event.charIndex);
        }
      },
    });

    if (started) {
      setStatus('playing');
    }
  };

  const handlePause = () => {
    pauseSpeech();
    setStatus('paused');
  };

  const handleStop = () => {
    stopSpeech();
    setStatus('idle');
    setHighlightIdx(0);
  };

  if (!supported) {
    return (
      <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm">
        <p className="text-amber-300 font-semibold mb-2">
          Audio narration is not supported in this browser.
        </p>
        <div className="p-3 bg-slate-950 rounded-lg text-slate-200">
          <span className="font-bold text-sky-400 block mb-1">Captions:</span>
          <p className="leading-relaxed">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {status === 'idle' && (
          <button
            type="button"
            onClick={handlePlay}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-bold text-sm shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 focus-visible:ring-cyan-400 min-h-[44px]"
            aria-label={`Listen to ${title || 'chapter'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
            Listen to Chapter
          </button>
        )}

        {status === 'playing' && (
          <>
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 min-h-[44px]"
              aria-label="Pause narration"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause
            </button>
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[44px]"
              aria-label="Stop narration"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Stop
            </button>
          </>
        )}

        {status === 'paused' && (
          <>
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 min-h-[44px]"
              aria-label="Resume narration"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume
            </button>
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[44px]"
              aria-label="Stop narration"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Stop
            </button>
          </>
        )}
      </div>

      {/* Captions: Always visible */}
      <div
        className="p-4 bg-navy-950 border border-navy-700/80 rounded-xl text-slate-200 text-sm leading-relaxed shadow-inner"
        role="region"
        aria-label="Captions"
      >
        <span className="text-xs uppercase font-extrabold tracking-wider text-space-cyan block mb-1">
          Captions {status === 'playing' ? '(Reading now...)' : ''}
        </span>
        <p>
          {status === 'playing' && highlightIdx > 0 ? (
            <>
              <span className="text-space-cyan font-semibold">
                {text.slice(0, highlightIdx)}
              </span>
              <span>{text.slice(highlightIdx)}</span>
            </>
          ) : (
            text
          )}
        </p>
      </div>
    </div>
  );
}
