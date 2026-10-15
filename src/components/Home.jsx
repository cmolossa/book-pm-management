import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import ExploreIcon from '@mui/icons-material/Explore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { tokens } from '../theme';

/**
 * Home tab — welcome message, Smart Gap Finder intro card with launch button,
 * The "We miss you" pop-up is managed by App.jsx.
 */
export default function Home({ onOpenGapFinder, simulateNoBooking, onToggleSimulate }) {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', px: 2, py: 3, pb: 1 }}>
      {/* Welcome */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Find time to move between classes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to York U Fitness — your companion for fitting workouts into a busy commuter schedule.
      </Typography>

      {/* Smart Gap Finder intro card */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <ExploreIcon sx={{ color: tokens.yorkRed, fontSize: 24 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Smart Gap Finder
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your class timetable and we'll find free time slots between classes — with predicted gym
            occupancy and workout suggestions that fit your gap.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              icon={<ScheduleIcon />}
              label="Finds gaps 20 min+"
              size="small"
              variant="outlined"
              sx={{ borderColor: tokens.borderRed, color: tokens.textPrimary }}
            />
            <Chip
              icon={<FitnessCenterIcon />}
              label="Workout suggestions"
              size="small"
              variant="outlined"
              sx={{ borderColor: tokens.borderRed, color: tokens.textPrimary }}
            />
          </Stack>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ExploreIcon />}
            onClick={onOpenGapFinder}
            id="home-gap-finder-btn"
          >
            Open Smart Gap Finder
          </Button>
        </CardContent>
      </Card>

      {/* Demo toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 1 }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Demo: simulate "no recent booking"
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Toggles the "We miss you" pop-up for demo purposes.
          </Typography>
        </Box>
        <Switch
          checked={simulateNoBooking}
          onChange={onToggleSimulate}
          id="demo-no-booking-toggle"
          inputProps={{ 'aria-label': 'Simulate no recent booking' }}
        />
      </Box>

      {/* Privacy note */}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2, px: 2 }}>
        Your timetable stays on your device. Nothing is shared with other students.
      </Typography>
    </Box>
  );
}
