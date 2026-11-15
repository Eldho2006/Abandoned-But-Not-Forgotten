import { useState, useEffect, useRef } from 'react';
import { isSpeechSupported, speakText, pauseSpeech, resumeSpeech, stopSpeech } from '../lib/speech';
import Glass from './ui/Glass';

export default function ListenButton({ text, title }) {
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState('idle');
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
      onStart: () => { if (mountedRef.current) setStatus('playing'); },
      onEnd: () => { if (mountedRef.current) { setStatus('idle'); setHighlightIdx(0); } },
      onError: () => { if (mountedRef.current) { setStatus('idle'); setHighlightIdx(0); } },
      onBoundary: (event) => {
        if (mountedRef.current && event.name === 'word') setHighlightIdx(event.charIndex);
      },
    });

    if (started) setStatus('playing');
  };

  const handlePause = () => { pauseSpeech(); setStatus('paused'); };
  const handleStop = () => { stopSpeech(); setStatus('idle'); setHighlightIdx(0); };

  if (!supported) {
    return (
      <div className="mt-4 p-4 rounded-xl bg-surface border border-border text-sm">
        <p className="text-terracotta font-semibold mb-2">Audio narration is not supported in this browser.</p>
        <div className="p-3 bg-bg rounded-lg text-ivory">
          <span className="font-bold text-brass block mb-1">Captions:</span>
          <p className="leading-relaxed">{text}</p>
        </div>
      </div>
    );
  }

  const focusRing = "rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass";

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2.5">
        {status === 'idle' && (
          <button
            type="button"
            onClick={handlePlay}
            className={focusRing}
            aria-label={`Listen to ${title || 'chapter'}`}
          >
            <Glass variant="button" contentClassName="inline-flex items-center gap-2 px-4 py-2.5 font-bold text-sm text-ivory hover:text-brass transition-colors min-h-[44px]">
              <svg className="w-5 h-5 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
              </svg>
              Listen to Chapter
            </Glass>
          </button>
        )}

        {status === 'playing' && (
          <>
            <button
              type="button"
              onClick={handlePause}
              className={focusRing}
              aria-label="Pause narration"
            >
              <Glass variant="button" contentClassName="inline-flex items-center gap-2 px-4 py-2.5 font-bold text-sm text-ivory hover:text-brass transition-colors min-h-[44px]">
                <svg className="w-5 h-5 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pause
              </Glass>
            </button>
            <button
              type="button"
              onClick={handleStop}
              className={focusRing}
              aria-label="Stop narration"
            >
              <Glass variant="button" contentClassName="inline-flex items-center gap-2 px-4 py-2.5 font-bold text-sm text-muted hover:text-ivory transition-colors min-h-[44px]">
                <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                Stop
              </Glass>
            </button>
          </>
        )}

        {status === 'paused' && (
          <>
            <button
              type="button"
              onClick={handlePlay}
              className={focusRing}
              aria-label="Resume narration"
            >
              <Glass variant="button" contentClassName="inline-flex items-center gap-2 px-4 py-2.5 font-bold text-sm text-ivory hover:text-brass transition-colors min-h-[44px]">
                <svg className="w-5 h-5 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Resume
              </Glass>
            </button>
            <button
              type="button"
              onClick={handleStop}
              className={focusRing}
              aria-label="Stop narration"
            >
              <Glass variant="button" contentClassName="inline-flex items-center gap-2 px-4 py-2.5 font-bold text-sm text-muted hover:text-ivory transition-colors min-h-[44px]">
                <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                Stop
              </Glass>
            </button>
          </>
        )}
      </div>

      {/* Captions: Always visible */}
      <div
        className="p-4 bg-bg border border-border rounded-xl text-ivory text-sm leading-relaxed shadow-inner"
        role="region"
        aria-label="Captions"
      >
        <span className="text-xs uppercase font-extrabold tracking-wider text-brass block mb-1">
          Captions {status === 'playing' ? '(Reading now...)' : ''}
        </span>
        <p>
          {status === 'playing' && highlightIdx > 0 ? (
            <>
              <span className="text-brass font-semibold">{text.slice(0, highlightIdx)}</span>
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
