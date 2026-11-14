export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function createUtterance(text, { onStart, onEnd, onError, onBoundary } = {}) {
  if (!isSpeechSupported()) return null;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;
  if (onBoundary) utterance.onboundary = onBoundary;

  return utterance;
}

export function speakText(text, handlers = {}) {
  if (!isSpeechSupported()) return false;
  window.speechSynthesis.cancel();
  const utterance = createUtterance(text, handlers);
  if (utterance) {
    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
}

export function pauseSpeech() {
  if (isSpeechSupported()) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpeech() {
  if (isSpeechSupported()) {
    window.speechSynthesis.resume();
  }
}

export function stopSpeech() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}
