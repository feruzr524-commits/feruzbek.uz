import React from 'react';
import { Trophy, Heart, Sparkles, ArrowUp } from 'lucide-react';
import { SPORTS_DATA } from '../data/sportsData';
import { SportDetail } from '../types';

interface FooterProps {
  onSelectSport: (sport: SportDetail) => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSport, setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden font-mono">
      {/* Slogan Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-zinc-950 text-lime-400 text-xs font-black uppercase tracking-wider mb-4 border border-zinc-800">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>Sog‘lom Hayot Formula</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white font-display uppercase italic tracking-tight mb-3">
            SPORT BILAN SHUG‘ULLAN — SOG‘LOM BO‘L! 💪
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto uppercase mb-8">
            Sport insonni nafaqat jismonan baquvvat qiladi, balki aql-idrok, iroda va hayotga bo‘lgan muhabbatini ham mustahkamlaydi!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {SPORTS_DATA.map((sport) => (
              <button
                key={sport.id}
                onClick={() => onSelectSport(sport)}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 hover:bg-lime-400 hover:text-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-zinc-800 transition-all duration-200 flex items-center gap-2"
              >
                <span>{sport.emoji}</span>
                <span>{sport.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-lime-400 flex items-center justify-center text-black font-black">
              <Trophy className="w-4 h-4" />
            </div>
            <span className="font-bold text-zinc-300">SPORT — SOG‘LOM HAYOT GAROVI</span>
          </div>

          <p className="text-center sm:text-left flex items-center gap-1.5">
            <span>Har bir inson uchun salomatlik va kuch manbai</span>
            <Heart className="w-3.5 h-3.5 text-lime-400 inline fill-lime-400" />
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1 text-xs font-bold uppercase"
          >
            <span>Yuqoriga</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
