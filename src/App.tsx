/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CarouselPoster } from './components/CarouselPoster';
import { SportDetailModal } from './components/SportDetailModal';
import { WorkoutTimer } from './components/WorkoutTimer';
import { HealthCalculator } from './components/HealthCalculator';
import { SportFinderQuiz } from './components/SportFinderQuiz';
import { DailyHabitTracker } from './components/DailyHabitTracker';
import { SportsNutritionTips } from './components/SportsNutritionTips';
import { Footer } from './components/Footer';
import { SportDetail } from './types';
import { SPORTS_DATA } from './data/sportsData';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedSportForModal, setSelectedSportForModal] = useState<SportDetail | null>(null);
  const [activeWorkoutSport, setActiveWorkoutSport] = useState<SportDetail>(SPORTS_DATA[0]);

  const handleSelectSport = (sport: SportDetail) => {
    setSelectedSportForModal(sport);
  };

  const handleStartWorkout = (sport: SportDetail) => {
    setActiveWorkoutSport(sport);
    setActiveTab('timer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col selection:bg-lime-400 selection:text-black font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickSport={(sportId) => {
          const s = SPORTS_DATA.find((item) => item.id === sportId);
          if (s) setSelectedSportForModal(s);
        }}
      />

      {/* Main Content Areas based on Active Tab */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Primary Poster Carousel */}
              <CarouselPoster
                onSelectSport={handleSelectSport}
                onStartWorkout={handleStartWorkout}
              />

              {/* Daily Habit Checklist */}
              <DailyHabitTracker />

              {/* Nutrition & Recovery Guide */}
              <SportsNutritionTips />
            </motion.div>
          )}

          {activeTab === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <WorkoutTimer initialSport={activeWorkoutSport} />
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <HealthCalculator />
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <SportFinderQuiz
                onSelectSport={handleSelectSport}
                onStartWorkout={handleStartWorkout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sport Deep Dive Modal */}
      <SportDetailModal
        sport={selectedSportForModal}
        onClose={() => setSelectedSportForModal(null)}
        onStartWorkout={handleStartWorkout}
      />

      {/* Footer */}
      <Footer
        onSelectSport={handleSelectSport}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
