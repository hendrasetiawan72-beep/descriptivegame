import React, { useRef, useEffect, useState, useCallback } from 'react';
import { NPC, MajorStory, MajorId } from '../types';
import { soundManager } from '../soundSystem';
import {
  drawPixelRect,
  drawFlag,
  drawTree,
  drawBench,
  drawFlowerPot,
  drawBuilding,
  drawCharacter,
  drawTargetRipple,
  drawQuestMarker
} from '../sprites';

interface GameCanvasProps {
  story: MajorStory;
  playerMajor: MajorId;
  allNpcs: NPC[];
  targetNpc: NPC | null;
  currentChapter: number;
  totalXp: number;
  isBatangTourActive: boolean;
  batangTourStep: number;
  onInteractNpc: (npc: NPC) => void;
  onRestrictedAreaAlert: (npcName: string, zoneName: string) => void;
  onPlayerMovingChange: (isMoving: boolean) => void;
}

const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1800;
const WALK_SPEED = 3.6;
const DASH_SPEED = 9.0;

export const GameCanvas: React.FC<GameCanvasProps> = ({
  story,
  playerMajor,
  allNpcs,
  targetNpc,
  currentChapter,
  totalXp,
  isBatangTourActive,
  batangTourStep,
  onInteractNpc,
  onRestrictedAreaAlert,
  onPlayerMovingChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player state
  const playerRef = useRef({
    x: 750,
    y: 720,
    targetX: 750,
    targetY: 720,
    direction: 'down' as 'down' | 'up' | 'left' | 'right',
    isMoving: false,
    isDashing: false,
    dashTimer: 0,
    interactingNpc: null as NPC | null
  });

  // Tap ripple effect state
  const [ripple, setRipple] = useState<{ x: number; y: number; progress: number } | null>(null);

  // Touch gesture tracker for Jentik (fast swipe)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Camera coordinates (centered on player)
  const cameraRef = useRef({ x: 0, y: 0 });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Check if coordinates fall inside restricted buildings for player's major
  const isInsideRestrictedZone = useCallback((x: number, y: number): { restricted: boolean; zoneName: string } => {
    // Koperasi & AKL Wing (x: 1420 to 1880, y: 330 to 500)
    if (playerMajor !== 'akl' && x >= 1400 && x <= 1900 && y >= 310 && y <= 510) {
      return { restricted: true, zoneName: 'Ruang Koperasi & AKL' };
    }
    // Bengkel Otomotif (x: 340 to 820, y: 1150 to 1350)
    if (playerMajor !== 'otomotif' && x >= 320 && x <= 840 && y >= 1130 && y <= 1350) {
      return { restricted: true, zoneName: 'Bengkel Otomotif' };
    }
    // Lab Jaringan TJKT (x: 1420 to 1880, y: 1150 to 1350)
    if (playerMajor !== 'tjkt' && x >= 1400 && x <= 1900 && y >= 1130 && y <= 1350) {
      return { restricted: true, zoneName: 'Lab Jaringan TJKT' };
    }
    return { restricted: false, zoneName: '' };
  }, [playerMajor]);

  // Set Player destination to world coords
  const setMoveTarget = useCallback((worldX: number, worldY: number, targetNpcToTalk?: NPC) => {
    const check = isInsideRestrictedZone(worldX, worldY);
    if (check.restricted) {
      soundManager.playWrong();
      onRestrictedAreaAlert('Pintu Lab', check.zoneName);
      return;
    }

    const clampedX = Math.max(40, Math.min(WORLD_WIDTH - 40, worldX));
    const clampedY = Math.max(40, Math.min(WORLD_HEIGHT - 40, worldY));

    playerRef.current.targetX = clampedX;
    playerRef.current.targetY = clampedY;
    playerRef.current.interactingNpc = targetNpcToTalk || null;
    playerRef.current.isMoving = true;
    onPlayerMovingChange(true);

    setRipple({ x: clampedX, y: clampedY, progress: 0 });
  }, [isInsideRestrictedZone, onPlayerMovingChange, onRestrictedAreaAlert]);

  // Handle Touch/Click on Canvas
  const handlePointerDown = (clientX: number, clientY: number) => {
    soundManager.init();
    touchStartRef.current = { x: clientX, y: clientY, time: Date.now() };
  };

  const handlePointerUp = (clientX: number, clientY: number) => {
    soundManager.init();
    if (!touchStartRef.current) return;

    const dx = clientX - touchStartRef.current.x;
    const dy = clientY - touchStartRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = Date.now() - touchStartRef.current.time;

    // Check for Jentik / Fast Flick Swipe (dash)
    if (distance > 35 && duration < 320) {
      soundManager.playDash();
      const angle = Math.atan2(dy, dx);
      const dashDistance = 200;
      const targetX = playerRef.current.x + Math.cos(angle) * dashDistance;
      const targetY = playerRef.current.y + Math.sin(angle) * dashDistance;

      playerRef.current.isDashing = true;
      playerRef.current.dashTimer = 22;
      setMoveTarget(targetX, targetY);

      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = null;
    soundManager.playTap();

    // Convert Screen to World coords
    const worldX = clientX + cameraRef.current.x;
    const worldY = clientY + cameraRef.current.y;

    // Check if tapped on or near any NPC (with enlarged 95px hitbox for larger chibi sprites)
    const tappedNpc = allNpcs.find(npc => {
      const dist = Math.hypot(npc.x - worldX, npc.y - worldY);
      return dist <= 95;
    });

    if (tappedNpc) {
      if (tappedNpc.majorSpecific && tappedNpc.majorSpecific !== playerMajor) {
        soundManager.playWrong();
        onRestrictedAreaAlert(tappedNpc.name, tappedNpc.zone);
        return;
      }

      const distToPlayer = Math.hypot(tappedNpc.x - playerRef.current.x, tappedNpc.y - playerRef.current.y);
      if (distToPlayer <= 100) {
        onInteractNpc(tappedNpc);
        playerRef.current.isMoving = false;
        onPlayerMovingChange(false);
      } else {
        setMoveTarget(tappedNpc.x, tappedNpc.y + 45, tappedNpc);
      }
    } else {
      setMoveTarget(worldX, worldY);
    }
  };

  // Main Canvas Render & Game Loop
  useEffect(() => {
    let animId: number;
    let lastStepTime = 0;

    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const p = playerRef.current;

      // Update Player Movement
      const distToTarget = Math.hypot(p.targetX - p.x, p.targetY - p.y);
      if (distToTarget > 4) {
        p.isMoving = true;
        const currentSpeed = p.isDashing ? DASH_SPEED : WALK_SPEED;
        const moveDist = Math.min(distToTarget, currentSpeed);
        const angle = Math.atan2(p.targetY - p.y, p.targetX - p.x);

        p.x += Math.cos(angle) * moveDist;
        p.y += Math.sin(angle) * moveDist;

        if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
          p.direction = Math.cos(angle) > 0 ? 'right' : 'left';
        } else {
          p.direction = Math.sin(angle) > 0 ? 'down' : 'up';
        }

        if (!p.isDashing && time - lastStepTime > 340) {
          lastStepTime = time;
          soundManager.playStep();
        }

        if (p.isDashing) {
          p.dashTimer--;
          if (p.dashTimer <= 0) {
            p.isDashing = false;
          }
        }
      } else {
        if (p.isMoving) {
          p.isMoving = false;
          p.isDashing = false;
          onPlayerMovingChange(false);

          if (p.interactingNpc) {
            onInteractNpc(p.interactingNpc);
            p.interactingNpc = null;
          }
        }
      }

      // Update camera smoothly centered on player
      const targetCamX = p.x - canvas.width / 2;
      const targetCamY = p.y - canvas.height / 2;
      cameraRef.current.x = Math.max(0, Math.min(WORLD_WIDTH - canvas.width, targetCamX));
      cameraRef.current.y = Math.max(0, Math.min(WORLD_HEIGHT - canvas.height, targetCamY));

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(-camX, -camY);

      // 1. World Base Ground: School Grass
      drawPixelRect(ctx, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, '#80B918');

      // Decorative grass grid dots
      ctx.fillStyle = '#6D9E15';
      for (let gx = 40; gx < WORLD_WIDTH; gx += 80) {
        for (let gy = 40; gy < WORLD_HEIGHT; gy += 80) {
          ctx.fillRect(gx, gy, 4, 4);
        }
      }

      // 2. Pathways & Courtyard Tarmac
      drawPixelRect(ctx, 360, 480, 720, 460, '#E9ECEF');
      drawPixelRect(ctx, 380, 500, 680, 420, '#CED4DA');
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.strokeRect(420, 530, 600, 360);
      ctx.beginPath();
      ctx.arc(720, 710, 60, 0, Math.PI * 2);
      ctx.stroke();

      // Pathways connecting buildings
      drawPixelRect(ctx, 160, 480, 220, 90, '#E9ECEF');
      drawPixelRect(ctx, 1080, 420, 800, 90, '#E9ECEF');
      drawPixelRect(ctx, 360, 940, 100, 420, '#E9ECEF');
      drawPixelRect(ctx, 360, 1320, 600, 90, '#E9ECEF');
      drawPixelRect(ctx, 1000, 940, 100, 420, '#E9ECEF');
      drawPixelRect(ctx, 1000, 1320, 880, 90, '#E9ECEF');
      // Dedicated pathway to Mushola (North)
      drawPixelRect(ctx, 810, 360, 100, 120, '#E9ECEF');
      // Dedicated pathway to Kantin (South)
      drawPixelRect(ctx, 1140, 940, 100, 200, '#E9ECEF');
      drawPixelRect(ctx, 1060, 1285, 260, 45, '#E9ECEF');

      // 3. School Buildings (Kantin and Mushola on completely opposite sides!)
      drawBuilding(ctx, 220, 440, 160, 130, 'GERBANG MUHIBA', 'gate', time);
      drawBuilding(ctx, 1420, 330, 460, 170, 'KOPERASI & LAB AKL', 'koperasi', time);
      drawBuilding(ctx, 340, 1150, 480, 180, 'BENGKEL OTOMOTIF', 'bengkel', time);
      drawBuilding(ctx, 1420, 1150, 460, 180, 'LAB JARINGAN TJKT', 'tjkt', time);

      // Dedicated MUSHOLA AS-SALAM in the NORTH (Serene spiritual zone)
      drawBuilding(ctx, 740, 220, 240, 140, 'MUSHOLA AS-SALAM', 'mushola', time);

      // Dedicated KANTIN SEKOLAH in the SOUTH (Food & Kopi Surjo zone)
      drawBuilding(ctx, 1060, 1140, 260, 145, 'KANTIN SEKOLAH (KOPI SURJO)', 'canteen', time);

      // 4. Courtyard Indonesian Flagpole
      drawFlag(ctx, 720, 710, time);

      // 5. Environmental Ornaments: Swaying Trees, Benches, Flower Pots
      const treePositions = [
        [320, 240], [540, 240], [1060, 240], [1280, 240],
        [180, 360], [180, 680], [180, 960], [180, 1240], [180, 1500],
        [1950, 320], [2050, 520], [2050, 840], [2050, 1140], [2050, 1440],
        [720, 1600], [1600, 1600]
      ];
      treePositions.forEach(([tx, ty]) => {
        drawTree(ctx, tx, ty, time);
      });

      drawBench(ctx, 480, 910);
      drawBench(ctx, 960, 910);
      drawBench(ctx, 1300, 490);
      drawBench(ctx, 1080, 1290);
      drawBench(ctx, 1250, 1290);

      drawFlowerPot(ctx, 700, 360);
      drawFlowerPot(ctx, 1020, 360);
      drawFlowerPot(ctx, 400, 500);
      drawFlowerPot(ctx, 1040, 500);
      drawFlowerPot(ctx, 1440, 500);
      drawFlowerPot(ctx, 1860, 500);
      drawFlowerPot(ctx, 360, 1340);
      drawFlowerPot(ctx, 1440, 1340);

      // Draw Caution Barrier Lines on Restricted Department Doors
      if (playerMajor !== 'akl') {
        drawPixelRect(ctx, 1620, 490, 80, 8, '#FFB703');
        drawPixelRect(ctx, 1624, 490, 16, 8, '#000000');
        drawPixelRect(ctx, 1656, 490, 16, 8, '#000000');
        ctx.fillStyle = '#C1121F';
        ctx.font = 'bold 9px "Fredoka", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⛔ KHUSUS AKL', 1660, 485);
      }
      if (playerMajor !== 'otomotif') {
        drawPixelRect(ctx, 550, 1320, 80, 8, '#FFB703');
        drawPixelRect(ctx, 554, 1320, 16, 8, '#000000');
        drawPixelRect(ctx, 586, 1320, 16, 8, '#000000');
        ctx.fillStyle = '#C1121F';
        ctx.font = 'bold 9px "Fredoka", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⛔ KHUSUS OTOMOTIF', 590, 1315);
      }
      if (playerMajor !== 'tjkt') {
        drawPixelRect(ctx, 1620, 1320, 80, 8, '#FFB703');
        drawPixelRect(ctx, 1624, 1320, 16, 8, '#000000');
        drawPixelRect(ctx, 1656, 1320, 16, 8, '#000000');
        ctx.fillStyle = '#C1121F';
        ctx.font = 'bold 9px "Fredoka", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⛔ KHUSUS TJKT', 1660, 1315);
      }

      // 6. Draw Tap Ripple Effect
      if (ripple) {
        drawTargetRipple(ctx, ripple.x, ripple.y, ripple.progress);
        setRipple(prev => {
          if (!prev) return null;
          const next = prev.progress + 0.04;
          return next >= 1 ? null : { ...prev, progress: next };
        });
      }

      // 7. Draw Enlarged NPCs
      allNpcs.forEach(npc => {
        const isTarget = targetNpc?.id === npc.id;
        const isRestrictedForPlayer = npc.majorSpecific && npc.majorSpecific !== playerMajor;

        drawCharacter(
          ctx,
          npc.x,
          npc.y,
          npc.spriteType,
          npc.gender,
          'down',
          false,
          false,
          time
        );

        if (isTarget) {
          drawQuestMarker(ctx, npc.x, npc.y, time);
        }

        // Tag label
        ctx.save();
        ctx.fillStyle = isRestrictedForPlayer ? '#FFCCD5' : '#FFFFFF';
        ctx.strokeStyle = '#43281C';
        ctx.lineWidth = 2.8;
        ctx.font = 'bold 11px "Fredoka", sans-serif';
        ctx.textAlign = 'center';
        const label = isRestrictedForPlayer ? `⛔ ${npc.name}` : npc.name;
        ctx.strokeText(label, npc.x, npc.y + 32);
        ctx.fillText(label, npc.x, npc.y + 32);
        ctx.restore();
      });

      // 8. Draw Enlarged Player Chibi Avatar
      drawCharacter(
        ctx,
        p.x,
        p.y,
        'player',
        'female',
        p.direction,
        p.isMoving,
        p.isDashing,
        time
      );

      ctx.save();
      ctx.fillStyle = '#FFD166';
      ctx.strokeStyle = '#43281C';
      ctx.lineWidth = 3;
      ctx.font = 'bold 12px "Fredoka", sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeText('Kamu', p.x, p.y + 34);
      ctx.fillText('Kamu', p.x, p.y + 34);
      ctx.restore();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [allNpcs, targetNpc, playerMajor, onInteractNpc, onPlayerMovingChange, ripple]);

  const getTargetAngle = () => {
    if (!targetNpc) return 0;
    const px = playerRef.current.x;
    const py = playerRef.current.y;
    return Math.atan2(targetNpc.y - py, targetNpc.x - px);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none touch-none">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onPointerUp={(e) => handlePointerUp(e.clientX, e.clientY)}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Top HUD: Quest Objective, Total XP Badge, Compass Arrow */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 pointer-events-none flex items-center justify-between gap-2 max-w-xl mx-auto">
        <div className="retro-box-sm bg-[#FFFDF4]/95 p-2 sm:p-2.5 flex items-center gap-2.5 shadow-md flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#E76F51] border-2 border-[#43281C] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {isBatangTourActive ? '🏞️' : story.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#D62828] uppercase font-bold">
                {isBatangTourActive
                  ? `JELAJAH BATANG #${batangTourStep + 1}/3:`
                  : `MISI BAB ${currentChapter}:`}
              </span>
              <span className="text-[10px] bg-amber-100 text-[#5C4033] px-1.5 py-0.2 rounded font-semibold border border-amber-300">
                {isBatangTourActive ? 'Misi Wilayah Batang' : `Langkah ${currentChapter}/5`}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold border border-emerald-400 font-mono">
                ⭐ {totalXp} XP
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#43281C] truncate">
              {targetNpc ? `Temui ${targetNpc.name} di ${targetNpc.zone}` : 'Selesaikan Proyek Akhir'}
            </p>
          </div>
        </div>

        {/* Directional Compass Arrow pointing to target NPC */}
        {targetNpc && (
          <div className="retro-box-sm bg-[#FFB703] p-1.5 flex items-center justify-center w-11 h-11 shrink-0 shadow-md">
            <div
              className="text-lg transition-transform duration-100"
              style={{ transform: `rotate(${getTargetAngle() + Math.PI / 2}rad)` }}
              title="Arah Misi"
            >
              ▲
            </div>
          </div>
        )}
      </div>

      {/* Subtle Hint Overlay */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
        <span className="bg-black/50 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
          💡 Karakter Diperbesar • Ketuk untuk jalan • Jentik/Swipe untuk lari
        </span>
      </div>
    </div>
  );
};
