import React, { useState, useContext, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants'
import { UserContext } from '../userContext';
// import logo from 'reactNative/src/logo.png';

const Header = () => {
  let [userImage, setUserImage] = useState("");
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);




  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      {isLoading ?
        <><Text>cargando...</Text></>
        :
        <View style={styles.container}>
          {/* <Image source={logo} style={styles.logo} /> */}
          <Image source={userImage} style={styles.userImage} />
        </View>
      }
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: '#ebebeb',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 300,
    position: 'fixed',
    top: 0,
    left: 0


  },
  logo: {
    width: 40,
    height: 40,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
