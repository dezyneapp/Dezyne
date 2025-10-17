import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import App from './App';

// Register the app for web
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  if (rootTag) {
    registerRootComponent(App);
  }
} else {
  registerRootComponent(App);
}
