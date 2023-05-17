import React, { useEffect,useContext } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import { UserContext } from './userContext';


const Header = () => {
  const { control, handleSubmit, formState: { errors }, } = useForm();
  let [filter, setFilter] = useState("");
  let { setUsuari, authToken, myAvatarUrl, setMyAvatarUrl, usuari } = useContext(UserContext);
  let [userImage, setUserImage] = useState("");
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  //setmyavatarurl
  const fetchAvatar = async () => {
    const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar`);
    const response = await data.json();
    console.log("fetchavatar: " + response.image_url)
    setMyAvatarUrl(response.image_url);
  };

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
        console.log(JSON.stringify(resposta))
        // setUsername(resposta.user.name);
        // setRoles(resposta.roles);
        setUsuari(resposta.user)
        // setUsuariId(resposta.user.id)
        // // console.log(usuari);
        setIsLoading(false)
      }
      else setError(resposta.message);
    } catch (e) {
      console.log(e.message);
      // alert("Catchch");
    };

  }
  useEffect(() => {
    getUser();
    fetchAvatar()
  }, []);
  const applyFilter = () => {
    setFilter(value)
  }
  useEffect(() => {
    console.log(filter)
  }, [filter]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('./blue-man-1.gif')} style={styles.logo} />


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
