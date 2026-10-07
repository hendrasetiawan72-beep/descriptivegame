import React from 'react';
import { MajorStory, NPC } from '../types';
import { soundManager } from '../soundSystem';

interface MapModalProps {
  playerX: number;
  playerY: number;
  currentObjectiveNpc: NPC | null;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  playerX,
  playerY,
  currentObjectiveNpc,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs">
      <div className="retro-box w-full max-w-xl p-4 sm:p-5 text-[#43281C] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#D62828]">
              PETA SMK MUHAMMADIYAH BAWANG
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-white font-bold text-sm hover:bg-red-100 cursor-pointer flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Schematic Layout Map */}
        <div className="relative w-full aspect-[4/3] bg-[#E9D8A6] rounded-xl border-2 border-[#43281C] overflow-hidden p-2 text-[10px] sm:text-xs">
          {/* Main Gate */}
          <div className="absolute top-4 left-6 p-2 bg-[#E76F51] text-white font-bold rounded-lg border border-[#43281C] text-center">
            🚪 Gerbang Utama & Pos Satpam
          </div>

          {/* Courtyard */}
          <div className="absolute top-[28%] left-[25%] right-[25%] bottom-[40%] bg-[#94D2BD] rounded-xl border-2 border-dashed border-[#0A9396] flex flex-col items-center justify-center text-center p-2 font-bold text-[#005F73]">
            <span>🇮🇩 Lapangan Upacara & Tiang Bendera</span>
            <span className="text-[9px] font-normal mt-0.5">(Taman, Bu Maya, & Kak Fajar)</span>
          </div>

          {/* Wing AKL */}
          <div className="absolute top-4 right-6 p-2 bg-[#2A9D8F] text-white font-bold rounded-lg border border-[#43281C] text-center">
            📊 Koperasi & Ruang AKL
          </div>

          {/* Workshop Bengkel */}
          <div className="absolute bottom-4 left-6 p-2 bg-[#D62828] text-white font-bold rounded-lg border border-[#43281C] text-center">
            🏍️ Bengkel Otomotif
          </div>

          {/* Lab TJKT */}
          <div className="absolute bottom-4 right-6 p-2 bg-[#7209B7] text-white font-bold rounded-lg border border-[#43281C] text-center">
            🌐 Lab Jaringan TJKT
          </div>

          {/* Mushola As-Salam (North Peaceful Zone) */}
          <div className="absolute top-4 left-[38%] w-[24%] p-1.5 bg-[#38B000] text-white font-bold rounded-lg border border-[#43281C] text-center text-[10px] leading-tight flex items-center justify-center shadow-xs">
            🕌 Mushola As-Salam
          </div>

          {/* Kantin Sekolah & Gazebo (South Food Corridor) */}
          <div className="absolute bottom-3 left-[42%] w-[26%] p-1.5 bg-[#FB8500] text-white font-bold rounded-lg border border-[#43281C] text-center text-[10px] leading-tight flex items-center justify-center shadow-xs">
            ☕ Kantin (Kopi Surjo & Pak Joko)
          </div>

          {/* Player Position Indicator on Map */}
          <div
            className="absolute z-20 w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              left: `${Math.min(92, Math.max(8, (playerX / 2400) * 100))}%`,
              top: `${Math.min(92, Math.max(8, (playerY / 1800) * 100))}%`
            }}
          >
            <div className="relative">
              <span className="text-base animate-bounce">📍</span>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-1 rounded uppercase whitespace-nowrap">
                Kamu
              </span>
            </div>
          </div>

          {/* Quest Target Pin */}
          {currentObjectiveNpc && (
            <div
              className="absolute z-10 w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                left: `${Math.min(92, Math.max(8, (currentObjectiveNpc.x / 2400) * 100))}%`,
                top: `${Math.min(92, Math.max(8, (currentObjectiveNpc.y / 1800) * 100))}%`
              }}
            >
              <div className="relative">
                <span className="text-base animate-pulse">🎯</span>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-bold px-1 rounded uppercase whitespace-nowrap">
                  Target
                </span>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#5C4033] font-medium mt-2">
          Ketuk layar permainan untuk berjalan ke area tujuan!
        </p>
      </div>
    </div>
  );
};

interface QuestModalProps {
  currentChapter: number;
  story: MajorStory;
  targetNpc: NPC | null;
  onClose: () => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({
  currentChapter,
  story,
  targetNpc,
  onClose
}) => {
  const chapters = [
    { num: 1, title: 'Bab 1: Warm-up Chat (Obrolan Pemanasan)' },
    { num: 2, title: 'Bab 2: Detail Benda (10 Soal Acak Adjective Order)' },
    { num: 3, title: 'Bab 3: Kasus Petunjuk (5 Kasus Masalah & Saksi)' },
    { num: 4, title: 'Bab 4: Susun Paragraf Deskriptif' },
    { num: 5, title: 'Bab 5: Proyek Akhir Mandiri' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs">
      <div className="retro-box w-full max-w-lg p-4 sm:p-5 text-[#43281C] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#D62828]">
              DAFTAR MISI PETUALANGAN
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-white font-bold text-sm hover:bg-red-100 cursor-pointer flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Current Active Quest */}
        <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C] mb-3">
          <div className="text-[11px] font-bold text-[#E76F51] uppercase mb-0.5">
            Misi Aktif Saat Ini:
          </div>
          <div className="font-bold text-sm text-[#43281C] mb-1">
            Bab {currentChapter}: {chapters[currentChapter - 1]?.title}
          </div>
          {targetNpc && (
            <div className="text-xs text-[#5C4033] flex items-center gap-1.5">
              <span>🎯</span>
              <span>Temui <strong>{targetNpc.name}</strong> di <strong>{targetNpc.zone}</strong></span>
            </div>
          )}
        </div>

        {/* Chapter Checklist */}
        <div className="space-y-2 mb-3 max-h-[50dvh] overflow-y-auto custom-scroll pr-1">
          {chapters.map((ch) => {
            const isCompleted = ch.num < currentChapter;
            const isCurrent = ch.num === currentChapter;
            return (
              <div
                key={ch.num}
                className={`p-2.5 rounded-xl border-2 flex items-center justify-between text-xs font-semibold ${
                  isCompleted
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : isCurrent
                    ? 'bg-[#FFE8D6] border-[#D62828] text-[#43281C]'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{isCompleted ? '✅' : isCurrent ? '🔥' : '🔒'}</span>
                  <span>{ch.title}</span>
                </div>
                <span className="text-[10px] font-mono uppercase">
                  {isCompleted ? 'Selesai' : isCurrent ? 'Berjalan' : 'Terkunci'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface VocabModalProps {
  vocabList: MajorStory['vocabList'];
  onClose: () => void;
}

export const VocabModal: React.FC<VocabModalProps> = ({ vocabList, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs">
      <div className="retro-box w-full max-w-xl max-h-[88dvh] flex flex-col p-4 sm:p-5 text-[#43281C] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#D62828]">
              BUKU KOSAKATA DESKRIPTIF
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-white font-bold text-sm hover:bg-red-100 cursor-pointer flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto custom-scroll flex-1 pr-1 space-y-2.5">
          {vocabList.map((item) => (
            <div
              key={item.word}
              className="p-3 bg-white rounded-xl border-2 border-[#43281C] flex items-start justify-between gap-2 shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-[#D62828]">
                    {item.word}
                  </span>
                  <span className="text-[10px] bg-amber-100 text-[#5C4033] px-2 py-0.5 rounded font-mono font-bold border border-amber-300">
                    {item.partOfSpeech} • {item.category}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#43281C] mb-1">
                  Artinya: {item.meaning}
                </div>
                <div className="text-[11px] text-gray-600 italic">
                  "{item.example}"
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  soundManager.speak(item.word, 'female');
                }}
                title="Dengarkan pengucapan kata"
                className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-[#FFB703] hover:bg-[#FFA500] flex items-center justify-center text-sm cursor-pointer shrink-0"
              >
                🔊
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs">
      <div className="retro-box w-full max-w-lg p-4 sm:p-5 text-[#43281C] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b-2 border-[#43281C] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#D62828]">
              PETUNJUK BERMAIN & MATERI
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border-2 border-[#43281C] bg-white font-bold text-sm hover:bg-red-100 cursor-pointer flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed overflow-y-auto max-h-[70dvh] custom-scroll pr-1">
          <div className="bg-[#FFF8E7] p-3 rounded-xl border-2 border-[#43281C]">
            <h3 className="font-bold text-sm text-[#D62828] mb-1">
              🎮 Kontrol Permainan & Aturan Sekolah:
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-[#5C4033]">
              <li><strong>Ketuk (Tap) Titik:</strong> Karakter berjalan santai ke titik tersebut.</li>
              <li><strong>Jentik (Swipe Cepat):</strong> Karakter berlari kencang (dash) dengan jejak asap!</li>
              <li><strong>Ketuk NPC:</strong> Mengajak bicara dan memulai misi.</li>
              <li><strong>Akses Laboratorium:</strong> Kamu hanya boleh memasuki lab jurusanmu dan area umum sekolah!</li>
              <li><strong>Progres Otomatis Tersimpan:</strong> Walaupun menutup browser, kamu tidak akan mengulang dari awal.</li>
            </ul>
          </div>

          <div className="bg-[#E8F5E9] p-3 rounded-xl border-2 border-[#2A9D8F]">
            <h3 className="font-bold text-sm text-[#2A9D8F] mb-1">
              📖 Materi Descriptive Text (Fase E):
            </h3>
            <div className="space-y-2 text-[#264653]">
              <div>
                <strong>1. Generic Structure:</strong>
                <p>• <em>Identification:</em> Mengenalkan benda/orang/tempat yang dideskripsikan.</p>
                <p>• <em>Description:</em> Menjelaskan bagian, kualitas, atau ciri fisik secara detail.</p>
              </div>
              <div>
                <strong>2. Adjective Order (Urutan Kata Sifat):</strong>
                <p>Ukuran (Size) ➔ Warna (Color) ➔ Bahan (Material) ➔ Kata Benda (Noun)</p>
                <p className="italic text-[11px] text-[#2A9D8F]">Contoh: "a thick blue paper ledger" atau "a long blue copper cable".</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
