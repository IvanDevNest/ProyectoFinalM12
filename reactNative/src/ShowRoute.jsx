import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute,useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';

import { salirseRuta,eliminarRuta,unirseRuta,obtenerInscripciones,getRoute } from "./slices/routes/thunks";


import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions'
import { WebView } from 'react-native-webview';

const ShowRoute = () => {
    const { inscripciones, isSaving = true, error = "", ruta, isLoading, page, lastpage, } = useSelector((state) => state.routes);

    const dispatch = useDispatch();

    // const [ruta, setRuta] = useState([]);
    // const [error, setError] = useState([]);
    // const [inscripciones, setInscripciones] = useState([])
    // const [isLoading, setIsLoading] = useState(true);
    let { usuari, authToken } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [reload, setReload] = useState(false);

    const [authorRuta, setAuthorRuta] = useState([]);

    const route = useRoute();
    const objectId = route.params.objectId;

    const navigation = useNavigation();

    function ShowUser(id) {
        navigation.navigate('ShowUser', { objectId: id, authorRuta: authorRuta });
    }
    function RutasList() {
        navigation.navigate('RutasList');
    }

    function RouteEdit(id) {
        navigation.navigate('RouteEdit', { objectId: id });
    }
    // console.log("usuariu" + JSON.stringify(usuari))



    const obtenerDatosAuthorRuta = async (id) => {
        try {
            console.log("authorid_ruta:" + id)
            await getUserLooking(id);
            await fetchAvatar(id);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };


    const fetchAvatar = async (id) => {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${id}/avatar`);
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("fetchavatar author route: " + resposta)
                setAvatarUrl(resposta.image_url);
            } else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
        };
    }

    const getUserLooking = async (id) => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/user/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            console.log("RESPOSTA GETAUTHORUSER" + JSON.stringify(resposta))

            if (resposta.success === true) {
                setAuthorRuta(resposta.data)
            }
            else console.log("mensage error getuserlooking:" + resposta.message);
        } catch (e) {
            console.log("mensage error getuserlooking" + e.message);
        };

    }
    useEffect(() => {
        if (ruta) {
            obtenerDatosAuthorRuta(ruta.author_id)
        }
    }, [ruta])
    useEffect(() => {
        dispatch(getRoute(objectId, authToken));
    }, [])
    useEffect(() => {
        dispatch(obtenerInscripciones(objectId, authToken))
    }, [reload, ruta, inscripciones]);

    // const [routeCoordinates, setRouteCoordinates] = useState([]);

    // useEffect(() => {
    //     // Realizar la solicitud HTTP a la URL de la ruta
    //     axios
    //         .get(routeUrl)
    //         .then(response => {
    //             // Extract the coordinates from the API response
    //             const { routes } = response.data;
    //             const coordinates = routes[0].overview_polyline.points;

    //             // Decode the polyline points into latitude and longitude coordinates
    //             const decodedCoordinates = decodePolyline(coordinates);

    //             // Set the route coordinates state variable
    //             setRouteCoordinates(decodedCoordinates);
    //         })
    //         .catch(error => {
    //             console.error('Error al obtener la ruta:', error);
    //         });
    // }, []);
    const initialRegion = {
        latitude: 40.4637, // Latitud de España
        longitude: -3.7492, // Longitud de España
        latitudeDelta: 10, // Ajusta el nivel de zoom verticalmente
        longitudeDelta: 10, // Ajusta el nivel de zoom horizontalmente
    };
    const routeUrl = 'https://www.google.com/maps/dir/41.2059124,1.6704037/El+Alto+Panad%C3%A9s,+08729,+Barcelona/@41.234377,1.6249857,13z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x12a38821eb0d438d:0x1c287b75f514db34!2m2!1d1.6614947!2d41.263893!3e0';

    const getCoordinatesFromUrl = (url) => {
        // Extract the latitude and longitude values from the URL
        const regex = /\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = url.match(regex);
        if (match && match.length >= 3) {
            const latitude = parseFloat(match[1]);
            const longitude = parseFloat(match[2]);
            return { latitude, longitude };
        }
        return null;
    };

    const startCoordinates = { latitude: 41.2059124, longitude: 1.6704037 };
    const endCoordinates = getCoordinatesFromUrl(routeUrl);

    if (!endCoordinates) {
        return null; // Invalid URL, handle it accordingly
    }
    // const GOOGLE_MAPS_APIKEY = 'AIzaSyDHxaklEAdALoHdGnjRhiGOwkFy9nt4dmk';
    // "config": {
    //     "googleMapsApiKey": "AIzaSyDHxaklEAdALoHdGnjRhiGOwkFy9nt4dmk" 
    //   }
    return (
        <View>
            {isLoading ?
                <Text>Cargando...</Text>
                :
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Nombre de la ruta</Text>
                            <Text>{ruta.name}</Text>
                        </View>
                        <View >
                            <Text style={{ fontWeight: 'bold' }}>Autor de la ruta</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => ShowUser(authorRuta.id)}>
                                    {avatarUrl ?
                                        <Image style={styles.avatar} source={{ uri: avatarUrl }} />
                                        :
                                        <Image style={styles.avatar} source={require("./user_default.png")} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => ShowUser(authorRuta.id)}>
                                    <Text>{authorRuta.name}</Text>
                                </TouchableOpacity>
                                {authorRuta.id_role == 4 ?
                                    <Image source={require("./vip.png")} style={{ width: 30, height: 30, position: 'absolute' }}></Image>
                                    :
                                    <></>}

                            </View>
                        </View>

                    </View>

                    <Text style={{ fontWeight: 'bold' }}>URL maps</Text>

                    <TouchableOpacity onPress={() => Linking.openURL(ruta.url_maps)}>
                        <Text style={{ color: 'blue' }}>{ruta.url_maps}</Text>
                    </TouchableOpacity>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={initialRegion}
                    >
                        <Marker coordinate={startCoordinates} />
                        <Marker coordinate={endCoordinates} />
                        <MapViewDirections
                            origin={startCoordinates}
                            destination={endCoordinates}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />

                    </MapView>
                  
                    <Text style={{ fontWeight: 'bold' }}>Descripcion</Text>
                    <Text>{ruta.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <View>

                                <Text style={{ fontWeight: 'bold' }}>Usuarios inscritos</Text>
                                <Text>{inscripciones.length}</Text>

                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Fecha</Text>
                                <Text>{ruta.date}</Text>

                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Duracion   </Text>
                            <Text>{ruta.estimated_duration} h</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Distancia</Text>
                            <Text>{ruta.distance} km</Text>
                        </View>
                    </View>

                    {usuari.route_id == ruta.id && ruta.author_id != usuari.id ?
                        <Button title="Salir de la ruta" onPress={() => { dispatch(salirseRuta(objectId, authToken, setReload, reload)) }} />
                        :
                        <></>
                    }
                    {usuari.route_id == null ?
                        <Button title="Unirme" onPress={() => dispatch(unirseRuta(objectId, authToken, setReload, reload))} />
                        :
                        <></>
                    }
                    {ruta.author_id == usuari.id ?
                        <>
                            <Button title="Editar" onPress={() => RouteEdit(objectId)}></Button>
                            <Button title="Eliminar" onPress={() => { dispatch(eliminarRuta(objectId, authToken, setReload, reload)) }}></Button>
                        </> : <></>
                    }



                    {error ? <Text>{error}</Text> : <></>}





                </View>

            }

        </View>


    )

}
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '40%',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});

export default ShowRoute