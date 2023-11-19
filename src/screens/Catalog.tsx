import React, { useMemo, useState } from 'react';
import useArtworks from '../hooks/useArtworks';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import ArtworkList from '../components/ArtworkList';

const CatalogScreen = () => {
    const [next, setNext] = useState<string | undefined>();
    const { loading, artworks, pagination } = useArtworks(next);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ArtworkList loading={loading} data={artworks} pagination={pagination} setNext={setNext} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        width: '100%',
        height: '100%',
    },
});

export default CatalogScreen;