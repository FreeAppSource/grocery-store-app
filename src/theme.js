import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#22A45D',         // Fresh Green
  primaryDark: '#198047',
  primaryLight: '#4CD984',
  primarySoft: '#E8F8EE',
  accentOrange: '#FF9800',
  accentAmber: '#FFB300',
  accentRed: '#E53935',
  dark: '#1E2022',
  darkText: '#1E2022',
  gray800: '#2D3139',
  gray600: '#545D69',
  gray500: '#77838F',
  gray400: '#9CA3AF',
  gray200: '#E7EAF3',
  gray100: '#F8F9FA',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const palettes = {
  light: {
    bg: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F3F5',
    card: '#FFFFFF',
    cardBorder: '#E7EAF3',
    text: '#1E2022',
    subText: '#77838F',
    inputBg: '#F1F3F5',
    divider: '#E7EAF3',
    chipBg: '#F1F3F5',
    chipActiveBg: '#22A45D',
    chipActiveText: '#FFFFFF',
  },
  dark: {
    bg: '#121418',
    surface: '#1A1D24',
    surfaceSubtle: '#242932',
    card: '#1A1D24',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#F8F9FA',
    subText: '#9CA3AF',
    inputBg: '#242932',
    divider: 'rgba(255, 255, 255, 0.12)',
    chipBg: '#242932',
    chipActiveBg: '#22A45D',
    chipActiveText: '#FFFFFF',
  },
};

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: palettes.light,
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? palettes.dark : palettes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
