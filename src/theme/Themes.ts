// Color Constants
const white   = '#ffffff';
const grey900 = '#eeeeee';
const grey800 = '#d2d2d2';
const grey400 = '#444444';
const grey300 = '#333333';
const grey200 = '#222222';
const black   = '#000000';

const blue800 = '#66aaff';

// Types
export enum Themes {
  lightTheme = 'light-theme',
  darkTheme = 'dark-theme',
}

export interface ThemeShape {
  color: {
    accentPrimary: string;
    fontPrimary: string;
    fontSecondary: string;
    bg: string;
    fg: string;
    ui: string;
    focus: string;
  }
  themes: {
    [Themes.lightTheme]: string,
    [Themes.darkTheme]: string,
  }
}

// Themes
const themes = {
  [Themes.lightTheme]: white,
  [Themes.darkTheme]: grey300,
}

export const lightTheme: ThemeShape = {
  color: {
    accentPrimary: '#',
    fontPrimary: grey300,
    fontSecondary: '#',
    bg: grey800,
    fg: white,
    ui: grey900,
    focus: blue800
  },
  themes
}

export const darkTheme: ThemeShape = {
  color: {
    accentPrimary: '#',
    fontPrimary: white,
    fontSecondary: '#',
    bg: grey200,
    fg: grey400,
    ui: grey300,
    focus: blue800
  },
  themes
}

// Theme Utils
export const ThemeMap = {
  [Themes.lightTheme]: lightTheme,
  [Themes.darkTheme]: darkTheme,
}

export const saveThemeSelection = (theme: Themes) => {
  window.localStorage.setItem('theme', theme.toString())
}

export const loadThemeSelection = () => {
  return ThemeMap[window.localStorage.getItem('theme') as Themes] || lightTheme;
}
