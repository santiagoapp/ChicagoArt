import React, { useMemo, useState } from 'react';
import useArtworks from '../hooks/useArtworks';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';
import ArtworkList from '../components/ArtworkList';

interface CatalogScreenProps {
    searchText: string
}

const CatalogScreen = (props: CatalogScreenProps) => {
    const { searchText } = props
    const [next, setNext] = useState<number | undefined>();
    const { loading, artworks, pagination } = useArtworks(next, searchText);

    const handleNext = (nextPage?: number) => {
        setNext(nextPage);
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ArtworkList
                loading={loading}
                data={artworks}
                pagination={pagination}
                setNext={handleNext}
            />
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