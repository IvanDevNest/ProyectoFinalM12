import React, { useContext } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import RutaList from './RutaList';
import { UserContext } from './userContext';
import StyledText from './StyledText';
import Rutas from './Routes'
import FotosUser from './FotosUser';
import FotoUser from './FotoUser'
// import Routes from './Routes.js'
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const ShowMyUser = () => {

  let { usuari, setUsuari, authToken, setReload, reload } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(null);

  console.log("usuari: " + usuari)

  const navigation = useNavigation();

  function UserEdit(id) {
    navigation.navigate('UserEdit', { objectId: id,});
}
  const fetchAvatar = async () => {
    const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar`);
    const response = await data.json();
    console.log("fetchavatar: " + response.image_url)
    setAvatarUrl(response.image_url);
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <View>
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        {usuari.id_role == 4 ?
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.avatarVIP} source={{ uri: avatarUrl }}></Image>
            <Image source={require("./vip.png")} style={{ width: 30, height: 30, position: 'absolute' }}></Image>
          </View> :

          <Image style={styles.avatar} source={{ uri: avatarUrl }}></Image>}
          <Button title="Editar perfil" onPress={() => UserEdit(usuari.id)} />


        <Text>Nombre: {usuari.name}</Text>
        <Text>Apellido: {usuari.lastname}</Text>
        <Text>Segundo apellido: {usuari.second_surname}</Text>

      </View>
      <View style={{ alignItems: 'center' }}>
        <FotosUser />

      </View>
    </View>

  )
}


export default ShowMyUser
const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 2
  },
  avatarVIP: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'yellow',
    borderWidth: 2
  }
});