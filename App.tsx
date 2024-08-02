
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigator/AppNavigator'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppNavigator/>
  )
}

export default App;