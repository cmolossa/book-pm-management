import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { tokens } from '../theme';

const CIRCLE_SIZE = 72;
const DOT_SIZE = 8;

const confettiPositions = [
  { top: -4, left: 6, color: '#FFD600', size: 6 },
  { top: 2, left: -8, color: '#FF6B6B', size: 7 },
  { top: -10, left: 52, color: '#4ECDC4', size: 5 },
  { top: 8, left: 68, color: '#FFD600', size: 8 },
  { top: 54, left: -6, color: '#4ECDC4', size: 6 },
  { top: 60, left: 70, color: '#FF6B6B', size: 5 },
];

/**
 * Cheerful "We miss you" pop-up dialog with fade + scale-in animation.
 * Shows when the user has no booking in the last 7 days.
 * Dismissed state is tracked per-session by the parent.
 */
export default function WeMissYouDialog({ open, onClose, onSeeSlots }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      id="we-miss-you-dialog"
      BackdropProps={{
        sx: { backgroundColor: 'rgba(26,26,46,0.35)' },
      }}
      PaperProps={{
        sx: {
          maxWidth: 380,
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          overflow: 'visible',
          '@keyframes missyou-pop': {
            '0%': { opacity: 0, transform: 'scale(0.85)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
          animation: 'missyou-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        },
      }}
      TransitionProps={{
        timeout: { enter: 300, exit: 200 },
      }}
    >
      <DialogContent
        sx={{
          px: 3,
          py: 4,
          textAlign: 'center',
          overflow: 'visible',
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          aria-label="Close"
          id="miss-you-close-btn"
          sx={{ position: 'absolute', top: 12, right: 12, color: 'text.secondary' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Icon with confetti dots */}
        <Box
          sx={{
            position: 'relative',
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            mx: 'auto',
            mb: 2.5,
            mt: 1,
          }}
        >
          {/* Dots / sparkles around the circle */}
          {confettiPositions.map((dot, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: `${dot.top}px`,
                left: `${dot.left}px`,
                width: dot.size,
                height: dot.size,
                borderRadius: '50%',
                backgroundColor: dot.color,
                '@keyframes missyou-twinkle': {
                  '0%, 100%': { opacity: 0.4, transform: 'scale(0.8)' },
                  '50%': { opacity: 1, transform: 'scale(1.1)' },
                },
                animation: `missyou-twinkle 1.8s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}

          {/* Tinted circle with waving hand */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'rgba(227,24,55,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WavingHandIcon
              sx={{
                color: tokens.yorkRed,
                fontSize: 36,
                '@keyframes missyou-wave': {
                  '0%, 100%': { transform: 'rotate(-8deg)' },
                  '25%': { transform: 'rotate(12deg)' },
                  '50%': { transform: 'rotate(-8deg)' },
                  '75%': { transform: 'rotate(12deg)' },
                },
                animation: 'missyou-wave 1.5s ease-in-out infinite',
              }}
            />
          </Box>
        </Box>

        {/* Heading */}
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.3rem', mb: 1 }}>
          Hey, we miss you!{' '}
          <Box component="span" sx={{ verticalAlign: 'middle' }}>
            <AutoAwesomeIcon sx={{ fontSize: 18, color: '#FFD600' }} />
          </Box>
        </Typography>

        {/* Subtext */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '0.9rem', lineHeight: 1.5 }}>
          Your next workout is closer than you think. Check out the open slots between your classes.
        </Typography>

        {/* Primary CTA */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onSeeSlots}
          id="miss-you-see-slots-btn"
          sx={{
            minHeight: 52,
            fontSize: '1rem',
            borderRadius: '14px',
            mb: 1.5,
          }}
        >
          See available slots
        </Button>

        {/* "Maybe later" link */}
        <Button
          variant="text"
          onClick={onClose}
          id="miss-you-maybe-later"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            textTransform: 'none',
            minWidth: 'auto',
            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
          }}
        >
          Maybe later
        </Button>
      </DialogContent>
    </Dialog>
  );
}
