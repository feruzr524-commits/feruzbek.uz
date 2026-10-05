import React, { useState } from 'react';
import { HeartPulse, Droplet, Flame, Scale, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { SPORTS_DATA } from '../data/sportsData';

export const HealthCalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(175); // in cm
  const [weight, setWeight] = useState<number>(70); // in kg
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // moderate sport (3-5 times a week)

  // Calculations
  const heightInMeters = height / 100;
  const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));

  // BMI Category & Styling
  let bmiCategory = 'Ideal vazn';
  let bmiColor = 'text-emerald-400';
  let bmiBg = 'bg-emerald-500/10 border-emerald-500/30';
  let bmiAdvice = 'Ajoyib natija! Tanangiz mutanosib holatda. Sport bilan shug‘ullanib, formangizni saqlang.';
  let recommendedSport = 'football';

  if (bmi < 18.5) {
    bmiCategory = 'Vazn yetishmovchiligi';
    bmiColor = 'text-cyan-400';
    bmiBg = 'bg-cyan-500/10 border-cyan-500/30';
    bmiAdvice = 'Mushak massasini oshirish uchun oqsilga boy taomlar va Suzish yoki Basketbol kabi sportlar tavsiya etiladi.';
    recommendedSport = 'swimming';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'Ideal (Normal) Vazn';
    bmiColor = 'text-emerald-400';
    bmiBg = 'bg-emerald-500/10 border-emerald-500/30';
    bmiAdvice = 'Ajoyib forma! Barcha sport turlari, xususan Futbol, Taekvondo va Basketbol sizga juda mos.';
    recommendedSport = 'football';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Ortiqcha vazn';
    bmiColor = 'text-amber-400';
    bmiBg = 'bg-amber-500/10 border-amber-500/30';
    bmiAdvice = 'Bo‘g‘imlarga ortiqcha yuk tushmasligi uchun Suzish va kardio mashqlar eng yaxshi yechimdir.';
    recommendedSport = 'swimming';
  } else {
    bmiCategory = 'Yuqori vazn (Semizlik)';
    bmiColor = 'text-rose-400';
    bmiBg = 'bg-rose-500/10 border-rose-500/30';
    bmiAdvice = 'Suzish (suv bo‘g‘imlarni himoya qiladi) va piyoda yurishdan boshlash, shifokor bilan maslahatlashish zarur.';
    recommendedSport = 'swimming';
  }

  // Basal Metabolic Rate (Harris-Benedict equation)
  const bmr = gender === 'male'
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

  const dailyCalories = Math.round(bmr * activityLevel);
  const dailyWaterLiters = Number(((weight * 0.035) + (activityLevel > 1.4 ? 0.6 : 0.2)).toFixed(1));
  const waterGlasses = Math.round(dailyWaterLiters * 4); // 250ml per glass

  const matchingSportObj = SPORTS_DATA.find((s) => s.id === recommendedSport) || SPORTS_DATA[0];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-mono">
      {/* Title */}
      <div className="text-center sm:text-left mb-8 pb-4 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 fill-lime-400" />
            <span>Sog‘lomlik Ko‘rsatkichlari</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display uppercase italic tracking-tight">
            BMI & KALORIYA KALKULYATORI
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-1 uppercase">
            Bo‘y va vazningizni kiriting, shaxsiy kaloriya, suv normasi va sizga eng mos sport turini bilib oling!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Inputs */}
        <div className="lg:col-span-6 rounded-xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-black text-white flex items-center gap-2 font-display uppercase italic">
            <Scale className="w-5 h-5 text-lime-400" />
            Parametrlarni Kiriting
          </h3>

          {/* Gender */}
          <div>
            <label className="text-xs font-bold text-zinc-400 mb-2 block uppercase">Jinsingiz:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                  gender === 'male'
                    ? 'bg-lime-400 text-black border-lime-400 shadow-md font-black'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                Erkak 👨
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                  gender === 'female'
                    ? 'bg-lime-400 text-black border-lime-400 shadow-md font-black'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                Ayol 👩
              </button>
            </div>
          </div>

          {/* Height Slider */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1 uppercase">
              <span>Bo‘y:</span>
              <span className="text-lime-400 font-black text-sm">{height} SM</span>
            </div>
            <input
              type="range"
              min="120"
              max="220"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>120 sm</span>
              <span>170 sm</span>
              <span>220 sm</span>
            </div>
          </div>

          {/* Weight Slider */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1 uppercase">
              <span>Vazn:</span>
              <span className="text-lime-400 font-black text-sm">{weight} KG</span>
            </div>
            <input
              type="range"
              min="35"
              max="160"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>35 kg</span>
              <span>80 kg</span>
              <span>160 kg</span>
            </div>
          </div>

          {/* Age Slider */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1 uppercase">
              <span>Yosh:</span>
              <span className="text-white font-black text-sm">{age} YOSH</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-xs font-bold text-zinc-400 mb-2 block uppercase">Haftalik Sport Faolligi:</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:outline-none focus:border-lime-400 uppercase"
            >
              <option value="1.2">Kam harakat (Haftada 0-1 marta)</option>
              <option value="1.375">Yengil faollik (Haftada 1-3 marta sport)</option>
              <option value="1.55">O‘rtacha sport faolligi (Haftada 3-5 marta)</option>
              <option value="1.725">Yuqori faollik (Har kuni sport yoki og‘ir mehnat)</option>
            </select>
          </div>
        </div>

        {/* Right column: Results */}
        <div className="lg:col-span-6 space-y-4">
          {/* BMI Card */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tana Vazni Indeksi (BMI)</span>
              <span className="text-xs font-black px-3 py-1 rounded bg-zinc-950 text-lime-400 border border-zinc-800 uppercase">
                {bmiCategory}
              </span>
            </div>
            
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-6xl sm:text-7xl font-black text-white font-display italic tracking-tight">{bmi}</span>
              <span className="text-xs text-zinc-400 font-bold uppercase">kg/m²</span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mt-2">{bmiAdvice}</p>

            {/* Visual scale meter */}
            <div className="mt-4 pt-3 border-t border-zinc-800">
              <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden flex border border-zinc-800">
                <div className="w-[18.5%] bg-cyan-400" title="Kam vazn (<18.5)" />
                <div className="w-[25%] bg-lime-400" title="Normal (18.5 - 24.9)" />
                <div className="w-[20%] bg-amber-400" title="Ortiqcha vazn (25 - 29.9)" />
                <div className="w-[36.5%] bg-rose-400" title="Semizlik (>30)" />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1 uppercase">
                <span>Kam vazn</span>
                <span className="text-lime-400 font-bold">Ideal</span>
                <span>Ortiqcha</span>
                <span>Yuqori</span>
              </div>
            </div>
          </div>

          {/* Daily Calorie & Water row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Calories */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase">Kunlik Energiya</span>
                <Flame className="w-5 h-5 text-lime-400" />
              </div>
              <div className="my-1">
                <span className="text-4xl font-black text-white font-display italic">{dailyCalories}</span>
                <span className="text-xs text-zinc-400 ml-1 uppercase">kkal/kun</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">Vazningizni me’yorda saqlash uchun kerakli kaloriya miqdori.</p>
            </div>

            {/* Water intake */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase">Suv Normasi</span>
                <Droplet className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="my-1">
                <span className="text-4xl font-black text-cyan-300 font-display italic">{dailyWaterLiters}</span>
                <span className="text-xs text-zinc-400 ml-1 uppercase">litr ({waterGlasses} stakan)</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">Sport bilan shug‘ullanganda tanani suvsizlanishdan asraydi.</p>
            </div>
          </div>

          {/* Recommended Sport Card */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{matchingSportObj.emoji}</span>
              <div>
                <p className="text-[10px] text-lime-400 font-bold uppercase tracking-wider">Sizga eng mos sport:</p>
                <h4 className="text-base font-black uppercase italic text-white font-display">{matchingSportObj.uzbekName}</h4>
                <p className="text-xs text-zinc-400 line-clamp-1">{matchingSportObj.tagline}</p>
              </div>
            </div>

            <div className="shrink-0">
              <span className="px-3 py-1.5 rounded bg-lime-400 text-black text-xs font-black uppercase">
                Tavsiya
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
