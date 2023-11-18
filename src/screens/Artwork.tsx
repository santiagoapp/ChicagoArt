import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useArtwork from '../hooks/useArtwork';
import {ArtWork} from '../hooks/types';
import {IIIF_URL} from '../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {removeFavorite, setFavorite} from '../store/slicers/favorites';
import {useRoute} from '@react-navigation/native';
import {Notifications} from 'react-native-notifications';

interface RouteParamsProps {
  api_link: string;
}
const IMAGE_WIDTH = 500;

const ArtworkDetails = (artwork: ArtWork) => {
  const dispatch = useDispatch();
  const {artworks} = useSelector((state: RootState) => state.favorites);

  const handleAddToFavorites = () => {
    dispatch(setFavorite(artwork));
    Notifications.postLocalNotification({
      body: artwork.title,
      title: 'New Favorite was Added',
      sound: 'chime.aiff',
      silent: false,
      category: 'Favorites',
    });
  };
  const handleRemoveFromFavorites = () => {
    dispatch(removeFavorite(artwork.id));
  };

  const isFavorite = useMemo(
    () =>
      artworks?.map(favoriteArtwork => favoriteArtwork.id).includes(artwork.id),
    [artworks, artwork],
  );

  const {
    title,
    description,
    price_display,
    image_id,
    artwork_type_title,
    date_start,
    date_end,
    date_display,
  } = artwork;
  const textFields = [
    title,
    description,
    price_display,
    image_id,
    artwork_type_title,
    title,
    description,
    price_display,
    image_id,
    artwork_type_title,
    date_start,
    date_end,
    date_display,
  ];

  return (
    <ScrollView style={styles.artworkDetails}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: IIIF_URL(image_id, String(IMAGE_WIDTH))}}
        />
      </View>
      {isFavorite ? (
        <TouchableOpacity
          style={[styles.favorite, styles.removeFavorite]}
          onPress={handleRemoveFromFavorites}>
          <Text style={styles.removeFavoriteText}>{'Remove Favorite'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.favorite}
          onPress={handleAddToFavorites}>
          <Text style={styles.favoriteText}>{'Add to Favorites'}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.description}>
        {textFields.map((field, index) => (
          <Text style={styles.text} key={index}>
            {field}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const Artwork = () => {
  const route = useRoute();
  const params = route.params as RouteParamsProps;
  const api_link = params.api_link;
  const {artwork, loading} = useArtwork(api_link);
  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : artwork ? (
    <ArtworkDetails {...artwork} />
  ) : (
    <Text>{`Error fetching artwork ${api_link}`}</Text>
  );
};

const styles = StyleSheet.create({
  artworkDetails: {
    width: '100%',
    height: '100%',
    backgroundColor: '#14539a',
  },
  imageContainer: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    marginVertical: 20,
    objectFit: 'contain',
  },
  description: {
    width: '100%',
    margin: 20,
  },
  text: {
    color: 'white',
    flexWrap: 'nowrap',
  },
  removeFavoriteText: {
    textAlign: 'center',
    color: 'white',
  },
  favoriteText: {
    textAlign: 'center',
  },
  favorite: {
    width: '35%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'center',
  },
  removeFavorite: {backgroundColor: 'gray'},
});

export default Artwork;