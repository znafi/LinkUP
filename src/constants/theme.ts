export const Colors = {
  light: {
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    border: '#E5E5E5',
    notification: '#FF3B30',
    accent: '#34C759',
    glass: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    primary: '#FF3FA7', // Magenta - primary neon color
    background: '#0F0F0F', // Deep black
    card: '#1C1C1C', // Dark card
    text: '#FFFFFF',
    border: '#333333',
    notification: '#FF453A',
    accent: '#22D3EE', // Cyan - accent neon color
    glass: 'rgba(28, 28, 28, 0.7)',
    glassDark: 'rgba(0, 0, 0, 0.9)',
    neonMagenta: '#FF3FA7',
    neonCyan: '#22D3EE',
    darkPurple: '#1a0a2e',
    darkNavy: '#16213e',
  },
} as const;

export type ColorName = keyof typeof Colors.light;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
} as const;
