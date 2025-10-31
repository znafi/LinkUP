import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'person.circle.fill': 'account-circle',
  'map.fill': 'map',
  'magnifyingglass': 'search',
  'plus.circle.fill': 'add-circle',
  'ellipsis.circle': 'more-vert',
  'xmark': 'close',
  'checkmark': 'check',
  'chevron.down': 'keyboard-arrow-down',
  'chevron.up': 'keyboard-arrow-up',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  'gear': 'settings',
  'person.2.fill': 'people',
  'calendar': 'event',
  'clock': 'access-time',
  'location.fill': 'location-on',
  'info.circle': 'info',
  'square.and.arrow.up': 'share',
  'square.and.pencil': 'edit',
  'trash': 'delete',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'bubble.left': 'chat-bubble-outline',
  'paperplane': 'send',
  'bell.fill': 'notifications',
  'bell': 'notifications-none',
} as const;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: 'ultraLight' | 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy' | 'black';
}) {
  const materialIconName = MAPPING[name] || 'help-outline';
  
  return (
    <MaterialIcons
      name={materialIconName}
      size={size}
      color={color}
      style={style}
      weight={weight}
    />
  );
}

export default IconSymbol;
