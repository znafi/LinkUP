import { View, ViewProps } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const { theme } = useTheme();
  
  return (
    <View
      style={[
        { backgroundColor: theme.colors.background },
        style,
      ]}
      {...rest}
    />
  );
}
