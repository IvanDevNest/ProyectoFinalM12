import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { salirseRuta, eliminarRuta, unirseRuta, obtenerInscripciones, getRoute } from "./slices/routes/thunks";


import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

const ShowRoute = () => {
    const { isSaving = true, error = "", isLoading = true, ruta, page, lastpage, } = useSelector((state) => state.routes);

    const dispatch = useDispatch();

    // const [ruta, setRuta] = useState([]);
    // const [error, setError] = useState([]);
    // const [inscripciones, setInscripciones] = useState([])
    // const [isLoading, setIsLoading] = useState(true);
    let { usuari, authToken, reload, setReload, inscripciones } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [authorRuta, setAuthorRuta] = useState([]);

    const route = useRoute();
    const objectId = route.params.objectId;
    // const inscripciones= route.params.inscripciones
    const navigation = useNavigation();

    function ShowUser(id) {
        navigation.navigate('ShowUser', { objectId: id, authorRuta: authorRuta });
    }


    function RouteEdit(id) {
        navigation.navigate('RouteEdit', { objectId: id });
    }
    // console.log("usuariu" + JSON.stringify(usuari))


    function RutasList() {
        navigation.navigate('RutasList');
    }

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
    const [startCoords, setStartCoords] = useState({});
    const [endCoords, setEndCoords] = useState({});
    useEffect(() => {
        if (ruta) {
            obtenerDatosAuthorRuta(ruta.author_id)
        }
    }, [ruta])
    useEffect(() => {
        console.log(objectId)
        dispatch(getRoute(objectId, authToken, setStartCoords, setEndCoords, setInitialRegion));
    }, [reload])
    // useEffect(() => {
    //     dispatch(obtenerInscripciones(objectId, authToken))
    // }, [reload, ruta]);
    // }, [reload, ruta, inscripciones]);
    const [initialRegion, setInitialRegion] = useState({});


    const GOOGLE_MAPS_APIKEY = 'AIzaSyCcs-5mNo4Ywp9G3w8xH1_kMKvdquIWmiw';
    return (
        <View>
            {isLoading ?
                <Text>Cargando...</Text>
                :
                <View style={{padding:10}}>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                        <View style={{ flex: 1 }}>
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

                    <Text style={{ fontWeight: 'bold' }}>Ruta maps</Text>
                    {/* <TouchableOpacity onPress={() => Linking.openURL(ruta.url_maps)}>
                        <Text style={{ color: 'blue' }}>{ruta.url_maps}</Text>
                    </TouchableOpacity> */}
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
                        <Button title="Salir de la ruta" onPress={() => { dispatch(salirseRuta(objectId, authToken, setReload, reload,true, RutasList)) }} />
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
                            {new Date() - new Date(ruta.date) < 12 * 60 * 60 * 1000 ?
                                <></> : <Button title="Editar" onPress={() => RouteEdit(objectId)}
                                ></Button>
                            }


                            <Button title="Eliminar" onPress={() => { dispatch(eliminarRuta(objectId, authToken, setReload, reload,true, RutasList)) }}></Button>
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