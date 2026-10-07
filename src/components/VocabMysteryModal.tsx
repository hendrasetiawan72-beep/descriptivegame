import React, { useState } from 'react';
import { VocabMysteryCard } from '../types';
import { VOCAB_MYSTERY_CARDS } from '../gameData';
import { soundManager } from '../soundSystem';

interface VocabMysteryModalProps {
  onCompleted: (xpEarned: number) => void;
}

export const VocabMysteryModal: React.FC<VocabMysteryModalProps> = ({ onCompleted }) => {
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [enCards] = useState(() => [...VOCAB_MYSTERY_CARDS].sort(() => Math.random() - 0.5));
  const [idCards] = useState(() => [...VOCAB_MYSTERY_CARDS].sort(() => Math.random() - 0.5));

  const handleSelectEn = (card: VocabMysteryCard) => {
    // Matched card is permanently locked!
    if (matchedPairs.includes(card.enWord)) return;
    soundManager.playTap();
    soundManager.speak(card.enWord, 'female');
    setSelectedEn(card.enWord);
    setFeedback(null);

    if (selectedId) {
      checkMatch(card.enWord, selectedId);
    }
  };

  const handleSelectId = (card: VocabMysteryCard) => {
    if (matchedPairs.includes(card.enWord)) return;
    soundManager.playTap();
    setSelectedId(card.idWord);
    setFeedback(null);

    if (selectedEn) {
      checkMatch(selectedEn, card.idWord);
    }
  };

  const checkMatch = (enWord: string, idWord: string) => {
    const card = VOCAB_MYSTERY_CARDS.find(c => c.enWord === enWord);
    if (card && card.idWord === idWord) {
      soundManager.playCorrect();
      const newMatches = [...matchedPairs, enWord];
      setMatchedPairs(newMatches);
      setSelectedEn(null);
      setSelectedId(null);
      setFeedback(`Benar! "${enWord}" = "${idWord}" (+5 XP). ${card.hint}`);

      if (newMatches.length === VOCAB_MYSTERY_CARDS.length) {
        soundManager.playLevelUp();
      }
    } else {
      soundManager.playWrong();
      setFeedback(`Belum tepat. Coba lagi kata "${enWord}".`);
      setSelectedEn(null);
      setSelectedId(null);
    }
  };

  const isAllMatched = matchedPairs.length === VOCAB_MYSTERY_CARDS.length;
  const currentXp = matchedPairs.length * 5;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs overflow-y-auto">
      <div className="retro-box w-full max-w-2xl max-h-[92dvh] flex flex-col p-4 sm:p-6 text-[#43281C] animate-in zoom-in-95 duration-150 my-auto">
        {/* Header */}
        <div className="text-center border-b-2 border-[#43281C] pb-3 mb-3">
          <span className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase bg-[#E76F51] text-white px-2.5 py-1 rounded-md border-2 border-[#43281C]">
            MISI AWAL: THE VOCABULARY MYSTERY
          </span>
          <h2 className="font-pixel text-sm sm:text-base text-[#D62828] mt-2 mb-1">
            Mencocokkan Kata Deskriptif & Artinya
          </h2>
          <p className="text-xs text-[#5C4033] font-semibold">
            Ketuk 1 kata di kolom kiri, lalu ketuk arti di kolom kanan. Kartu yang sudah cocok akan terkunci!
          </p>
        </div>

        {/* Progress tracker & XP */}
        <div className="flex items-center justify-between mb-3 px-1 text-xs font-bold text-[#43281C]">
          <span>Pasangan: {matchedPairs.length} / {VOCAB_MYSTERY_CARDS.length}</span>
          <span className="bg-amber-100 text-[#D62828] px-2 py-0.5 rounded font-mono border border-amber-300">
            +{currentXp} XP Diperoleh
          </span>
          <div className="w-28 sm:w-40 bg-gray-200 rounded-full h-3 border border-[#43281C] overflow-hidden">
            <div
              className="bg-[#2A9D8F] h-full transition-all duration-300"
              style={{ width: `${(matchedPairs.length / VOCAB_MYSTERY_CARDS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Matching Columns */}
        <div className="grid grid-cols-2 gap-3 overflow-y-auto custom-scroll p-1 flex-1 mb-3">
          {/* Left: English Words */}
          <div className="space-y-2">
            <div className="text-center font-bold text-xs uppercase text-[#2A9D8F] bg-emerald-50 py-1 rounded border border-emerald-300">
              🇬🇧 English (Kata Sifat)
            </div>
            {enCards.map((card) => {
              const isMatched = matchedPairs.includes(card.enWord);
              const isSelected = selectedEn === card.enWord;

              return (
                <button
                  key={card.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleSelectEn(card)}
                  className={`w-full p-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm text-left transition-all flex items-center justify-between min-h-[46px] ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-800 opacity-70 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#FFB703] border-[#43281C] shadow-md scale-[1.02] cursor-pointer'
                      : 'bg-white border-[#43281C] hover:bg-amber-50 active:scale-95 cursor-pointer'
                  }`}
                >
                  <span>{card.enWord}</span>
                  {isMatched && <span className="text-xs">🔒 +5 XP</span>}
                </button>
              );
            })}
          </div>

          {/* Right: Indonesian Meanings */}
          <div className="space-y-2">
            <div className="text-center font-bold text-xs uppercase text-[#E76F51] bg-orange-50 py-1 rounded border border-orange-300">
              🇮🇩 Bahasa Indonesia (Arti)
            </div>
            {idCards.map((card) => {
              const isMatched = matchedPairs.includes(card.enWord);
              const isSelected = selectedId === card.idWord;

              return (
                <button
                  key={card.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleSelectId(card)}
                  className={`w-full p-2.5 rounded-xl border-2 font-semibold text-xs text-left transition-all flex items-center justify-between min-h-[46px] ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-800 opacity-70 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#FFB703] border-[#43281C] shadow-md scale-[1.02] cursor-pointer'
                      : 'bg-white border-[#43281C] hover:bg-amber-50 active:scale-95 cursor-pointer'
                  }`}
                >
                  <span className="line-clamp-2">{card.idWord}</span>
                  {isMatched && <span className="text-xs">🔒 Cocok</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div className="p-2.5 rounded-xl border-2 bg-amber-50 border-[#43281C] text-xs font-semibold text-[#43281C] mb-3 text-center">
            {feedback}
          </div>
        )}

        {/* Continue Button */}
        {isAllMatched && (
          <button
            type="button"
            onClick={() => onCompleted(40)}
            className="w-full retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] font-bold py-3 px-4 text-xs sm:text-sm cursor-pointer shadow-lg animate-bounce"
          >
            🎉 Selesai (+40 XP)! Lanjut ke Misi Jelajah Batang ➔
          </button>
        )}
      </div>
    </div>
  );
};
