import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { salirseRuta, eliminarRuta, unirseRuta, obtenerInscripciones, getRoute } from "./slices/routes/thunks";


import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

const ShowRoute = () => {
    const { inscripciones, isSaving = true, error = "",isLoading=true, ruta, page, lastpage, } = useSelector((state) => state.routes);

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
        }
    };


    const fetchAvatar = async (id) => {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${id}/avatar`);
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("fetchavatar author route: " + resposta)
                setAvatarUrl(resposta.image_url);
            } else console.log(resposta.message);
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
    }, [reload, ruta ]);
    // }, [reload, ruta, inscripciones]);
    console.log(ruta.url_maps)
      const [initialRegion, setInitialRegion] = useState({
                    latitude: ruta.startLatitude,
                    longitude: ruta.startLongitude,
                    latitudeDelta: 0.1, // Ajusta el nivel de zoom verticalmente
                    longitudeDelta: 0.1, // Ajusta el nivel de zoom horizontalmente
                });
     const [startCoords, setStartCoords] = useState({latitude:ruta.startLatitude,longitude:ruta.startLongitude});
      const [endCoords, setEndCoords] = useState({latitude:ruta.endLatitude,longitude:ruta.endLongitude});
    // const getCoordsMap = async () => {

    //     //ruta
    //     const routeUrl = ruta.url_maps
        
    //     // Extraer coordenadas iniciales
    //     const regexInicial = /\/(\d+\.\d+),(\d+\.\d+)\//;
    //     const matchInicial = routeUrl.match(regexInicial);
    //     let latInicial = 0;
    //     let lngInicial = 0;

    //     if (matchInicial && matchInicial.length >= 3) {
    //         latInicial = parseFloat(matchInicial[1]);
    //         lngInicial = parseFloat(matchInicial[2]);
    //     } else {
    //         console.log("No se encontró la latitud y longitud inicial en la URL.");
    //     }

    //     setStartCoords({ latitude: latInicial, longitude: lngInicial });

    //     setInitialRegion({
    //         latitude: latInicial,
    //         longitude: lngInicial,
    //         latitudeDelta: 0.02, // Ajusta el nivel de zoom verticalmente
    //         longitudeDelta: 0.02, // Ajusta el nivel de zoom horizontalmente
    //     });


    //     // Extraer coordenadas finales
    //     const regexFinales = /\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
    //     const matchPreview = routeUrl.match(regexFinales);
      

    //     if (matchPreview && matchPreview.length >= 3) {
    //         latFinal = parseFloat(matchPreview[1]);
    //         lngFinal = parseFloat(matchPreview[2]);

    //     } else {
    //         console.log("No se encontraron las coordenadas finales en la URL.");
    //     }
    //     setEndCoords({ latitude: latFinal, longitude: lngFinal })

    //     console.log("Coordenadas iniciales:", latInicial, lngInicial);
    //     console.log("Coordenadas finales:", latFinal, lngFinal);
    //     setIsLoading(false)

    // }

    const GOOGLE_MAPS_APIKEY = 'AIzaSyCcs-5mNo4Ywp9G3w8xH1_kMKvdquIWmiw';
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
                        <Marker coordinate={startCoords} />
                        <Marker coordinate={endCoords} />
                        <MapViewDirections
                            origin={startCoords}
                            destination={endCoords}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="blue"
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