import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "@react-navigation/native";
import { ArtWork, PaginationProps } from "../hooks/types";
import { IIIF_URL } from "../utils/constants";

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
        price_display,
        api_link,
    } = item;

    const isFavorite = useMemo(
        () =>
            artworks?.map(favoriteArtwork => favoriteArtwork.id).includes(item.id),
        [artworks, item],
    );

    const handleOnPress = () => {
        navigation.navigate('Artwork', { api_link });
    };

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.imgContainerTitle}>{title}</Text>
            <TouchableOpacity onPress={handleOnPress}>
                <View style={styles.contentContainer}>
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: IIIF_URL(image_id, String(THUMBNAIL_WIDTH)) }}
                    />
                    <View style={styles.rightContent}>
                        {isFavorite ? (
                            <View style={styles.favoriteBadge}>
                                <Text style={styles.favoriteText}>{'Favorite'}</Text>
                            </View>
                        ) : null}
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


const EmptyComponent = () => (
    <Text style={styles.emptyComponent}>{'No elements'}</Text>
);


interface ArtworkListProps {
    data: ArtWork[];
    loading?: boolean;
    pagination?: PaginationProps;
    setNext?: (next?: string) => void
}

const ArtworkList = (props: ArtworkListProps) => {

    const { data, loading, pagination, setNext } = props;

    return (
        <View style={styles.listContainer}>
            <FlatList
                keyExtractor={item => String(item.id)}
                onEndReached={() => setNext && setNext(pagination?.next_url)}
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                style={styles.contentFlatlist}
                ListEmptyComponent={EmptyComponent}
            />
            {loading ? <ActivityIndicator size={'large'} /> : null}
        </View>
    )
}


const styles = StyleSheet.create({
    listContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 50,
    },
    contentContainer: {
        backgroundColor: 'white',
        height: 180,
        padding: 5,
        borderRadius: 10,
    },
    contentFlatlist: {
        paddingBottom: 100,
    },
    rightContent: {
        left: THUMBNAIL_WIDTH,
        marginRight: THUMBNAIL_WIDTH,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0 3 8',
    },
    itemContainer: {
        rowGap: 50,
    },
    imgContainerTitle: {
        zIndex: 10,
        top: 35,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
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
    favoriteBadge: {
        width: 70,
        backgroundColor: 'gray',
        alignSelf: 'flex-end',
        borderRadius: 25,
    },
    favoriteText: { color: 'white', textAlign: 'center' },
    emptyComponent: {marginTop: 20, color: 'white', fontSize: 15},
});

export default ArtworkList;