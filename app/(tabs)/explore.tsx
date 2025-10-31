import { StyleSheet, View } from 'react-native';
import PeopleScreen from '../../src/screens/PeopleScreen';

export default function PeopleTab() {
  return (
    <View style={styles.container}>
      <PeopleScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});
