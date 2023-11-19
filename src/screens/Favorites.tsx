import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {resetFavorites} from '../store/slicers/favorites';
import ArtworkList from '../components/ArtworkList';


const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const {artworks} = useSelector((state: RootState) => state.favorites);
  const showClearButton = useMemo(() => !!artworks.length, [artworks]);

  const handleCleanFavorites = () => {
    dispatch(resetFavorites());
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {showClearButton ? (
        <TouchableOpacity
          style={styles.cleanFavorites}
          onPress={handleCleanFavorites}>
          <Text style={styles.favoriteButtonText}>{'Clear Favorites'}</Text>
        </TouchableOpacity>
      ) : null}
      <ArtworkList data={artworks} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  favoriteButtonText: {textAlign: 'center'},
  cleanFavorites: {
    width: '35%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
});

export default FavoritesScreen;