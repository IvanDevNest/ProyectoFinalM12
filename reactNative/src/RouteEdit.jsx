import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet, ScrollView, Controller, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const RouteEdit = () => {
  const route = useRoute();
  const objectId = route.params.objectId;
  let [formulari, setFormulari] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ruta, setRuta] = useState([]);
  const [error, setError] = useState([]);
  const navigation = useNavigation();

  const handleChange = (e) => {
    e.preventDefault();
    setFormulari({
      ...formulari,
      [e.target.name]: e.target.value
    })
  };
  function onPressObject(id) {
    navigation.navigate('ShowRoute', { objectId: id });
}

  const createRoute = async (formState,id) => {
    console.log(JSON.stringify(formState));
    try {
        const data = await fetch('http://equip04.insjoaquimmir.cat/api/routes/'+id, {
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

            onPressObject(resposta.data.id)
            setReload(!reload)

        }
        else setError(resposta.message);
    } catch (e) {
        console.log(e.err);

    }
};
  const getRoute = async (objectId) => {
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,

        },
        method: "GET",

      })
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("resposta" + JSON.stringify(resposta))
        setRuta(resposta.data)
        setIsLoading(false)

        setFormulari({
          name: resposta.data.name,
          description: resposta.data.description,
          start_time: resposta.data.start_time,
          estimated_duration: resposta.data.estimated_duration,
          type_vehicle: resposta.data.type_vehicle,
          distance: resposta.data.distance,
          url_maps: resposta.data.url_maps,
          num_stops: resposta.data.num_stops,
          max_users: resposta.data.max_users,
          id_route_style: resposta.data.id_route_style,
        })

      }
      else {
        setError(resposta.message);
      }
    } catch (err) {
      console.log(err.message);
      alert("Catchch" + err.message);
    };
  }


  useEffect(() => {
    getRoute(objectId)
  }, []);
  useEffect(() => {
    console.log(ruta)
    setFormulari({
      name: ruta.name,
      description: ruta.description,
      start_time: ruta.start_time,
      estimated_duration: ruta.estimated_duration,
      // type_vehicle: ruta.type_vehicle,
      distance: ruta.distance,
      // url_maps: ruta.url_maps,
      num_stops: ruta.num_stops,
      // max_users:ruta.max_users,
      id_route_style: ruta.id_route_style,
    })
  }, [ruta])
  return (
    <ScrollView>
      {isLoading ?
        <Text>cargando...</Text>
        :
        <ScrollView>

          <Text>Editar Ruta</Text>
          <Text>Información de la ruta</Text>
          <Text>Nombre de la ruta</Text>
          <TextInput
            name="name"
            onChangeText={handleChange}
            value={formulari.name}
          />

          <View >
            <View>
              <Text>Hora inicio</Text>
              <TextInput
                name="start_time"
                onChangeText={handleChange}
                value={formulari.start_time}
              />

            </View>
            <View>
              <Text>Vehículo</Text>

              <Text>{formulari.type_vehicle}</Text>
          </View>
          </View>

          <View>
            <View>
              <Text>Distancia aproximada</Text>
              <TextInput
                name="distance"
                onChangeText={handleChange}
                value={formulari.distance}
              />

            </View>
            <View>
              <Text>Duración</Text>
              <TextInput
                name="estimated_duration"
                onChangeText={handleChange}
                value={formulari.estimated_duration}
              />
            </View>
          </View>
          <Text>
            URL de Google Maps con símbolo de ayuda para enseñar cómo coger la URL
          </Text>
          <Text>{formulari.url_maps}</Text>


          <View>
            <View>
              <Text>Velocidad de la ruta</Text>

              <RNPickerSelect
                placeholder={{ label: 'Selecciona una opción...', value: formulari.id_route_style }}
                onValueChange={handleChange}

                items={[
                  { label: 'Del chill', value: '1' },
                  { label: 'Animado', value: '2' },
                  { label: 'A gas', value: '3' },
                ]}
                value={formulari.id_route_style}
              />



            </View>
            <View>
              <Text>Numero de paradas</Text>
              <TextInput
                name="num_stops"
                onChangeText={handleChange}
                value={formulari.num_stops}
              />
            </View>
            <Text>Maximo de personas</Text>
            <Text>{formulari.max_users}</Text>

          </View>
          <Text>Descripción</Text>
          <TextInput
            name="description"
            onChangeText={handleChange}
            value={formulari.description}
          />
          {error ? <Text>{error}</Text> : <></>}
          <Button title="Crear Ruta" onPress={createRoute(formulari,ruta.id)} />
        </ScrollView>

      }
    </ScrollView >

  )
}

export default RouteEdit