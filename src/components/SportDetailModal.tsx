import React from 'react';
import { SportDetail } from '../types';
import { X, Play, Flame, Shield, Award, CheckCircle2, ChevronRight, Sparkles, Heart } from 'lucide-react';

interface SportDetailModalProps {
  sport: SportDetail | null;
  onClose: () => void;
  onStartWorkout: (sport: SportDetail) => void;
}

export const SportDetailModal: React.FC<SportDetailModalProps> = ({ sport, onClose, onStartWorkout }) => {
  if (!sport) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 font-mono">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with image cover */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={sport.image}
            alt={sport.name}
            className="w-full h-full object-cover object-center grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-950/80 border border-zinc-800 text-white hover:bg-zinc-800 transition-all z-20"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating badge info on top of modal */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-lime-400 text-black text-xs font-black uppercase mb-2">
                <span>{sport.emoji}</span>
                <span>{sport.heroBadge}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white font-display uppercase italic tracking-tight">
                {sport.uzbekName}
              </h2>
              <p className="text-lime-400 font-bold text-sm sm:text-base uppercase">{sport.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-lime-400 flex items-center gap-1.5 uppercase">
                <Flame className="w-4 h-4 text-lime-400" />
                {sport.caloriesBurnedPerHour} kkal/soat
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6">
          {/* Key specs highlight */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-[11px] text-zinc-400 uppercase">Qiyinlik darajasi</p>
              <p className="text-base font-black text-lime-400 uppercase mt-0.5">{sport.difficulty}</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-[11px] text-zinc-400 uppercase">Tavsiya yoshi</p>
              <p className="text-base font-black text-white uppercase mt-0.5">{sport.recommendedAge}</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-[11px] text-zinc-400 uppercase">Yurak urishi</p>
              <p className="text-base font-black text-lime-400 uppercase mt-0.5">{sport.heartRateZone}</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-[11px] text-zinc-400 uppercase">Energiya sarfi</p>
              <p className="text-base font-black text-lime-400 uppercase mt-0.5">{sport.caloriesBurnedPerHour} kkal</p>
            </div>
          </div>

          {/* Health Benefits Section */}
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2 mb-3 font-display uppercase italic">
              <Heart className="w-5 h-5 text-lime-400" />
              Salomatlikka Ta’siri va Asosiy Afzalliklari
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sport.keyBenefits.map((b, i) => (
                <div key={i} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-black px-2 py-0.5 rounded bg-lime-400 uppercase">
                      {b.stat}
                    </span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-white mb-1">{b.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Muscles */}
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2 mb-2.5 font-display uppercase italic">
              <Sparkles className="w-4 h-4 text-lime-400" />
              Rivojlanadigan Asosiy Mushak Guruhlari:
            </h3>
            <div className="flex flex-wrap gap-2">
              {sport.primaryMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs font-bold uppercase flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Exercises & Drills for this Sport */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2 font-display uppercase italic">
                <Award className="w-5 h-5 text-lime-400" />
                Tavsiya Etilgan Mashqlar & Dastur
              </h3>
              <span className="text-xs text-zinc-500 uppercase">3 ta Asosiy Kompleks</span>
            </div>

            <div className="space-y-3">
              {sport.exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-lime-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-lime-400 text-black flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-white">{ex.name}</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">{ex.description}</p>
                      <p className="text-[11px] text-lime-400 font-bold mt-1 uppercase">
                        🎯 Natija: {ex.benefit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    <span className="px-2.5 py-1 rounded bg-zinc-950 text-[11px] font-bold text-zinc-300 border border-zinc-800 uppercase">
                      {ex.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-lime-400/20 text-[11px] font-bold text-lime-400 border border-lime-400/30 uppercase">
                      {ex.reps}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Equipment */}
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2 mb-2 font-display uppercase italic">
              <Shield className="w-4 h-4 text-lime-400" />
              Kerakli Jihozlar va Kiyimlar:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sport.equipment.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2 uppercase">
                  <span className="w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 italic">
            "{sport.expertQuote}" — <span className="text-lime-400 font-bold not-italic uppercase">{sport.quoteAuthor}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-zinc-400 text-center sm:text-left uppercase">
            Tayyor bo‘lsangiz, interaktiv taymer yordamida mashg‘ulotni boshlang!
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-bold uppercase transition-all"
            >
              Yopish
            </button>
            <button
              onClick={() => {
                onClose();
                onStartWorkout(sport);
              }}
              className="w-1/2 sm:w-auto px-6 py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-black text-xs font-black uppercase flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Mashqni Boshlash</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
