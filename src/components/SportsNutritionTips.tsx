import React from 'react';
import { NUTRITION_TIPS } from '../data/sportsData';
import { Zap, Sparkles, Droplet, ShieldAlert, Apple, Flame } from 'lucide-react';

export const SportsNutritionTips: React.FC = () => {
  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-lime-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-lime-400" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default: return <Apple className="w-5 h-5 text-lime-400" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-mono">
      {/* Title */}
      <div className="text-center sm:text-left mb-8 pb-4 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Apple className="w-3.5 h-3.5" />
            <span>Sportchilar Ratsioni & Salomatlik</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase italic tracking-tight">
            TO‘G‘RI OVQATLANISH QOIDALARI
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-1 uppercase">
            Mashg‘ulot samaradorligining 70% qismi to‘g‘ri ovqatlanish va sifatli dam olishga bog‘liqdir.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NUTRITION_TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-lime-400 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  {getTipIcon(tip.icon)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                  {tip.tag}
                </span>
              </div>
              <h4 className="text-sm font-black uppercase italic text-white mb-2">{tip.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{tip.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-1.5 text-[11px] text-lime-400 font-bold uppercase">
              <Flame className="w-3.5 h-3.5 text-lime-400" />
              <span>Muhim qoida</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
