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


const ShowUser = () => {

  let { usuari, setUsuari, authToken } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [stars, setStars] = useState(3);
  console.log("estrellas :" + stars)

  const [error, setError] = useState("");
  const [reviewCreada, setReviewCreada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);

  const route = useRoute();
  const objectId = route.params.objectId;
  const authorRuta = route.params.authorRuta;

  let roundedNum = Math.round(average)

  const fetchAvatar = async () => {
    try {
      const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${authorRuta}/avatar`);
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("fetchavatar: " + resposta)
        setAvatarUrl(resposta.image_url);
      } else setError(resposta.message);
    } catch (e) {
      console.log("catch fetch Avatar: "+e.error);
    };
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
          review.author_review_id == usuari.id && review.reviewed_id == authorRuta.id ?
            setReviewCreada(true)
            :
            setReviewCreada(false)
        })
        resposta.data.map((review) => {
          review.reviewed_id == authorRuta.id ?
            setReviews(reviews => [...reviews, review.stars])
            :
            <></>
        })
        obtenerValoracionMedia()
        setIsLoading(false)
      }
      else setError(resposta.message);
    } catch (err) {
      console.log("catch getReviews: "+err.message);
      alert("Catchch");
    };
  }
  const obtenerValoracionMedia = useCallback(() => {
    console.log("reviews en obtenervaloracion: " + reviews);
    if (reviews.length > 0) {
      setAverage(reviews.reduce((acc, val) => acc + val, 0) / reviews.length);
    }
  }, [reviews]);

  const enviarReview = async (stars) => {
    const formData = new FormData();
    formData.append('stars', stars);
    formData.append('reviewed_id', authorRuta.id);
    formData.append('author_review_id', usuari.id);
    console.log("FormData review antes de enviar: "+JSON.stringify(formData))
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
      else setError(resposta.error);
    } catch (e) {
      console.log("catch enviar review: " + e.err);

    }
  };
  useEffect(() => {
    getReviews()
  }, [!reload]);
  useEffect(() => {
    fetchAvatar()
  }, []);
  useEffect(() => {
    obtenerValoracionMedia();
  }, [reviews]);

  return (
    <>
      {isLoading ?
        <></> :
        <View>
          <View style={{ alignItems: 'center', paddingVertical: 10 }}>
            {authorRuta.id_role == 4 ?
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.avatarVIP} source={{ uri: avatarUrl }}></Image>
                <Image source={require("./vip.png")} style={{ width: 30, height: 30, position: 'absolute' }}></Image>
              </View> :

              <Image style={styles.avatar} source={{ uri: avatarUrl }}></Image>}


            <Text>Nombre: {authorRuta.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text>Puntuacion media:</Text>
              <AverageStarsUsers rating={roundedNum} />
            </View>


           {reviewCreada ?
              <></> :
            <>
              <Text>Valora las rutas del usuario:</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                starSize={20}
                rating={stars}
                fullStarColor={"gold"}
                emptyStarColor='gray'
                selectedStar={rating => setStars(rating)}
              />
              <Button title="Enviar Review" onPress={() => enviarReview(stars)} />
              {error ? <Text>{error}</Text> : <></>}

            </>
             } 

            <Text>Apellido: {authorRuta.lastname}</Text>
            <Text>Segundo apellido: {authorRuta.second_surname}</Text>

          </View>
          <View style={{ alignItems: 'center' }}>
            <FotosUser />

          </View>
        </View>

      }
    </>
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
    borderColor: '#ffd700',
    borderWidth: 4


  }
});