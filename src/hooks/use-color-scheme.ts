import { useColorScheme as _useColorScheme } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

// This hook is a simple wrapper around the built-in useColorScheme hook
// that can be extended later with additional functionality

export function useColorScheme() {
  // Get the system color scheme
  const systemColorScheme = _useColorScheme();
  const { isDark } = useTheme();
  
  // Return the theme based on the system color scheme and any user preference
  return {
    colorScheme: isDark ? 'dark' : 'light',
    isDarkMode: isDark,
    isLightMode: !isDark,
  };
}

// This is a type-only export to ensure type safety
export type ColorSchemeName = 'light' | 'dark';

export default useColorScheme;
