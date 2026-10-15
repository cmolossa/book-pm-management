import { timeToMinutes, minutesToTime } from './time';

export const MIN_GAP_MINUTES = 20;

/** Default day bounds for gap detection: 7:00 AM to 10:00 PM. */
const DAY_START = '07:00';
const DAY_END = '22:00';

/**
 * Given a list of classes for a specific day, find all free gaps between them.
 * Gaps under MIN_GAP_MINUTES are ignored.
 *
 * @param {Array<{start: string, end: string}>} classes
 * @returns {Array<{start: string, end: string, length: number}>}
 */
export function findGaps(classes) {
  if (!classes || classes.length === 0) {
    const fullLen = timeToMinutes(DAY_END) - timeToMinutes(DAY_START);
    if (fullLen >= MIN_GAP_MINUTES) {
      return [{ start: DAY_START, end: DAY_END, length: fullLen }];
    }
    return [];
  }

  // Sort classes by start time
  const sorted = [...classes].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  const gaps = [];
  let cursor = timeToMinutes(DAY_START);

  for (const cls of sorted) {
    const clsStart = timeToMinutes(cls.start);
    const clsEnd = timeToMinutes(cls.end);
    if (clsStart > cursor && clsStart - cursor >= MIN_GAP_MINUTES) {
      gaps.push({
        start: minutesToTime(cursor),
        end: minutesToTime(clsStart),
        length: clsStart - cursor,
      });
    }
    cursor = Math.max(cursor, clsEnd);
  }

  // Final gap after last class to day end
  const dayEnd = timeToMinutes(DAY_END);
  if (dayEnd > cursor && dayEnd - cursor >= MIN_GAP_MINUTES) {
    gaps.push({
      start: minutesToTime(cursor),
      end: minutesToTime(dayEnd),
      length: dayEnd - cursor,
    });
  }

  return gaps;
}

/**
 * Check whether a proposed booking [start, end) overlaps any class.
 * Returns the first overlapping class, or null.
 *
 * @param {Array<{start: string, end: string, course: string}>} classes
 * @param {string} start
 * @param {string} end
 */
export function findClassOverlap(classes, start, end) {
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  return classes.find((cls) => {
    const cs = timeToMinutes(cls.start);
    const ce = timeToMinutes(cls.end);
    return s < ce && cs < e;
  }) || null;
}

/**
 * Check whether a proposed booking [start, end) overlaps an existing booking.
 *
 * @param {Array<{start: string, end: string}>} bookings
 * @param {string} start
 * @param {string} end
 */
export function findBookingOverlap(bookings, start, end) {
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  return bookings.find((bk) => {
    const bs = timeToMinutes(bk.start);
    const be = timeToMinutes(bk.end);
    return s < be && bs < e;
  }) || null;
}
