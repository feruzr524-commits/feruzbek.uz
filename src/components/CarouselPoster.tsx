import React, { useState, useEffect } from 'react';
import { SPORTS_DATA } from '../data/sportsData';
import { SportDetail } from '../types';
import { ArrowRight, Flame, Heart, Play, ChevronLeft, ChevronRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselPosterProps {
  onSelectSport: (sport: SportDetail) => void;
  onStartWorkout: (sport: SportDetail) => void;
}

export const CarouselPoster: React.FC<CarouselPosterProps> = ({ onSelectSport, onStartWorkout }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto rotate carousel every 6s unless user paused
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPORTS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const currentSport = SPORTS_DATA[activeIndex];

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + SPORTS_DATA.length) % SPORTS_DATA.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % SPORTS_DATA.length);
  };

  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Main Title Banner inspired by the Bold Typography poster */}
      <div className="mb-10 text-center sm:text-left border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 fill-lime-400" />
            <span>Sport — Sog‘lom Hayot Garovi!</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase italic font-display leading-[0.9]">
            SPORT <span className="text-lime-400 not-italic">PORTALI</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-mono">
            Sport bilan shug‘ullanish insonni <span className="text-white font-bold">kuchli</span>, <span className="text-lime-400 font-bold">chaqqon</span> va <span className="text-white font-bold">sog‘lom</span> bo‘lishiga yordam beradi.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-4xl font-mono font-black text-lime-400">04</span>
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">ASOSIY SPORT TURI</span>
        </div>
      </div>

      {/* 4-Sport Quick Select Pills */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-8 font-mono">
        {SPORTS_DATA.map((sport, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={sport.id}
              id={`carousel-btn-${sport.id}`}
              onClick={() => {
                setIsAutoPlay(false);
                setActiveIndex(idx);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 border ${
                isActive
                  ? 'bg-lime-400 text-black border-lime-400 shadow-lg shadow-lime-400/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span className="text-base">{sport.emoji}</span>
              <span>{sport.name}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Dynamic Showcase Card */}
      <div className="relative mb-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSport.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-2xl overflow-hidden relative"
          >
            {/* Background subtle watermark & decorative grid */}
            <div className="absolute right-0 bottom-0 text-[160px] sm:text-[220px] font-black italic text-white/[0.03] select-none pointer-events-none font-display leading-none tracking-tighter">
              {currentSport.name.toUpperCase()}
            </div>

            {/* Left side: Visual card with image and bold tags */}
            <div className="lg:col-span-6 relative flex flex-col justify-between rounded-xl bg-zinc-950 p-4 sm:p-6 border border-zinc-800 overflow-hidden min-h-[380px] sm:min-h-[460px]">
              {/* Top pill cutout */}
              <div className="flex items-center justify-between z-10 font-mono">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-lime-400 text-black text-xs font-black uppercase tracking-wider">
                  <span>{currentSport.emoji}</span>
                  <span>{currentSport.heroBadge}</span>
                </div>

                <div className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5 font-bold">
                  <Flame className="w-3.5 h-3.5 text-lime-400" />
                  <span>{currentSport.caloriesBurnedPerHour} KKAL/SOAT</span>
                </div>
              </div>

              {/* Main Image with dynamic perspective */}
              <div className="relative my-4 z-10 flex-1 flex items-center justify-center">
                <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden border border-zinc-800 shadow-2xl group">
                  <img
                    src={currentSport.image}
                    alt={currentSport.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  
                  {/* Floating Tag over image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                    <span className="font-bold bg-zinc-900/90 px-3 py-1 rounded border border-zinc-700">
                      {currentSport.uzbekName}
                    </span>
                    <span className="bg-lime-400 text-black font-black px-2.5 py-0.5 rounded">
                      {currentSport.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom bar inside card cutout */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800 z-10 font-mono">
                <div>
                  <p className="text-[11px] text-zinc-400 uppercase">Tavsiya etilgan yosh:</p>
                  <p className="text-xs font-bold text-white">{currentSport.recommendedAge}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-zinc-400 uppercase">Yurak urishi:</p>
                  <p className="text-xs font-bold text-lime-400">{currentSport.heartRateZone}</p>
                </div>
              </div>
            </div>

            {/* Right side: Detailed overview, Benefits & Action triggers */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:p-2">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{currentSport.emoji}</span>
                  <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tight text-white font-display">
                    {currentSport.name}
                  </h2>
                </div>
                <p className="text-lime-400 font-bold font-mono text-sm sm:text-base mb-5 uppercase tracking-wide">
                  {currentSport.tagline}
                </p>

                {/* Key specs row */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 font-mono">
                  {currentSport.specs.map((spec, i) => (
                    <div key={i} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">{spec.label}</p>
                      <p className="text-xl sm:text-2xl font-black text-white font-display italic">{spec.value}</p>
                      {spec.sub && <p className="text-[10px] text-lime-400 font-bold">{spec.sub}</p>}
                    </div>
                  ))}
                </div>

                {/* 3 Core Benefits */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-lime-400" />
                    Asosiy Salomatlik Foydalari:
                  </h4>
                  {currentSport.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 text-lime-400 font-mono flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        0{idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-white uppercase">{benefit.title}</p>
                          <span className="text-[11px] font-mono font-bold text-lime-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                            {benefit.stat}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote / Fun fact */}
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono flex items-center gap-3">
                <Award className="w-5 h-5 text-lime-400 shrink-0" />
                <span>
                  <strong className="text-white font-bold uppercase not-italic">Qiziqarli fakt:</strong> {currentSport.funFact}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  id={`start-workout-${currentSport.id}`}
                  onClick={() => onStartWorkout(currentSport)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Mashg‘ulotni Boshlash (Taymer)</span>
                </button>

                <button
                  id={`detail-sport-${currentSport.id}`}
                  onClick={() => onSelectSport(currentSport)}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-sm transition-all duration-150 flex items-center justify-center gap-2 border border-zinc-800"
                >
                  <span>Batafsil Ko‘rish</span>
                  <ArrowRight className="w-4 h-4 text-lime-400" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-2">
            {SPORTS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlay(false);
                  setActiveIndex(i);
                }}
                className={`h-2 rounded transition-all duration-200 ${
                  i === activeIndex ? 'w-8 bg-lime-400' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all"
              aria-label="Previous sport"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all"
              aria-label="Next sport"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid - Poster Style */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase italic tracking-tight">SPORT TURLARI KOLLAJI</h3>
            <p className="text-xs font-mono text-zinc-400 uppercase">Har bir sport turi o‘ziga xos kuch va salomatlik manbaidir</p>
          </div>
          <span className="text-xs font-mono font-bold text-lime-400 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 uppercase">
            4 ta Asosiy Yo‘nalish
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPORTS_DATA.map((sport) => (
            <div
              key={sport.id}
              onClick={() => onSelectSport(sport)}
              className="group relative rounded-xl bg-zinc-900 border border-zinc-800 p-4 hover:border-lime-400/60 transition-all duration-200 hover:-translate-y-1 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between mb-3 font-mono">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-zinc-950 text-white border border-zinc-800 flex items-center gap-1.5 uppercase">
                  <span>{sport.emoji}</span>
                  <span>{sport.name}</span>
                </span>
                <span className="text-[11px] font-bold text-lime-400">
                  {sport.caloriesBurnedPerHour} KKAL
                </span>
              </div>

              {/* Image box */}
              <div className="relative h-44 rounded-lg overflow-hidden mb-3 border border-zinc-800 group-hover:border-lime-400/30 transition-colors">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-xs font-bold text-white drop-shadow-md line-clamp-1 uppercase">{sport.tagline}</p>
                </div>
              </div>

              {/* Specs & Muscle Target */}
              <div className="space-y-2 mb-3 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5 text-[11px] text-lime-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-clamp-1">{sport.primaryMuscles[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                  <Flame className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                  <span>{sport.keyBenefits[0].stat}</span>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-lime-400 uppercase group-hover:underline">Batafsil ma’lumot</span>
                <div className="w-8 h-8 rounded bg-lime-400 text-black flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
