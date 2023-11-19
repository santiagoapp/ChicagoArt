import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
interface AnimatedHeaderProps {
  children: React.JSX.Element
}

const AnimatedHeader = ({ children }: AnimatedHeaderProps) => {

  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const logo = require('../assets/images/logo.png')
  const translateHeader = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: translateHeader }] },
        ]}>
        <Animated.View
          style={[
            styles.headerLogo,
            { opacity: opacityTitle },
            ,
            { transform: [{ translateY: translateTitle }] },
          ]}>
          <Image style={styles.logo} source={logo} />
        </Animated.View>

        <View style={styles.stickyHeader}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <FeatherIcon name="chevron-left" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerSearch}>
            <View style={styles.headerSearchIcon}>
              <FeatherIcon color="#121A26" name="search" size={19} />
            </View>

            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Find art"
              placeholderTextColor="#778599"
              style={styles.headerSearchInput}
            />
          </View>
        </View>


      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={1}>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

export default AnimatedHeader;

const styles = StyleSheet.create({
  content: {
    paddingTop: 180,
  },
  headerContainer:{
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 180,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  stickyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: '100%',
  },
  logo:{
    objectFit:"contain",
    height: 90,
    width:"100%"
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});