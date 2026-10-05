import React, { useState, useEffect } from 'react';
import { DAILY_HABITS_DATA } from '../data/sportsData';
import { HabitItem } from '../types';
import { CheckCircle, Circle, Trophy, Flame, RefreshCw, Sun, Droplet, Footprints, Dumbbell, Apple, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DailyHabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    try {
      const saved = localStorage.getItem('sport_daily_habits');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return DAILY_HABITS_DATA;
  });

  const [streak] = useState<number>(5);

  useEffect(() => {
    try {
      localStorage.setItem('sport_daily_habits', JSON.stringify(habits));
    } catch {}
  }, [habits]);

  const toggleHabit = (id: string) => {
    setHabits((prev) => {
      const updated = prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h));
      const allDone = updated.every((h) => h.completed);
      if (allDone) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
      return updated;
    });
  };

  const resetHabits = () => {
    setHabits(DAILY_HABITS_DATA.map((h) => ({ ...h, completed: false })));
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-lime-400" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-lime-400" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-lime-400" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-lime-400" />;
      case 'Apple': return <Apple className="w-5 h-5 text-lime-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-lime-400" />;
      default: return <Flame className="w-5 h-5 text-lime-400" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800 font-mono">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-lime-400" />
            <span>Kundalik Rejim & Intizom</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-display uppercase italic tracking-tight">
            KUNLIK SOG‘LOM ODATLAR
          </h2>
          <p className="text-xs text-zinc-400 uppercase">Har kungi kichik intizom buyuk sog‘liq va kuchni yaratadi</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-black uppercase flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-lime-400" />
            <span>{streak} Kunlik Seriya!</span>
          </div>

          <button
            onClick={resetHabits}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            title="Odatlarni yangilash"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 sm:p-6 mb-6 font-mono">
        <div className="flex items-center justify-between mb-2 text-xs font-bold uppercase">
          <span className="text-zinc-300">Bugungi Bajarilish: {completedCount} / {habits.length}</span>
          <span className="text-lime-400 font-black">{progressPercent}%</span>
        </div>

        <div className="w-full bg-zinc-950 rounded-full h-3 overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-lime-400 rounded-full transition-all duration-500 shadow-sm shadow-lime-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {progressPercent === 100 && (
          <div className="mt-3 p-3 rounded-lg bg-zinc-950 border border-lime-400/50 text-lime-400 text-xs font-bold uppercase flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-lime-400" />
            <span>Ofarin! Bugungi barcha sog‘lom odatlarni muvaffaqiyatli bajardingiz! 🎉</span>
          </div>
        )}
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 font-mono">
        {habits.map((habit) => (
          <div
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 select-none ${
              habit.completed
                ? 'bg-zinc-950 border-lime-400/40 shadow-sm'
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0">
                {getIcon(habit.icon)}
              </div>
              <div>
                <p className={`text-xs font-bold uppercase transition-colors ${habit.completed ? 'text-lime-400 line-through' : 'text-white'}`}>
                  {habit.title}
                </p>
                <span className="text-[10px] text-zinc-400">{habit.target}</span>
              </div>
            </div>

            <div className="shrink-0">
              {habit.completed ? (
                <CheckCircle className="w-5 h-5 text-lime-400 fill-lime-400/20" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-600 hover:text-zinc-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
