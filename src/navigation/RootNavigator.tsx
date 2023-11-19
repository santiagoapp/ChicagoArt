import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import CatalogScreen from '../screens/Catalog';
import FavoritesScreen from '../screens/Favorites';
import ArtworkScreen from '../screens/Artwork';
import AnimatedHeader from '../components/AnimatedHeader';
import FloatingActionMenu from '../components/FloatingActionMenu';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: 'black' },
  headerTitleStyle: { color: 'white' },
};

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Catalog">
        {props => <>
          <AnimatedHeader searchEnabled={true} {...props}><CatalogScreen /></AnimatedHeader>
          <FloatingActionMenu />
        </>
        }
      </Stack.Screen>
      <Stack.Screen name="Favorites">
        {props => <>
          <AnimatedHeader searchEnabled={false} {...props}><FavoritesScreen /></AnimatedHeader>
          <FloatingActionMenu />
        </>
        }
      </Stack.Screen>
      <Stack.Screen
        name="Artwork"
        component={ArtworkScreen}
        options={headerOptions}
      />

    </Stack.Navigator>
  );
};

export default RootNavigator;