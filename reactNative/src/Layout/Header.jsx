import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import logo from '/home/jododi/ProyectoFinalM12/reactNative/src/logo.png';

const Header = () => {
  let [userImage, setUserImage] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/user/4", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET",

    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);

        setUserImage(resposta.img_profile)
        console.log("entra")
        setIsLoading(false)
        {
          isLoading ?
            <></>
            :
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
              <Image source={userImage} style={styles.userImage} />
            </View>
        }
      })

      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });
  }, []);

  return (
    <>
      {isLoading ?
        <><Text>cargando...</Text></>
        :
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Image source={userImage} style={styles.userImage} />
        </View>
      }
    </>


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
