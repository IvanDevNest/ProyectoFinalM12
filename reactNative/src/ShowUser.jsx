import React, { useContext } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import RutaList from './RutaList';
import { UserContext } from './userContext';
import StyledText from './StyledText';
// import Routes from './Routes.js'


const ShowUser = () => {
    
    let { usuari, setUsuari, authToken, setReload, reload } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState(null);


    console.log(usuari)

    const fetchAvatar = async () => {
      const data = await fetch('http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar');
      const response = await data.json();
      console.log("fetchavatar: "+ response.image_url)
      setAvatarUrl(response.image_url);
    };
    useEffect(() => {
      fetchAvatar();
    
    }, []);




  return (
    <>
        <StyledText>{usuari.name}</StyledText>
        <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.avatar} source={{uri:avatarUrl}}></Image>
                        <Text>{usuari.name}</Text>
                        <Text>{usuari.id_role}</Text>

                    </View>
    </>
  )
}


export default ShowUser
const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});