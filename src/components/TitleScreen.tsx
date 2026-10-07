import React, { useState } from 'react';
import { MajorId, PlayerProfile, SavedGameState } from '../types';
import { MAJOR_STORIES } from '../gameData';
import { soundManager } from '../soundSystem';

interface TitleScreenProps {
  savedGame: SavedGameState | null;
  failedReason?: string | null;
  onResumeGame: () => void;
  onStartGame: (profile: PlayerProfile) => void;
  onResetSave: () => void;
  onClearFailedReason?: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  savedGame,
  failedReason,
  onResumeGame,
  onStartGame,
  onResetSave,
  onClearFailedReason
}) => {
  const [name, setName] = useState(savedGame ? savedGame.profile.name : '');
  const [className, setClassName] = useState(savedGame ? savedGame.profile.className : '');
  const [selectedMajor, setSelectedMajor] = useState<MajorId>(savedGame ? savedGame.profile.major : 'akl');
  const [showPrologue, setShowPrologue] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleBegin = () => {
    soundManager.init();
    soundManager.playTap();

    if (!name.trim()) {
      setValidationError('Nama siswa wajib diisi!');
      return;
    }
    if (!className.trim()) {
      setValidationError('Kelas siswa wajib diisi (contoh: X AKL 1, X TJKT 2)!');
      return;
    }

    setValidationError('');
    setShowPrologue(true);
  };

  const handleLaunchAdventure = () => {
    soundManager.init();
    soundManager.playLevelUp();
    onStartGame({
      name: name.trim(),
      className: className.trim(),
      major: selectedMajor
    });
  };

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex items-center justify-center bg-[#2B1F3D] p-3 sm:p-6 overflow-y-auto">
      {/* Background Retro Grid & Ornaments */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F4A261_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 w-full max-w-xl my-auto">
        {/* Main Card */}
        <div className="retro-box p-4 sm:p-7 text-[#43281C]">
          {/* Header Badge */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🏫</span>
            <span className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase bg-[#E76F51] text-white px-2.5 py-1 rounded-md border-2 border-[#43281C]">
              SMK Muhammadiyah Bawang
            </span>
          </div>

          <h1 className="font-pixel text-base sm:text-xl text-center leading-relaxed text-[#D62828] mb-1 drop-shadow-sm">
            MUHIBA ENGLISH QUEST
          </h1>
          <p className="text-center font-bold text-xs sm:text-sm text-[#5C4033] mb-4">
            The Lost Description • Fase E (Kelas X)
          </p>

          {/* Mission Failed Alert Banner if restarted due to failure */}
          {failedReason && (
            <div className="bg-[#FFEBEE] p-3.5 rounded-xl border-2 border-[#D62828] mb-4 shadow-sm animate-in shake duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="font-pixel text-[10px] text-[#D62828] uppercase font-bold flex items-center gap-1.5">
                  <span>❌</span> MISI GAGAL (MENGULANG DARI AWAL)
                </span>
                {onClearFailedReason && (
                  <button
                    type="button"
                    onClick={onClearFailedReason}
                    className="text-gray-400 hover:text-black font-bold text-xs cursor-pointer px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="text-xs font-semibold text-[#8B0000] leading-relaxed">
                {failedReason}
              </p>
              <p className="text-[11px] text-[#5C4033] mt-1 font-medium">
                Pahami petunjuk deskripsi dengan teliti sebelum menjawab kembali!
              </p>
            </div>
          )}

          {/* Saved Game Banner if exists */}
          {savedGame && (
            <div className="bg-[#E8F5E9] p-3.5 rounded-xl border-2 border-[#2A9D8F] mb-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-pixel text-[10px] text-[#2A9D8F] uppercase font-bold">
                  💾 Sesi Tersimpan Ditemukan
                </span>
                <span className="text-[10px] bg-[#2A9D8F] text-white px-2 py-0.5 rounded font-mono font-bold">
                  Bab {savedGame.currentChapter}
                </span>
              </div>
              <p className="text-xs font-bold text-[#264653] mb-2">
                {savedGame.profile.name} • {savedGame.profile.className} • {savedGame.profile.major.toUpperCase()}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.init();
                    soundManager.playLevelUp();
                    onResumeGame();
                  }}
                  className="flex-1 retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] font-bold py-2.5 px-3 text-xs cursor-pointer shadow-md"
                >
                  ▶ Lanjutkan Sesi Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (confirm('Yakin ingin mereset sesi dan mulai petualangan baru?')) {
                      onResetSave();
                    }
                  }}
                  className="px-3 py-2 rounded-xl border-2 border-[#43281C] bg-white text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                  title="Reset Sesi"
                >
                  🔄 Mulai Baru
                </button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <div className="bg-[#FFF8E7] p-3 sm:p-4 rounded-xl border-2 border-[#43281C] mb-4 space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#5C4033] mb-1">
                👤 Nama Siswa <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis nama lengkapmu..."
                className="w-full px-3 py-2.5 rounded-lg border-2 border-[#43281C] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#5C4033] mb-1">
                🏷️ Kelas Siswa <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Contoh: X AKL 1 / X TKRO / X TJKT..."
                className="w-full px-3 py-2.5 rounded-lg border-2 border-[#43281C] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
              />
            </div>

            {validationError && (
              <div className="text-xs font-bold text-red-600 bg-red-100 p-2 rounded-lg border border-red-400">
                ⚠️ {validationError}
              </div>
            )}
          </div>

          {/* Major Selection */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-[#5C4033] mb-2 text-center">
              🧭 Pilih 1 Jurusan Petualangan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(MAJOR_STORIES) as MajorId[]).map((mId) => {
                const story = MAJOR_STORIES[mId];
                const isSelected = selectedMajor === mId;
                return (
                  <button
                    key={mId}
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setSelectedMajor(mId);
                    }}
                    className={`p-3 rounded-xl border-2 transition-all text-left flex flex-col justify-between min-h-[72px] cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFE8D6] border-[#D62828] shadow-md scale-[1.02]'
                        : 'bg-[#FFFDF4] border-[#43281C] hover:bg-amber-50 opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xl">{story.icon}</span>
                      <span className="font-bold text-xs uppercase leading-tight text-[#43281C]">
                        {mId.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6C584C] font-semibold line-clamp-2">
                      {story.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <button
            type="button"
            onClick={handleBegin}
            className="w-full retro-btn bg-[#FFB703] hover:bg-[#FFA500] text-[#43281C] font-bold text-sm sm:text-base py-3 px-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <span>🚀</span>
            <span>Mulai Petualangan Bahasa Inggris</span>
          </button>
        </div>
      </div>

      {/* Prologue Modal */}
      {showPrologue && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="retro-box max-w-lg w-full p-5 sm:p-6 text-[#43281C] animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">📖</span>
              <h2 className="font-pixel text-xs sm:text-sm text-[#D62828] text-center">
                PROLOG: THE LOST DESCRIPTION
              </h2>
            </div>

            <div className="bg-[#FFF8E7] p-3 sm:p-4 rounded-xl border-2 border-[#43281C] text-xs sm:text-sm leading-relaxed mb-4 space-y-2">
              <p>
                Selamat datang di <strong>SMK Muhammadiyah Bawang</strong>, <em>{name}</em>!
              </p>
              <p>
                Buku keramat <strong>"Description Book"</strong> sekolah telah kehilangan lembaran-lembaran deskripsinya.
                Sebelum memecahkan kasus di jurusanmu, mulailah dengan memecahkan <strong>Misteri Kosakata Awal</strong> dan berdialog bersama <strong>3 NPC Pemandu Batang</strong>!
              </p>
              <div className="p-2.5 bg-amber-100 rounded-lg border border-amber-300 font-bold text-[#D62828] text-center text-xs">
                {MAJOR_STORIES[selectedMajor].icon} {MAJOR_STORIES[selectedMajor].title}
                <div className="text-[11px] font-normal text-[#5C4033] mt-0.5">
                  "{MAJOR_STORIES[selectedMajor].subtitle}"
                </div>
              </div>
              <p>
                Akses ke laboratorium jurusan lain ditutup untuk menjaga fokus penyelidikan. Hanya ruangan jurusanmu dan area umum sekolah yang dapat kamu masuki!
              </p>
            </div>

            <button
              type="button"
              onClick={handleLaunchAdventure}
              className="w-full retro-btn bg-[#2A9D8F] text-white hover:bg-[#21867A] font-bold py-3 px-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🎮</span>
              <span>Mulai Misi Teka-Teki Kosakata</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
