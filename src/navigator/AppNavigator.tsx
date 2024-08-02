import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import TaskScreen from '../screens/TaskScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Task" component={TaskScreen}  />
        </Stack.Navigator>
    </NavigationContainer>
    )
}
export default AppNavigator