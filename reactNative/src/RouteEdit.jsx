import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet, ScrollView, Controller, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { getRoute, updateRoute } from './slices/routes/thunks';
const RouteEdit = () => {
  const route = useRoute();
  const objectId = route.params.objectId;
  let [formulari, setFormulari] = useState({
    name: '',
    description: '',
    date: '',
    estimated_duration: '',
    type_vehicle: '',
    distance: 0,
    startLatitude: 0,
    startLongitude: 0,
    endLatitude: 0,
    endLongitude: 0,
    // url_maps: '',
    num_stops: 0,
    max_users: '',
    id_route_style: 0,
    author_id: ''
  });
  let { authToken, setAuthToken, reload, setReload } = useContext(UserContext);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { isSaving = true, error = "", ruta, isLoading = true } = useSelector((state) => state.routes);

  const handleChange = (value, name) => {
    if (name === 'distance' || name === 'id_route_style' || name === 'num_stops' || name === 'estimated_duration' || name === 'author_id') {
      value = Number(value);
    }
    setFormulari(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function ShowRoute(id) {
    navigation.navigate('ShowRoute', { objectId: id });
  }
  useEffect(() => {
    dispatch(getRoute(objectId, authToken))
  }, []);
  useEffect(() => {
    // console.log("variable ruta" + JSON.stringify(ruta))
    setFormulari({
      name: ruta.name ,
      description: ruta.description ,
      date: ruta.date ,
      estimated_duration: ruta.estimated_duration ,
      type_vehicle: ruta.type_vehicle ,
      distance: ruta.distance ,
      // url_maps: ruta.url_maps ,
      startLatitude: ruta.startLatitude,
      startLongitude: ruta.startLongitude,

      endLatitude: ruta.endLatitude,
      endLongitude: ruta.endLongitude,
      num_stops: ruta.num_stops ,
      max_users: ruta.max_users ,
      id_route_style: ruta.id_route_style ,
      author_id: ruta.author_id 
    })

  }, [ruta])
  // console.log("local formulari" + JSON.stringify(formulari))

  return (
    <ScrollView>
      {isLoading ?
        <Text>cargando...</Text>
        :
        <ScrollView>

          <Text style={{ fontWeight: 'bold' }}>Editar Ruta</Text>
          <Text style={{ fontWeight: 'bold' }}>Información de la ruta</Text>
          <Text style={{ fontWeight: 'bold' }}>Nombre de la ruta</Text>
          <TextInput
            name="name"
            onChangeText={text => handleChange(text, 'name')}
            value={formulari.name}
          />

          <View >
            <View>
              <Text style={{ fontWeight: 'bold' }}>Hora inicio</Text>
              <TextInput
                name="date"
                onChangeText={text => handleChange(text, 'date')}
                value={formulari.date}
              />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Vehículo</Text>
              <Text>{formulari.type_vehicle}</Text>
            </View>
          </View>

          <View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Distancia aproximada</Text>
              <TextInput
                name="distance"
                onChangeText={text => handleChange(text, 'distance')}
                value={formulari.distance.toString()}
              />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Duración</Text>
              <TextInput
                name="estimated_duration"
                onChangeText={text => handleChange(text, 'estimated_duration')}
                value={formulari.estimated_duration}
              />
            </View>
          </View>

          {/* <Text style={{ fontWeight: 'bold' }}>
            URL de Google Maps con símbolo de ayuda para enseñar cómo coger la URL
          </Text>
          <Text>{formulari.url_maps}</Text> */}

          <View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Velocidad de la ruta</Text>
              <RNPickerSelect
                placeholder={{ label: 'Selecciona una opción...', value: formulari.id_route_style }}
                onValueChange={text => handleChange(text, 'id_route_style')}

                items={[
                  { label: 'Del chill', value: '1' },
                  { label: 'Animado', value: '2' },
                  { label: 'A gas', value: '3' },
                ]}
                value={formulari.id_route_style.toString()}
              />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Numero de paradas</Text>
              <TextInput
                name="num_stops"
                onChangeText={text => handleChange(text, 'num_stops')}
                value={formulari.num_stops.toString()}
              />
            </View>
            <Text style={{ fontWeight: 'bold' }}>Maximo de personas</Text>
            <Text>{formulari.max_users}</Text>
          </View>

          <Text style={{ fontWeight: 'bold' }}>Descripción</Text>
          <TextInput
            name="description"
            onChangeText={text => handleChange(text, 'description')}
            value={formulari.description}
          />
          {error ? <Text style={{ color: 'red' }}>{error}</Text> : <></>}
          <Button title="Actualizar Ruta" onPress={() => { dispatch(updateRoute(formulari, ruta.id, authToken, ShowRoute, setReload, reload)) }} />
        </ScrollView>

      }
    </ScrollView >

  )
}

export default RouteEdit