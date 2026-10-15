import React, { useState, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DownloadIcon from '@mui/icons-material/Download';
import { DAY_OPTIONS, format12hr, formatDuration } from '../utils/time';
import { findGaps, findClassOverlap, findBookingOverlap } from '../utils/gaps';
import { getOccupancy, OCCUPANCY_LABELS, OCCUPANCY_OFFPEAK } from '../utils/occupancy';
import { suggestWorkout } from '../utils/workout';
import { tokens } from '../theme';

const OCCUPANCY_COLORS = {
  low: tokens.success,
  medium: tokens.warning,
  high: tokens.error,
};

const EMPTY_CLASS = { day: 'Monday', start: '', end: '', course: '' };

/**
 * Smart Gap Finder tab — the core prototype feature.
 * Lets students add classes, see free gaps with occupancy and workout suggestions,
 * and book a slot with one tap.
 */
export default function GapFinder({ timetable, bookings, onBook }) {
  const [newClass, setNewClass] = useState(EMPTY_CLASS);
  const [addError, setAddError] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const dayClasses = useMemo(
    () => timetable.getClassesForDay(selectedDay),
    [timetable, selectedDay]
  );

  const gaps = useMemo(() => findGaps(dayClasses), [dayClasses]);

  const handleAddClass = useCallback(() => {
    setAddError('');
    if (!newClass.start || !newClass.end || !newClass.course.trim()) {
      setAddError('Please fill in day, start time, end time, and course name.');
      return;
    }
    if (newClass.start >= newClass.end) {
      setAddError('Start time must be before end time.');
      return;
    }
    const result = timetable.addClass(newClass);
    if (!result.ok) {
      setAddError(result.error);
      return;
    }
    setNewClass({ ...EMPTY_CLASS, day: newClass.day });
  }, [newClass, timetable]);

  const handleLoadSample = useCallback(() => {
    import('../data/sampleTimetable').then((mod) => {
      timetable.setAll(mod.default);
      setAddError('');
      setSnack({ open: true, message: 'Sample timetable loaded!', severity: 'success' });
    });
  }, [timetable]);

  const handleBook = useCallback((gap) => {
    // Guardrail: never book a slot that overlaps a class
    const classOverlap = findClassOverlap(dayClasses, gap.start, gap.end);
    if (classOverlap) {
      setSnack({
        open: true,
        message: `Cannot book — overlaps with "${classOverlap.course}".`,
        severity: 'error',
      });
      return;
    }

    // Guardrail: don't double-book
    const existingOnDay = bookings.bookings.filter((b) => b.day === selectedDay);
    const bookingOverlap = findBookingOverlap(existingOnDay, gap.start, gap.end);
    if (bookingOverlap) {
      setSnack({
        open: true,
        message: `You already have a booking at ${bookingOverlap.start}–${bookingOverlap.end} on ${selectedDay}.`,
        severity: 'error',
      });
      return;
    }

    const occupancy = getOccupancy(gap.start);
    const workout = suggestWorkout(gap.length, occupancy);

    const result = bookings.addBooking({
      day: selectedDay,
      start: gap.start,
      end: gap.end,
      length: gap.length,
      occupancy,
      workoutTitle: workout.title,
      workoutDetail: workout.detail,
    });

    if (!result.ok) {
      setSnack({ open: true, message: result.error, severity: 'error' });
      return;
    }

    setSnack({
      open: true,
      message: `Booked! ${format12hr(gap.start)}–${format12hr(gap.end)} on ${selectedDay}. See you at the gym!`,
      severity: 'success',
    });
  }, [dayClasses, bookings, selectedDay]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', px: 2, py: 3, pb: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Smart Gap Finder
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Add your classes, then find free time to work out.
      </Typography>

      {/* Timetable input */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Your Timetable
          </Typography>

          {/* Add class form */}
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Day</InputLabel>
              <Select
                value={newClass.day}
                label="Day"
                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                id="class-day-input"
              >
                {DAY_OPTIONS.map((d) => (
                  <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={1.5}>
              <TextField
                label="Start"
                type="time"
                size="small"
                fullWidth
                value={newClass.start}
                onChange={(e) => setNewClass({ ...newClass, start: e.target.value })}
                id="class-start-input"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End"
                type="time"
                size="small"
                fullWidth
                value={newClass.end}
                onChange={(e) => setNewClass({ ...newClass, end: e.target.value })}
                id="class-end-input"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              label="Course name"
              size="small"
              fullWidth
              value={newClass.course}
              onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
              id="class-course-input"
              placeholder="e.g. KINE 1000 — Anatomy"
            />
          </Stack>

          {addError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} id="add-class-error">
              {addError}
            </Alert>
          )}

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClass}
              id="add-class-btn"
              fullWidth
            >
              Add class
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleLoadSample}
              id="load-sample-btn"
              fullWidth
            >
              Load sample
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Day selector */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>View gaps for</InputLabel>
        <Select
          value={selectedDay}
          label="View gaps for"
          onChange={(e) => setSelectedDay(e.target.value)}
          id="day-selector"
        >
          {DAY_OPTIONS.map((d) => (
            <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Classes for the selected day */}
      {dayClasses.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Classes on {selectedDay}
          </Typography>
          <Stack spacing={1}>
            {dayClasses.map((cls) => (
              <Box
                key={cls.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: tokens.surfaceAlt,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {cls.course}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format12hr(cls.start)} – {format12hr(cls.end)}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => timetable.removeClass(cls.id)}
                  aria-label={`Remove ${cls.course}`}
                  id={`remove-class-${cls.id}`}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Gap results */}
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
        Free Gaps
      </Typography>

      {gaps.length === 0 ? (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <ScheduleIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No gaps of 20+ minutes found on {selectedDay}.
              {dayClasses.length === 0 ? ' Add your classes to get started.' : ' Try another day.'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2} sx={{ mb: 3 }}>
          {gaps.map((gap, i) => {
            const occupancy = getOccupancy(gap.start);
            const workout = suggestWorkout(gap.length, occupancy);
            const occupancyLabel = occupancy === 'low' ? OCCUPANCY_OFFPEAK : OCCUPANCY_LABELS[occupancy];
            const occupancyColor = OCCUPANCY_COLORS[occupancy];

            return (
              <Card key={i} sx={{ borderLeft: `4px solid ${occupancyColor}` }}>
                <CardContent>
                  {/* Time + length */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                        {format12hr(gap.start)} – {format12hr(gap.end)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDuration(gap.length)} free
                      </Typography>
                    </Box>
                    <Chip
                      label={occupancyLabel}
                      size="small"
                      sx={{
                        backgroundColor: occupancy === 'low' ? 'rgba(46,125,50,0.10)' : `${occupancyColor}1A`,
                        color: occupancyColor,
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Workout suggestion */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <FitnessCenterIcon sx={{ color: tokens.yorkRed, fontSize: 20, mt: 0.25, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {workout.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {workout.detail}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Book button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleBook(gap)}
                    id={`book-slot-${i}`}
                  >
                    Book this slot
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: 80 }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack({ ...snack, open: false })}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
