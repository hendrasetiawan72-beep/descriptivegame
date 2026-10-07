import React, { useState, useEffect } from 'react';
import { MajorStory, Chapter2QuizItem, Chapter3Case } from '../types';
import { soundManager } from '../soundSystem';

interface ChapterModalProps {
  chapterIndex: number; // 1 to 5
  story: MajorStory;
  onCompleteChapter: (chapterIndex: number, xpEarned: number, studentText?: string) => void;
  onMissionFailed: (reason: string) => void;
  onClose: () => void;
}

const COMMON_ADJECTIVES = [
  'big', 'small', 'large', 'tiny', 'tall', 'short', 'thick', 'thin', 'wide', 'narrow',
  'heavy', 'light', 'compact', 'neat', 'clean', 'dirty', 'fast', 'slow', 'powerful',
  'red', 'blue', 'green', 'black', 'white', 'yellow', 'silver', 'grey', 'gray', 'orange',
  'metallic', 'wooden', 'plastic', 'leather', 'paper', 'digital', 'electronic',
  'modern', 'sharp', 'accurate', 'reliable', 'sturdy', 'soft', 'hard', 'bright',
  'dark', 'cold', 'hot', 'warm', 'cool', 'sweet', 'quiet', 'loud', 'aerodynamic'
];

export const ChapterModal: React.FC<ChapterModalProps> = ({
  chapterIndex,
  story,
  onCompleteChapter,
  onMissionFailed,
  onClose
}) => {
  // Bab 1 State: Word Cards
  const ch1 = story.chapter1;
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string }[]>([]);
  const [ch1ErrorCount, setCh1ErrorCount] = useState(0);
  const [ch1Feedback, setCh1Feedback] = useState<{ isSuccess: boolean; text: string } | null>(null);

  // Bab 2 State: 10 Quiz Questions with Randomized Options
  const ch2 = story.chapter2;
  const [shuffledQuizItems, setShuffledQuizItems] = useState<Chapter2QuizItem[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizOptionLocked, setIsQuizOptionLocked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isSuccess: boolean; text: string } | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Bab 3 State: 5 Distinct Detective Cases!
  const ch3 = story.chapter3;
  const [caseIndex, setCaseIndex] = useState(0); // 0 to 4
  const [caseScore, setCaseScore] = useState(0);
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);
  const [isSuspectLocked, setIsSuspectLocked] = useState(false);
  const [ch3Feedback, setCh3Feedback] = useState<{ isSuccess: boolean; text: string } | null>(null);
  const [allCasesFinished, setAllCasesFinished] = useState(false);

  // Bab 4 State: Paragraph Ordering
  const ch4 = story.chapter4;
  const [orderedSentences, setOrderedSentences] = useState(ch4.sentences);
  const [ch4HintUsed, setCh4HintUsed] = useState(false);
  const [showCh4Hint, setShowCh4Hint] = useState(false);
  const [ch4Attempts, setCh4Attempts] = useState(0);
  const [ch4Feedback, setCh4Feedback] = useState<{ isSuccess: boolean; text: string } | null>(null);

  // Bab 5 State: Independent Writing Project
  const ch5 = story.chapter5;
  const [writingText, setWritingText] = useState('');
  const [detectedSentences, setDetectedSentences] = useState<string[]>([]);
  const [detectedAdjectives, setDetectedAdjectives] = useState<string[]>([]);
  const [ch5Feedback, setCh5Feedback] = useState<string | null>(null);

  // Setup on mount or chapter change
  useEffect(() => {
    if (chapterIndex === 1) {
      setAvailableWords(ch1.jumbledWords.map((word, idx) => ({ id: `${word}-${idx}`, word })));
      setPlacedWords([]);
    } else if (chapterIndex === 2) {
      // Shuffling all options across all 10 questions!
      const randomized = ch2.quizItems.map(item => ({
        ...item,
        options: [...item.options].sort(() => Math.random() - 0.5)
      }));
      setShuffledQuizItems(randomized);
      setQuizIndex(0);
      setQuizScore(0);
      setSelectedQuizOption(null);
      setIsQuizOptionLocked(false);
      setQuizFeedback(null);
      setQuizFinished(false);
    } else if (chapterIndex === 3) {
      setCaseIndex(0);
      setCaseScore(0);
      setSelectedSuspectId(null);
      setIsSuspectLocked(false);
      setCh3Feedback(null);
      setAllCasesFinished(false);
    } else if (chapterIndex === 4) {
      const shuffled = [...ch4.sentences].sort(() => Math.random() - 0.5);
      setOrderedSentences(shuffled);
    }
  }, [chapterIndex, ch1, ch2, ch3, ch4]);

  // Bab 1 Card Handler
  const handleWordClick = (item: { id: string; word: string }) => {
    soundManager.playTap();
    setAvailableWords(prev => prev.filter(w => w.id !== item.id));
    setPlacedWords(prev => [...prev, item.word]);
    setCh1Feedback(null);
  };

  const handleReturnWord = (index: number) => {
    soundManager.playTap();
    const wordToRemove = placedWords[index];
    setPlacedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, { id: `${wordToRemove}-${Date.now()}`, word: wordToRemove }]);
    setCh1Feedback(null);
  };

  const handleCheckCh1 = () => {
    const constructed = placedWords.join(' ');
    if (constructed === ch1.targetSentence) {
      soundManager.playCorrect();
      setCh1Feedback({
        isSuccess: true,
        text: `Benar sekali (+25 XP)! ${ch1.explanation}`
      });
    } else {
      soundManager.playWrong();
      const newErrors = ch1ErrorCount + 1;
      setCh1ErrorCount(newErrors);

      if (newErrors >= 4) {
        setCh1Feedback({
          isSuccess: false,
          text: '❌ MISI GAGAL: Terlalu banyak kesalahan menyusun kalimat dasar. Mengulang ke halaman depan...'
        });
        window.setTimeout(() => {
          onMissionFailed('Gagal menyusun kalimat dasar pada Bab 1.');
        }, 2500);
        return;
      }

      setCh1Feedback({
        isSuccess: false,
        text: `Susunan belum tepat (${newErrors}/3 kesempatan). Ingat polanya: "This is a/an [benda]. It is [sifat]."`
      });
    }
  };

  // Bab 2: 10 Soal Quiz Handler
  const currentQuizItem: Chapter2QuizItem | undefined = shuffledQuizItems[quizIndex];

  const handleSelectQuizOption = (opt: string) => {
    // "Jawaban yang sudah dijawab tidak bisa dijawab lagi"
    if (isQuizOptionLocked) return;
    soundManager.playTap();
    setSelectedQuizOption(opt);
    setQuizFeedback(null);
  };

  const handleCheckQuizAnswer = () => {
    if (!currentQuizItem || !selectedQuizOption || isQuizOptionLocked) return;

    setIsQuizOptionLocked(true); // Lock answer!

    if (selectedQuizOption === currentQuizItem.correctAnswer) {
      soundManager.playCorrect();
      setQuizScore(prev => prev + 1);
      setQuizFeedback({
        isSuccess: true,
        text: `Tepat sekali (+5 XP)! ${currentQuizItem.explanation}`
      });
    } else {
      soundManager.playWrong();
      setQuizFeedback({
        isSuccess: false,
        text: `Kurang tepat (0 XP). Jawaban benar: "${currentQuizItem.correctAnswer}". ${currentQuizItem.explanation}`
      });
    }
  };

  const handleNextQuizQuestion = () => {
    soundManager.playTap();
    if (quizIndex + 1 < shuffledQuizItems.length) {
      setQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizOptionLocked(false);
      setQuizFeedback(null);
    } else {
      // Finished all 10 questions: check passing grade (min 6 correct)
      soundManager.playLevelUp();
      setQuizFinished(true);

      if (quizScore < 6) {
        window.setTimeout(() => {
          onMissionFailed(`Skor Bab 2 tidak memenuhi batas kelulusan minimal (${quizScore}/10 benar, minimal 6).`);
        }, 2800);
      }
    }
  };

  // Bab 3: 5 Cases Handler
  const currentCase: Chapter3Case | undefined = ch3.cases[caseIndex];

  const handleSelectSuspect = (suspectId: string) => {
    // "Jawaban yang sudah dijawab tidak bisa dijawab lagi"
    if (isSuspectLocked) return;
    soundManager.playTap();
    setSelectedSuspectId(suspectId);
    setCh3Feedback(null);
  };

  const handleCheckCaseAnswer = () => {
    if (!currentCase || !selectedSuspectId || isSuspectLocked) return;
    const suspect = currentCase.suspects.find(s => s.id === selectedSuspectId);
    if (!suspect) return;

    setIsSuspectLocked(true); // Lock choice!

    if (suspect.isCorrect) {
      soundManager.playCorrect();
      setCaseScore(prev => prev + 1);
      setCh3Feedback({
        isSuccess: true,
        text: `Tepat sekali (+10 XP)! ${suspect.feedback}`
      });
    } else {
      soundManager.playWrong();
      setCh3Feedback({
        isSuccess: false,
        text: `❌ MISI GAGAL! Salah mengidentifikasi ciri saksi (${suspect.title}). Hal ini menyebabkan salah tuduh! Mengulang ke halaman depan...`
      });

      window.setTimeout(() => {
        onMissionFailed(`Salah menuduh pada Kasus ${caseIndex + 1} Bab 3: ${suspect.feedback}`);
      }, 2800);
    }
  };

  const handleNextCase = () => {
    soundManager.playTap();
    if (caseIndex + 1 < ch3.cases.length) {
      setCaseIndex(prev => prev + 1);
      setSelectedSuspectId(null);
      setIsSuspectLocked(false);
      setCh3Feedback(null);
    } else {
      // Completed all 5 cases successfully!
      soundManager.playLevelUp();
      setAllCasesFinished(true);
    }
  };

  // Bab 4 Handler
  const moveSentence = (index: number, direction: 'up' | 'down') => {
    soundManager.playTap();
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= orderedSentences.length) return;
    const updated = [...orderedSentences];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setOrderedSentences(updated);
    setCh4Feedback(null);
  };

  const handleCheckCh4 = () => {
    const isCorrect = orderedSentences.every((s, idx) => s.order === idx + 1);
    if (isCorrect) {
      soundManager.playCorrect();
      setCh4Feedback({
        isSuccess: true,
        text: `Luar biasa (+${ch4HintUsed ? '25' : '30'} XP)! Paragraf tersusun rapi. ${ch4.explanation}`
      });
    } else {
      soundManager.playWrong();
      const attempts = ch4Attempts + 1;
      setCh4Attempts(attempts);

      if (attempts >= 4) {
        setCh4Feedback({
          isSuccess: false,
          text: '❌ MISI GAGAL: Terlalu banyak kesalahan menyusun struktur paragraf (Identification -> Description). Mengulang ke depan...'
        });
        window.setTimeout(() => {
          onMissionFailed('Gagal menyusun struktur paragraf pada Bab 4.');
        }, 2500);
        return;
      }

      setCh4Feedback({
        isSuccess: false,
        text: `Urutan belum sesuai struktur (${attempts}/3 percobaan). Letakkan Identification di posisi pertama, diikuti Description.`
      });
    }
  };

  // Bab 5 Live Validator
  useEffect(() => {
    if (chapterIndex !== 5) return;
    const rawSentences = writingText
      .split(/(?<=[.?!])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 5);
    setDetectedSentences(rawSentences);

    const words = writingText.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
    const foundAdjs = Array.from(new Set(words.filter(w => COMMON_ADJECTIVES.includes(w))));
    setDetectedAdjectives(foundAdjs);
  }, [writingText, chapterIndex]);

  const handleCheckCh5 = () => {
    if (detectedSentences.length < 5) {
      soundManager.playWrong();
      setCh5Feedback(`Teksmu baru memiliki ${detectedSentences.length} kalimat. Tambahkan hingga minimal 5 kalimat deskriptif!`);
      return;
    }

    const allHavePunctuation = detectedSentences.every(s => /[.?!]$/.test(s));
    if (!allHavePunctuation) {
      soundManager.playWrong();
      setCh5Feedback('Pastikan setiap kalimat diakhiri tanda titik (.) atau tanda baca yang tepat.');
      return;
    }

    const allCapitalized = detectedSentences.every(s => /^[A-Z]/.test(s));
    if (!allCapitalized) {
      soundManager.playWrong();
      setCh5Feedback('Awal setiap kalimat wajib menggunakan huruf kapital (huruf besar).');
      return;
    }

    if (detectedAdjectives.length < 3) {
      soundManager.playWrong();
      setCh5Feedback(`Baru ditemukan ${detectedAdjectives.length} kata sifat. Tambahkan kata sifat seperti: clean, fast, modern, metallic, sturdy, dll.`);
      return;
    }

    soundManager.playLevelUp();
    onCompleteChapter(5, 50, writingText.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="retro-box max-w-xl w-full p-4 sm:p-6 text-[#43281C] max-h-[92dvh] flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">
                {chapterIndex === 1 ? '💬' : chapterIndex === 2 ? '📦' : chapterIndex === 3 ? '🕵️‍♂️' : chapterIndex === 4 ? '📑' : '✍️'}
              </span>
              <div>
                <h2 className="font-pixel text-xs sm:text-sm text-[#D62828] leading-tight">
                  {chapterIndex === 1 && ch1.title}
                  {chapterIndex === 2 && ch2.title}
                  {chapterIndex === 3 && ch3.title}
                  {chapterIndex === 4 && ch4.title}
                  {chapterIndex === 5 && ch5.title}
                </h2>
                <p className="text-[11px] font-bold text-[#5C4033]">
                  {story.title}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="text-gray-500 hover:text-black font-bold text-lg px-2 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* ================= BAB 1 ================= */}
          {chapterIndex === 1 && (
            <div className="space-y-4">
              <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C] space-y-1">
                <p className="font-semibold text-xs text-[#5C4033]">
                  🎯 <strong>Misi:</strong> {ch1.instruction}
                </p>
                <p className="text-[11px] text-[#2A9D8F] font-bold">
                  Konteks: {ch1.contextId}
                </p>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 mt-1">
                  💡 <strong>Rumus:</strong> Identification ("This is a/an [benda]") ➔ Description ("It is [sifat]").
                </div>
              </div>

              {/* Slot Area */}
              <div>
                <label className="block text-[11px] font-bold text-[#43281C] mb-1">
                  Susunan Kalimatmu (Ketuk kata di bawah untuk menyusun):
                </label>
                <div className="min-h-[58px] p-2.5 bg-[#FFFDF4] rounded-xl border-2 border-dashed border-[#43281C] flex flex-wrap gap-2 items-center">
                  {placedWords.length === 0 ? (
                    <span className="text-gray-400 text-xs italic">
                      Ketuk kartu kata di bawah untuk memasukkan ke sini...
                    </span>
                  ) : (
                    placedWords.map((word, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleReturnWord(idx)}
                        className="retro-btn bg-[#FFB703] text-[#43281C] text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-amber-400 animate-in zoom-in-90"
                      >
                        {word} ✕
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Word Bank Cards */}
              <div>
                <label className="block text-[11px] font-bold text-[#43281C] mb-1">
                  Kartu Kata Tersedia:
                </label>
                <div className="p-2.5 bg-gray-50 rounded-xl border-2 border-[#43281C] flex flex-wrap gap-2">
                  {availableWords.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleWordClick(item)}
                      className="retro-btn bg-white hover:bg-amber-50 text-[#43281C] text-xs font-bold px-3 py-2 rounded-lg border-2 border-[#43281C] cursor-pointer shadow-xs min-h-[44px]"
                    >
                      {item.word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              {ch1Feedback && (
                <div
                  className={`p-3 rounded-xl border-2 text-xs font-semibold ${
                    ch1Feedback.isSuccess
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-red-100 border-red-400 text-red-900'
                  }`}
                >
                  {ch1Feedback.isSuccess ? '✅ ' : '❌ '}
                  {ch1Feedback.text}
                </div>
              )}

              {/* Action */}
              <div className="pt-2 flex justify-end gap-2">
                {!ch1Feedback?.isSuccess ? (
                  <button
                    type="button"
                    onClick={handleCheckCh1}
                    disabled={placedWords.length === 0}
                    className="retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] px-5 py-2.5 font-bold cursor-pointer disabled:opacity-50"
                  >
                    Periksa Kalimat
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onCompleteChapter(1, 25)}
                    className="retro-btn bg-[#FFB703] text-[#43281C] font-bold px-6 py-2.5 cursor-pointer shadow-md"
                  >
                    Lanjut ke Bab 2 (+25 XP) ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= BAB 2 ================= */}
          {chapterIndex === 2 && (
            <div className="space-y-4">
              {!quizFinished && currentQuizItem ? (
                <>
                  {/* Progress Header */}
                  <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Detail Benda (Kuis 10 Soal Acak)
                      </span>
                      <span className="font-bold text-xs text-[#D62828]">
                        Soal {quizIndex + 1} dari {shuffledQuizItems.length}
                      </span>
                    </div>
                    <div className="font-pixel text-xs bg-white px-2.5 py-1 rounded border border-[#43281C]">
                      Skor: {quizScore * 5} XP
                    </div>
                  </div>

                  {/* Adjective Rule Helper */}
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px] text-blue-900 font-semibold flex items-center justify-between">
                    <span>💡 Aturan: <strong>Size (Ukuran)</strong> ➔ <strong>Color (Warna)</strong> ➔ <strong>Material (Bahan)</strong> ➔ Noun!</span>
                  </div>

                  {/* Question Box */}
                  <div className="bg-[#FFFDF4] p-3.5 rounded-xl border-2 border-[#43281C]">
                    <div className="text-[11px] text-gray-500 font-semibold mb-1">
                      Konteks: {currentQuizItem.contextItem} ({currentQuizItem.category})
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[#1F2937] leading-relaxed">
                      {currentQuizItem.question}
                    </div>
                    <div className="text-[11px] text-gray-500 italic mt-1">
                      {currentQuizItem.questionId}
                    </div>
                  </div>

                  {/* Randomized Options */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-[#43281C]">
                      Pilihan Jawaban (Diacak):
                    </div>
                    {currentQuizItem.options.map((opt, i) => {
                      const isSelected = selectedQuizOption === opt;
                      const isCorrectAnswer = opt === currentQuizItem.correctAnswer;
                      let btnStyle = 'bg-white border-[#43281C] text-[#43281C] hover:bg-amber-50';

                      if (isQuizOptionLocked) {
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
                          onClick={() => handleSelectQuizOption(opt)}
                          disabled={isQuizOptionLocked}
                          className={`w-full text-left p-3 rounded-xl border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer min-h-[48px] flex items-center justify-between ${btnStyle} ${
                            isQuizOptionLocked ? 'cursor-not-allowed' : ''
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && !isQuizOptionLocked && <span>👉</span>}
                          {isQuizOptionLocked && isCorrectAnswer && <span>✅</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {quizFeedback && (
                    <div
                      className={`p-3 rounded-xl border-2 text-xs font-semibold ${
                        quizFeedback.isSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                          : 'bg-red-100 border-red-400 text-red-900'
                      }`}
                    >
                      {quizFeedback.isSuccess ? '✅ ' : '❌ '}
                      {quizFeedback.text}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex justify-end gap-2">
                    {!isQuizOptionLocked ? (
                      <button
                        type="button"
                        onClick={handleCheckQuizAnswer}
                        disabled={!selectedQuizOption}
                        className="retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] px-5 py-2.5 font-bold cursor-pointer disabled:opacity-50"
                      >
                        Kunci Jawaban
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextQuizQuestion}
                        className="retro-btn bg-[#FFB703] text-[#43281C] font-bold px-6 py-2.5 cursor-pointer shadow-md"
                      >
                        {quizIndex + 1 < shuffledQuizItems.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil 10 Soal ➔'}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Completed 10 Questions */
                <div className="bg-[#FFF8E7] p-5 rounded-xl border-2 border-[#43281C] text-center space-y-3">
                  <div className="text-3xl">{quizScore >= 6 ? '🎉' : '⚠️'}</div>
                  <h3 className="font-pixel text-sm text-[#D62828]">
                    {quizScore >= 6 ? '10 SOAL SELESAI!' : 'NILAI DI BAWAH STANDAR'}
                  </h3>
                  <p className="text-xs text-[#5C4033] font-semibold">
                    Skor: <strong>{quizScore} dari 10 benar</strong> (+{quizScore * 5} XP).
                  </p>
                  {quizScore < 6 ? (
                    <div className="p-3 bg-red-100 border-2 border-red-500 text-red-900 font-bold text-xs rounded-xl">
                      ❌ Standar minimal kelulusan adalah 6 benar. Misi gagal, kamu akan otomatis dikembalikan ke halaman depan...
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-white rounded-xl border border-[#43281C] text-xs text-gray-700">
                        Kamu menguasai aturan <strong>Adjective Order</strong>: Size ➔ Color ➔ Material ➔ Noun!
                      </div>
                      <button
                        type="button"
                        onClick={() => onCompleteChapter(2, quizScore * 5)}
                        className="retro-btn bg-[#FFB703] text-[#43281C] font-bold px-6 py-3 cursor-pointer shadow-md text-sm"
                      >
                        Lanjut ke Bab 3 (+{quizScore * 5} XP) ➔
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= BAB 3 (5 DISTINCT CASES) ================= */}
          {chapterIndex === 3 && (
            <div className="space-y-4">
              {!allCasesFinished && currentCase ? (
                <>
                  {/* Case Progress Header */}
                  <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        Kasus Penyelidikan Saksi (Bab 3)
                      </span>
                      <span className="font-bold text-xs text-[#D62828]">
                        Kasus {caseIndex + 1} dari {ch3.cases.length}: {currentCase.title}
                      </span>
                    </div>
                    <div className="font-pixel text-xs bg-white px-2.5 py-1 rounded border border-[#43281C]">
                      {caseScore * 10} / 50 XP
                    </div>
                  </div>

                  {/* Case Context & Witness Statement */}
                  <div className="bg-[#FFFDF4] p-3 rounded-xl border-2 border-[#43281C] space-y-2">
                    <div className="text-[11px] text-[#5C4033] font-semibold">
                      📋 <strong>Laporan Kasus:</strong> {currentCase.caseDescriptionId}
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border-2 border-[#43281C] text-xs space-y-1">
                      <div className="text-[10px] text-gray-500 uppercase font-bold">
                        Keterangan Saksi (Witness Statement):
                      </div>
                      <p className="font-semibold text-gray-800 italic">
                        "{currentCase.witnessStatementEn}"
                      </p>
                      <p className="text-[11px] text-gray-600 border-t pt-1 border-gray-200">
                        🇮🇩 Artinya: {currentCase.witnessStatementId}
                      </p>
                    </div>
                    <p className="font-bold text-xs text-[#D62828]">
                      ❓ {currentCase.question}
                    </p>
                    {isSuspectLocked && (
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold border border-amber-300 inline-block">
                        🔒 Pilihan telah dikunci dan tidak dapat diubah
                      </span>
                    )}
                  </div>

                  {/* Suspect / Item Options */}
                  <div className="space-y-2">
                    {currentCase.suspects.map((suspect) => {
                      const isSelected = selectedSuspectId === suspect.id;
                      let cardStyle = 'bg-white border-[#43281C] hover:bg-amber-50';

                      if (isSuspectLocked) {
                        if (suspect.isCorrect) {
                          cardStyle = 'bg-emerald-100 border-emerald-600 shadow-sm';
                        } else if (isSelected && !suspect.isCorrect) {
                          cardStyle = 'bg-red-100 border-red-600 shadow-sm';
                        } else {
                          cardStyle = 'bg-gray-100 border-gray-300 opacity-60';
                        }
                      } else if (isSelected) {
                        cardStyle = 'bg-[#FFE8D6] border-[#D62828] shadow-sm font-semibold';
                      }

                      return (
                        <button
                          key={suspect.id}
                          type="button"
                          disabled={isSuspectLocked}
                          onClick={() => handleSelectSuspect(suspect.id)}
                          className={`w-full text-left p-3 rounded-xl border-2 transition-all flex flex-col gap-1 min-h-[48px] ${
                            isSuspectLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                          } ${cardStyle}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#43281C]">
                              {suspect.title}
                            </span>
                            <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded font-mono text-gray-700">
                              {suspect.visualTag}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">
                            {suspect.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {ch3Feedback && (
                    <div
                      className={`p-3 rounded-xl border-2 text-xs font-semibold ${
                        ch3Feedback.isSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                          : 'bg-red-100 border-red-500 text-red-900 animate-pulse'
                      }`}
                    >
                      {ch3Feedback.isSuccess ? '✅ ' : '❌ '}
                      {ch3Feedback.text}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex justify-end gap-2">
                    {!isSuspectLocked ? (
                      <button
                        type="button"
                        onClick={handleCheckCaseAnswer}
                        disabled={!selectedSuspectId}
                        className="retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] px-5 py-2.5 font-bold cursor-pointer disabled:opacity-50"
                      >
                        Kunci Pilihan Kasus Ini
                      </button>
                    ) : ch3Feedback?.isSuccess ? (
                      <button
                        type="button"
                        onClick={handleNextCase}
                        className="retro-btn bg-[#FFB703] text-[#43281C] font-bold px-6 py-2.5 cursor-pointer shadow-md"
                      >
                        {caseIndex + 1 < ch3.cases.length ? 'Kasus Selanjutnya ➔' : 'Selesaikan Bab 3 ➔'}
                      </button>
                    ) : (
                      <div className="text-center font-bold text-red-600 text-xs py-2">
                        Mengembalikan pemain ke halaman depan...
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* All 5 Cases Completed */
                <div className="bg-[#FFF8E7] p-5 rounded-xl border-2 border-[#43281C] text-center space-y-3">
                  <div className="text-3xl">🎉</div>
                  <h3 className="font-pixel text-sm text-[#D62828]">
                    5 KASUS PENYELIDIKAN TERPECAHKAN!
                  </h3>
                  <p className="text-xs text-[#5C4033] font-semibold">
                    Hebat! Kamu berhasil memecahkan seluruh 5 kasus petunjuk deskriptif tanpa salah tuduh!
                  </p>
                  <div className="p-3 bg-emerald-100 border-2 border-emerald-500 rounded-xl text-xs font-bold text-emerald-900">
                    Poin Diperoleh: +50 XP (5 Kasus Sempurna)
                  </div>
                  <button
                    type="button"
                    onClick={() => onCompleteChapter(3, 50)}
                    className="retro-btn bg-[#FFB703] text-[#43281C] font-bold px-6 py-3 cursor-pointer shadow-md text-sm"
                  >
                    Lanjut ke Bab 4 (+50 XP) ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= BAB 4 ================= */}
          {chapterIndex === 4 && (
            <div className="space-y-4">
              <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C]">
                <p className="font-semibold text-[#5C4033] mb-1">
                  🎯 <strong>Struktur Paragraf Deskriptif (+30 XP):</strong>
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold text-white mb-2">
                  <div className="bg-[#2A9D8F] p-1.5 rounded-lg border border-[#43281C]">
                    1. IDENTIFICATION (Pengenalan)
                  </div>
                  <div className="bg-[#E76F51] p-1.5 rounded-lg border border-[#43281C]">
                    2. DESCRIPTION (Rincian Sifat)
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6C584C]">
                  <span>Urutkan 4 kalimat berikut menjadi paragraf utuh.</span>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setShowCh4Hint(true);
                      setCh4HintUsed(true);
                    }}
                    className="underline text-[#D62828] font-bold cursor-pointer"
                  >
                    💡 Petunjuk (-5 XP)
                  </button>
                </div>
                {showCh4Hint && (
                  <div className="mt-2 p-2 bg-blue-100 rounded-lg text-[11px] text-blue-900 font-semibold border border-blue-300">
                    {ch4.hint}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {orderedSentences.map((sentence, idx) => (
                  <div
                    key={sentence.id}
                    className="p-3 bg-white rounded-xl border-2 border-[#43281C] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-xs bg-[#FFB703] text-[#43281C] w-6 h-6 flex items-center justify-center rounded border border-[#43281C] shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs font-medium text-gray-800">
                        {sentence.text}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveSentence(idx, 'up')}
                        disabled={idx === 0}
                        className="w-7 h-6 rounded bg-gray-100 border border-[#43281C] flex items-center justify-center font-bold text-xs hover:bg-gray-200 cursor-pointer disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSentence(idx, 'down')}
                        disabled={idx === orderedSentences.length - 1}
                        className="w-7 h-6 rounded bg-gray-100 border border-[#43281C] flex items-center justify-center font-bold text-xs hover:bg-gray-200 cursor-pointer disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {ch4Feedback && (
                <div
                  className={`p-3 rounded-xl border-2 text-xs font-semibold ${
                    ch4Feedback.isSuccess
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-red-100 border-red-400 text-red-900'
                  }`}
                >
                  {ch4Feedback.isSuccess ? '✅ ' : '❌ '}
                  {ch4Feedback.text}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                {!ch4Feedback?.isSuccess ? (
                  <button
                    type="button"
                    onClick={handleCheckCh4}
                    className="retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] px-5 py-2.5 font-bold cursor-pointer"
                  >
                    Periksa & Kunci Paragraf
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onCompleteChapter(4, ch4HintUsed ? 25 : 30)}
                    className="retro-btn bg-[#FFB703] text-[#43281C] font-bold px-6 py-2.5 cursor-pointer shadow-md"
                  >
                    Lanjut ke Bab 5 (+{ch4HintUsed ? '25' : '30'} XP) ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= BAB 5 ================= */}
          {chapterIndex === 5 && (
            <div className="space-y-4">
              <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C] space-y-2">
                <p className="font-bold text-[#D62828] text-xs">
                  📝 {ch5.promptTopic} (+50 XP)
                </p>
                <div className="text-[11px] text-[#5C4033] space-y-1">
                  <p className="font-semibold">Panduan Menulis 5 Kalimat:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {ch5.guidingQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-1 flex flex-wrap gap-1 items-center">
                  <span className="text-[11px] font-bold text-gray-700">Inspirasi Kata Sifat:</span>
                  {ch5.exampleVocab.map((v) => (
                    <span
                      key={v}
                      className="bg-amber-100 text-[#D62828] text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-300"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-xs text-[#43281C]">
                    Tuliskan Paragraf Deskripsi Bahasa Inggrismu:
                  </label>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className={detectedSentences.length >= 5 ? 'text-emerald-700' : 'text-amber-700'}>
                      Kalimat: {detectedSentences.length}/5
                    </span>
                    <span className={detectedAdjectives.length >= 3 ? 'text-emerald-700' : 'text-amber-700'}>
                      Adjektiva: {detectedAdjectives.length} terdeteksi
                    </span>
                  </div>
                </div>
                <textarea
                  value={writingText}
                  onChange={(e) => setWritingText(e.target.value)}
                  placeholder="Contoh: This is our school financial calculator. It is a compact black electronic tool. It has large white plastic buttons. The digital screen is very clear and bright. It helps accounting students calculate daily budgets accurately."
                  rows={6}
                  className="w-full p-3 rounded-xl border-2 border-[#43281C] bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E76F51] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] bg-gray-50 p-2.5 rounded-xl border border-gray-300">
                <div className="flex items-center gap-1.5">
                  <span>{detectedSentences.length >= 5 ? '✅' : '⏳'}</span>
                  <span>Min. 5 Kalimat Lengkap</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{detectedAdjectives.length >= 3 ? '✅' : '⏳'}</span>
                  <span>Min. 3 Kata Sifat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{detectedSentences.length > 0 && detectedSentences.every(s => /[.?!]$/.test(s)) ? '✅' : '⏳'}</span>
                  <span>Tanda Titik & Huruf Kapital</span>
                </div>
              </div>

              {ch5Feedback && (
                <div className="p-3 rounded-xl border-2 bg-amber-100 border-amber-500 text-[#43281C] text-xs font-semibold">
                  ℹ️ {ch5Feedback}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCheckCh5}
                  disabled={writingText.trim().length < 20}
                  className="retro-btn bg-[#FFB703] text-[#43281C] hover:bg-[#FFA500] px-6 py-3 font-bold cursor-pointer disabled:opacity-50 text-xs sm:text-sm shadow-md"
                >
                  🚀 Selesaikan Proyek (+50 XP) & Buka Plot Twist!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
