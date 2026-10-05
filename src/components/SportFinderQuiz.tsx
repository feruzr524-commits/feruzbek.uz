import React, { useState } from 'react';
import { QUIZ_QUESTIONS, SPORTS_DATA } from '../data/sportsData';
import { SportDetail } from '../types';
import { Compass, Sparkles, Trophy, ArrowRight, RotateCcw, CheckCircle2, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SportFinderQuizProps {
  onSelectSport: (sport: SportDetail) => void;
  onStartWorkout: (sport: SportDetail) => void;
}

export const SportFinderQuiz: React.FC<SportFinderQuizProps> = ({ onSelectSport, onStartWorkout }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [resultSport, setResultSport] = useState<SportDetail | null>(null);

  const handleSelectOption = (sportMatch: string) => {
    const updated = [...selectedAnswers, sportMatch];
    setSelectedAnswers(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate winner
      const counts: Record<string, number> = {};
      updated.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let topSportId = updated[0];
      let maxCount = 0;
      for (const id in counts) {
        if (counts[id] > maxCount) {
          maxCount = counts[id];
          topSportId = id;
        }
      }

      const winner = SPORTS_DATA.find((s) => s.id === topSportId) || SPORTS_DATA[0];
      setResultSport(winner);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultSport(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto font-mono">
      {/* Title */}
      <div className="text-center sm:text-left mb-8 pb-4 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Shaxsiy Sport Yo‘nalishi Sinovi</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display uppercase italic tracking-tight">
            QAYSI SPORT SIZGA MOS?
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mt-1 uppercase">
            4 ta tezkor savolga javob bering va o‘z qiziqishingiz hamda tanangizga eng ideal sport turini aniqlang!
          </p>
        </div>
      </div>

      {!resultSport ? (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative">
          {/* Progress bar and step indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-lime-400 uppercase">
              Savol {currentStep + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded transition-all duration-300 ${
                    idx === currentStep ? 'w-8 bg-lime-400' : idx < currentStep ? 'w-4 bg-zinc-600' : 'w-2 bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase italic mb-1.5">
              {currentQ.question}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 uppercase">{currentQ.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.sportMatch)}
                className="w-full p-4 sm:p-5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400 text-left transition-all duration-200 flex items-center justify-between group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl sm:text-3xl p-2 rounded bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-lime-400 transition-colors">
                    {opt.text}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Card */
        <div className="rounded-xl bg-zinc-900 border border-lime-400 p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-lime-400 text-black text-xs font-black uppercase mb-4 shadow-lg shadow-lime-400/20">
            <Trophy className="w-4 h-4" />
            <span>Siz Uchun 98% Mos Keladigan Sport!</span>
          </div>

          <div className="text-6xl mb-2">{resultSport.emoji}</div>
          <h3 className="text-4xl sm:text-5xl font-black text-white font-display uppercase italic mb-1">
            {resultSport.uzbekName}
          </h3>
          <p className="text-lime-400 font-bold text-sm sm:text-base mb-6 uppercase">{resultSport.tagline}</p>

          {/* Image */}
          <div className="relative h-48 sm:h-60 max-w-md mx-auto rounded-lg overflow-hidden border border-zinc-800 mb-6 shadow-xl">
            <img
              src={resultSport.image}
              alt={resultSport.name}
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <span className="text-xs font-bold text-white bg-black/80 px-3 py-1 rounded border border-zinc-800 uppercase">
                🔥 {resultSport.caloriesBurnedPerHour} kkal/soat energiya sarfi
              </span>
            </div>
          </div>

          {/* Why fits you */}
          <div className="max-w-lg mx-auto bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-left mb-6 space-y-2">
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Nega aynan {resultSport.name}?
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Sizning javoblaringizga ko‘ra, sizda {resultSport.primaryMuscles[0].toLowerCase()} va dinamik harakatlarga yuqori mayl bor. Ushbu sport sizga kuch, chaqqonlik va ruhiy yengillik beradi.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onStartWorkout(resultSport)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Mashg‘ulot Taymerini Yoqish</span>
            </button>

            <button
              onClick={() => onSelectSport(resultSport)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-white font-bold uppercase text-xs sm:text-sm transition-all"
            >
              Batafsil O‘rganish
            </button>

            <button
              onClick={handleRestart}
              className="p-3.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all"
              title="Testni qayta topshirish"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
