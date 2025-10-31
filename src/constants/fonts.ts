import { Platform } from 'react-native';

// Font families used in the app
export const Fonts = {
  // System fonts
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
  
  // Custom fonts (if you want to add custom fonts later)
  // Example:
  // customBold: 'YourCustomFont-Bold',
  // customRegular: 'YourCustomFont-Regular',
  
  // Rounded font for specific UI elements
  rounded: Platform.select({
    ios: 'System', // Use SF Rounded on iOS
    android: 'sans-serif', // Use Roboto on Android
    default: 'System',
  }),
} as const;
