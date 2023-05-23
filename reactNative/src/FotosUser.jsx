import { View, Text, Button, Image } from 'react-native';
import Rutas from './Routes'
import Fotos from './Fotos'
import FotoUser from './FotoUser'
import { FlatList, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './userContext';

const FotosUser = ({ id }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  const [error, setError] = useState([]);
  const [desplegable, setDesplegable] = useState(false);

  let { authToken, setAuthToken, setReload, reload, usuari } = useContext(UserContext);

  const getImagesPost = async () => {
    try {
      const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${id}/posts`);
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("imagesUser: " + JSON.stringify(resposta))
        setImages(resposta.image_urls);
      } else setError(resposta.message);
    } catch (e) {
      console.log("catch getImagesPost: " + e.message);
    };
  }

  const uploadFoto = async (image) => {
    const formData = new FormData();
    if (image) {
      console.log("imagen: " + JSON.stringify(image.assets[0]))
      const fileName = image.assets[0].uri.split("/").pop();
      console.log("imagen url: " + image.uri)
      console.log("nombre: " + fileName)

      formData.append('image', {
        uri: image.assets[0].uri,
        name: fileName,
        type: Platform === "ios" ? image.assets[0].uri.split(".").pop() : "image/" + image.assets[0].uri.split(".").pop(),

      });
      formData.append('user_id', id);

    } else {
      setError("No hay imagen para subir")
    }
    console.log("FormData antes de enviar" + JSON.stringify(formData))
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/users/postuserfiles", {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data"
        },
        method: "POST",
        body: formData,

      });
      const resposta = await data.json();
      console.log("Resposta uploadFoto" + JSON.stringify(resposta))
      if (resposta.success === true) {
        setReload(!reload)
        console.log(resposta.message)

        // setAuthToken(resposta.authToken);
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch (e) {
      console.log("Error" + e.message);
      alert(e.message);
    };
  }


  useEffect(() => {
    getImagesPost()
  }, [!reload]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result: " + JSON.stringify(result));

    if (!result.canceled) {
      setImage(result);
    }
  };
  console.log(images)

  return (
    <>
      {id == usuari.id ?

        desplegable ?
          <>
            < Button title="Cancelar foto" onPress={() => { setDesplegable(false) }} />

            <Button title="Elegir Foto" onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
            <Button title="Enviar foto" onPress={() => { uploadFoto(image), setDesplegable(false) }} />

          </>
          :
          <>
            <Button title="Subir foto" onPress={() => { setDesplegable(true) }} />

          </>
        : <></>

      }

      {
        images.length > 0 ?
          <FlatList data={images} numColumns={2}
            renderItem={({ item: foto }) => (
              <FotoUser url={foto} />
            )}>
          </FlatList>
          :
          <FlatList data={Fotos} numColumns={2}
            renderItem={({ item: foto }) => (
              <FotoUser {...foto} />
            )}>
          </FlatList>
      }

    </>



  );
};


export default FotosUser;