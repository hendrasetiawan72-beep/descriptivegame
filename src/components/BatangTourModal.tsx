import React, { useState, useEffect } from 'react';
import { BatangTourStop } from '../types';
import { soundManager } from '../soundSystem';

interface BatangTourModalProps {
  stop: BatangTourStop;
  stepNumber: number; // 1, 2, or 3
  onCompletedStep: (xpEarned: number) => void;
  onMissionFailed: (reason: string) => void;
  onClose: () => void;
}

export const BatangTourModal: React.FC<BatangTourModalProps> = ({
  stop,
  stepNumber,
  onCompletedStep,
  onMissionFailed,
  onClose
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    soundManager.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });

    soundManager.speak(stop.storyEn, stop.gender);

    return () => {
      soundManager.stopSpeech();
    };
  }, [stop]);

  const handleSelectOption = (optId: string) => {
    // If answer already submitted, cannot change or answer again!
    if (isAnswerSubmitted) return;
    soundManager.playTap();
    setSelectedOptionId(optId);
    setFeedback(null);
  };

  const handleCheck = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    const option = stop.options.find(o => o.id === selectedOptionId);
    if (!option) return;

    setIsAnswerSubmitted(true); // Lock answer immediately!

    if (option.isCorrect) {
      soundManager.playCorrect();
      setFeedback({
        isCorrect: true,
        text: `Tepat sekali! (+15 XP) ${stop.explanation}`
      });
      soundManager.speak(option.textEn, stop.gender);
    } else {
      soundManager.playWrong();
      setFeedback({
        isCorrect: false,
        text: `❌ MISI GAGAL! Jawaban salah: "${option.textEn}". Menurut aturan, misi dinyatakan gagal dan kamu harus mengulang dari halaman depan!`
      });

      // Auto trigger mission failure redirect after 2.5s
      window.setTimeout(() => {
        onMissionFailed(`Salah memilih jawaban pada destinasi "${stop.locationName}". Deskripsi tidak akurat!`);
      }, 2500);
    }
  };

  const handleReplayVoice = () => {
    soundManager.playTap();
    soundManager.speak(stop.storyEn, stop.gender);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs overflow-y-auto">
      <div className="retro-box w-full max-w-xl max-h-[92dvh] flex flex-col p-4 sm:p-6 text-[#43281C] animate-in zoom-in-95 duration-150 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase bg-[#2A9D8F] text-white px-2 py-1 rounded border-2 border-[#43281C]">
              JELAJAH BATANG #{stepNumber}/3
            </span>
            <h2 className="font-bold text-xs sm:text-sm text-[#D62828] truncate">
              {stop.title}
            </h2>
          </div>
          {!isAnswerSubmitted && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-white font-bold text-sm hover:bg-red-100 cursor-pointer flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* NPC Profile & Story Speech */}
        <div className="bg-[#FFF8E7] p-3.5 rounded-xl border-2 border-[#43281C] mb-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stop.id === 'waterfall' ? '🏞️' : stop.id === 'kopi' ? '☕' : '🏭'}</span>
              <div>
                <span className="font-bold text-xs text-[#D62828] block">
                  {stop.npcName} ({stop.npcRole})
                </span>
                <span className="text-[10px] text-gray-600 font-semibold">
                  Lokasi: {stop.locationName}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReplayVoice}
              className="px-2.5 py-1 rounded-lg border-2 border-[#43281C] bg-white text-xs font-bold hover:bg-amber-100 cursor-pointer flex items-center gap-1"
            >
              🔊 {isSpeaking ? 'Membaca...' : 'Ulangi'}
            </button>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-gray-800 italic leading-relaxed bg-white p-2.5 rounded-lg border border-gray-300">
            "{stop.storyEn}"
          </p>
          <p className="text-[11px] text-[#5C4033] font-medium">
            Artinya: {stop.storyId}
          </p>
        </div>

        {/* Question */}
        <div className="mb-2">
          <label className="block font-bold text-xs sm:text-sm text-[#43281C] mb-0.5">
            ❓ {stop.questionEn}
          </label>
          <p className="text-[11px] text-gray-500 font-medium">
            ({stop.questionId})
          </p>
          {isAnswerSubmitted && (
            <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold border border-amber-300 inline-block mt-1">
              🔒 Jawaban telah dikunci dan tidak dapat diubah
            </span>
          )}
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-2 overflow-y-auto custom-scroll flex-1 pr-1 mb-3">
          {stop.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-2.5 min-h-[52px] ${
                  isAnswerSubmitted ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
                } ${
                  isSelected
                    ? feedback?.isCorrect
                      ? 'bg-emerald-100 border-emerald-600 shadow-sm'
                      : feedback && !feedback.isCorrect
                      ? 'bg-red-100 border-red-600 shadow-sm'
                      : 'bg-[#FFE8D6] border-[#D62828] shadow-sm'
                    : 'bg-white border-[#43281C] hover:bg-amber-50'
                }`}
              >
                <span className="font-pixel text-[11px] bg-[#FFB703] text-[#43281C] w-6 h-6 flex items-center justify-center rounded border border-[#43281C] shrink-0 mt-0.5">
                  {letter}
                </span>
                <div>
                  <div className="font-bold text-xs text-gray-900 leading-snug">
                    "{opt.textEn}"
                  </div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    {opt.textId}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-3 rounded-xl border-2 text-xs font-semibold mb-3 ${
              feedback.isCorrect
                ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                : 'bg-red-100 border-red-500 text-red-900 animate-pulse'
            }`}
          >
            {feedback.isCorrect ? '✅ ' : '❌ '}
            {feedback.text}
          </div>
        )}

        {/* Action Button */}
        {!isAnswerSubmitted ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={!selectedOptionId}
            className="retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] font-bold py-2.5 px-4 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
          >
            Pilih & Kunci Jawaban
          </button>
        ) : feedback?.isCorrect ? (
          <button
            type="button"
            onClick={() => onCompletedStep(15)}
            className="retro-btn bg-[#FFB703] text-[#43281C] hover:bg-[#FFA500] font-bold py-3 px-4 text-xs sm:text-sm cursor-pointer shadow-md"
          >
            {stepNumber < 3 ? 'Lanjut ke Destinasi Berikutnya (+15 XP) ➔' : 'Selesai! Mulai Misi Utama Jurusan (+15 XP) ➔'}
          </button>
        ) : (
          <div className="text-center font-bold text-red-600 text-xs py-2">
            Mengembalikan pemain ke halaman awal...
          </div>
        )}
      </div>
    </div>
  );
};
