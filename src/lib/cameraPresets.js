// Camera and planet orientation presets for chapters 0 through 4

export const cameraPresets = [
  {
    chapter: 0,
    // Chapter 1: Introduction / Landing
    cameraPosition: [0.0, 0.2, 5.0],
    planetRotation: [0.1, 0.0, 0.0],
  },
  {
    chapter: 1,
    // Chapter 2: Science & Environment (equatorial view)
    cameraPosition: [1.3, 0.5, 4.4],
    planetRotation: [-0.2, 0.95, 0.05],
  },
  {
    chapter: 2,
    // Chapter 3: Endurance / Extended Journey (plains & craters)
    cameraPosition: [-1.4, -0.4, 4.3],
    planetRotation: [0.25, 2.15, -0.1],
  },
  {
    chapter: 3,
    // Chapter 4: Climactic Event / Storm / Leaving Behind (high atmospheric view)
    cameraPosition: [0.5, 1.4, 4.6],
    planetRotation: [0.45, 3.4, 0.15],
  },
  {
    chapter: 4,
    // Chapter 5: Silence / Enduring Legacy (distant meditative horizon)
    cameraPosition: [0.0, 0.3, 5.4],
    planetRotation: [-0.1, 4.9, 0.05],
  },
];

export function getCameraPreset(chapterIndex = 0) {
  const idx = Math.max(0, Math.min(Math.floor(chapterIndex) || 0, cameraPresets.length - 1));
  return cameraPresets[idx];
}
