import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type TextVariant = 'default' | 'title' | 'subtitle' | 'link' | 'defaultSemiBold';

type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TextVariant;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { theme, isDark } = useTheme();
  
  const textStyles: Record<TextVariant, StyleProp<TextStyle>> = {
    default: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
    },
    defaultSemiBold: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
      fontWeight: '600',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 32,
      color: theme.colors.text,
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      lineHeight: 28,
      color: theme.colors.text,
      marginVertical: 4,
    },
    link: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.primary,
      textDecorationLine: 'underline' as const,
    },
  };

  const textStyle = [
    textStyles[type],
    style,
    {
      color: isDark ? (darkColor || theme.colors.text) : (lightColor || theme.colors.text),
    },
  ];

  return <Text style={textStyle} {...rest} />;
}
