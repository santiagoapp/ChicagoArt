import React, { useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { ArtWork } from '../hooks/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import useArtwork from '../hooks/useArtwork';
import { removeFavorite, setFavorite } from '../store/slicers/favorites';
import { Notifications } from 'react-native-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { IIIF_URL } from '../utils/constants';
import { RootState } from '../store';

const SECTION_TOP_OFFSET = 320;
const SECTION_BORDER_RADIUS = 40;
const IMAGE_WIDTH = 500;

interface RouteParamsProps {
  api_link: string;
}

const Artwork = () => {
  const route = useRoute();
  const params = route.params as RouteParamsProps;
  const api_link = params.api_link;
  const { artwork, loading } = useArtwork(api_link);
  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : artwork ? (
    <ArtworkDetails {...artwork} />
  ) : (
    <Text>{`Error fetching artwork ${api_link}`}</Text>
  );
};

const ArtworkDetails = (artwork: ArtWork) => {
  const {
    title,
    description,
    price_display,
    image_id,
    artwork_type_title,
    date_display,
    fiscal_year,
    place_of_origin,
    department_title,
    medium_display
  } = artwork;

  const textFields = [
    { name: "Category", value: artwork_type_title },
    { name: "Price", value: price_display },
    { name: "Date", value: fiscal_year },
    { name: "Origin", value: place_of_origin },
    { name: "Departament", value: department_title },
    { name: "Material", value: medium_display },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { artworks } = useSelector((state: RootState) => state.favorites);
  const animatedBackgroundScale = scrollY.interpolate({
    inputRange: [
      -SECTION_TOP_OFFSET - 100,
      -SECTION_TOP_OFFSET,
      0,
      SECTION_TOP_OFFSET,
      SECTION_TOP_OFFSET + 50,
      SECTION_TOP_OFFSET + 100,
    ],
    outputRange: [1.5, 1.25, 1.1, 1, 0, 0],
  });
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
      artworks?.map((favoriteArtwork) => favoriteArtwork.id).includes(artwork.id),
    [artworks, artwork],
  );

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Animated.View
        style={{
          transform: [
            {
              scaleX: animatedBackgroundScale,
            },
            {
              scaleY: animatedBackgroundScale,
            },
          ],
        }}>
        <Image
          style={styles.backdrop}
          resizeMode="cover"
          source={{ uri: IIIF_URL(image_id, String(IMAGE_WIDTH)) }}
        />
      </Animated.View>
      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={1}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                isFavorite ? handleRemoveFromFavorites() : handleAddToFavorites()
              }}>

              <View style={styles.headerBadge}>
                <FontAwesome
                  color={isFavorite ? '#ea266d' : '#fff'}
                  name="heart"
                  solid={true}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>
            {description}
          </Text>

          <View style={styles.stats}>
            <View style={styles.statsItem}>
              <MaterialIcons name="date-range" color="#185aca" size={16} />
              <Text style={styles.statsItemText}>{date_display}</Text>
            </View>
            <View style={styles.statsItem}>
              <MaterialIcons name="category" color="#185aca" size={16} />
              <Text style={styles.statsItemText}>{artwork_type_title}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lessonsOverlay}>
          <View style={styles.lessons}>
            <Text style={styles.lessonsTitle}>More information</Text>

            {textFields.map(({ name, value }, index) => (
              String(value) !== "" && <View key={index} style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>{name}</Text>
                  <Text style={styles.cardDuration}>{value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 2,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 400,
  },
  content: {
    flex: 1,
    marginTop: SECTION_TOP_OFFSET,
    backgroundColor: '#d3e0fe',
    borderTopLeftRadius: SECTION_BORDER_RADIUS,
    borderTopRightRadius: SECTION_BORDER_RADIUS,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c2c2c',
    maxWidth:"80%"
  },
  headerBadge: {
    backgroundColor: '#0066ff',
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '500',
    color: '#3c3c3c',
    lineHeight: 24,
  },
  stats: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statsItemText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#185aca',
  },
  lessonsOverlay: {
    backgroundColor: '#d3e0fe',
  },
  lessons: {
    backgroundColor: 'white',
    borderTopLeftRadius: SECTION_BORDER_RADIUS,
    borderTopRightRadius: SECTION_BORDER_RADIUS,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  lessonsTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: 12,
  },
  card: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#185aca',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94b1f0',
  },
  cardAction: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a4c2f5',
  },
});

export default Artwork;