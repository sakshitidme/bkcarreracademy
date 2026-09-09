import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, BookOpen, CheckCircle, XCircle, Award, Sparkles, HelpCircle } from 'lucide-react';
import { PRACTICAL_EXAM_VOCAB_BANK, VocabItem } from '../data/vocabData';

interface EditorialVocabularyProps {
    className?: string;
}

export const EditorialVocabulary: React.FC<EditorialVocabularyProps> = ({ className = '' }) => {
    const [selectedWordIndex, setSelectedWordIndex] = useState(0);
    const currentVocab: VocabItem = PRACTICAL_EXAM_VOCAB_BANK[selectedWordIndex];

    // Quiz state for the current word
    const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    const handleWordTabChange = (index: number) => {
        setSelectedWordIndex(index);
        setSelectedQuizOption(null); // Reset quiz when changing tabs
    };

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.onstart = () => setIsPlayingAudio(true);
            utterance.onend = () => setIsPlayingAudio(false);
            utterance.onerror = () => setIsPlayingAudio(false);
            window.speechSynthesis.speak(utterance);
        } else {
            alert(`Pronunciation: ${currentVocab.phonetic}`);
        }
    };

    return (
        <section className={`my-12 ${className}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-dark font-extrabold text-xs tracking-wider uppercase mb-3 border border-primary/40">
                        <BookOpen size={14} className="text-primary" /> Daily Editorial Vocabulary & Quiz
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight font-display">
                        High-Yield Exam Vocab Bank
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 mt-2 font-medium">
                        Curated daily words from top editorials (The Hindu, Indian Express) with trilingual meanings, exam contexts, and interactive quizzes.
                    </p>
                </div>

                {/* TOP HORIZONTAL SCROLLING TAB LIST */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6 border-b border-gray-200">
                    {PRACTICAL_EXAM_VOCAB_BANK.map((item, idx) => {
                        const isActive = idx === selectedWordIndex;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleWordTabChange(idx)}
                                className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${isActive
                                        ? 'bg-dark text-primary border-2 border-dark shadow-[4px_4px_0px_0px_rgba(245,166,35,1)] scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                <span>Word {idx + 1}:</span>
                                <span className={isActive ? 'text-primary font-extrabold' : 'text-dark'}>
                                    {item.word}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* TWO-COLUMN GRID (lg:grid-cols-12) */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentVocab.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                    >
                        {/* LEFT COLUMN (col-span-7) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border-2 border-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                            <div>
                                {/* Word & Pronunciation */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-3xl md:text-4xl font-black text-dark font-display">
                                                {currentVocab.word}
                                            </h3>
                                            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-lg uppercase tracking-wider">
                                                {currentVocab.partOfSpeech}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-500 tracking-wide block mt-1">
                                            {currentVocab.phonetic}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleSpeak(currentVocab.word)}
                                        className={`p-3 rounded-2xl border-2 border-dark shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer ${isPlayingAudio ? 'bg-primary text-dark animate-pulse' : 'bg-gray-50 text-dark hover:bg-primary/20'
                                            }`}
                                        title="Listen Pronunciation"
                                    >
                                        <Volume2 size={22} />
                                    </button>
                                </div>

                                {/* English Meaning */}
                                <div className="mb-6">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                                        English Meaning
                                    </h4>
                                    <p className="text-base text-gray-800 font-bold leading-relaxed">
                                        {currentVocab.englishMeaning}
                                    </p>
                                </div>

                                {/* Two Colored Blocks for Hindi & Marathi Translations */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {/* Hindi Block */}
                                    <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200">
                                        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-900 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-amber-500" /> Hindi Meaning (हिंदी)
                                        </div>
                                        <p className="text-sm font-bold text-amber-950 font-hindi">
                                            {currentVocab.hindiMeaning}
                                        </p>
                                    </div>

                                    {/* Marathi Block */}
                                    <div className="p-4 rounded-2xl bg-sky-50/80 border-2 border-sky-200">
                                        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-sky-900 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-sky-500" /> Marathi Meaning (मराठी)
                                        </div>
                                        <p className="text-sm font-bold text-sky-950 font-hindi">
                                            {currentVocab.marathiMeaning}
                                        </p>
                                    </div>
                                </div>

                                {/* Synonyms & Antonyms Pill Tags */}
                                <div className="space-y-3">
                                    <div>
                                        <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">
                                            Synonyms
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {currentVocab.synonyms.map((syn) => (
                                                <span
                                                    key={syn}
                                                    className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl"
                                                >
                                                    +{syn}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">
                                            Antonyms
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {currentVocab.antonyms.map((ant) => (
                                                <span
                                                    key={ant}
                                                    className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold rounded-xl"
                                                >
                                                    -{ant}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN (col-span-5 / Dark Mode Canvas) */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 via-dark to-black text-white rounded-3xl p-6 md:p-8 border-2 border-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative overflow-hidden">

                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                            <div>
                                {/* Context Header */}
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-4 pb-2 border-b border-white/10">
                                    <Sparkles size={14} /> Editorial Context & Quick Quiz
                                </div>

                                {/* Italicized Editorial Sentence */}
                                <div className="mb-5">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                        Editorial Sentence
                                    </span>
                                    <blockquote className="italic text-sm md:text-base text-gray-200 border-l-4 border-primary pl-4 py-1 leading-relaxed">
                                        "{currentVocab.exampleSentence}"
                                    </blockquote>
                                </div>

                                {/* Competitive Exam Relevance */}
                                <div className="mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                                    <span className="font-bold text-primary block mb-0.5">Exam Relevance:</span>
                                    {currentVocab.examContext}
                                </div>

                                {/* THE QUICK QUIZ */}
                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-3">
                                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                                            <HelpCircle size={14} className="text-primary" /> Test Your Understanding
                                        </h5>
                                        <span className="text-[10px] text-gray-400 font-bold">1 Question</span>
                                    </div>

                                    <p className="text-xs font-medium text-gray-300 mb-3">
                                        Which of the following best defines <strong className="text-primary">"{currentVocab.word}"</strong>?
                                    </p>

                                    {/* Quiz Options */}
                                    <div className="space-y-2">
                                        {currentVocab.quizOptions.map((option, optIdx) => {
                                            const isSelected = selectedQuizOption === optIdx;
                                            const isCorrect = optIdx === currentVocab.quizAnswerIndex;
                                            const hasAnswered = selectedQuizOption !== null;

                                            let btnStyle = 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/15';

                                            if (hasAnswered) {
                                                if (isCorrect) {
                                                    btnStyle = 'bg-emerald-500/30 border-emerald-500 text-emerald-200 font-bold';
                                                } else if (isSelected) {
                                                    btnStyle = 'bg-rose-500/30 border-rose-500 text-rose-200 font-bold';
                                                } else {
                                                    btnStyle = 'bg-white/5 border-white/5 text-gray-500 opacity-50';
                                                }
                                            }

                                            return (
                                                <button
                                                    key={optIdx}
                                                    disabled={hasAnswered}
                                                    onClick={() => setSelectedQuizOption(optIdx)}
                                                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                                                >
                                                    <span>{option}</span>
                                                    {hasAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-400 shrink-0" />}
                                                    {hasAnswered && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Feedback Message */}
                                    {selectedQuizOption !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mt-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${selectedQuizOption === currentVocab.quizAnswerIndex
                                                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                                                    : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                                                }`}
                                        >
                                            {selectedQuizOption === currentVocab.quizAnswerIndex ? (
                                                <>
                                                    <Award size={16} className="text-emerald-400 shrink-0" />
                                                    <span>Bingo! That is the exact correct definition.</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle size={16} className="text-rose-400 shrink-0" />
                                                    <span>Not quite. Option {currentVocab.quizAnswerIndex + 1} is the correct answer.</span>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default EditorialVocabulary;
