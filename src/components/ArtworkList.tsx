import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "@react-navigation/native";
import { ArtWork, PaginationProps } from "../hooks/types";
import { IIIF_URL } from "../utils/constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { removeFavorite, setFavorite } from '../store/slicers/favorites';
import { Notifications } from "react-native-notifications";
import EmptyComponent from "./EmptyState";

const THUMBNAIL_WIDTH = 150;
const THUMBNAIL_HEIGHT = 200;

interface ItemProps {
    item: ArtWork;
}

const Item = ({ item }: ItemProps) => {
    const { artworks } = useSelector((state: RootState) => state.favorites);
    const navigation = useNavigation();
    const {
        id,
        title,
        place_of_origin,
        image_id,
        artist_display,
        description,
        api_link,
    } = item;

    const isFavorite = useMemo(
        () =>
            artworks?.map(favoriteArtwork => favoriteArtwork.id).includes(item.id),
        [artworks, item],
    );
    const dispatch = useDispatch();

    const handleAddToFavorites = () => {
        dispatch(setFavorite(item));
        Notifications.postLocalNotification({
            body: title,
            title: 'New Favorite was Added',
            sound: 'chime.aiff',
            silent: false,
            category: 'Favorites',
        });
    };

    const handleRemoveFromFavorites = () => {
        dispatch(removeFavorite(id));
    };


    const handleOnPress = () => {
        navigation.navigate('Artwork', { api_link });
    };

    return (
        <View style={styles.itemContainer} >
            <Text style={styles.imgContainerTitle}>{title}</Text>
            <TouchableOpacity onPress={handleOnPress}>
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.cardLikeWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    isFavorite ? handleRemoveFromFavorites() : handleAddToFavorites()
                                }}>
                                <View style={styles.cardLike}>
                                    <FontAwesome
                                        color={isFavorite ? '#ea266d' : '#222'}
                                        name="heart"
                                        solid={isFavorite}
                                        size={14}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: IIIF_URL(image_id, String(THUMBNAIL_WIDTH)) }}
                        />
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.contentTitle}>Author</Text>
                        <Text style={styles.contentValue}>{artist_display}</Text>
                        <Text style={styles.contentTitle}>Origin</Text>
                        <Text style={styles.contentValue}>{place_of_origin}</Text>
                        {description ? (
                            <>
                                <Text style={styles.contentTitle}>Description</Text>
                                <Text numberOfLines={4} style={styles.contentValue}>
                                    {description}
                                </Text>
                            </>
                        ) : (
                            <></>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};


interface ArtworkListProps {
    data: ArtWork[];
    loading?: boolean;
    pagination?: PaginationProps;
    setNext?: (next?: string) => void
}

const ArtworkList = (props: ArtworkListProps) => {

    const { data, loading, pagination, setNext } = props;


    const loadNextPage = () => setNext && setNext(pagination?.next_url)
    return (
        <View style={styles.listContainer}>
            {data.length > 0?
                <>
                    {data.map((item: ArtWork) => <Item key={String(item.id)} item={item} />)}
                    {loading ? <ActivityIndicator size={'large'} /> : null}
                    <View style={styles.btnContainer}>

                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => {
                                loadNextPage()
                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>See more</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </>
                : !loading && <EmptyComponent />
            }
        </View >
    )
}


const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listContainer: {
        marginHorizontal: 20,
        marginBottom: 50,
    },
    contentContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        height: 180,
        borderRadius: 10,
    },
    imageContainer: {
        position: "relative",
        padding: 5,
    },
    cardLike: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLikeWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 8,
    },
    contentFlatlist: {
        paddingBottom: 100,
    },
    rightContent: {
        left: THUMBNAIL_WIDTH + 6,
        marginRight: THUMBNAIL_WIDTH,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0 3 8',
    },
    itemContainer: {
        rowGap: 40,
    },
    imgContainerTitle: {
        zIndex: 10,
        top: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    thumbnail: {
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        top: -10,
        position: 'absolute',
        borderRadius: 10,
        objectFit: 'cover',
    },
    contentTitle: {
        fontWeight: 'bold',
        fontSize: 12,
        marginVertical: 5,
    },
    contentValue: {
        fontSize: 10,
        color: 'grey',
    },
    btnXS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    btnXSText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: '#0d57b2',
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
    },
});

export default ArtworkList;