import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from './themed-view';
import { useTheme } from '../contexts/ThemeContext';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const { isDark } = useTheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const backgroundColor = isDark ? headerBackgroundColor.dark : headerBackgroundColor.light;
  const contentBackgroundColor = isDark ? '#1C1C1C' : '#FFFFFF';

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor: contentBackgroundColor, flex: 1 }}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor,
            height: HEADER_HEIGHT,
          },
          headerAnimatedStyle,
        ]}
      >
        {headerImage}
      </Animated.View>
      <ThemedView style={styles.content}>
        {children}
      </ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  content: {
    marginTop: HEADER_HEIGHT,
    padding: 16,
    zIndex: 0,
  },
});
