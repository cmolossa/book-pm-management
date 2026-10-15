import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const TABS = [
  { label: 'Home', icon: HomeIcon, value: 0 },
  { label: 'Gap Finder', icon: ExploreIcon, value: 1 },
  { label: 'My Bookings', icon: EventAvailableIcon, value: 2 },
];

/**
 * Fixed bottom navigation with three tabs: Home, Smart Gap Finder, My Bookings.
 * Mobile-first — always shown as bottom nav, which is the primary navigation.
 */
export default function BottomNav({ view, onChange }) {
  return (
    <>
      <Box sx={{ height: 72 }} />
      <BottomNavigation
        value={view}
        onChange={(_, v) => onChange(v)}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <BottomNavigationAction
              key={tab.value}
              label={tab.label}
              icon={<Icon />}
              value={tab.value}
              id={`nav-${tab.label.toLowerCase().replace(/\s+/g, '-')}`}
            />
          );
        })}
      </BottomNavigation>
    </>
  );
}
