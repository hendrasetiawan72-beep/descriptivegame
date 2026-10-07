import React, { useState, useMemo, useEffect } from 'react';
import { GameScore, MajorId, NPC, PlayerProfile, SavedGameState } from './types';
import { ALL_NPCS, MAJOR_STORIES, BATANG_TOUR_STOPS } from './gameData';
import { soundManager } from './soundSystem';
import { TitleScreen } from './components/TitleScreen';
import { GameCanvas } from './components/GameCanvas';
import { DialogueBox } from './components/DialogueBox';
import { ChapterModal } from './components/ChapterModal';
import { BottomNav } from './components/BottomNav';
import { MapModal, QuestModal, VocabModal, GuideModal } from './components/Modals';
import { ResultScreen } from './components/ResultScreen';
import { VocabMysteryModal } from './components/VocabMysteryModal';
import { BatangTourModal } from './components/BatangTourModal';
import { GrammarPracticeModal } from './components/GrammarPracticeModal';

const SAVE_KEY = 'muhiba_english_quest_save_v1';

const INITIAL_SCORE: GameScore = {
  vocabXp: 0,
  grammarXp: 0,
  batangTourXp: 0,
  ch1: 0,
  ch2: 0,
  ch3: 0,
  ch4: 0,
  ch5: 0,
  hintsUsed: 0
};

export default function App() {
  const [savedGame, setSavedGame] = useState<SavedGameState | null>(() => {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      if (data) {
        return JSON.parse(data) as SavedGameState;
      }
    } catch (e) {
      console.warn('Failed to load saved game:', e);
    }
    return null;
  });

  const [gameState, setGameState] = useState<'title' | 'playing' | 'results'>(() => {
    if (savedGame && savedGame.profile.name) {
      return 'playing';
    }
    return 'title';
  });

  const [profile, setProfile] = useState<PlayerProfile>(() => {
    if (savedGame) return savedGame.profile;
    return { name: '', className: '', major: 'akl' };
  });

  const [currentChapter, setCurrentChapter] = useState<number>(() => {
    return savedGame ? savedGame.currentChapter : 1;
  });

  const [score, setScore] = useState<GameScore>(() => {
    return savedGame ? savedGame.score : { ...INITIAL_SCORE };
  });

  const [studentWritingText, setStudentWritingText] = useState<string>(() => {
    return savedGame ? savedGame.studentWritingText : '';
  });

  const [vocabMysterySolved, setVocabMysterySolved] = useState<boolean>(() => {
    return savedGame ? savedGame.vocabMysterySolved : false;
  });

  const [grammarPracticeCompleted, setGrammarPracticeCompleted] = useState<boolean>(() => {
    return savedGame ? !!savedGame.grammarPracticeCompleted : false;
  });

  const [batangTourCompleted, setBatangTourCompleted] = useState<boolean>(() => {
    return savedGame ? savedGame.batangTourCompleted : false;
  });

  const [batangTourStep, setBatangTourStep] = useState<number>(() => {
    return savedGame ? savedGame.batangTourStep : 0;
  });

  // Modals & Failures State
  const [showVocabMysteryModal, setShowVocabMysteryModal] = useState(false);
  const [showGrammarPracticeModal, setShowGrammarPracticeModal] = useState(false);
  const [activeBatangStopIndex, setActiveBatangStopIndex] = useState<number | null>(null);
  const [restrictedAlert, setRestrictedAlert] = useState<{ title: string; message: string } | null>(null);
  const [failedMissionReason, setFailedMissionReason] = useState<string | null>(null);

  // Standard Navigation Modals
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isQuestOpen, setIsQuestOpen] = useState(false);
  const [isVocabOpen, setIsVocabOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeChapterModal, setActiveChapterModal] = useState<number | null>(null);

  // Active Dialogue State
  const [dialogueState, setDialogueState] = useState<{
    npc: NPC;
    textEn: string;
    textId: string;
    isQuestDialog: boolean;
    chapterNumber?: number;
    proactivePrompt?: string;
  } | null>(null);

  // Player moving state
  const [isPlayerMoving, setIsPlayerMoving] = useState(false);

  // Current Story data
  const currentStory = useMemo(() => {
    return MAJOR_STORIES[profile.major] || MAJOR_STORIES['akl'];
  }, [profile.major]);

  // Total XP Points calculation
  const totalXp = useMemo(() => {
    return (
      (score.vocabXp || 0) +
      (score.grammarXp || 0) +
      (score.batangTourXp || 0) +
      (score.ch1 || 0) +
      (score.ch2 || 0) +
      (score.ch3 || 0) +
      (score.ch4 || 0) +
      (score.ch5 || 0)
    );
  }, [score]);

  // Auto-save to localStorage
  useEffect(() => {
    if (gameState === 'title' && !profile.name) return;

    try {
      const stateToSave: SavedGameState = {
        profile,
        currentChapter,
        score,
        studentWritingText,
        vocabMysterySolved,
        grammarPracticeCompleted,
        batangTourCompleted,
        batangTourStep,
        lastSavedAt: Date.now()
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
      setSavedGame(stateToSave);
    } catch (e) {
      console.warn('Failed to save game:', e);
    }
  }, [profile, currentChapter, score, studentWritingText, vocabMysterySolved, grammarPracticeCompleted, batangTourCompleted, batangTourStep, gameState]);

  // Initial Sequenced Triggers: Vocab Mystery -> Grammar Practice
  useEffect(() => {
    if (gameState === 'playing') {
      if (!vocabMysterySolved) {
        setShowVocabMysteryModal(true);
      } else if (!grammarPracticeCompleted) {
        setShowGrammarPracticeModal(true);
      }
    }
  }, [gameState, vocabMysterySolved, grammarPracticeCompleted]);

  // Target NPC for HUD and Compass
  const currentTargetNpc = useMemo(() => {
    if (gameState !== 'playing') return null;

    if (!batangTourCompleted) {
      const currentStop = BATANG_TOUR_STOPS[batangTourStep] || BATANG_TOUR_STOPS[0];
      return ALL_NPCS.find(n => n.id === currentStop.npcId) || ALL_NPCS[0];
    }

    let targetId = '';
    if (currentChapter === 1) targetId = currentStory.chapter1.npcId;
    else if (currentChapter === 2) targetId = currentStory.chapter2.npcId;
    else if (currentChapter === 3) targetId = currentStory.chapter3.npcId;
    else if (currentChapter === 4) targetId = currentStory.chapter4.npcId;
    else if (currentChapter === 5) targetId = currentStory.chapter5.npcId;

    return ALL_NPCS.find(n => n.id === targetId) || ALL_NPCS[0];
  }, [gameState, batangTourCompleted, batangTourStep, currentChapter, currentStory]);

  // Start new game handler
  const handleStartGame = (newProfile: PlayerProfile) => {
    setProfile(newProfile);
    setCurrentChapter(1);
    setScore({ ...INITIAL_SCORE });
    setStudentWritingText('');
    setVocabMysterySolved(false);
    setGrammarPracticeCompleted(false);
    setBatangTourCompleted(false);
    setBatangTourStep(0);
    setFailedMissionReason(null);
    setGameState('playing');
    setShowVocabMysteryModal(true);
    setShowGrammarPracticeModal(false);
  };

  // Resume game handler
  const handleResumeGame = () => {
    if (savedGame) {
      setProfile(savedGame.profile);
      setCurrentChapter(savedGame.currentChapter);
      setScore(savedGame.score);
      setStudentWritingText(savedGame.studentWritingText);
      setVocabMysterySolved(savedGame.vocabMysterySolved);
      setGrammarPracticeCompleted(savedGame.grammarPracticeCompleted || false);
      setBatangTourCompleted(savedGame.batangTourCompleted);
      setBatangTourStep(savedGame.batangTourStep);
      setFailedMissionReason(null);
      setGameState('playing');
    }
  };

  // Reset save handler
  const handleResetSave = () => {
    try {
      localStorage.removeItem(SAVE_KEY);
      setSavedGame(null);
    } catch {}
  };

  // Mission Failure Handler
  const handleMissionFailed = (reason: string) => {
    soundManager.playWrong();
    setFailedMissionReason(reason);

    // Reset progress and wipe save
    try {
      localStorage.removeItem(SAVE_KEY);
      setSavedGame(null);
    } catch {}

    setCurrentChapter(1);
    setScore({ ...INITIAL_SCORE });
    setStudentWritingText('');
    setVocabMysterySolved(false);
    setGrammarPracticeCompleted(false);
    setBatangTourCompleted(false);
    setBatangTourStep(0);
    setShowVocabMysteryModal(false);
    setShowGrammarPracticeModal(false);
    setActiveBatangStopIndex(null);
    setActiveChapterModal(null);
    setDialogueState(null);

    // Return to title screen!
    setGameState('title');
  };

  // Completed Vocab Mystery -> Launch Grammar Practice next!
  const handleCompleteVocabMystery = (xpEarned: number) => {
    soundManager.playLevelUp();
    setScore(prev => ({ ...prev, vocabXp: xpEarned }));
    setVocabMysterySolved(true);
    setShowVocabMysteryModal(false);
    setShowGrammarPracticeModal(true);
  };

  // Completed Grammar Practice (It is / It has / There is / There are)
  const handleCompleteGrammarPractice = (xpEarned: number) => {
    soundManager.playLevelUp();
    setScore(prev => ({ ...prev, grammarXp: xpEarned }));
    setGrammarPracticeCompleted(true);
    setShowGrammarPracticeModal(false);
  };

  // Completed a Batang tour step
  const handleCompleteBatangTourStep = (xpEarned: number) => {
    soundManager.playCorrect();
    setScore(prev => ({ ...prev, batangTourXp: (prev.batangTourXp || 0) + xpEarned }));
    setActiveBatangStopIndex(null);

    if (batangTourStep + 1 < BATANG_TOUR_STOPS.length) {
      setBatangTourStep(prev => prev + 1);
    } else {
      soundManager.playLevelUp();
      setBatangTourCompleted(true);
      setBatangTourStep(BATANG_TOUR_STOPS.length);
    }
  };

  // Restricted Area Alert
  const handleRestrictedAreaAlert = (npcOrDoorName: string, zoneName: string) => {
    const majorNames: Record<MajorId, string> = {
      akl: 'Akuntansi & Keuangan (AKL)',
      otomotif: 'Teknik Otomotif',
      tjkt: 'Teknik Jaringan Komputer & Telekomunikasi (TJKT)'
    };

    setRestrictedAlert({
      title: 'Akses Laboratorium Dibatasi ⛔',
      message: `Kamu terdaftar sebagai siswa ${majorNames[profile.major]}. Ruangan ${zoneName} (${npcOrDoorName}) khusus untuk siswa jurusan tersebut. Silakan kembali dan lanjutkan investigasimu di area jurusanmu!`
    });
  };

  // NPC interaction
  const handleInteractNpc = (npc: NPC) => {
    soundManager.init();

    // 1. Check if NPC belongs to another major
    if (npc.majorSpecific && npc.majorSpecific !== profile.major) {
      soundManager.playWrong();
      handleRestrictedAreaAlert(npc.name, npc.zone);
      return;
    }

    // 2. Check if NPC is one of the 3 Batang Tour NPCs
    if (npc.isBatangTourNpc && !batangTourCompleted) {
      const stopIndex = BATANG_TOUR_STOPS.findIndex(s => s.npcId === npc.id);
      if (stopIndex !== -1) {
        if (stopIndex === batangTourStep) {
          soundManager.playLevelUp();
          setActiveBatangStopIndex(stopIndex);
          return;
        } else if (stopIndex < batangTourStep) {
          soundManager.playTap();
          setDialogueState({
            npc,
            textEn: `We already explored ${BATANG_TOUR_STOPS[stopIndex].locationName}. Good job!`,
            textId: `Kita sudah mempelajari ${BATANG_TOUR_STOPS[stopIndex].locationName}. Kerja bagus!`,
            isQuestDialog: false
          });
          return;
        } else {
          soundManager.playTap();
          setDialogueState({
            npc,
            textEn: `Please visit our previous destination first before coming here!`,
            textId: `Silakan selesaikan kunjungan tempat sebelumnya terlebih dahulu!`,
            isQuestDialog: false
          });
          return;
        }
      }
    }

    // 3. Departmental Chapter Target NPC
    const isTarget = currentTargetNpc?.id === npc.id;

    if (isTarget && batangTourCompleted) {
      soundManager.playLevelUp();
      let promptEn = '';
      let promptId = '';
      let proactive = '';

      if (currentChapter === 1) {
        promptEn = `Hello ${profile.name}! I am ${npc.name}. We need to construct basic descriptive sentences for our ${currentStory.title}. Are you ready?`;
        promptId = `Halo ${profile.name}! Saya ${npc.name}. Kita perlu menyusun kalimat deskriptif dasar. Apakah kamu siap?`;
        proactive = currentStory.chapter1.proactivePrompt;
      } else if (currentChapter === 2) {
        promptEn = `Great progress! Now let's answer 10 questions on physical details and Adjective Order: Size, Color, and Material!`;
        promptId = `Kemajuan luar biasa! Sekarang mari jawab 10 soal mengenai urutan kata sifat: Ukuran, Warna, dan Bahan!`;
        proactive = currentStory.chapter2.proactivePrompt;
      } else if (currentChapter === 3) {
        promptEn = `We have critical witness statements! Compare each adjective carefully to identify the exact clue.`;
        promptId = `Kita punya kesaksian penting! Bandingkan setiap kata sifat dengan cermat untuk memecahkan kasus ini.`;
        proactive = currentStory.chapter3.proactivePrompt;
      } else if (currentChapter === 4) {
        promptEn = `Let's assemble the whole report! Remember the structure: Identification comes first, then Description details.`;
        promptId = `Mari susun laporannya secara utuh! Ingat strukturnya: Identification dulu, baru kemudian rincian Description.`;
        proactive = 'Arrange the paragraphs starting with the general identification!';
      } else if (currentChapter === 5) {
        promptEn = `This is your final independent project! Write 5 descriptive sentences in English to recover the lost book page!`;
        promptId = `Ini adalah proyek mandiri akhirmu! Tuliskan 5 kalimat deskripsi dalam bahasa Inggris untuk memulihkan lembaran buku yang hilang!`;
        proactive = 'Describe the tools or room in your major with at least five complete sentences!';
      }

      setDialogueState({
        npc,
        textEn: promptEn,
        textId: promptId,
        isQuestDialog: true,
        chapterNumber: currentChapter,
        proactivePrompt: proactive
      });
    } else {
      soundManager.playTap();
      setDialogueState({
        npc,
        textEn: npc.defaultGreetingEn,
        textId: npc.defaultGreetingId,
        isQuestDialog: false
      });
    }
  };

  // Launch chapter educational challenge
  const handleStartQuestFromDialogue = () => {
    if (dialogueState?.isQuestDialog) {
      const chNum = dialogueState.chapterNumber || currentChapter;
      setDialogueState(null);
      setActiveChapterModal(chNum);
    }
  };

  // Complete a chapter
  const handleCompleteChapter = (completedChapter: number, xpEarned: number, writingText?: string) => {
    setActiveChapterModal(null);

    setScore(prev => {
      const updated = { ...prev };
      if (completedChapter === 1) updated.ch1 = xpEarned;
      if (completedChapter === 2) updated.ch2 = xpEarned;
      if (completedChapter === 3) updated.ch3 = xpEarned;
      if (completedChapter === 4) updated.ch4 = xpEarned;
      if (completedChapter === 5) updated.ch5 = xpEarned;
      return updated;
    });

    if (writingText) {
      setStudentWritingText(writingText);
    }

    if (completedChapter < 5) {
      setCurrentChapter(completedChapter + 1);
    } else {
      setGameState('results');
    }
  };

  const handlePlayAgain = () => {
    setCurrentChapter(1);
    setScore({ ...INITIAL_SCORE });
    setStudentWritingText('');
    setVocabMysterySolved(false);
    setBatangTourCompleted(false);
    setBatangTourStep(0);
    setFailedMissionReason(null);
    setGameState('playing');
    setShowVocabMysteryModal(true);
  };

  const handleChangeMajor = () => {
    setGameState('title');
  };

  return (
    <div className="relative w-full h-full min-h-[100dvh] overflow-hidden bg-[#2B1F3D]">
      {/* 1. Title Screen */}
      {gameState === 'title' && (
        <div className="relative w-full h-full">
          {/* Mission Failed Alert Banner if reset occurred */}
          {failedMissionReason && (
            <div className="absolute top-4 left-4 right-4 z-50 max-w-lg mx-auto bg-red-600 text-white p-3.5 rounded-xl border-3 border-[#43281C] shadow-2xl animate-bounce text-center">
              <div className="font-pixel text-xs sm:text-sm font-bold mb-1">
                ⚠️ MISI GAGAL! PERMAINAN DIULANG
              </div>
              <p className="text-xs font-semibold leading-snug">
                {failedMissionReason}
              </p>
              <p className="text-[10px] text-red-200 mt-1">
                Silakan isi kembali data dan mulai petualangan dengan lebih teliti!
              </p>
            </div>
          )}

          <TitleScreen
            savedGame={savedGame}
            onResumeGame={handleResumeGame}
            onStartGame={handleStartGame}
            onResetSave={handleResetSave}
          />
        </div>
      )}

      {/* 2. Main Game Screen */}
      {gameState === 'playing' && (
        <>
          <GameCanvas
            story={currentStory}
            playerMajor={profile.major}
            allNpcs={ALL_NPCS}
            targetNpc={currentTargetNpc}
            currentChapter={currentChapter}
            totalXp={totalXp}
            isBatangTourActive={!batangTourCompleted}
            batangTourStep={batangTourStep}
            onInteractNpc={handleInteractNpc}
            onRestrictedAreaAlert={handleRestrictedAreaAlert}
            onPlayerMovingChange={setIsPlayerMoving}
          />

          {/* Initial Vocab Mystery Modal */}
          {showVocabMysteryModal && (
            <VocabMysteryModal
              onCompleted={handleCompleteVocabMystery}
            />
          )}

          {/* Initial Grammar Practice Modal (It is / It has / There is / There are) */}
          {showGrammarPracticeModal && (
            <GrammarPracticeModal
              onCompleted={handleCompleteGrammarPractice}
              onMissionFailed={handleMissionFailed}
            />
          )}

          {/* Batang Landmark Tour Modal */}
          {activeBatangStopIndex !== null && BATANG_TOUR_STOPS[activeBatangStopIndex] && (
            <BatangTourModal
              stop={BATANG_TOUR_STOPS[activeBatangStopIndex]}
              stepNumber={activeBatangStopIndex + 1}
              onCompletedStep={handleCompleteBatangTourStep}
              onMissionFailed={handleMissionFailed}
              onClose={() => setActiveBatangStopIndex(null)}
            />
          )}

          {/* Restricted Area Alert Modal */}
          {restrictedAlert && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
              <div className="retro-box max-w-md w-full p-5 text-[#43281C] animate-in zoom-in-95">
                <div className="flex items-center gap-2 mb-2 text-red-600 font-bold text-sm">
                  <span className="text-2xl">⛔</span>
                  <h3 className="font-pixel text-xs">{restrictedAlert.title}</h3>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed mb-4">
                  {restrictedAlert.message}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setRestrictedAlert(null);
                  }}
                  className="w-full retro-btn bg-[#2A9D8F] text-white font-bold py-2.5 text-xs sm:text-sm cursor-pointer"
                >
                  Dimengerti, Kembali ke Area Saya ➔
                </button>
              </div>
            </div>
          )}

          {/* Dialogue Box */}
          {dialogueState && (
            <DialogueBox
              npc={dialogueState.npc}
              textEn={dialogueState.textEn}
              textId={dialogueState.textId}
              isQuestDialog={dialogueState.isQuestDialog}
              chapterNumber={dialogueState.chapterNumber}
              proactivePrompt={dialogueState.proactivePrompt}
              onStartQuest={handleStartQuestFromDialogue}
              onClose={() => setDialogueState(null)}
            />
          )}

          {/* Bottom Navigation Bar */}
          <BottomNav
            isPlayerMoving={isPlayerMoving}
            onOpenMap={() => setIsMapOpen(true)}
            onOpenQuest={() => setIsQuestOpen(true)}
            onOpenVocab={() => setIsVocabOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
          />

          {/* Navigation Modals */}
          {isMapOpen && (
            <MapModal
              playerX={750}
              playerY={720}
              currentObjectiveNpc={currentTargetNpc}
              onClose={() => setIsMapOpen(false)}
            />
          )}

          {isQuestOpen && (
            <QuestModal
              currentChapter={currentChapter}
              story={currentStory}
              targetNpc={currentTargetNpc}
              onClose={() => setIsQuestOpen(false)}
            />
          )}

          {isVocabOpen && (
            <VocabModal
              vocabList={currentStory.vocabList}
              onClose={() => setIsVocabOpen(false)}
            />
          )}

          {isGuideOpen && (
            <GuideModal
              onClose={() => setIsGuideOpen(false)}
            />
          )}

          {/* Active Chapter Challenge Modal (Bab 1 to 5) */}
          {activeChapterModal && (
            <ChapterModal
              chapterIndex={activeChapterModal}
              story={currentStory}
              onCompleteChapter={handleCompleteChapter}
              onMissionFailed={handleMissionFailed}
              onClose={() => setActiveChapterModal(null)}
            />
          )}
        </>
      )}

      {/* 3. Result Screen & Web3Forms */}
      {gameState === 'results' && (
        <ResultScreen
          profile={profile}
          story={currentStory}
          score={score}
          studentWritingText={studentWritingText}
          onPlayAgain={handlePlayAgain}
          onChangeMajor={handleChangeMajor}
        />
      )}
    </div>
  );
}
