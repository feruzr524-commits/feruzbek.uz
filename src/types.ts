export interface SportDetail {
  id: string;
  name: string;
  uzbekName: string;
  iconName: string;
  emoji: string;
  tagline: string;
  heroBadge: string;
  accentColor: string;
  secondaryColor: string;
  image: string;
  caloriesBurnedPerHour: number;
  difficulty: 'Boshlang‘ich' | 'O‘rtacha' | 'Yuqori';
  primaryMuscles: string[];
  keyBenefits: {
    title: string;
    description: string;
    stat: string;
  }[];
  exercises: {
    id: string;
    name: string;
    duration: string;
    reps: string;
    description: string;
    benefit: string;
  }[];
  equipment: string[];
  recommendedAge: string;
  heartRateZone: string;
  expertQuote: string;
  quoteAuthor: string;
  funFact: string;
  specs: {
    label: string;
    value: string;
    sub?: string;
  }[];
}

export interface HabitItem {
  id: string;
  title: string;
  category: 'sport' | 'water' | 'food' | 'rest';
  completed: boolean;
  target: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    emoji: string;
    trait: 'team' | 'speed' | 'endurance' | 'discipline';
    sportMatch: string;
  }[];
}
