import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Wrapper component to provide navigation theming
function ThemedNavigation() {
  const { isDark } = useTheme();
  const navTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavThemeProvider value={navTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal',
            headerStyle: {
              backgroundColor: isDark ? '#1C1C1C' : '#FFFFFF',
            },
            headerTintColor: isDark ? '#FFFFFF' : '#000000',
          }} 
        />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedNavigation />
    </ThemeProvider>
  );
}
