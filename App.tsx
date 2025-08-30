import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './App.styles';
import { Home } from './src/screens/Home/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
};