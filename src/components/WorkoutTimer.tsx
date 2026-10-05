import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SPORTS_DATA } from '../data/sportsData';
import { SportDetail } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, SkipForward, Flame, CheckCircle, Trophy, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkoutTimerProps {
  initialSport?: SportDetail;
}

type TimerPhase = 'idle' | 'warmup' | 'work' | 'rest' | 'finished';

export const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ initialSport }) => {
  const [selectedSport, setSelectedSport] = useState<SportDetail>(initialSport || SPORTS_DATA[0]);
  
  // Timer configurations
  const [workSeconds, setWorkSeconds] = useState<number>(45);
  const [restSeconds, setRestSeconds] = useState<number>(15);
  const [totalRounds, setTotalRounds] = useState<number>(6);
  
  // Timer active states
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [phase, setPhase] = useState<TimerPhase>('idle');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState<number>(0);

  // Audio Context for sound synthesization (beep, whistle, completion)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors if blocked
    }
  }, [soundEnabled]);

  const playWhistle = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      // High pitch double whistle
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }, [soundEnabled]);

  // Handle countdown sound cues
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 3 && timeLeft > 0) {
      playTone(440, 'sine', 0.15); // short low beep
    } else if (timeLeft === 0) {
      if (phase === 'work') {
        playTone(660, 'triangle', 0.3);
      } else if (phase === 'rest') {
        playWhistle();
      }
    }
  }, [timeLeft, isRunning, phase, playTone, playWhistle]);

  // Main timer tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && phase !== 'finished' && phase !== 'idle') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) {
            // increment calories during work phase
            if (phase === 'work') {
              setTotalCaloriesBurned((cal) => cal + (selectedSport.caloriesBurnedPerHour / 3600));
            }
            return prev - 1;
          }

          // Transition logic
          if (phase === 'warmup') {
            setPhase('work');
            return workSeconds;
          } else if (phase === 'work') {
            if (currentRound >= totalRounds) {
              setPhase('finished');
              setIsRunning(false);
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              return 0;
            } else {
              setPhase('rest');
              return restSeconds;
            }
          } else if (phase === 'rest') {
            setCurrentRound((r) => r + 1);
            setPhase('work');
            return workSeconds;
          }
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, phase, currentRound, totalRounds, workSeconds, restSeconds, selectedSport.caloriesBurnedPerHour]);

  const handleStart = () => {
    if (phase === 'idle' || phase === 'finished') {
      setCurrentRound(1);
      setPhase('warmup');
      setTimeLeft(5); // 5 sec warmup
      setTotalCaloriesBurned(0);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentRound(1);
    setTimeLeft(workSeconds);
    setTotalCaloriesBurned(0);
  };

  const handleSkip = () => {
    if (phase === 'work') {
      if (currentRound >= totalRounds) {
        setPhase('finished');
        setIsRunning(false);
      } else {
        setPhase('rest');
        setTimeLeft(restSeconds);
      }
    } else if (phase === 'rest' || phase === 'warmup') {
      if (phase === 'rest') setCurrentRound((r) => r + 1);
      setPhase('work');
      setTimeLeft(workSeconds);
    }
  };

  // Switch sport preset
  const handleSportPreset = (sport: SportDetail) => {
    setSelectedSport(sport);
    if (!isRunning) {
      if (sport.id === 'football') {
        setWorkSeconds(45);
        setRestSeconds(15);
        setTotalRounds(6);
        setTimeLeft(45);
      } else if (sport.id === 'basketball') {
        setWorkSeconds(40);
        setRestSeconds(20);
        setTotalRounds(5);
        setTimeLeft(40);
      } else if (sport.id === 'swimming') {
        setWorkSeconds(60);
        setRestSeconds(30);
        setTotalRounds(4);
        setTimeLeft(60);
      } else if (sport.id === 'taekwondo') {
        setWorkSeconds(30);
        setRestSeconds(10);
        setTotalRounds(8);
        setTimeLeft(30);
      }
    }
  };

  // Determine current active exercise from sport based on round
  const activeExerciseIndex = (currentRound - 1) % selectedSport.exercises.length;
  const currentExercise = selectedSport.exercises[activeExerciseIndex];

  // Progress percentage calculation
  const totalPhaseDuration = phase === 'warmup' ? 5 : phase === 'work' ? workSeconds : restSeconds;
  const progressPercent = phase === 'idle' || phase === 'finished' ? 100 : Math.round(((totalPhaseDuration - timeLeft) / totalPhaseDuration) * 100);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center sm:text-left mb-8 pb-4 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 font-mono">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 fill-lime-400" />
            <span>Interaktiv Mashg‘ulot Taymeri</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display uppercase italic tracking-tight">
            MASHG‘ULOT TAYMERI
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-1 uppercase">
            Ovozli signallar, raundlar nazorati va kaloriyalar hisobi bilan professional tarzda shug‘ullaning!
          </p>
        </div>

        <div className="hidden sm:block text-right">
          <span className="text-xs text-zinc-500 uppercase">Status</span>
          <p className="text-lime-400 font-bold uppercase">{phase.toUpperCase()}</p>
        </div>
      </div>

      {/* Sport Selector Pills */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-6 font-mono">
        {SPORTS_DATA.map((sport) => {
          const isSel = sport.id === selectedSport.id;
          return (
            <button
              key={sport.id}
              onClick={() => handleSportPreset(sport)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isSel
                  ? 'bg-lime-400 text-black border-lime-400 shadow-md scale-105'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span>{sport.emoji}</span>
              <span>{sport.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Timer Display Card */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden font-mono">
        {/* Background glow by phase */}
        <div
          className={`absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500 ${
            phase === 'work'
              ? 'bg-lime-400'
              : phase === 'rest'
              ? 'bg-amber-400'
              : phase === 'warmup'
              ? 'bg-cyan-400'
              : phase === 'finished'
              ? 'bg-lime-400'
              : 'bg-transparent'
          }`}
        />

        {/* Top bar inside timer */}
        <div className="flex items-center justify-between relative z-10 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedSport.emoji}</span>
            <div>
              <p className="text-xs font-bold text-lime-400 uppercase tracking-wider">{selectedSport.name} Dasturi</p>
              <p className="text-[11px] text-zinc-400 uppercase">Raund {currentRound} / {totalRounds}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-bold text-lime-400">
              <Flame className="w-4 h-4 text-lime-400" />
              <span>{Math.round(totalCaloriesBurned)} KKAL</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled
                  ? 'bg-lime-400 text-black border-lime-400 font-bold'
                  : 'bg-zinc-950 text-zinc-500 border-zinc-800'
              }`}
              title={soundEnabled ? 'Ovoz yoqilgan' : 'Ovoz o‘chirilgan'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Big Radial Timer Status */}
        <div className="flex flex-col items-center justify-center my-6 relative z-10">
          {/* Phase Badge */}
          <div className="mb-4">
            {phase === 'idle' && (
              <span className="px-4 py-1.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 text-xs font-black uppercase tracking-wider">
                Tayyorlaning
              </span>
            )}
            {phase === 'warmup' && (
              <span className="px-4 py-1.5 rounded bg-cyan-400 text-black text-xs font-black uppercase tracking-wider animate-pulse">
                🏃 Qizib Olish (5 soniya)
              </span>
            )}
            {phase === 'work' && (
              <span className="px-4 py-1.5 rounded bg-lime-400 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-lime-400/20">
                🔥 Mashqni bajaring!
              </span>
            )}
            {phase === 'rest' && (
              <span className="px-4 py-1.5 rounded bg-amber-400 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/20">
                ☕ Dam oling va nafasni rostlang
              </span>
            )}
            {phase === 'finished' && (
              <span className="px-4 py-1.5 rounded bg-lime-400 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-lime-400/20">
                🏆 Tabriklaymiz! Mashg‘ulot yakunlandi!
              </span>
            )}
          </div>

          {/* Time digits */}
          <div className="relative flex items-center justify-center">
            <div className="text-8xl sm:text-[130px] font-black italic text-white font-display tracking-tighter leading-none select-none">
              {phase === 'finished' ? (
                <span className="text-lime-400 flex items-center gap-2">
                  <Trophy className="w-20 h-20 sm:w-28 sm:h-28 text-lime-400" />
                </span>
              ) : (
                String(timeLeft).padStart(2, '0')
              )}
            </div>
            {phase !== 'finished' && (
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest absolute -bottom-5">SONIYA</span>
            )}
          </div>

          {/* Current Exercise Prompt */}
          <div className="mt-10 max-w-md w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center font-mono">
            <p className="text-[10px] font-bold text-lime-400 uppercase tracking-wider mb-1">
              Hozirgi Mashq:
            </p>
            <h4 className="text-base sm:text-lg font-black uppercase italic text-white">
              {currentExercise?.name || selectedSport.name}
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              {currentExercise?.description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-950 rounded-full h-2.5 mb-8 overflow-hidden relative z-10 border border-zinc-800">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              phase === 'work' ? 'bg-lime-400' : phase === 'rest' ? 'bg-amber-400' : 'bg-cyan-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 relative z-10 font-mono">
          <button
            onClick={handleReset}
            className="p-4 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all active:scale-95"
            title="Qayta boshlash"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {!isRunning ? (
            <button
              id="timer-start-btn"
              onClick={handleStart}
              className="px-8 sm:px-12 py-4 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-base flex items-center gap-2.5 shadow-xl shadow-lime-400/20 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>{phase === 'idle' ? 'Mashqni Boshlash' : 'Davom Ettirish'}</span>
            </button>
          ) : (
            <button
              id="timer-pause-btn"
              onClick={handlePause}
              className="px-8 sm:px-12 py-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider text-base flex items-center gap-2.5 shadow-xl shadow-amber-400/20 active:scale-95 transition-all"
            >
              <Pause className="w-5 h-5 fill-black" />
              <span>To‘xtatib Turish</span>
            </button>
          )}

          <button
            onClick={handleSkip}
            disabled={phase === 'idle' || phase === 'finished'}
            className="p-4 rounded-lg bg-zinc-950 hover:bg-zinc-800 disabled:opacity-30 text-zinc-400 hover:text-white border border-zinc-800 transition-all active:scale-95"
            title="Keyingi bosqichga o‘tish"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Custom interval sliders */}
        <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 text-xs font-mono">
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between text-zinc-400 mb-1 font-semibold uppercase">
              <span>Mashq vaqti:</span>
              <span className="text-lime-400 font-bold">{workSeconds}s</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={workSeconds}
              disabled={isRunning}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWorkSeconds(val);
                if (phase === 'idle') setTimeLeft(val);
              }}
              className="w-full accent-lime-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between text-zinc-400 mb-1 font-semibold uppercase">
              <span>Dam olish:</span>
              <span className="text-amber-400 font-bold">{restSeconds}s</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={restSeconds}
              disabled={isRunning}
              onChange={(e) => setRestSeconds(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded bg-zinc-950 border border-zinc-800">
            <div className="flex justify-between text-zinc-400 mb-1 font-semibold uppercase">
              <span>Raundlar soni:</span>
              <span className="text-white font-bold">{totalRounds} ta</span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="1"
              value={totalRounds}
              disabled={isRunning}
              onChange={(e) => setTotalRounds(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
