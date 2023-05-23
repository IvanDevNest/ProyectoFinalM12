import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import StyledText from "./StyledText";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "./userContext";
import { MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { eliminarRuta, unirseRuta, salirseRuta, getUser, obtenerInscripciones } from "./slices/routes/thunks";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

const RutaList = (ruta) => {
    const {  isSaving = true, error = "", isLoading, rutas, page, lastpage, } = useSelector((state) => state.routes);

    let { usuari, setUsuari, authToken, setReload, reload, latitudeUser, longitudeUser } = useContext(UserContext);
    const navigation = useNavigation();
    // const [error, setError] = useState("");
    //  const [isLoading, setIsLoading] = useState(true);
     const [inscripciones, setInscripciones] = useState([])
    const dispatch = useDispatch();

    function ShowRoute(id,inscripciones) {
        navigation.navigate('ShowRoute', { objectId: id,inscripciones:inscripciones });
    }
    function RouteEdit(id) {
        navigation.navigate('RouteEdit', { objectId: id });
    }

    const [initialRegion, setInitialRegion] = useState({
        latitude: ruta.startLatitude,
        longitude: ruta.startLongitude,
        latitudeDelta: 1, // Ajusta el nivel de zoom verticalmente
        longitudeDelta: 1, // Ajusta el nivel de zoom horizontalmente
    });
    const [startCoords, setStartCoords] = useState({ latitude: ruta.startLatitude, longitude: ruta.startLongitude });
    const [endCoords, setEndCoords] = useState({ latitude: ruta.endLatitude, longitude: ruta.endLongitude });

    const GOOGLE_MAPS_APIKEY = 'AIzaSyCcs-5mNo4Ywp9G3w8xH1_kMKvdquIWmiw';


    useEffect(() => {
        dispatch(obtenerInscripciones(ruta.id, authToken,setInscripciones))
    }, [reload]);


    // }, [ruta]);

    const distancia = ruta.distance.toString(); // Convertir el valor a una cadena de texto
    const separado = distancia.substring(0, 2) + '-' + distancia.substring(2); // Obtener los dos primeros caracteres y el resto de la cadena
    return (
        <>
            {isLoading ? <></>
                :
                //  inscripciones.length < ruta.max_users ?
                <View key={(ruta.id)} style={styles.containerPadre}>

                    <View key={(ruta.id)} style={{ flexDirection: 'row', paddingBottom: 10 }}>

                        <View style={{ paddingHorizontal: 60, paddingVertical: 35 }}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={{ borderColor: 'skyblue', borderWidth: 2, width: 120, height: 70, position: 'absolute' }}
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




                        </View>
                            
                        <View style={{ flex: 1, paddingLeft: 15, }}>
                            {ruta.type_vehicle == "Moto" ?
                                <View style={{ flexDirection: "row" }}>
                                    <FontAwesome5 name="motorcycle" size={24} color="skyblue" />
                                    <StyledText>    {ruta.date}</StyledText>
                                </View> :
                                <View style={{ flexDirection: "row" }}>
                                    <FontAwesome5 name="car" size={24} color="skyblue" />
                                    <StyledText>    {ruta.date}</StyledText>
                                </View>
                            }


                            <StyledText>{ruta.name}</StyledText>
                            <StyledText>{ruta.description}</StyledText>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: "center" }}>
                            <FontAwesome5 style={{ paddingHorizontal: 15, paddingVertical: 10 }} name="users" size={24} color="black" />
                            <StyledText>{inscripciones.length}/{ruta.max_users}</StyledText>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <MaterialCommunityIcons style={{ paddingHorizontal: 15, paddingVertical: 10 }} name="bus-stop-uncovered" size={24} color="black" />
                            <StyledText>{ruta.num_stops}</StyledText>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center" }}>
                                    <AntDesign style={{ paddingHorizontal: 15, paddingVertical: 10 }} name="clockcircle" size={24} color="black" />
                                    <StyledText>{ruta.estimated_duration}</StyledText>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <MaterialCommunityIcons style={{ paddingHorizontal: 20, paddingVertical: 10 }} name="map-marker-distance" size={24} color="black" />
                                    <StyledText>{separado} km</StyledText>
                            </View>


                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: "space-around" }} >
                                {usuari.route_id == ruta.id && ruta.author_id != usuari.id ?
                                    <Button title="Salir de la ruta" onPress={() => { dispatch(salirseRuta(ruta.id, authToken, setReload, reload,false)) }} />
                                    :
                                    <></>
                                }
                                {usuari.route_id == null ?
                                    <Button title="Unirme" onPress={() => { dispatch(unirseRuta(ruta.id, authToken, setReload, reload)) }} />
                                    :
                                    <></>
                                }
                                {ruta.author_id == usuari.id ?
                                    <>
                                        <Button title="Editar" onPress={() => RouteEdit(ruta.id)}></Button>
                                        <Button title="Eliminar" onPress={() => { dispatch(eliminarRuta(ruta.id, authToken, setReload, reload,false)) }}></Button>
                                    </>
                                    :
                                    <></>
                                }
                                <Button title="Ver" onPress={() => ShowRoute(ruta.id,inscripciones)}></Button>
                            </View>
                        </View>
                    </View>
                </View>
                //  : <></>
            }
        </>


    )


}
const styles = StyleSheet.create({
    containerPadre: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        flexDirection: "column"

    },
    buttonEliminar: {
        backgroundColor: "red",
        color: "red"
    }
})

export default RutaList