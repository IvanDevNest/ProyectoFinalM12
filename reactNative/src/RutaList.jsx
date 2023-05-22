import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import StyledText from "./StyledText";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "./userContext";
import { MaterialCommunityIcons,Ionicons,AntDesign,FontAwesome5 } from '@expo/vector-icons';
import { eliminarRuta,unirseRuta,salirseRuta,getUser,obtenerInscripciones } from "./slices/routes/thunks";
import { useDispatch,useSelector } from "react-redux";

const RutaList = (ruta) => {
    const { inscripciones, isSaving = true, error = "", rutas, isLoading, page, lastpage, } = useSelector((state) => state.routes);

    let { usuari, setUsuari, authToken, setReload, reload, latitudeUser,longitudeUser } = useContext(UserContext);
    const navigation = useNavigation();
    // const [error, setError] = useState("");
    // const [isLoading, setIsLoading] = useState(true);
    // const [inscripciones, setInscripciones] = useState([])
    const dispatch = useDispatch();

    function ShowRoute(id) {
        navigation.navigate('ShowRoute', { objectId: id });
    }
    function RouteEdit(id) {
        navigation.navigate('RouteEdit', { objectId: id });
    }
    // console.log("ruta"+ruta.id+"usu"+JSON.stringify(usuari))

    // console.log("ruta"+ruta.author_id+"usu"+JSON.stringify(usuari.id))
    // const eliminarRuta = async (id) => {
    //     try {
    //         const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id, {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer ' + authToken,
    //             },
    //             method: "DELETE",
    //         });
    //         const resposta = await data.json();
    //         console.log(resposta)
    //         if (resposta.success === true) {
    //             console.log("Ruta eliminada correctament")
    //             setReload(!reload)
    //         }
    //         else setError("La resposta no ha triomfat");
    //     } catch (e) {
    //         console.log("Catch: " + e.message);

    //     };
    // }
    // const getUser = async () => {
    //     try {
    //         const data = await fetch("http://equip04.insjoaquimmir.cat/api/user", {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer ' + authToken,
    //             },
    //             method: "GET",
    //         });
    //         const resposta = await data.json();
    //         if (resposta.success === true) {
    //             console.log("RESPOSTA GETUSER" + JSON.stringify(resposta))
    //             setUsuari(resposta.user)
    //         }
    //         else setError(resposta.message);
    //     } catch (e) {
    //         console.log(e.message);
    //     };

    // }

    // const obtenerInscripciones = async (id) => {
    //     try {
    //         const data = await fetch(`http://equip04.insjoaquimmir.cat/api/inscriptions?route_id=${id}`, {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer ' + authToken,
    //             },
    //             method: "GET",
    //         });
    //         const resposta = await data.json();
    //         if (resposta.success === true) {
    //             console.log("Inscripciones: " + JSON.stringify(resposta))
    //             setInscripciones(resposta.data)
    //             setIsLoading(false)

    //         }
    //         else setError(resposta.message);
    //     } catch (e) {
    //         console.log(e.message);
    //         // alert("Catchch");
    //     };
    // }


    useEffect(() => {
        dispatch(getUser(authToken,setUsuari));
        dispatch(obtenerInscripciones(ruta.id,authToken))
        console.log("Las inscripciones: " + JSON.stringify(inscripciones))
    }, [reload]);

    const numeroInscripciones = inscripciones.length;
    return (
        <>
            {isLoading ? <></>
                :
                numeroInscripciones < ruta.max_users ?
                    <View key={(ruta.id)} style={styles.containerPadre}>

                        <View key={(ruta.id)} style={{ flexDirection: 'row', paddingBottom: 10 }}>

                            <View style={{ paddingHorizontal: 60, paddingVertical: 35 }}>
                                <Image source={require("./CapturaAPP.png")} style={{ borderColor: 'skyblue', borderWidth: 2, width: 120, height: 70, position: 'absolute' }}></Image>


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
                                    <StyledText>{ruta.distance} km</StyledText>
                                </View>

                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <View style={{ padding: 20, flexDirection: 'row', justifyContent: "space-around" }} >
                                    {usuari.route_id == ruta.id && ruta.author_id != usuari.id ?
                                        <Button title="Salir de la ruta" onPress={() => {dispatch(salirseRuta(ruta.id,authToken,setReload,reload))}} />
                                        :
                                        <></>
                                    }
                                    {usuari.route_id == null ?
                                        <Button title="Unirme" onPress={() => {dispatch(unirseRuta(ruta.id,authToken, setReload, reload))}} />
                                        :
                                        <></>
                                    }
                                    {ruta.author_id == usuari.id ?
                                        <>
                                            <Button title="Editar" onPress={() => RouteEdit(ruta.id)}></Button>
                                            <Button title="Eliminar" onPress={() => {dispatch(eliminarRuta(ruta.id, authToken,setReload,reload))}}></Button>
                                        </>
                                        :
                                        <></>
                                    }
                                    <Button title="Ver" onPress={() => ShowRoute(ruta.id)}></Button>

                                </View>

                            </View>

                        </View>


                    </View>
                     : <></>

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