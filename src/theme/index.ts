import { DefaultTheme } from '@react-navigation/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF3FA7',
    accent: '#22D3EE',
    background: '#0F0F0F',
    card: '#1C1C1C',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#FF3FA7',
    glass: 'rgba(255, 255, 255, 0.08)',
    glassDark: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  textVariants: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    body: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    caption: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.6)',
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    glow: {
      shadowColor: '#22D3EE',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 5,
    },
  },
  gradients: {
    primary: ['#FF3FA7', '#FF6B6B'],
    accent: ['#22D3EE', '#0EA5E9'],
    background: ['#0F0F0F', '#1C1C1C'],
  },
} as const;

export type Theme = typeof theme;

declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
