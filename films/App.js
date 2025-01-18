import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.reset}>
      <View style={styles.header}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reset: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: '#1A1A1D'
  },
  header: {
    backgroundColor: 'red'
  }
});
