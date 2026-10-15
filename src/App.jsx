import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import GapFinder from './components/GapFinder';
import MyBookings from './components/MyBookings';
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

  const timetable = useTimetable();
  const bookings = useBookings();

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
            hasRecentBooking={bookings.hasRecentBooking()}
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
    </Box>
  );
}
