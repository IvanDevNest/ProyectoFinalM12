import React, { useEffect,useContext } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView,Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import { UserContext } from './userContext';
import * as Location from 'expo-location';

const Header = () => {
  const { control, handleSubmit, formState: { errors }, } = useForm();
  let [filter, setFilter] = useState("");
  let { setUsuari, authToken, myAvatarUrl, setMyAvatarUrl, usuari,setAuthToken,latitudeUser, setLatitudeUser,longitudeUser, setLongitudeUser,coordsCargadas, setcoordsCargadas } = useContext(UserContext);
  let [userImage, setUserImage] = useState("");
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  //setmyavatarurl
  const fetchAvatar = async () => {
    const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar`);
    const response = await data.json();
    console.log("fetchMyAvatar: " + response.image_url)
    setMyAvatarUrl(response.image_url);
  };

  const sendLogout = async () => {
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "POST",
        body: JSON.stringify({})
      });
      const resposta = await data.json();
      console.log(resposta)
      if (resposta.success === true)
        setAuthToken("");
      else console.log("sendLogout: "+e.message);
    } catch(e) {
      console.log("Error"+e.message);
      alert("sendlogout catch: "+e.message);
    };
  }

  const getUser = async () => {
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        // console.log(JSON.stringify(resposta))
        setUsuari(resposta.user)
        setIsLoading(false)
      }
      else setError(resposta.message);
    } catch (e) {
      console.log(e.message);
      // alert("Catchch");
    };
  }

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLatitudeUser(coords.latitude);
        setLongitudeUser(coords.longitude);
        setcoordsCargadas(true)
      } else {
        console.log("No se puede acceder a la ubi")
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    getUser()
    getLocation();

  }, []);
  useEffect(() => {
    if(usuari){
      fetchAvatar()
    }
  }, [usuari]);

  const applyFilter = () => {
    setFilter(value)
  }
  useEffect(() => {
    console.log(filter)
  }, [filter]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
      <Button title='Logout' onPress={() => sendLogout()}></Button> 


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#eaf2ff',
    paddingTop: Constants.statusBarHeight + 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between'
  },
  logo: {
    width: 60,
    height: 60,
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
