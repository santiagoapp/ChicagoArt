import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogScreen from '../screens/Catalog';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Catalog" component={CatalogScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default RootNavigator;