import React from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('./blue-man-1.gif')} style={styles.logo} />
        <Text style={styles.title}></Text>

        <TextInput
          placeholder="Buscar"
          style={styles.searchInput}
          underlineColorAndroid="transparent"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#eaf2ff',
    paddingTop: Constants.statusBarHeight +10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Header;
