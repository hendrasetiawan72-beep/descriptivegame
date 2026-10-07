export type MajorId = 'akl' | 'otomotif' | 'tjkt';

export interface PlayerProfile {
  name: string;
  className: string;
  major: MajorId;
}

export type Gender = 'female' | 'male';

export interface NPC {
  id: string;
  name: string;
  role: string;
  gender: Gender;
  x: number;
  y: number;
  spriteType: 'teacher_female' | 'teacher_male' | 'student_female' | 'student_male' | 'security' | 'mechanic' | 'robot';
  zone: string;
  majorSpecific?: MajorId;
  isBatangTourNpc?: boolean;
  batangTourStopId?: 'waterfall' | 'kopi' | 'kitb';
  defaultGreetingEn: string;
  defaultGreetingId: string;
}

export interface VocabularyItem {
  word: string;
  partOfSpeech: 'Adjective' | 'Noun' | 'Phrase';
  meaning: string;
  example: string;
  category: 'Size' | 'Color' | 'Material' | 'Quality' | 'Object' | 'Structure';
}

export interface VocabMysteryCard {
  id: string;
  enWord: string;
  idWord: string;
  category: string;
  hint: string;
}

export interface GrammarPracticeQuestion {
  id: number;
  promptSentence: string;
  sentenceId: string;
  missingWordHint: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  ruleCategory: 'It is' | 'It has / They have' | 'There is' | 'There are';
}

export interface BatangTourStop {
  id: 'waterfall' | 'kopi' | 'kitb';
  npcId: string;
  npcName: string;
  npcRole: string;
  npcZone: string;
  locationName: string;
  gender: Gender;
  title: string;
  storyEn: string;
  storyId: string;
  questionEn: string;
  questionId: string;
  options: {
    id: string;
    textEn: string;
    textId: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface Chapter1Data {
  title: string;
  npcId: string;
  instruction: string;
  contextId: string;
  targetSentence: string;
  jumbledWords: string[];
  explanation: string;
  explanationId: string;
  proactivePrompt: string;
  proactiveHintWords: string[];
}

export interface Chapter2QuizItem {
  id: number;
  question: string;
  questionId: string;
  contextItem: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

export interface Chapter2Data {
  title: string;
  npcId: string;
  instruction: string;
  quizItems: Chapter2QuizItem[]; // 10 distinct questions
  explanation: string;
  proactivePrompt: string;
}

export interface Chapter3Suspect {
  id: string;
  title: string;
  description: string;
  isCorrect: boolean;
  visualTag: string;
  feedback: string;
}

export interface Chapter3Case {
  id: number;
  title: string;
  caseDescriptionEn: string;
  caseDescriptionId: string;
  witnessStatementEn: string;
  witnessStatementId: string;
  question: string;
  suspects: Chapter3Suspect[];
}

export interface Chapter3Data {
  title: string;
  npcId: string;
  cases: Chapter3Case[]; // 5 distinct cases!
  proactivePrompt: string;
}

export interface Chapter4Sentence {
  id: string;
  text: string;
  section: 'Identification' | 'Description';
  order: number;
}

export interface Chapter4Data {
  title: string;
  npcId: string;
  topic: string;
  sentences: Chapter4Sentence[];
  hint: string;
  explanation: string;
}

export interface Chapter5Data {
  title: string;
  npcId: string;
  promptTopic: string;
  guidingQuestions: string[];
  exampleVocab: string[];
  plotTwistTitle: string;
  plotTwistTextEn: string;
  plotTwistTextId: string;
  plotTwistMoral: string;
}

export interface MajorStory {
  id: MajorId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  themeColor: string;
  initialNpcId: string;
  chapter1: Chapter1Data;
  chapter2: Chapter2Data;
  chapter3: Chapter3Data;
  chapter4: Chapter4Data;
  chapter5: Chapter5Data;
  vocabList: VocabularyItem[];
}

export interface GameScore {
  vocabXp: number;
  grammarXp: number;
  batangTourXp: number;
  ch1: number;
  ch2: number;
  ch3: number;
  ch4: number;
  ch5: number;
  hintsUsed: number;
}

export interface SavedGameState {
  profile: PlayerProfile;
  currentChapter: number;
  score: GameScore;
  studentWritingText: string;
  vocabMysterySolved: boolean;
  grammarPracticeCompleted: boolean;
  batangTourCompleted: boolean;
  batangTourStep: number; // 0: waterfall, 1: kopi, 2: kitb, 3: completed
  lastSavedAt: number;
}
