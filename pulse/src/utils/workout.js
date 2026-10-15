/**
 * Workout suggestions based on gap length and gym occupancy.
 */

const WORKOUTS = {
  quick: [
    { title: 'Quick Full-Body Circuit', detail: 'Bodyweight squats, push-ups, planks — 3 rounds, 30 sec each.' },
    { title: 'Stretch & Mobility', detail: 'Dynamic stretches targeting hips, shoulders, and hamstrings.' },
  ],
  medium: [
    { title: 'Strength Circuit', detail: 'Dumbbell rows, goblet squats, bench press — 4 sets of 8–10 reps.' },
    { title: 'Cardio Intervals', detail: 'Treadmill or bike: 1 min hard / 1 min easy × 10.' },
  ],
  full: [
    { title: 'Full Workout', detail: 'Warm-up + 5 compound lifts + accessory core work.' },
    { title: 'Push-Pull-Legs Split', detail: 'Complete today\'s split day with full accessory circuit.' },
  ],
};

/**
 * Get a workout suggestion for a gap.
 * @param {number} length - gap length in minutes
 * @param {'low'|'medium'|'high'} occupancy
 * @returns {{title: string, detail: string}}
 */
export function suggestWorkout(length, occupancy) {
  let pool;
  if (length >= 60) pool = WORKOUTS.full;
  else if (length >= 30) pool = WORKOUTS.medium;
  else pool = WORKOUTS.quick;

  // If occupancy is high, suggest a lighter / less crowded alternative
  if (occupancy === 'high') {
    return {
      title: `${pool[0].title} (lighter option)`,
      detail: 'Gym is busy — try a lighter version: fewer rounds, longer rest, or stretching.',
    };
  }

  return pool[0];
}
