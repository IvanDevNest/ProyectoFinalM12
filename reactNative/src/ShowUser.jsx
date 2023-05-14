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


const ShowUser = () => {

  let { usuari, setUsuari, authToken, setReload, reload } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [stars, setStars] = useState(3);

  const route = useRoute();
  const objectId = route.params.objectId;
  const authorRuta = route.params.authorRuta;

  console.log("usuari: " +usuari)
  console.log("estrellas :"+stars)
//   const getUserLooking = async () => {
//     try {
//         const data = await fetch("http://equip04.insjoaquimmir.cat/api/user/"+objectId, {
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 'Authorization': 'Bearer ' + authToken,
//             },
//             method: "GET",
//         });
//         const resposta = await data.json();
//         if (resposta.success === true) {
//             console.log("RESPOSTA GETUSER" + JSON.stringify(resposta))
//             // setUsuari(resposta.user)
//         }
//         else setError(resposta.message);
//     } catch (e) {
//         console.log(e.message);
//     };

// }
  const fetchAvatar = async () => {
    const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar`);
    const response = await data.json();
    console.log("fetchavatar: " + response.image_url)
    setAvatarUrl(response.image_url);
  };
 
  const enviarReview = async(stars) => {
    const formData=new FormData();
    formData.append('stars',stars);
    formData.append('reviewed_id',authorRuta.id);
    formData.append('author_review_id',usuari.id);
    try {
      const data = await fetch('http://equip04.insjoaquimmir.cat/api/reviews', {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authToken,
          },
          method: 'POST',
          body: formData,
      });
      const resposta = await data.json();
      console.log("resposta: " + JSON.stringify(resposta))

      if (resposta.success === true) {

          setReload(!reload)

      }
      else setError(resposta.message);
  } catch (e) {
      console.log(e.err);

  }
  };
  useEffect(() => {
    fetchAvatar();
  }, []);


  return (
    <View>
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        {authorRuta.id_role == 4 ?
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.avatarVIP} source={{ uri: avatarUrl }}></Image>
            <Image source={require("./vip.png")} style={{ width: 30, height: 30, position: 'absolute' }}></Image>
          </View> :

          <Image style={styles.avatar} source={{ uri: avatarUrl }}></Image>}


        <Text>Nombre: {authorRuta.name}</Text>
        <Rating
          type='custom'
          ratingCount={5}
          imageSize={30}
          showRating
          onFinishRating={rating=> setStars(rating)}
          tintColor='gray'
          ratingBackgroundColor='transparent'
        />
        <Button title="Enviar Review" onPress={()=> enviarReview(stars)}/>

        <Text>Apellido: {authorRuta.lastname}</Text>
        <Text>Segundo apellido: {authorRuta.second_surname}</Text>





      </View>
      <View style={{ alignItems: 'center' }}>
        <FotosUser />

      </View>
    </View>

  )
}


export default ShowUser
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
    borderColor:'#ffd700',
    borderWidth:4

    
  }
});