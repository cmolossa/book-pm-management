import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { intervalsOverlap } from '../utils/time';

const STORAGE_KEY = 'yorku.timetable';

/**
 * Manages timetable classes in localStorage.
 * Data stays in the browser only — never sent to a server.
 */
export default function useTimetable() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setClasses(JSON.parse(stored));
      } catch {
        setClasses([]);
      }
    }
  }, []);

  const persist = useCallback((next) => {
    setClasses(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  /**
   * Add a class. Returns { ok, error, class }.
   * Rejects if the new class overlaps an existing class on the same day.
   */
  const addClass = useCallback((cls) => {
    const dayClasses = classes.filter((c) => c.day === cls.day);
    const overlap = dayClasses.find((c) =>
      intervalsOverlap(cls.start, cls.end, c.start, c.end)
    );
    if (overlap) {
      return {
        ok: false,
        error: `"${cls.course}" overlaps with "${overlap.course}" (${overlap.start}–${overlap.end}) on ${cls.day}.`,
      };
    }
    const newClass = { ...cls, id: uuidv4() };
    persist([...classes, newClass]);
    return { ok: true, class: newClass };
  }, [classes, persist]);

  /** Remove a class by id. */
  const removeClass = useCallback((id) => {
    persist(classes.filter((c) => c.id !== id));
  }, [classes, persist]);

  /** Replace all classes (used by "Load sample timetable"). */
  const setAll = useCallback((next) => {
    persist(next.map((c) => ({ ...c, id: c.id || uuidv4() })));
  }, [persist]);

  /** Clear all classes. */
  const clearAll = useCallback(() => {
    persist([]);
  }, [persist]);

  /** Get classes for a specific day. */
  const getClassesForDay = useCallback((day) => {
    return classes
      .filter((c) => c.day === day)
      .sort((a, b) => {
        const [ah, am] = a.start.split(':').map(Number);
        const [bh, bm] = b.start.split(':').map(Number);
        return ah * 60 + am - (bh * 60 + bm);
      });
  }, [classes]);

  return { classes, addClass, removeClass, setAll, clearAll, getClassesForDay };
}
