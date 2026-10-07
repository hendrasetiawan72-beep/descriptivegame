import React, { useEffect, useState, useRef } from 'react';
import { NPC } from '../types';
import { soundManager } from '../soundSystem';

interface DialogueBoxProps {
  npc: NPC;
  textEn: string;
  textId: string;
  isQuestDialog: boolean;
  chapterNumber?: number;
  proactivePrompt?: string;
  onStartQuest?: () => void;
  onClose: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  npc,
  textEn,
  textId,
  isQuestDialog,
  chapterNumber,
  proactivePrompt,
  onStartQuest,
  onClose
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [proactiveTriggered, setProactiveTriggered] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    soundManager.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });

    // Speak initial dialog automatically upon opening
    soundManager.speak(textEn, npc.gender, () => {
      // When dialog ends, start 6-second proactive timer if it's a quest NPC
      if (isQuestDialog && proactivePrompt && !proactiveTriggered) {
        if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = window.setTimeout(() => {
          setProactiveTriggered(true);
          soundManager.speak(proactivePrompt, npc.gender);
        }, 6000);
      }
    });

    return () => {
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
      soundManager.stopSpeech();
    };
  }, [textEn, npc.gender, isQuestDialog, proactivePrompt, proactiveTriggered]);

  const handleSkip = () => {
    soundManager.playTap();
    soundManager.stopSpeech();
  };

  const handleReplay = () => {
    soundManager.playTap();
    const textToSpeak = proactiveTriggered && proactivePrompt ? proactivePrompt : textEn;
    soundManager.speak(textToSpeak, npc.gender);
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-auto">
      <div className="max-w-2xl mx-auto retro-box max-h-[38dvh] sm:max-h-[34dvh] flex flex-col p-3 sm:p-4 text-[#43281C] animate-in slide-in-from-bottom-4 duration-150">
        {/* Speaker Info Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-2">
          <div className="flex items-center gap-2">
            {/* Chibi portrait icon */}
            <div className={`w-9 h-9 rounded-lg border-2 border-[#43281C] flex items-center justify-center text-lg ${
              npc.gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'
            }`}>
              {npc.spriteType === 'robot' ? '🤖' : npc.gender === 'female' ? '👩' : '👨'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[11px] sm:text-xs text-[#D62828] font-bold">
                  {npc.name}
                </span>
                {isSpeaking && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-mono animate-pulse">
                    🔊 Speaking...
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#5C4033] font-semibold">
                {npc.role} • {npc.zone}
              </span>
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReplay}
              title="Ulangi Suara"
              className="px-2.5 py-1 rounded-lg border-2 border-[#43281C] bg-white text-xs font-bold hover:bg-amber-100 cursor-pointer min-h-[34px] min-w-[34px] flex items-center justify-center gap-1"
            >
              🔄 <span className="hidden sm:inline">Ulangi</span>
            </button>
            <button
              type="button"
              onClick={handleSkip}
              title="Lewati Suara"
              className="px-2.5 py-1 rounded-lg border-2 border-[#43281C] bg-white text-xs font-bold hover:bg-amber-100 cursor-pointer min-h-[34px] min-w-[34px] flex items-center justify-center gap-1"
            >
              ⏭️ <span className="hidden sm:inline">Skip</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-white text-xs font-bold hover:bg-red-100 cursor-pointer flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Dialogue Text Content with internal scroll */}
        <div className="overflow-y-auto custom-scroll flex-1 pr-1 space-y-2 mb-2">
          {/* Main English Text (Spoken) */}
          <p className="text-sm sm:text-base font-semibold text-[#1F2937] leading-relaxed select-text">
            "{textEn}"
          </p>

          {/* Indonesian Translation Helper */}
          <div className="bg-[#FFF8E7] p-2 rounded-lg border border-[#E07A5F] text-xs text-[#5C4033]">
            <span className="font-bold text-[10px] uppercase text-[#D62828] block mb-0.5">
              Arti Bahasa Indonesia:
            </span>
            {textId}
          </div>

          {/* Proactive NPC Prompt if triggered */}
          {proactiveTriggered && proactivePrompt && (
            <div className="bg-amber-100 p-2.5 rounded-lg border-2 border-amber-400 text-xs text-[#43281C] animate-in fade-in">
              <span className="font-bold text-[#D62828] block mb-0.5">
                💬 {npc.name} mengajak ngobrol:
              </span>
              "{proactivePrompt}"
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1 border-t border-[#43281C]/20 gap-2">
          <span className="text-[10px] text-gray-500 font-medium">
            Ketuk di luar atau tombol ✕ untuk menutup
          </span>

          {isQuestDialog && onStartQuest && (
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onStartQuest();
              }}
              className="retro-btn bg-[#FFB703] text-[#43281C] hover:bg-[#FFA500] px-4 py-1.5 text-xs sm:text-sm font-bold cursor-pointer shadow-sm active:translate-y-0.5 min-h-[40px]"
            >
              <span>⭐</span>
              <span>Mulai Misi Bab {chapterNumber || 1} ➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
