import { User } from '@prisma/client';

interface CompatibilityResult {
  total: number;
  breakdown: {
    budget: number;
    schedule: number;
    cleanliness: number;
    studyHabits: number;
    lifestyle: number;
    interests: number;
    ecoValues: number;
  };
}

export function calculateCompatibility(user1: any, user2: any): CompatibilityResult {
  // Weights
  const weights = {
    budget: 0.20,
    schedule: 0.15,
    cleanliness: 0.15,
    studyHabits: 0.10,
    lifestyle: 0.15,
    interests: 0.15,
    ecoValues: 0.10,
  };

  // 1. Budget (Difference weight)
  const budgetDiff = Math.abs((user1.budget || 0) - (user2.budget || 0));
  const budgetScore = Math.max(0, 100 - budgetDiff / 2);

  // 2. Schedule (Exact match = 100)
  const scheduleScore = user1.sleepSchedule === user2.sleepSchedule ? 100 : 40;

  // 3. Cleanliness (Similarity)
  const cleanlinessScore = 100 - Math.abs((user1.cleanlinessLevel || 0) - (user2.cleanlinessLevel || 0)) * 20;

  // 4. Study Habits
  const studyScore = user1.studyHabits === user2.studyHabits ? 100 : 50;

  // 5. Lifestyle (Pets + Smoking)
  let lifestyleScore = 100;
  if (user1.smoker !== user2.smoker) lifestyleScore -= 30;
  if (user1.hasPets !== user2.hasPets) lifestyleScore -= 30;

  // 6. Interests (Jaccard similarity)
  const set1 = new Set(user1.interests || []);
  const set2 = new Set(user2.interests || []);
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const interestsScore = (intersection.size / Math.max(set1.size, set2.size, 1)) * 100;

  // 7. Eco Values
  const ecoScore = 100 - Math.abs((user1.ecoScore || 0) - (user2.ecoScore || 0));

  const total =
    (budgetScore * weights.budget) +
    (scheduleScore * weights.schedule) +
    (cleanlinessScore * weights.cleanliness) +
    (studyScore * weights.studyHabits) +
    (lifestyleScore * weights.lifestyle) +
    (interestsScore * weights.interests) +
    (ecoScore * weights.ecoValues);

  return {
    total: Math.round(total),
    breakdown: {
      budget: Math.round(budgetScore),
      schedule: Math.round(scheduleScore),
      cleanliness: Math.round(cleanlinessScore),
      studyHabits: Math.round(studyScore),
      lifestyle: Math.round(lifestyleScore),
      interests: Math.round(interestsScore),
      ecoValues: Math.round(ecoScore),
    }
  };
}
