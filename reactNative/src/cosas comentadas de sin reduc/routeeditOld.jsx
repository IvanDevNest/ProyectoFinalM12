// import React, { useState, useEffect, useContext } from 'react'
// import { UserContext } from './userContext';
// import { useRoute } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
// import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet, ScrollView, Controller, TextInput } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';

// const RouteEdit = () => {
//   const route = useRoute();
//   const objectId = route.params.objectId;
//   let [formulari, setFormulari] = useState({});
//   let { authToken, setAuthToken } = useContext(UserContext);
//   const navigation = useNavigation();

//   const [isLoading, setIsLoading] = useState(true);
//   const [ruta, setRuta] = useState([]);
//   const [error, setError] = useState([]);

//   const handleChange = (value, name) => {
//     if (name === 'distance' || name === 'id_route_style'||name === 'num_stops'||name === 'estimated_duration'||name==='author_id') {
//       value = Number(value);
//     }
//     setFormulari(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   }

//   function ShowRoute(id) {
//     navigation.navigate('ShowRoute', { objectId: id });
//   }

//   const updateRoute = async (formState, id) => {
//     console.log("formulari"+JSON.stringify(formState));
//     try {
//       const data = await fetch('http://equip04.insjoaquimmir.cat/api/routes/' + id, {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + authToken,
//         },
//         method: 'PUT',
//         body: JSON.stringify(formState),
//       });
//       const resposta = await data.json();
//       if (resposta.success === true) {
//         // setRutas(resposta);
//         console.log("resposta: " + JSON.stringify(resposta))

//         ShowRoute(resposta.data.id)
//         setReload(!reload)

//       }
//       else setError(resposta.message);
//     } catch (e) {
//       console.log(e.err);

//     }
//   };
//   const getRoute = async (objectId) => {
//     try {
//       const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           'Authorization': 'Bearer ' + authToken,

//         },
//         method: "GET",

//       })
//       const resposta = await data.json();
//       if (resposta.success === true) {
//         console.log("resposta getRoute" + JSON.stringify(resposta))
//         setRuta(resposta.data)
//         setIsLoading(false)

//         setFormulari({
//           name: resposta.data.name,
//           description: resposta.data.description,
//           date: resposta.data.date,
//           estimated_duration: resposta.data.estimated_duration,
//           type_vehicle: resposta.data.type_vehicle,
//           distance: resposta.data.distance,
//           url_maps: resposta.data.url_maps,
//           num_stops: resposta.data.num_stops,
//           max_users: resposta.data.max_users,
//           id_route_style: resposta.data.id_route_style,
//           author_id:resposta.data.author_id
//         })

//       }
//       else {
//         setError(resposta.message);
//       }
//     } catch (err) {
//       console.log("catch"+err.message);
//     };
//   }


//   useEffect(() => {
//     getRoute(objectId)
//   }, []);
//   useEffect(() => {
//     console.log("variable ruta"+JSON.stringify(ruta))

//     setFormulari({
//       name: ruta.name,
//       description: ruta.description,
//       date: ruta.date,
//       estimated_duration: ruta.estimated_duration,
//       type_vehicle: ruta.type_vehicle,
//       distance: ruta.distance,
//       url_maps: ruta.url_maps,
//       num_stops: ruta.num_stops,
//       max_users: ruta.max_users,
//       id_route_style: ruta.id_route_style,
//       author_id:ruta.author_id
//     })
//   }, [ruta])
//   console.log("local formulari"+JSON.stringify(formulari))

//   return (
//     <ScrollView>
//       {isLoading ?
//         <Text>cargando...</Text>
//         :
//         <ScrollView>

//           <Text style={{ fontWeight: 'bold' }}>Editar Ruta</Text>
//           <Text style={{ fontWeight: 'bold' }}>Información de la ruta</Text>
//           <Text style={{ fontWeight: 'bold' }}>Nombre de la ruta</Text>
//           <TextInput
//             name="name"
//             onChangeText={text => handleChange(text, 'name')}
//             value={formulari.name}
//           />

//           <View >
//             <View>
//               <Text style={{ fontWeight: 'bold' }}>Hora inicio</Text>
//               <TextInput
//                 name="date"
//                 onChangeText={text => handleChange(text, 'date')}
//                 value={formulari.date}
//               />
//             </View>
//             <View>
//               <Text style={{ fontWeight: 'bold' }}>Vehículo</Text>
//               <Text>{formulari.type_vehicle}</Text>
//             </View>
//           </View>

//           <View>
//             <View>
//               <Text style={{ fontWeight: 'bold' }}>Distancia aproximada</Text>
//               <TextInput
//                 name="distance"
//                 onChangeText={text => handleChange(text, 'distance')}
//                 value={formulari.distance.toString()}
//               />

//             </View>
//             <View>
//               <Text style={{ fontWeight: 'bold' }}>Duración</Text>
//               <TextInput
//                 name="estimated_duration"
//                 onChangeText={text => handleChange(text, 'estimated_duration')}
//                 value={formulari.estimated_duration}
//               />
//             </View>
//           </View>
//           <Text style={{ fontWeight: 'bold' }}>
//             URL de Google Maps con símbolo de ayuda para enseñar cómo coger la URL
//           </Text>
//           <Text>{formulari.url_maps}</Text>


//           <View>
//             <View>
//               <Text style={{ fontWeight: 'bold' }}>Velocidad de la ruta</Text>
//               <RNPickerSelect
//                 placeholder={{ label: 'Selecciona una opción...', value: formulari.id_route_style}}
//                 onValueChange={text => handleChange(text, 'id_route_style')}

//                 items={[
//                   { label: 'Del chill', value: '1' },
//                   { label: 'Animado', value: '2' },
//                   { label: 'A gas', value: '3' },
//                 ]}
//                 value={formulari.id_route_style.toString()}
//               />



//             </View>
//             <View>
//               <Text style={{ fontWeight: 'bold' }}>Numero de paradas</Text>
//               <TextInput
//                 name="num_stops"
//                onChangeText={text => handleChange(text, 'num_stops')}
//                 value={formulari.num_stops.toString()}
//               />
//             </View>
//             <Text style={{ fontWeight: 'bold' }}>Maximo de personas</Text>
//             <Text>{formulari.max_users}</Text>

//           </View>
//           <Text style={{ fontWeight: 'bold' }}>Descripción</Text>
//           <TextInput
//             name="description"
//             onChangeText={text => handleChange(text, 'description')}
//             value={formulari.description}
//           />
//           {error ? <Text style={{color:'red'}}>{error}</Text> : <></>}
//           <Button title="Actualizar Ruta" onPress={()=>updateRoute(formulari, ruta.id)} />
//         </ScrollView>

//       }
//     </ScrollView >

//   )
// }

// export default RouteEdit