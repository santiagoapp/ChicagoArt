import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FloatingActionMenu = () => {
    const [isOpened, setIsOpened] = useState(true);
    const navigation = useNavigation();
    const options = [
        { caption: "Favorites", route: "Favorites" },
    ]
    const toggleMenu = () => setIsOpened(!isOpened)
    const goTo = (routeName:never) => navigation.navigate(routeName)

    return (
        <View style={styles.FABWrapper}>
            {isOpened && <View style={styles.FABMenu}>
                {options.map(item => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                goTo(item.route)
                            }}>
                            <View style={styles.FABitem}>

                                <Text style={styles.FABtext}>{item.caption}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>}
            <TouchableOpacity
                onPress={() => {
                    toggleMenu()
                }}>
                <View style={styles.FABIcon}>
                    {isOpened ? <FontAwesome
                        color={'#fff'}
                        name={"close"}
                        solid={true}
                        size={24}
                    /> : <FeatherIcon
                        color={'#fff'}
                        name={"menu"}
                        solid={true}
                        size={24}
                    />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    FABIcon: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        backgroundColor: '#f66',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 18,
    },
    FABWrapper: {
        position: 'absolute',
        zIndex: 1,
        bottom: 24,
        right: 24,
        // display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        // justifyContent:"flex-start",
        // gap:12,
    },
    FABMenu: {
        height: "auto",
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
    },
    FABList: {
        display: "flex",
        gap: 6,
    },
    FABitem: {
        backgroundColor: '#ececec',
        height: 42,
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 18,
        justifyContent: "center",
        shadowColor: "#000",
        width: "100%",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 21,
        marginTop: 8,
    },
    FABtext: {
        color: "#767676",
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default FloatingActionMenu;