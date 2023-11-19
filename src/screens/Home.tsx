import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        source={{
          uri: 'https://artic-web.imgix.net/354c4c93-30ea-4794-81c6-966a303421bc/5283-031_SBD_image11Canova-Web72ppi%2C2000px%2CsRGB%2CJPEG.jpg?rect=0%2C0%2C2000%2C1500&auto=format%2Ccompress&q=80&fit=crop&crop=faces%2Ccenter&w=1600&h=1200',
        }}
        resizeMode="cover"
      />
      <View style={[styles.background, styles.overflow]} />
      <View style={styles.content}>
        <Text style={styles.title}>Chicago,{'\n'}Gallery art</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Catalog' as never)
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d1b',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overflow: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    marginTop: 'auto',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#a1377f',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    minWidth: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
