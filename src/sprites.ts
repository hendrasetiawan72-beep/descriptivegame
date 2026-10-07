import { Gender, NPC } from './types';

// Helper to draw crisp pixel rectangles
export function drawPixelRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

// Draw the fluttering Indonesian flag (Sang Saka Merah Putih)
export function drawFlag(ctx: CanvasRenderingContext2D, x: number, y: number, time: number) {
  // Pole
  drawPixelRect(ctx, x - 2, y - 75, 5, 80, '#A0AAB2');
  drawPixelRect(ctx, x - 5, y + 5, 10, 6, '#505860');
  // Gold top sphere
  drawPixelRect(ctx, x - 5, y - 80, 10, 5, '#FFD166');

  // Fluttering flag cloth
  const flagWidth = 42;
  const flagHeight = 26;
  const halfH = flagHeight / 2;

  for (let i = 0; i < flagWidth; i += 2) {
    const wave = Math.sin(time * 0.006 + i * 0.25) * 2.8;
    const fx = x + 3 + i;
    const fy = y - 75 + wave;

    // Top half: Red
    drawPixelRect(ctx, fx, fy, 2, halfH, '#E63946');
    // Bottom half: White
    drawPixelRect(ctx, fx, fy + halfH, 2, halfH, '#F8F9FA');
  }
}

// Draw swaying pixel tree
export function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, time: number) {
  const sway = Math.sin(time * 0.002 + x * 0.05) * 3;

  // Trunk
  drawPixelRect(ctx, x - 7, y - 10, 14, 32, '#5C4033');
  drawPixelRect(ctx, x - 10, y + 18, 20, 6, '#3D2817');

  // Foliage layers with sway
  const topX = x + sway;
  ctx.fillStyle = '#2D6A4F';
  ctx.beginPath();
  ctx.arc(topX, y - 32, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#40916C';
  ctx.beginPath();
  ctx.arc(topX - 5, y - 30, 25, 0, Math.PI * 2);
  ctx.arc(topX + 9, y - 26, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#74C69D';
  ctx.beginPath();
  ctx.arc(topX - 7, y - 38, 14, 0, Math.PI * 2);
  ctx.fill();

  // Little fruits / flowers
  drawPixelRect(ctx, topX - 12, y - 28, 5, 5, '#FFB703');
  drawPixelRect(ctx, topX + 14, y - 34, 5, 5, '#FFB703');
}

// Draw wooden park bench
export function drawBench(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawPixelRect(ctx, x - 24, y + 10, 48, 8, 'rgba(0,0,0,0.18)');
  drawPixelRect(ctx, x - 20, y, 5, 14, '#3D2817');
  drawPixelRect(ctx, x + 16, y, 5, 14, '#3D2817');
  drawPixelRect(ctx, x - 26, y - 4, 52, 7, '#936639');
  drawPixelRect(ctx, x - 26, y - 14, 52, 7, '#7F4F24');
  drawPixelRect(ctx, x - 26, y - 20, 52, 5, '#B08968');
}

// Draw flower pot
export function drawFlowerPot(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawPixelRect(ctx, x - 10, y - 8, 20, 15, '#BC6C25');
  drawPixelRect(ctx, x - 12, y - 10, 24, 4, '#9B5418');
  drawPixelRect(ctx, x - 8, y - 20, 16, 10, '#52B788');
  drawPixelRect(ctx, x - 5, y - 22, 5, 5, '#E63946');
  drawPixelRect(ctx, x + 2, y - 20, 5, 5, '#F72585');
}

// Draw School Buildings
export function drawBuilding(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  type: 'gate' | 'koperasi' | 'bengkel' | 'tjkt' | 'mushola' | 'canteen' | 'main',
  time: number
) {
  drawPixelRect(ctx, x + 4, y + 4, w, h, 'rgba(0,0,0,0.22)');

  let wallColor = '#FDF0D5';
  let roofColor = '#C1121F';
  let accentColor = '#780000';

  if (type === 'koperasi') {
    wallColor = '#E8F5E9';
    roofColor = '#2A9D8F';
    accentColor = '#264653';
  } else if (type === 'bengkel') {
    wallColor = '#EDEDE9';
    roofColor = '#E76F51';
    accentColor = '#D62828';
  } else if (type === 'tjkt') {
    wallColor = '#EDE0D4';
    roofColor = '#7209B7';
    accentColor = '#3A0CA3';
  } else if (type === 'mushola') {
    wallColor = '#F0FFF4';
    roofColor = '#38B000';
    accentColor = '#007200';
  } else if (type === 'canteen') {
    wallColor = '#FFF8E7';
    roofColor = '#FB8500';
    accentColor = '#D97706';
  }

  // Walls
  drawPixelRect(ctx, x, y, w, h, wallColor);
  drawPixelRect(ctx, x, y, w, 6, accentColor);
  drawPixelRect(ctx, x, y + h - 6, w, 6, accentColor);
  drawPixelRect(ctx, x, y, 6, h, accentColor);
  drawPixelRect(ctx, x + w - 6, y, 6, h, accentColor);

  // Roof Eaves
  drawPixelRect(ctx, x - 8, y - 14, w + 16, 16, roofColor);
  drawPixelRect(ctx, x - 4, y - 20, w + 8, 8, accentColor);

  if (type === 'mushola') {
    // Grand Islamic Dome
    ctx.fillStyle = '#38B000';
    ctx.beginPath();
    ctx.arc(x + w / 2, y - 24, 28, Math.PI, 0);
    ctx.fill();
    // Crescent & Star finial
    drawPixelRect(ctx, x + w / 2 - 2, y - 62, 4, 14, '#FFD166');
    drawPixelRect(ctx, x + w / 2 - 7, y - 64, 14, 5, '#FFD166');
  } else if (type === 'canteen') {
    // Striped Canteen Canopy
    const stripeW = 16;
    for (let sx = x + 8; sx < x + w - 16; sx += stripeW * 2) {
      drawPixelRect(ctx, sx, y + 16, stripeW, 10, '#E63946');
      drawPixelRect(ctx, sx + stripeW, y + 16, stripeW, 10, '#FFFDF4');
    }
  }

  // Doors & Windows
  const doorWidth = 38;
  const doorHeight = 46;
  const doorX = x + (w - doorWidth) / 2;
  const doorY = y + h - doorHeight - 6;

  drawPixelRect(ctx, doorX, doorY, doorWidth, doorHeight, '#6F4E37');
  drawPixelRect(ctx, doorX + 4, doorY + 4, doorWidth - 8, doorHeight - 8, '#4A3525');
  drawPixelRect(ctx, doorX + doorWidth - 8, doorY + 22, 4, 4, '#FFD166');

  // Windows
  const winW = 30;
  const winH = 28;
  if (w > 130) {
    drawPixelRect(ctx, x + 20, y + 26, winW, winH, '#A0E7E5');
    drawPixelRect(ctx, x + 20 + winW / 2 - 1, y + 26, 2, winH, '#FFFFFF');
    drawPixelRect(ctx, x + 20, y + 26 + winH / 2 - 1, winW, 2, '#FFFFFF');

    drawPixelRect(ctx, x + w - 20 - winW, y + 26, winW, winH, '#A0E7E5');
    drawPixelRect(ctx, x + w - 20 - winW / 2 - 1, y + 26, 2, winH, '#FFFFFF');
    drawPixelRect(ctx, x + w - 20 - winW, y + 26 + winH / 2 - 1, winW, 2, '#FFFFFF');
  }

  // Canteen outdoor counter table
  if (type === 'canteen') {
    drawPixelRect(ctx, doorX - 24, doorY + 18, 20, 16, '#936639');
    drawPixelRect(ctx, doorX - 22, doorY + 12, 6, 6, '#43281C'); // Coffee cup
    drawPixelRect(ctx, doorX + doorWidth + 4, doorY + 18, 20, 16, '#936639');
  }

  // Name Signboard
  ctx.save();
  ctx.fillStyle = '#43281C';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3.5;
  ctx.font = 'bold 12px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.strokeText(title, x + w / 2, y + 16);
  ctx.fillText(title, x + w / 2, y + 16);
  ctx.restore();
}

// Draw Chibi Characters (Enlarged by ~1.45x scale for great visibility!)
export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: string,
  gender: Gender,
  direction: 'down' | 'up' | 'left' | 'right',
  isMoving: boolean,
  isDashing: boolean,
  time: number
) {
  ctx.save();
  ctx.translate(Math.floor(x), Math.floor(y));
  ctx.scale(1.45, 1.45); // Scale character up by 1.45x

  // Shadow
  drawPixelRect(ctx, -12, 14, 24, 6, 'rgba(0,0,0,0.25)');

  // Dash smoke trail
  if (isDashing) {
    for (let d = 1; d <= 3; d++) {
      const trailX = direction === 'left' ? d * 14 : direction === 'right' ? -d * 14 : 0;
      const trailY = direction === 'up' ? d * 14 : direction === 'down' ? -d * 14 : 0;
      ctx.fillStyle = `rgba(255, 183, 3, ${0.4 - d * 0.1})`;
      ctx.beginPath();
      ctx.arc(trailX, trailY + 8, 8 - d * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const walkBob = isMoving ? Math.sin(time * 0.015) * 3 : Math.sin(time * 0.003) * 1;
  const legSwing = isMoving ? Math.sin(time * 0.015) * 4 : 0;
  const cy = walkBob;

  if (type === 'robot') {
    // Cute Pixel Robot
    const robotFloat = Math.sin(time * 0.005) * 3;
    const ry = robotFloat;

    drawPixelRect(ctx, -14, ry - 14, 28, 24, '#E0E1DD');
    drawPixelRect(ctx, -12, ry - 12, 24, 20, '#778DA9');
    drawPixelRect(ctx, -10, ry - 8, 20, 14, '#1B263B');

    const blink = Math.floor(time * 0.002) % 10 === 0;
    if (blink) {
      drawPixelRect(ctx, -6, ry - 3, 12, 2, '#48CAE4');
    } else {
      drawPixelRect(ctx, -6, ry - 6, 5, 8, '#48CAE4');
      drawPixelRect(ctx, 1, ry - 6, 5, 8, '#48CAE4');
    }

    drawPixelRect(ctx, -2, ry - 22, 4, 8, '#415A77');
    drawPixelRect(ctx, -4, ry - 26, 8, 4, '#F72585');

    const flameH = 4 + Math.sin(time * 0.02) * 2;
    drawPixelRect(ctx, -6, ry + 12, 12, flameH, '#4CC9F0');

    ctx.restore();
    return;
  }

  // Human Chibi Characters
  let hairColor = '#2B1E1A';
  let skinColor = '#FAD2B8';
  let shirtColor = '#F8F9FA';
  let pantsColor = '#6C757D';

  if (type === 'security') {
    hairColor = '#1D3557';
    shirtColor = '#1D3557';
    pantsColor = '#0D1B2A';
  } else if (type === 'mechanic') {
    shirtColor = '#E76F51';
    pantsColor = '#264653';
    hairColor = '#3D2817';
  } else if (type === 'teacher_female') {
    hairColor = '#2A9D8F';
    shirtColor = '#E76F51';
    pantsColor = '#264653';
  } else if (type === 'player') {
    shirtColor = '#FFFFFF';
    pantsColor = '#495057';
  }

  // Legs / Feet
  drawPixelRect(ctx, -8 - legSwing, cy + 10, 6, 8, pantsColor);
  drawPixelRect(ctx, 2 + legSwing, cy + 10, 6, 8, pantsColor);
  drawPixelRect(ctx, -9 - legSwing, cy + 16, 7, 3, '#212529');
  drawPixelRect(ctx, 2 + legSwing, cy + 16, 7, 3, '#212529');

  // Body / Torso
  drawPixelRect(ctx, -10, cy - 2, 20, 14, shirtColor);

  // Tie / Uniform badge / details
  if (type === 'player' || type.startsWith('student')) {
    drawPixelRect(ctx, -2, cy - 1, 4, 8, '#1D3557');
    drawPixelRect(ctx, -8, cy + 1, 4, 3, '#E63946');
  } else if (type === 'security') {
    drawPixelRect(ctx, -7, cy + 1, 5, 4, '#FFD166');
    drawPixelRect(ctx, 2, cy + 1, 6, 2, '#F1FAEE');
  }

  // Head
  const headY = cy - 18;
  drawPixelRect(ctx, -11, headY, 22, 17, skinColor);

  // Hair / Hijab / Cap
  if (type === 'teacher_female' || (gender === 'female' && type !== 'player')) {
    drawPixelRect(ctx, -13, headY - 4, 26, 24, hairColor);
    drawPixelRect(ctx, -8, headY + 3, 16, 14, skinColor);
  } else if (type === 'security') {
    drawPixelRect(ctx, -13, headY - 5, 26, 7, '#1D3557');
    drawPixelRect(ctx, -15, headY + 1, 30, 3, '#111827');
    drawPixelRect(ctx, -3, headY - 4, 6, 4, '#FFD166');
  } else {
    drawPixelRect(ctx, -12, headY - 4, 24, 7, hairColor);
    drawPixelRect(ctx, -13, headY, 5, 12, hairColor);
    drawPixelRect(ctx, 8, headY, 5, 12, hairColor);
  }

  // Eyes
  if (direction !== 'up') {
    const eyeOffsetX = direction === 'left' ? -3 : direction === 'right' ? 3 : 0;
    drawPixelRect(ctx, -6 + eyeOffsetX, headY + 7, 3, 4, '#1B263B');
    drawPixelRect(ctx, 3 + eyeOffsetX, headY + 7, 3, 4, '#1B263B');
    drawPixelRect(ctx, -6 + eyeOffsetX, headY + 7, 1, 1, '#FFFFFF');
    drawPixelRect(ctx, 3 + eyeOffsetX, headY + 7, 1, 1, '#FFFFFF');
    drawPixelRect(ctx, -2 + eyeOffsetX, headY + 13, 4, 2, '#C1121F');
  }

  ctx.restore();
}

// Draw target ripple indicator on tap
export function drawTargetRipple(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number
) {
  ctx.save();
  const radius = progress * 28;
  const alpha = 1 - progress;

  ctx.strokeStyle = `rgba(255, 165, 0, ${alpha})`;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = `rgba(255, 107, 107, ${alpha * 0.6})`;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Draw floating quest marker above target NPC
export function drawQuestMarker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  time: number
) {
  const bob = Math.sin(time * 0.006) * 6;
  const my = y - 56 + bob;

  ctx.save();
  ctx.fillStyle = '#FFA500';
  ctx.strokeStyle = '#43281C';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, my, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  drawPixelRect(ctx, x - 2, my - 8, 4, 10, '#43281C');
  drawPixelRect(ctx, x - 2, my + 4, 4, 4, '#43281C');
  ctx.restore();
}
