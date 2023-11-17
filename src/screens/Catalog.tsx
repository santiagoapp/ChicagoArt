import React, { useState } from "react";
import useArtworks from "../hooks/useArtworks";
import { ActivityIndicator, Animated, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ArtWork } from "../hooks/types";
import { IIIF_URL } from "../utils/constants";

interface CatalogItemProps {
    item: ArtWork
}
const THUMBNAIL_WIDTH = 150
const THUMBNAIL_HEIGHT = 200

const CatalogItem = ({ item }: CatalogItemProps) => {
    const { id, title, place_of_origin, image_id, artist_display, description, price_display } = item;

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.imgContainerTitle}>
                {title}
            </Text>
            <View style={styles.contentContainer}>
                <Image style={styles.thumbnail} source={{ uri: IIIF_URL(image_id, String(THUMBNAIL_WIDTH)) }} />
                <View style={styles.rightContent}>
                    <Text style={styles.contentTitle}>Author</Text>
                    <Text style={styles.contentValue}>{artist_display}</Text>
                    <Text style={styles.contentTitle}>Origin</Text>
                    <Text style={styles.contentValue}>{place_of_origin}</Text>
                    {description ? <>
                        <Text style={styles.contentTitle}>Description</Text>
                        <Text numberOfLines={4} style={styles.contentValue}>{description}</Text>
                    </> : <></>}
                </View>
            </View>
        </View>
    )
}

const CatalogScreen = () => {
    const [next, setNext] = useState<string | undefined>()
    const { loading, artworks, pagination } = useArtworks(next);

    return <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.listContainer}>
            <FlatList
                keyExtractor={item => String(item.id)}
                onEndReached={() => setNext(pagination?.next_url)}
                data={artworks}
                renderItem={({ item }) => <CatalogItem item={item} />}
                style={styles.contentFlatlist}
            />
            {loading ? <ActivityIndicator size={'large'} /> : null}
        </View>
    </SafeAreaView>
}

const AnimatedScroll = () => {

    const scrollY = new Animated.Value(0)

    return <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
            [
                {
                    nativeEvent: { contentOffset: { y: scrollY } }
                }
            ],
            {
                useNativeDriver: true  // <- Native Driver used for animated events
            }
        )}
    >

    </Animated.ScrollView>
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#14539a"
    },
    listContainer: {
        marginHorizontal: 20,
        marginVertical: 60,
    },
    contentContainer: {
        backgroundColor: "white",
        height: 180,
        padding: 5,
        borderRadius: 10,
    },
    contentFlatlist: {
        paddingBottom: 100
    },
    rightContent: {
        left: THUMBNAIL_WIDTH,
        marginRight: THUMBNAIL_WIDTH,
        boxShadow: "rgba(0, 0, 0, 0.24) 0 3 8",
    },
    itemContainer: {
        rowGap: 50,
    },
    imgContainerTitle: {
        zIndex: 10,
        top: 35,
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    thumbnail: {
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        top: -10,
        position: "absolute",
        borderRadius: 10,
        objectFit: "cover",
    },
    contentTitle: {
        fontWeight: "bold",
        fontSize: 12,
        marginVertical: 5
    },
    contentValue: {
        fontSize: 10,
        color: "grey"
    }
});

export default CatalogScreen;