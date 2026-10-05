import React from 'react';
import { Trophy, Flame, Dumbbell, Compass, HeartPulse, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickSport: (sportId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      {/* Top micro banner */}
      <div className="bg-zinc-900 border-b border-zinc-800/80 px-4 py-1.5 text-xs text-center text-zinc-300 font-mono flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-lime-400 fill-lime-400" />
        <span className="font-semibold uppercase tracking-wider text-xs">
          SPORT — SOG‘LOM HAYOT GAROVI! <span className="text-lime-400 font-bold">KUCHLI, CHAAQQON VA SOG‘LOM BO‘L!</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-lime-400 flex items-center justify-center shadow-lg shadow-lime-400/20 group-hover:scale-105 transition-transform duration-200">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl sm:text-3xl tracking-tighter text-white uppercase italic font-display">
                  SPORT
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-lime-400 border border-lime-400/30 uppercase tracking-widest">
                  PRO
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-wide text-zinc-400 uppercase hidden sm:block">Sog‘lom Hayot Garovi</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
            <button
              id="nav-tab-explore"
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'explore'
                  ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Flame className="w-4 h-4" />
              Sport Turlari
            </button>

            <button
              id="nav-tab-timer"
              onClick={() => setActiveTab('timer')}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'timer'
                  ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              Mashg‘ulot Taymeri
            </button>

            <button
              id="nav-tab-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              Sog‘lomlik Kalkulyatori
            </button>

            <button
              id="nav-tab-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Sport Testi
            </button>
          </nav>

          {/* Quick CTA button */}
          <div className="flex items-center gap-2">
            <button
              id="nav-quick-start-btn"
              onClick={() => setActiveTab('timer')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider bg-lime-400 text-black hover:bg-lime-300 shadow-lg shadow-lime-400/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Mashq Boshlash</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar pills */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-zinc-950 border-t border-zinc-800 overflow-x-auto text-[11px] font-bold uppercase tracking-wider gap-1 font-mono">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-3 py-1.5 rounded shrink-0 ${activeTab === 'explore' ? 'bg-lime-400 text-black font-black' : 'text-zinc-400'}`}
        >
          ⚽ Turlar
        </button>
        <button
          onClick={() => setActiveTab('timer')}
          className={`px-3 py-1.5 rounded shrink-0 ${activeTab === 'timer' ? 'bg-lime-400 text-black font-black' : 'text-zinc-400'}`}
        >
          ⏱️ Taymer
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 rounded shrink-0 ${activeTab === 'calculator' ? 'bg-lime-400 text-black font-black' : 'text-zinc-400'}`}
        >
          📊 BMI
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-3 py-1.5 rounded shrink-0 ${activeTab === 'quiz' ? 'bg-lime-400 text-black font-black' : 'text-zinc-400'}`}
        >
          🎯 Test
        </button>
      </div>
    </header>
  );
};
