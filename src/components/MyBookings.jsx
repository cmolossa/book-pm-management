import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { format12hr, formatDuration, DAYS } from '../utils/time';
import { OCCUPANCY_LABELS, OCCUPANCY_OFFPEAK } from '../utils/occupancy';
import { tokens } from '../theme';

const OCCUPANCY_COLORS = {
  low: tokens.success,
  medium: tokens.warning,
  high: tokens.error,
};

/**
 * My Bookings tab — lists booked slots with cancel option and a weekly counter.
 */
export default function MyBookings({ bookings }) {
  const [confirmId, setConfirmId] = useState(null);

  const sorted = useMemo(() => {
    return [...bookings.bookings]
      .sort((a, b) => {
        const dayDiff = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
        if (dayDiff !== 0) return dayDiff;
        return a.start.localeCompare(b.start);
      });
  }, [bookings.bookings]);

  const count = bookings.weeklyCount();

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', px: 2, py: 3, pb: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        My Bookings
      </Typography>

      {/* Weekly counter */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 0.75,
          borderRadius: 10,
          backgroundColor: tokens.redDim08,
          mb: 3,
        }}
      >
        <EventAvailableIcon sx={{ color: tokens.yorkRed, fontSize: 20 }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {count} {count === 1 ? 'booking' : 'bookings'} this week
        </Typography>
      </Box>

      {sorted.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            <EventBusyIcon sx={{ fontSize: 44, color: 'text.secondary', mb: 1 }} />
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
              No bookings yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use Smart Gap Finder to book your first workout slot.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {sorted.map((bk) => {
            const occupancyLabel = bk.occupancy === 'low' ? OCCUPANCY_OFFPEAK : OCCUPANCY_LABELS[bk.occupancy];
            const occupancyColor = OCCUPANCY_COLORS[bk.occupancy];
            const isConfirming = confirmId === bk.id;

            return (
              <Card key={bk.id} sx={{ borderLeft: `4px solid ${occupancyColor}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {bk.day}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format12hr(bk.start)} – {format12hr(bk.end)} ({formatDuration(bk.length)})
                      </Typography>
                    </Box>
                    <Chip
                      label={occupancyLabel}
                      size="small"
                      sx={{
                        backgroundColor: bk.occupancy === 'low' ? 'rgba(46,125,50,0.10)' : `${occupancyColor}1A`,
                        color: occupancyColor,
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <FitnessCenterIcon sx={{ color: tokens.yorkRed, fontSize: 20, mt: 0.25, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {bk.workoutTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {bk.workoutDetail}
                      </Typography>
                    </Box>
                  </Box>

                  {isConfirming ? (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="body2" color="error" sx={{ fontWeight: 600 }}>
                        Cancel this booking?
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => { bookings.cancelBooking(bk.id); setConfirmId(null); }}
                        id={`confirm-cancel-${bk.id}`}
                      >
                        Yes, cancel
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setConfirmId(null)}
                        id={`undo-cancel-${bk.id}`}
                      >
                        Keep it
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      size="small"
                      onClick={() => setConfirmId(bk.id)}
                      id={`cancel-booking-${bk.id}`}
                    >
                      Cancel booking
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
