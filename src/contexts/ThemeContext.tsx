import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { useColorScheme, ColorSchemeName, Appearance } from 'react-native';
import { theme } from '../theme';
import { Theme, ThemeContextType } from '../theme/types';

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme,
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');

  // Update theme when system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    setIsDark(dark);
  }, []);

  // You can customize the theme based on the current mode here
  const currentTheme: Theme = {
    ...theme,
    colors: {
      ...theme.colors,
      // Override colors based on theme mode if needed
      background: isDark ? '#0F0F0F' : '#FFFFFF',
      text: isDark ? '#FFFFFF' : '#000000',
      card: isDark ? '#1C1C1C' : '#F5F5F5',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
