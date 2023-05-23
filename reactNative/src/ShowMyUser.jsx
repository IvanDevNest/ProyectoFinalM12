import React, { useContext, useCallback } from 'react'
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

import StarRating from "react-native-star-rating";
import AverageStarsUsers from './AverageStarsUsers';
const ShowMyUser = () => {

  let { usuari, setUsuari, authToken, setReload, reload, myAvatarUrl, setMyAvatarUrl } = useContext(UserContext);
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [reviewCreada, setReviewCreada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("usuari: " + JSON.stringify(usuari))

  const navigation = useNavigation();
  let roundedNum = Math.round(average)

  function UserEdit(id) {
    navigation.navigate('UserEdit', { objectId: id, });
  }
  const getReviews = async () => {
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/reviews", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        // setReviews(resposta.data);
        console.log("resposta reviews: " + JSON.stringify(resposta.data))
        setReviews([])
        resposta.data.map((review) => {
          review.reviewed_id == usuari.id ?
            setReviews(reviews => [...reviews, review.stars])
            :
            <></>
        })
        obtenerValoracionMedia()
        setIsLoading(false)
      }
      else setError(resposta.message);
    } catch (err) {
      console.log("catch getReviews: " + err.message);
      alert("Catchch");
    };
  }
  const obtenerValoracionMedia = useCallback(() => {
    console.log("reviews en obtenervaloracion: " + reviews);
    if (reviews.length > 0) {
      setAverage(reviews.reduce((acc, val) => acc + val, 0) / reviews.length);
    }
  }, [reviews]);

  useEffect(() => {
    getReviews()
  }, [reload]);

  // useEffect(() => {
  //   if (reviews) {
  //     obtenerValoracionMedia();
  //   }
  // }, [reviews]);
  return (
    <View>
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        {userRole == "vip" ?
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.avatarVIP} source={{ uri: myAvatarUrl }}></Image>
            <Image source={require("./vip.png")} style={{ width: 30, height: 30, position: 'absolute' }}></Image>
          </View> :

          <Image style={styles.avatar} source={{ uri: myAvatarUrl }}></Image>}
        <Button title="Editar perfil" onPress={() => UserEdit(usuari.id)} />

        <Text>Nombre: {usuari.name} {usuari.lastname} {usuari.second_surname}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>Puntuacion media:</Text>
          <AverageStarsUsers rating={roundedNum} />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <FotosUser id={usuari.id} />
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
    borderWidth: 2,
    marginBottom: 5
  },
  avatarVIP: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'yellow',
    borderWidth: 2
  }
});