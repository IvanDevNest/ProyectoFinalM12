import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet, ScrollView, Controller, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const UserEdit = () => {
  const route = useRoute();
  const objectId = route.params.objectId;
  let [formulari, setFormulari] = useState({});
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [usuariLocal, setUsuariLocal] = useState([]);
  const [error, setError] = useState([]);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const handleChange = (value, name) => {
    // if (name === 'distance' || name === 'id_route_style'||name === 'num_stops'||name === 'estimated_duration'||name==='author_id') {
    //   value = Number(value);
    // }
    setFormulari(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function ShowUser(id) {
    navigation.navigate('ShowUser', { objectId: id });
  }

  const updateUser = async (formState, id) => {
    console.log("formulari" + JSON.stringify(formState));
    try {
      const data = await fetch('http://equip04.insjoaquimmir.cat/api/user/' + id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken,
        },
        method: 'PUT',
        body: JSON.stringify(formState),
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        // setRutas(resposta);
        console.log("resposta: " + JSON.stringify(resposta))
        ShowUser(usuari.id)
        // setReload(!reload)

      }
      else setError(resposta.message);
    } catch (e) {
      console.log(e.err);

    }
  };

  // const getRoute = async (objectId) => {
  //   try {
  //     const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,

  //       },
  //       method: "GET",

  //     })
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("resposta getRoute" + JSON.stringify(resposta))
  //       setRuta(resposta.data)
  //       setIsLoading(false)

  //       setFormulari({
  //         name: resposta.data.name,
  //         description: resposta.data.description,
  //         date: resposta.data.date,
  //         estimated_duration: resposta.data.estimated_duration,
  //         type_vehicle: resposta.data.type_vehicle,
  //         distance: resposta.data.distance,
  //         url_maps: resposta.data.url_maps,
  //         num_stops: resposta.data.num_stops,
  //         max_users: resposta.data.max_users,
  //         id_route_style: resposta.data.id_route_style,
  //         author_id: resposta.data.author_id
  //       })

  //     }
  //     else {
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log("catch" + err.message);
  //   };
  // }


  useEffect(() => {
    getRoute(objectId)
  }, []);
  useEffect(() => {
    console.log("variable userlocal" + JSON.stringify(usuariLocal))
    setFormulari({
      name: usuariLocal.name,
      lastname: usuariLocal.lastname,
      second_surname: usuariLocal.second_surname,
      file_id: usuariLocal.file_id,
      // type_vehicle: ruta.type_vehicle,
      // distance: ruta.distance,
      // url_maps: ruta.url_maps,
      // num_stops: ruta.num_stops,
      // max_users: ruta.max_users,
      // id_route_style: ruta.id_route_style,
      // author_id: ruta.author_id
    })
  }, [usuariLocal])
  useEffect(() => {
    setUsuariLocal = usuari;
    setFormulari({
      name: usuari.name,
      lastname: usuari.lastname,
      second_surname: usuari.second_surname,
      file_id: usuari.file_id,
    })
  }, [])

  console.log("local formulari" + JSON.stringify(formulari))

  return (
    <ScrollView>
      {isLoading ?
        <Text>cargando...</Text>
        :
        <ScrollView>

          <Text style={{ fontWeight: 'bold' }}>Editar User</Text>
          <Text style={{ fontWeight: 'bold' }}>Información del usuario</Text>
          <Text style={{ fontWeight: 'bold' }}>Nombre del usuario</Text>
          <TextInput
            name="name"
            onChangeText={text => handleChange(text, 'name')}
            value={formulari.name}
          />

          <View >
            <View>
              <Text style={{ fontWeight: 'bold' }}>lastname</Text>
              <TextInput
                name="lastname"
                onChangeText={text => handleChange(text, 'lastname')}
                value={formulari.lastname}
              />
            </View>
            <View>
            <Text style={{ fontWeight: 'bold' }}>second_surname</Text>
            <TextInput
              name="second_surname"
              onChangeText={text => handleChange(text, 'second_surname')}
              value={formulari.second_surname}
            />
            </View>
          </View>

          <View>
           
          </View>

          {error ? <Text style={{ color: 'red' }}>{error}</Text> : <></>}
          <Button title="Actualizar Ruta" onPress={() => updateUser(formulari, usuari.id)} />
        </ScrollView>

      }
    </ScrollView >

  )
}

export default UserEdit