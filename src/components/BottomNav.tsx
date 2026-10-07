import React, { useState, useEffect } from 'react';
import { soundManager } from '../soundSystem';

interface BottomNavProps {
  isPlayerMoving: boolean;
  onOpenMap: () => void;
  onOpenQuest: () => void;
  onOpenVocab: () => void;
  onOpenGuide: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  isPlayerMoving,
  onOpenMap,
  onOpenQuest,
  onOpenVocab,
  onOpenGuide
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide when player moves, reappear 2s after player stops
  useEffect(() => {
    let timer: number | null = null;
    if (isPlayerMoving) {
      setIsVisible(false);
    } else {
      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isPlayerMoving]);

  const toggleSound = () => {
    soundManager.playTap();
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const toggleFullscreen = () => {
    soundManager.playTap();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setIsFullscreen(false);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  return (
    <>
      {/* Bottom edge touch trigger to reveal immediately if hidden */}
      {!isVisible && (
        <div
          onClick={() => {
            soundManager.playTap();
            setIsVisible(true);
          }}
          className="fixed bottom-0 left-0 right-0 h-10 z-30 cursor-pointer flex items-center justify-center pointer-events-auto"
        >
          <div className="bg-[#43281C]/70 text-white text-[10px] font-bold px-3 py-1 rounded-t-lg backdrop-blur-xs">
            ▲ Ketuk untuk Buka Menu Navigasi
          </div>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <div
        className={`fixed bottom-2 left-0 right-0 z-30 px-2 sm:px-4 transition-all duration-300 pointer-events-auto ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="max-w-xl mx-auto retro-box-sm bg-[#FFFDF4] p-1.5 sm:p-2 flex items-center justify-between gap-1 shadow-xl">
          {/* Peta */}
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenMap();
            }}
            className="flex-1 flex flex-col items-center justify-center p-1.5 rounded-lg border-2 border-[#43281C] bg-[#FFE8D6] hover:bg-amber-100 cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 transition-transform"
          >
            <span className="text-base sm:text-lg">🗺️</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#43281C]">Peta</span>
          </button>

          {/* Misi */}
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenQuest();
            }}
            className="flex-1 flex flex-col items-center justify-center p-1.5 rounded-lg border-2 border-[#43281C] bg-[#FFE8D6] hover:bg-amber-100 cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 transition-transform"
          >
            <span className="text-base sm:text-lg">📜</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#43281C]">Misi</span>
          </button>

          {/* Kosakata */}
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenVocab();
            }}
            className="flex-1 flex flex-col items-center justify-center p-1.5 rounded-lg border-2 border-[#43281C] bg-[#FFE8D6] hover:bg-amber-100 cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 transition-transform"
          >
            <span className="text-base sm:text-lg">📚</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#43281C]">Kosakata</span>
          </button>

          {/* Suara */}
          <button
            type="button"
            onClick={toggleSound}
            className={`flex-1 flex flex-col items-center justify-center p-1.5 rounded-lg border-2 border-[#43281C] cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 transition-transform ${
              isMuted ? 'bg-gray-200' : 'bg-[#E8F5E9]'
            }`}
          >
            <span className="text-base sm:text-lg">{isMuted ? '🔇' : '🔊'}</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#43281C]">
              {isMuted ? 'Mute' : 'Suara'}
            </span>
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex-1 flex flex-col items-center justify-center p-1.5 rounded-lg border-2 border-[#43281C] bg-[#FFE8D6] hover:bg-amber-100 cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 transition-transform"
          >
            <span className="text-base sm:text-lg">{isFullscreen ? '🗗' : '⛶'}</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#43281C]">
              {isFullscreen ? 'Kecil' : 'Layar'}
            </span>
          </button>

          {/* Petunjuk */}
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenGuide();
            }}
            className="flex-1 flex flex-col items-center justify-center p-1.5 rounded-lg border-2 border-[#43281C] bg-[#FFE8D6] hover:bg-amber-100 cursor-pointer min-h-[48px] min-w-[48px] active:scale-95 transition-transform"
          >
            <span className="text-base sm:text-lg">💡</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#43281C]">Menu</span>
          </button>
        </div>
      </div>
    </>
  );
};
