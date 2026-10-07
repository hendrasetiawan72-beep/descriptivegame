import React, { useEffect, useState, useRef } from 'react';
import { GameScore, MajorStory, PlayerProfile } from '../types';
import { soundManager } from '../soundSystem';

interface ResultScreenProps {
  profile: PlayerProfile;
  story: MajorStory;
  score: GameScore;
  studentWritingText: string;
  onPlayAgain: () => void;
  onChangeMajor: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  profile,
  story,
  score,
  studentWritingText,
  onPlayAgain,
  onChangeMajor
}) => {
  const totalXp = (score.vocabXp || 0) + (score.grammarXp || 0) + (score.batangTourXp || 0) + (score.ch1 || 0) + (score.ch2 || 0) + (score.ch3 || 0) + (score.ch4 || 0) + (score.ch5 || 0);

  // Rating in flame emojis: strictly NO STARS!
  const getFlameRating = (xp: number): string => {
    if (xp >= 220) return '🔥🔥🔥🔥🔥';
    if (xp >= 180) return '🔥🔥🔥🔥';
    if (xp >= 140) return '🔥🔥🔥';
    if (xp >= 90) return '🔥🔥';
    return '🔥';
  };

  const [sendSuccess, setSendSuccess] = useState(false);
  const [hasAttemptedSend, setHasAttemptedSend] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    soundManager.playLevelUp();

    // Attach exact Web3Forms script as requested by user
    const form = document.getElementById('form') as HTMLFormElement | null;
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    if (!submitBtn) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append("access_key", "81166d47-3e2c-4e03-b59a-4bd2e1cd81c1");
      const originalText = submitBtn.textContent || "Kirim Poin XP";
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      try {
        const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
        const data = await response.json();
        if (response.ok) {
          alert("Success! Your message has been sent.");
          setSendSuccess(true);
        } else {
          alert("Error: " + data.message);
        }
      } catch {
        alert("Something went wrong. Please try again.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        setHasAttemptedSend(true);
      }
    };

    form.addEventListener('submit', handleSubmit);

    const autoSendTimer = window.setTimeout(() => {
      if (!hasAttemptedSend && form) {
        form.requestSubmit();
      }
    }, 1200);

    return () => {
      window.clearTimeout(autoSendTimer);
      form.removeEventListener('submit', handleSubmit);
    };
  }, [hasAttemptedSend]);

  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-[#2B1F3D] p-3 sm:p-6 overflow-y-auto flex items-center justify-center">
      <div className="max-w-2xl w-full my-auto space-y-4">
        {/* Main Result Card */}
        <div className="retro-box p-4 sm:p-7 text-[#43281C] animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="text-center mb-4">
            <span className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase bg-[#E76F51] text-white px-2.5 py-1 rounded-md border-2 border-[#43281C]">
              LAPORAN AKHIR PETUALANGAN
            </span>
            <h1 className="font-pixel text-base sm:text-xl text-[#D62828] mt-2 mb-1">
              MUHIBA ENGLISH QUEST
            </h1>
            <p className="font-bold text-xs sm:text-sm text-[#5C4033]">
              {profile.name} • {profile.className} • {story.title}
            </p>
          </div>

          {/* XP Score & Rating Hero */}
          <div className="bg-[#FFF8E7] p-4 rounded-xl border-3 border-[#43281C] mb-4 text-center">
            <div className="text-xs uppercase font-bold text-[#5C4033] mb-1">
              Total Poin XP Siswa:
            </div>
            <div className="font-pixel text-3xl sm:text-4xl text-[#D62828] mb-1">
              {totalXp} XP
            </div>
            <div className="text-2xl sm:text-3xl tracking-widest my-1 select-none">
              {getFlameRating(totalXp)}
            </div>
            <div className="text-xs font-bold text-[#2A9D8F]">
              Predikat: {totalXp >= 220 ? 'Master of Description (Sempurna)' : totalXp >= 180 ? 'Sangat Baik' : 'Cukup Baik'}
            </div>
          </div>

          {/* Plot Twist Box */}
          <div className="bg-[#FFE8D6] p-3.5 sm:p-4 rounded-xl border-2 border-[#D62828] mb-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#D62828]">
              <span className="text-lg">🎭</span>
              <span>{story.chapter5.plotTwistTitle}</span>
            </div>
            <p className="text-xs text-[#1F2937] leading-relaxed">
              {story.chapter5.plotTwistTextId}
            </p>
            <div className="p-2 bg-white rounded-lg border border-[#43281C]/20 text-[11px] font-semibold text-[#5C4033]">
              💡 <strong>Pesan Pembelajaran:</strong> {story.chapter5.plotTwistMoral}
            </div>
          </div>

          {/* XP Breakdown Table */}
          <div className="bg-white p-3 rounded-xl border-2 border-[#43281C] mb-4 text-xs">
            <div className="font-bold text-[#43281C] mb-2 border-b pb-1">
              ⭐ Rincian Poin XP Per Misi & Bab:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-1.5 bg-emerald-50 rounded border border-emerald-300">
                <div className="text-[10px] text-gray-500 font-bold">Misi Kosakata</div>
                <div className="font-bold text-[#2A9D8F]">+{score.vocabXp} XP</div>
              </div>
              <div className="p-1.5 bg-blue-50 rounded border border-blue-300">
                <div className="text-[10px] text-gray-500 font-bold">Latihan Grammar</div>
                <div className="font-bold text-blue-700">+{score.grammarXp || 0} XP</div>
              </div>
              <div className="p-1.5 bg-emerald-50 rounded border border-emerald-300">
                <div className="text-[10px] text-gray-500 font-bold">Jelajah Batang</div>
                <div className="font-bold text-[#2A9D8F]">+{score.batangTourXp} XP</div>
              </div>
              <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                <div className="text-[10px] text-gray-500 font-bold">Bab 1</div>
                <div className="font-bold text-[#D62828]">+{score.ch1} XP</div>
              </div>
              <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                <div className="text-[10px] text-gray-500 font-bold">Bab 2 (10 Soal Acak)</div>
                <div className="font-bold text-[#D62828]">+{score.ch2} XP</div>
              </div>
              <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                <div className="text-[10px] text-gray-500 font-bold">Bab 3 (5 Kasus)</div>
                <div className="font-bold text-[#D62828]">+{score.ch3} XP</div>
              </div>
              <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                <div className="text-[10px] text-gray-500 font-bold">Bab 4</div>
                <div className="font-bold text-[#D62828]">+{score.ch4} XP</div>
              </div>
              <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                <div className="text-[10px] text-gray-500 font-bold">Bab 5 (Proyek)</div>
                <div className="font-bold text-[#D62828]">+{score.ch5} XP</div>
              </div>
            </div>
          </div>

          {/* Student's Written Project Preview */}
          {studentWritingText && (
            <div className="bg-[#FFFDF4] p-3 rounded-xl border-2 border-[#43281C] mb-4 text-xs">
              <div className="font-bold text-[#43281C] mb-1">
                ✍️ Teks Deskripsi Karya Siswa (Bab 5):
              </div>
              <p className="italic text-gray-700 bg-white p-2.5 rounded-lg border border-gray-200 font-medium">
                "{studentWritingText}"
              </p>
            </div>
          )}

          {/* Web3Forms Submission Form */}
          <div className="bg-emerald-50 p-3 rounded-xl border-2 border-emerald-500 mb-4 text-xs text-center">
            {sendSuccess ? (
              <div className="font-bold text-emerald-800 flex items-center justify-center gap-2">
                <span>✅</span> <span>Status: Poin XP Terkirim ke Mr. Hendra!</span>
              </div>
            ) : (
              <div className="text-[#5C4033] font-semibold space-y-1">
                <div>Mengirim poin XP otomatis ke sistem penilaian Mr. Hendra...</div>
                <div className="text-[11px] text-gray-500">
                  (Jika belum terkirim otomatis, kamu dapat menekan tombol di bawah)
                </div>
              </div>
            )}
          </div>

          {/* Required Web3Forms Form */}
          <form id="form" ref={formRef} className="space-y-2">
            <input type="hidden" name="subject" value={`Skor XP Muhiba English Quest - ${profile.name} - ${profile.className}`} />
            <input type="hidden" name="nama" value={profile.name} />
            <input type="hidden" name="kelas" value={profile.className} />
            <input type="hidden" name="jurusan" value={story.title} />
            <input type="hidden" name="total_xp" value={`${totalXp} XP`} />
            <input type="hidden" name="rating_api" value={getFlameRating(totalXp)} />
            <input type="hidden" name="rincian_xp" value={`Kosakata:${score.vocabXp}XP, Grammar:${score.grammarXp || 0}XP, BatangTour:${score.batangTourXp}XP, Bab1:${score.ch1}XP, Bab2:${score.ch2}XP, Bab3:${score.ch3}XP, Bab4:${score.ch4}XP, Bab5:${score.ch5}XP`} />
            <input type="hidden" name="teks_bab_5" value={studentWritingText} />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            {!sendSuccess && (
              <button
                type="submit"
                className="w-full retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] font-bold py-2.5 px-4 cursor-pointer text-xs sm:text-sm shadow-md"
              >
                Kirim Poin XP ke Mr. Hendra
              </button>
            )}
          </form>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t-2 border-[#43281C]">
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onPlayAgain();
              }}
              className="retro-btn bg-[#FFB703] text-[#43281C] hover:bg-amber-400 font-bold py-3 px-4 text-xs sm:text-sm cursor-pointer"
            >
              🔄 Main Lagi (Ulang Jurusan Ini)
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onChangeMajor();
              }}
              className="retro-btn bg-[#E76F51] text-white hover:bg-[#D62828] font-bold py-3 px-4 text-xs sm:text-sm cursor-pointer"
            >
              🧭 Coba Jurusan Lain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
