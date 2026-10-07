import React, { useState } from 'react';
import { GrammarPracticeQuestion } from '../types';
import { GRAMMAR_PRACTICE_QUESTIONS } from '../gameData';
import { soundManager } from '../soundSystem';

interface GrammarPracticeModalProps {
  onCompleted: (xpEarned: number) => void;
  onMissionFailed: (reason: string) => void;
}

export const GrammarPracticeModal: React.FC<GrammarPracticeModalProps> = ({
  onCompleted,
  onMissionFailed
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; text: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: GrammarPracticeQuestion | undefined = GRAMMAR_PRACTICE_QUESTIONS[currentIndex];

  const handleSelectOption = (opt: string) => {
    // "Jawaban yang sudah dijawab tidak bisa dijawab lagi"
    if (isAnswerLocked) return;
    soundManager.playTap();
    setSelectedOption(opt);
    setFeedback(null);
  };

  const handleCheckAnswer = () => {
    if (!currentQ || !selectedOption || isAnswerLocked) return;

    // Lock option so it cannot be clicked again
    setIsAnswerLocked(true);

    if (selectedOption === currentQ.correctAnswer) {
      soundManager.playCorrect();
      setCorrectCount(prev => prev + 1);
      setFeedback({
        isSuccess: true,
        text: `Tepat sekali (+5 XP)! ${currentQ.explanation}`
      });
    } else {
      soundManager.playWrong();
      const newErrors = errorCount + 1;
      setErrorCount(newErrors);

      // Failing threshold: max 2 errors allowed in foundational grammar
      if (newErrors >= 3) {
        setFeedback({
          isSuccess: false,
          text: `❌ MISI GAGAL: Terlalu banyak kesalahan pada aturan dasar grammar (${newErrors} kali salah). Mengulang ke halaman depan...`
        });
        window.setTimeout(() => {
          onMissionFailed('Gagal pada latihan grammar dasar (It is / It has / There is / There are).');
        }, 2800);
        return;
      }

      setFeedback({
        isSuccess: false,
        text: `Kurang tepat (0 XP). Jawaban benar: "${currentQ.correctAnswer}". ${currentQ.explanation}`
      });
    }
  };

  const handleNext = () => {
    soundManager.playTap();
    if (currentIndex + 1 < GRAMMAR_PRACTICE_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
      setFeedback(null);
    } else {
      // Completed all questions!
      soundManager.playLevelUp();
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    const totalGrammarXp = correctCount * 5;
    onCompleted(totalGrammarXp);
  };

  if (!currentQ) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="retro-box max-w-xl w-full p-4 sm:p-6 text-[#43281C] max-h-[92dvh] flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">📝</span>
              <div>
                <h2 className="font-pixel text-xs sm:text-sm text-[#D62828] leading-tight">
                  LATIHAN GRAMMAR DESKRIPSI
                </h2>
                <p className="text-[11px] font-bold text-[#5C4033]">
                  Pola: It is • It has / They have • There is • There are
                </p>
              </div>
            </div>
            <div className="font-pixel text-[11px] bg-[#FFE8D6] px-2.5 py-1 rounded-md border-2 border-[#43281C]">
              {currentIndex + 1} / {GRAMMAR_PRACTICE_QUESTIONS.length}
            </div>
          </div>

          {/* Grammar Rule Pill Guide */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3 text-[10px] font-bold text-center">
            <div className="bg-blue-100 border border-blue-400 p-1 rounded text-blue-900">
              🔹 It is<br/><span className="text-[9px] font-normal">Sifat tunggal</span>
            </div>
            <div className="bg-amber-100 border border-amber-400 p-1 rounded text-amber-900">
              🔸 It has / They have<br/><span className="text-[9px] font-normal">Memiliki fitur</span>
            </div>
            <div className="bg-emerald-100 border border-emerald-400 p-1 rounded text-emerald-900">
              🟢 There is<br/><span className="text-[9px] font-normal">Ada 1 benda</span>
            </div>
            <div className="bg-purple-100 border border-purple-400 p-1 rounded text-purple-900">
              🟣 There are<br/><span className="text-[9px] font-normal">Ada banyak benda</span>
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-3">
              {/* Question Box */}
              <div className="bg-[#FFFDF4] p-3.5 rounded-xl border-2 border-[#43281C] shadow-inner">
                <div className="text-[11px] text-gray-500 font-bold uppercase mb-1">
                  Petunjuk Soal ({currentQ.ruleCategory}):
                </div>
                <div className="font-pixel text-xs sm:text-sm text-[#1F2937] leading-relaxed mb-2">
                  {currentQ.promptSentence}
                </div>
                <div className="text-xs text-[#5C4033] italic border-t pt-2 border-[#43281C]/20">
                  🇮🇩 Arti: "{currentQ.sentenceId}"
                </div>
                <div className="mt-1 text-[11px] text-[#2A9D8F] font-semibold">
                  💡 Hint: {currentQ.missingWordHint}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-[#43281C]">
                  Pilih kata pembuka yang tepat:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const isCorrectAnswer = opt === currentQ.correctAnswer;
                    let btnStyle = 'bg-white border-[#43281C] text-[#43281C] hover:bg-amber-50';

                    if (isAnswerLocked) {
                      if (isCorrectAnswer) {
                        btnStyle = 'bg-emerald-200 border-emerald-600 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrectAnswer) {
                        btnStyle = 'bg-red-200 border-red-600 text-red-900';
                      } else {
                        btnStyle = 'bg-gray-100 border-gray-300 text-gray-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-[#FFB703] border-[#43281C] text-[#43281C] font-bold';
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        disabled={isAnswerLocked}
                        className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-pixel transition-all cursor-pointer min-h-[48px] flex items-center justify-center text-center ${btnStyle} ${
                          isAnswerLocked ? 'cursor-not-allowed' : ''
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-3 rounded-xl border-2 text-xs leading-relaxed animate-in fade-in duration-150 ${
                    feedback.isSuccess
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-semibold'
                      : 'bg-red-100 border-red-500 text-red-900 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{feedback.isSuccess ? '✅' : '❌'}</span>
                    <span className="font-bold">{feedback.isSuccess ? 'Jawaban Benar!' : 'Perlu Diingat!'}</span>
                  </div>
                  <div>{feedback.text}</div>
                </div>
              )}
            </div>
          ) : (
            /* Finished Summary Card */
            <div className="bg-[#FFF8E7] p-4 rounded-xl border-3 border-[#43281C] text-center space-y-3 my-4">
              <span className="text-4xl">🎉</span>
              <h3 className="font-pixel text-sm sm:text-base text-[#D62828]">
                LATIHAN GRAMMAR SELESAI!
              </h3>
              <p className="text-xs text-[#5C4033] leading-relaxed">
                Kamu telah menguasai pola kalimat dasar deskriptif: <strong>It is</strong>, <strong>It has</strong>, <strong>There is</strong>, dan <strong>There are</strong>!
              </p>
              <div className="p-2.5 bg-emerald-100 border border-emerald-400 rounded-lg text-xs font-bold text-emerald-900">
                Poin XP Diperoleh: +{correctCount * 5} XP ({correctCount}/{GRAMMAR_PRACTICE_QUESTIONS.length} Soal Benar)
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="pt-3 border-t-2 border-[#43281C] mt-3">
          {!isFinished ? (
            !isAnswerLocked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={`w-full retro-btn font-bold py-3 px-4 rounded-xl text-xs sm:text-sm cursor-pointer transition-all ${
                  selectedOption
                    ? 'bg-[#2A9D8F] text-white hover:bg-[#21867A]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Kunci & Cek Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full retro-btn bg-[#FFB703] text-[#43281C] hover:bg-amber-400 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                {currentIndex + 1 < GRAMMAR_PRACTICE_QUESTIONS.length ? 'Lanjut ke Soal Berikutnya ➔' : 'Lihat Hasil Latihan ➔'}
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm cursor-pointer"
            >
              Masuk ke Halaman Sekolah & Misi Selanjutnya ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
