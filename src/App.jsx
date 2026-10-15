import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import GapFinder from './components/GapFinder';
import MyBookings from './components/MyBookings';
import WeMissYouDialog from './components/WeMissYouDialog';
import useTimetable from './hooks/useTimetable';
import useBookings from './hooks/useBookings';

/**
 * York U Fitness — root app component.
 * Three-tab bottom navigation: Home, Smart Gap Finder, My Bookings.
 * All data persists in the browser via localStorage. No accounts, no server.
 */
export default function App() {
  const [view, setView] = useState(0); // 0=Home, 1=GapFinder, 2=Bookings
  const [simulateNoBooking, setSimulateNoBooking] = useState(false);
  const [missYouOpen, setMissYouOpen] = useState(false);
  const missYouDismissed = useRef(false);

  const timetable = useTimetable();
  const bookings = useBookings();

  const shouldShowMissYou = (!bookings.hasRecentBooking() || simulateNoBooking) && !missYouDismissed.current;

  // Auto-open the "We miss you" pop-up on app load when no recent booking.
  // Only fires once per session — dismissed state is tracked in a ref.
  useEffect(() => {
    if (shouldShowMissYou) {
      const timer = setTimeout(() => setMissYouOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const closeMissYou = () => {
    missYouDismissed.current = true;
    setMissYouOpen(false);
  };

  const seeSlotsFromMissYou = () => {
    missYouDismissed.current = true;
    setMissYouOpen(false);
    setView(1);
  };

  // If the demo toggle is turned on after initial load, show the pop-up again
  // (unless it was already dismissed this session).
  useEffect(() => {
    if (simulateNoBooking && !missYouDismissed.current && !missYouOpen) {
      setMissYouOpen(true);
    }
  }, [simulateNoBooking]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        {view === 0 && (
          <Home
            onOpenGapFinder={() => setView(1)}
            onOpenBookings={() => setView(2)}
            weeklyCount={bookings.weeklyCount()}
            simulateNoBooking={simulateNoBooking}
            onToggleSimulate={() => setSimulateNoBooking((v) => !v)}
          />
        )}
        {view === 1 && (
          <GapFinder
            timetable={timetable}
            bookings={bookings}
          />
        )}
        {view === 2 && (
          <MyBookings bookings={bookings} />
        )}
      </Box>

      <BottomNav view={view} onChange={setView} />

      <WeMissYouDialog
        open={missYouOpen}
        onClose={closeMissYou}
        onSeeSlots={seeSlotsFromMissYou}
      />
    </Box>
  );
}
