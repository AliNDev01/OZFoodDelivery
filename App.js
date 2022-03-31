import React from 'react';
import RootNavigation from './navigation';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  " @firebase/firestore: Firestore (8.2.2): Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds.",
]);

export default function App() {
  return <RootNavigation />;
}
