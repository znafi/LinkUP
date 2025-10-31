export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  accent: string;
  glass: string;
  glassDark: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeTextVariants {
  h1: {
    fontSize: number;
    fontWeight: string;
    color: string;
  };
  h2: {
    fontSize: number;
    fontWeight: string;
    color: string;
  };
  body: {
    fontSize: number;
    color: string;
  };
  caption: {
    fontSize: number;
    color: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  textVariants: ThemeTextVariants;
}

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}
