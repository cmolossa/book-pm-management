import { createTheme } from '@mui/material/styles';
import brand from './brand';

const YORK_RED = brand.accent;
const YORK_RED_BRIGHT = brand.accentBright;
const YORK_RED_RGB = brand.accentRGB;

const BORDER_RED = `rgba(${YORK_RED_RGB},0.18)`;
const RED_DIM08 = `rgba(${YORK_RED_RGB},0.08)`;
const RED_DIM12 = `rgba(${YORK_RED_RGB},0.12)`;

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    primary: {
      main: YORK_RED,
      light: YORK_RED_BRIGHT,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A2E',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5C5C6F',
    },
    divider: 'rgba(0,0,0,0.08)',
    success: { main: '#2E7D32', light: '#4CAF50', contrastText: '#FFFFFF' },
    warning: { main: '#ED6C02', light: '#FF9800', contrastText: '#FFFFFF' },
    error: { main: '#D32F2F', contrastText: '#FFFFFF' },
    info: { main: '#0277BD', contrastText: '#FFFFFF' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.01em' },
    h2: { fontWeight: 700, fontSize: '1.6rem', letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.35rem' },
    h4: { fontWeight: 600, fontSize: '1.15rem' },
    h5: { fontWeight: 600, fontSize: '1rem' },
    h6: { fontWeight: 600, fontSize: '0.9rem' },
    subtitle1: { fontWeight: 500, fontSize: '0.95rem' },
    subtitle2: { fontWeight: 500, fontSize: '0.85rem', color: '#5C5C6F' },
    body1: { fontSize: '0.95rem', lineHeight: 1.5 },
    body2: { fontSize: '0.85rem', lineHeight: 1.5 },
    button: { fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none', fontSize: '0.9rem' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
          color: '#1A1A2E',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: `1px solid ${'rgba(0,0,0,0.08)'}`,
          borderRadius: 14,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          minHeight: 48,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(227,24,55,0.20)',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(227,24,55,0.30)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(227,24,55,0.35)',
            color: '#FFFFFF',
          },
        },
        outlined: {
          borderColor: BORDER_RED,
          '&:hover': {
            borderColor: YORK_RED,
            backgroundColor: RED_DIM08,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#5C5C6F',
          minWidth: 'auto',
          paddingTop: 8,
          paddingBottom: 8,
          '&.Mui-selected': {
            color: YORK_RED,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(0,0,0,0.12)',
            },
            '&:hover fieldset': {
              borderColor: YORK_RED,
            },
            '&.Mui-focused fieldset': {
              borderColor: YORK_RED,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1A2E',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: { zIndex: 2000 },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, fontWeight: 500 },
      },
    },
  },
});

export const tokens = {
  yorkRed: YORK_RED,
  yorkRedBright: YORK_RED_BRIGHT,
  borderRed: BORDER_RED,
  redDim08: RED_DIM08,
  redDim12: RED_DIM12,
  surface: '#FFFFFF',
  surfaceAlt: '#F8F8FA',
  textPrimary: '#1A1A2E',
  textSecondary: '#5C5C6F',
  success: '#2E7D32',
  warning: '#ED6C02',
  error: '#D32F2F',
  info: '#0277BD',
};

export default theme;
