import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { intervalsOverlap } from '../utils/time';

const STORAGE_KEY = 'yorku.bookings';

/**
 * Manages gym slot bookings in localStorage.
 * Data stays in the browser only — never sent to a server.
 */
export default function useBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch {
        setBookings([]);
      }
    }
  }, []);

  const persist = useCallback((next) => {
    setBookings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  /**
   * Add a booking. Returns { ok, error, booking }.
   * Rejects if the booking overlaps an existing booking on the same day.
   */
  const addBooking = useCallback((bk) => {
    const dayBookings = bookings.filter((b) => b.day === bk.day);
    const overlap = dayBookings.find((b) =>
      intervalsOverlap(bk.start, bk.end, b.start, b.end)
    );
    if (overlap) {
      return {
        ok: false,
        error: `This slot overlaps with another booking on ${bk.day} (${overlap.start}–${overlap.end}).`,
      };
    }
    const newBooking = { ...bk, id: uuidv4(), createdAt: new Date().toISOString() };
    persist([...bookings, newBooking]);
    return { ok: true, booking: newBooking };
  }, [bookings, persist]);

  /** Cancel (remove) a booking by id. */
  const cancelBooking = useCallback((id) => {
    persist(bookings.filter((b) => b.id !== id));
  }, [bookings, persist]);

  /**
   * Count bookings in the last 7 days (including today).
   */
  const weeklyCount = useCallback(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return bookings.filter((b) => new Date(b.createdAt) >= sevenDaysAgo).length;
  }, [bookings]);

  /**
   * Check if the user has any booking in the last 7 days.
   */
  const hasRecentBooking = useCallback(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return bookings.some((b) => new Date(b.createdAt) >= sevenDaysAgo);
  }, [bookings]);

  return { bookings, addBooking, cancelBooking, weeklyCount, hasRecentBooking };
}
