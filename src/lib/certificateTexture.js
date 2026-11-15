import * as THREE from 'three';

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  if (!text) return y;
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesDrawn = 0;
  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
      linesDrawn++;
      if (linesDrawn >= maxLines - 1 && i < words.length - 1) {
        line += '...';
        break;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

export function createCertificateTexture(story) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 768, 1024);
  bgGrad.addColorStop(0, '#0a1630');
  bgGrad.addColorStop(0.5, '#070f22');
  bgGrad.addColorStop(1, '#050a18');
  ctx.fillStyle = bgGrad;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(12, 12, 744, 1000, 24);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#22d3ee';
    ctx.beginPath();
    ctx.roundRect(24, 24, 720, 976, 18);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(34, 34, 700, 956, 14);
    ctx.stroke();
  } else {
    ctx.fillRect(12, 12, 744, 1000);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#22d3ee';
    ctx.strokeRect(24, 24, 720, 976);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 16px system-ui, sans-serif';
  ctx.fillText('ECHOES OF SPACE ARCHIVE', 384, 85);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px serif, Georgia';
  ctx.fillText('MISSION CERTIFICATE', 384, 128);

  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(184, 150);
  ctx.lineTo(584, 150);
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 44px serif, Georgia';
  ctx.fillText(story.name, 384, 220);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 18px system-ui, sans-serif';
  ctx.fillText(`${story.mission.toUpperCase()} • ${story.planet.toUpperCase()}`, 384, 260);

  ctx.textAlign = 'left';
  let y = 320;
  if (story.plannedLifespan) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('PLANNED LIFESPAN:', 70, y);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '600 22px system-ui, sans-serif';
    ctx.fillText(story.plannedLifespan, 70, y + 30);

    y += 85;
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('ACTUAL EXPLORATION:', 70, y);
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText(story.actualLifespan, 70, y + 32);
    y += 85;
  } else {
    ctx.fillStyle = '#fb923c';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('MISSION LEGACY: LEFT BEHIND', 70, y);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '600 20px system-ui, sans-serif';
    ctx.fillText(story.actualLifespan, 70, y + 30);

    y += 85;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px system-ui, sans-serif';
    ctx.fillText('Designed to stay behind on the lunar surface', 70, y);
    y += 55;
  }

  if (story.endEvent) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('CONCLUSION / LAST CONTACT:', 70, y);
    y += 28;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px system-ui, sans-serif';
    y = wrapText(ctx, story.endEvent, 70, y, 628, 26, 4);
  }

  ctx.save();
  ctx.translate(384, 820);
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★', 0, -2);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 9px system-ui, sans-serif';
  ctx.fillText('DEEP SPACE RECORD', 0, 24);
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = 'italic 15px system-ui, sans-serif';
  ctx.fillText('Illustrative card, not an official NASA document.', 384, 940);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
