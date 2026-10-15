/**
 * Mock gym occupancy data by hour (7 AM – 10 PM).
 * Busier 11:00–14:00 and 16:00–18:00.
 */

const OCCUPANCY = {
  7: 'low',
  8: 'low',
  9: 'medium',
  10: 'medium',
  11: 'high',
  12: 'high',
  13: 'high',
  14: 'medium',
  15: 'low',
  16: 'high',
  17: 'high',
  18: 'high',
  19: 'medium',
  20: 'medium',
  21: 'low',
};

/**
 * Get occupancy level for a given gap start time.
 * @param {string} start - "HH:MM"
 * @returns {'low'|'medium'|'high'}
 */
export function getOccupancy(start) {
  const hour = parseInt(start.split(':')[0], 10);
  return OCCUPANCY[hour] || 'low';
}

export const OCCUPANCY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const OCCUPANCY_OFFPEAK = 'Off-peak';
