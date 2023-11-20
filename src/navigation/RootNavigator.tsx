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
  const [searchText, setSearchText] = React.useState('');

  const handleSearch = (search: string) => {
    if (search) {
      setSearchText(search);
    }
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Catalog">
        {props => <>
          <AnimatedHeader handleSearch={handleSearch} searchEnabled={true} {...props}><CatalogScreen searchText={searchText} /></AnimatedHeader>
          <FloatingActionMenu />
        </>
        }
      </Stack.Screen>
      <Stack.Screen name="Favorites">
        {props => <>
          <AnimatedHeader handleSearch={handleSearch} searchEnabled={false} {...props}><FavoritesScreen /></AnimatedHeader>
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