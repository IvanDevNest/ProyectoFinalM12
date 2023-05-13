import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet,ScrollView } from 'react-native';
import CustomInput from './CustomInput';
const RouteEdit = () => {
  const route = useRoute();
  const objectId = route.params.objectId;
  let [formulari, setFormulari] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ruta, setRuta] = useState([]);
    const [error, setError] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setFormulari({
      ...formulari,
      [e.target.name]: e.target.value
    })
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
          <CustomInput
            name="name"
            placeholder="Nombre de la ruta"
            control={control}
            rules={{ required: 'duracion is required' }}

          />
          <View >
            <View>
              <Text>Hora inicio</Text>
              <CustomInput
                name="start_time"
                control={control}
                rules={{ required: 'duracion is required' }}

              />
            </View>
            <View>
              <Text>Vehículo</Text>
              <Controller
                        control={control}
                        name="type_vehicle"
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RNPickerSelect
                                placeholder={{ label: 'Selecciona una opción...', value: null }}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                items={[
                                    { label: 'Moto', value: 'Moto' },
                                    { label: 'Coche', value: 'Coche' }
                                ]}
                                value={value}
                            />
                        )}
                    /> 


            </View>
          </View>

          <View>
            <View>
              <Text>Distancia aproximada</Text>
              <CustomInput
                name="distance"
                placeholder="30km-35km"
                control={control}
                rules={{
                  required: 'Distancia es requerida',
                }}
              />
            </View>
            <View>
              <Text>Duración</Text>
              <CustomInput
                name="estimated_duration"
                control={control}
                rules={{
                  required: 'Duración es requerida',
                }}
              />
            </View>
          </View>
          <Text>
            URL de Google Maps con símbolo de ayuda para enseñar cómo coger la URL
          </Text>
          <CustomInput
            name="url_maps"
            placeholder="https://www.google.com/maps/dir/?api=1&origin=..."
            control={control}
            rules={{ required: 'URL de Google Maps is required' }}
          />
          <View>
            <View>
              <Text>Velocidad de la ruta</Text>
               <Controller
                        control={control}
                        name="id_route_style"
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RNPickerSelect
                                placeholder={{ label: 'Selecciona una opción...', value: null }}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                items={[
                                    { label: 'Del chill', value: '1' },
                                    { label: 'Animado', value: '2' },
                                    { label: 'A gas', value: '3' },
                                ]}
                                value={value}
                            />
                        )}
                    /> 

            </View>
            <View>
              <Text>Numero de paradas</Text>
              <CustomInput
                name="num_stops"

                control={control}
                rules={{
                  required: 'Numero de paradas es requerida',
                }}
              />
            </View>


          </View>
          <Text>Maximo de personas</Text>
         <Controller
                control={control}
                name="max_users"
                defaultValue="10"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RNPickerSelect
                        placeholder={{ label: 'Selecciona una opción...', value: null }}
                        onValueChange={onChange}
                        onBlur={onBlur}
                        items={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                            { label: '5', value: '5' },
                            { label: '6', value: '6' },
                            { label: '7', value: '7' },
                            { label: '8', value: '8' },
                            { label: '9', value: '9' },
                            { label: '10', value: '10' },
                        ]}
                        value={value}
                    />
                )}
            />


          <Text>Descripción</Text>
          <CustomInput
            name="description"
            placeholder="Descripción de la ruta"
            control={control}
            rules={{ required: 'Descripción is required' }}

          />
          {error ? <Text>{error}</Text> : <></>}
          <Button title="Crear Ruta" onPress={handleSubmit(onSubmit)} />
        </ScrollView>

      }
    </ScrollView >

  )
}

export default RouteEdit