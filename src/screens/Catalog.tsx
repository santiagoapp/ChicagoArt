import React from "react";
import useArtworks from "../hooks/useArtworks";
import { FlatList, ListRenderItemInfo, SafeAreaView, Text, View } from "react-native";
import { ArtWork } from "../hooks/types";

interface CatalogItemProps {
    item: ArtWork
}
const CatalogItem = ({item}:CatalogItemProps) => {
    const {id, title} = item;
    return <View>
        <Text>
            {title}
        </Text>
    </View>
}

const CatalogScreen = () => {
    const {loading, artworks, pagination} = useArtworks();
    return <SafeAreaView>
        <FlatList data={artworks} renderItem={({item}) => <CatalogItem item={item}/>}/>
    </SafeAreaView>
}

export default CatalogScreen;