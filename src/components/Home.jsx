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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { tokens } from '../theme';

const HERO_IMAGE = 'https://images.pexels.com/photos/7972535/pexels-photo-7972535.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900';

/**
 * Home tab — bold hero with photo, floating glass cards, Smart Gap Finder
 * intro card, and demo toggle. The "We miss you" pop-up is managed by App.jsx.
 */
export default function Home({ onOpenGapFinder, onOpenBookings, weeklyCount, simulateNoBooking, onToggleSimulate }) {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', pb: 1 }}>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '70vh',
          minHeight: 480,
          maxHeight: 640,
          overflow: 'hidden',
          borderBottomLeftRadius: { xs: 32, sm: 40 },
          borderBottomRightRadius: { xs: 32, sm: 40 },
        }}
      >
        {/* Background photo with subtle zoom */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '@keyframes hero-zoom': {
              '0%': { transform: 'scale(1.08)' },
              '100%': { transform: 'scale(1)' },
            },
            animation: 'hero-zoom 8s ease-out forwards',
          }}
        />

        {/* Diagonal York red gradient overlay — bottom-left to top-right */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(40deg, rgba(227,24,55,0.88) 0%, rgba(227,24,55,0.55) 35%, rgba(227,24,55,0.15) 65%, transparent 90%)`,
          }}
        />

        {/* Dark scrim for text contrast at top */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 30%)',
          }}
        />

        {/* Hero content */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            px: 3,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Headline */}
          <Box
            sx={{
              '@keyframes hero-fadeup': {
                '0%': { opacity: 0, transform: 'translateY(24px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
              animation: 'hero-fadeup 0.6s ease-out 0.3s both',
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                textShadow: '0 2px 12px rgba(0,0,0,0.25)',
              }}
            >
              Between classes.
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#E31837',
                px: 1.5,
                py: 0.25,
                borderRadius: '10px',
                mt: 0.5,
                border: '2px solid rgba(255,255,255,0.25)',
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: { xs: '2.4rem', sm: '3rem' },
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                Between reps.
              </Typography>
            </Box>
          </Box>

          {/* Subtitle */}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 500,
              mt: 2,
              mb: 2.5,
              '@keyframes hero-fadeup-2': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
              animation: 'hero-fadeup-2 0.6s ease-out 0.5s both',
            }}
          >
            Find your free gap. Check the crowd. Book in one tap.
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '@keyframes hero-fadeup-3': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
              animation: 'hero-fadeup-3 0.6s ease-out 0.7s both',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onOpenGapFinder}
              id="hero-find-gap-btn"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#E31837',
                fontWeight: 700,
                fontSize: '1.05rem',
                borderRadius: '16px',
                paddingInline: 3,
                minHeight: 54,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 6px 28px rgba(0,0,0,0.25)',
                },
                '@keyframes btn-pulse': {
                  '0%, 100%': { boxShadow: '0 4px 20px rgba(0,0,0,0.2), 0 0 0 0px rgba(255,255,255,0.4)' },
                  '50%': { boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 0 0 8px rgba(255,255,255,0)' },
                },
                animation: 'btn-pulse 2.5s ease-in-out 1s infinite',
              }}
            >
              Find my gap
            </Button>
            <Button
              variant="text"
              onClick={onOpenBookings}
              id="hero-bookings-link"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
              }}
            >
              My bookings
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ─── Floating glass cards ────────────────────────────── */}
      <Box
        sx={{
          px: 2,
          mt: -3,
          display: 'flex',
          gap: 1.5,
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
          '@keyframes cards-fadeup': {
            '0%': { opacity: 0, transform: 'translateY(28px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          animation: 'cards-fadeup 0.6s ease-out 0.9s both',
        }}
      >
        {[
          { label: 'Next gap', value: '10:30 to 12:30', sub: '120 min', icon: '⏱' },
          { label: 'Gym now', value: 'Low', sub: 'Off-peak', icon: '🟢' },
          { label: 'This week', value: `${weeklyCount || 3} booked`, sub: 'students moving', icon: '💪' },
        ].map((card, i) => (
          <Box
            key={card.label}
            sx={{
              flex: '1 1 0',
              minWidth: 110,
              borderRadius: '16px',
              px: 1.75,
              py: 1.5,
              backgroundColor: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(26,26,46,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {card.icon} {card.label}
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, mt: 0.25 }}>
              {card.value}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(26,26,46,0.55)' }}>
              {card.sub}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ─── Smart Gap Finder intro card ─────────────────────── */}
      <Box sx={{ px: 2, pt: 4 }}>
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
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2, mb: 2, px: 2 }}>
          Your timetable stays on your device. Nothing is shared with other students.
        </Typography>
      </Box>
    </Box>
  );
}
