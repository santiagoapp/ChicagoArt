import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from "../screens/Initial"

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default RootNavigator;