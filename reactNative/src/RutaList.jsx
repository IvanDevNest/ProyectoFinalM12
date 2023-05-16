import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "./userContext";
import { FontAwesome5 } from '@expo/vector-icons'; 



const RutaList = (ruta) => {
    let { usuari, setUsuari, authToken, setReload, reload } = useContext(UserContext);
    const navigation = useNavigation();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [inscripciones, setInscripciones] = useState([])

    function ShowRoute(id) {
        navigation.navigate('ShowRoute', { objectId: id });
    }
    function RouteEdit(id) {
        navigation.navigate('RouteEdit', { objectId: id });
    }
    // console.log("ruta"+ruta.id+"usu"+JSON.stringify(usuari))

    // console.log("ruta"+ruta.author_id+"usu"+JSON.stringify(usuari.id))
    const eliminarRuta = async (id) => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            console.log(resposta)
            if (resposta.success === true) {
                console.log("Ruta eliminada correctament")
                setReload(!reload)
            }
            else setError("La resposta no ha triomfat");
        } catch (e) {
            console.log("Catch: " + e.message);

        };
    }
    const getUser = async () => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/user", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("RESPOSTA GETUSER" + JSON.stringify(resposta))
                setUsuari(resposta.user)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
        };

    }

    const obtenerInscripciones = async (id) => {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/inscriptions/?route_id=${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("Inscripciones: " + JSON.stringify(resposta))
                setInscripciones(resposta.data)
                setIsLoading(false)

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }

    const unirseRuta = async (id) => {
        console.log(id)
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id + "/inscription", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "POST",
            });
            const resposta = await data.json();
            console.log("resposta unirse ruta" + JSON.stringify(resposta))

            if (resposta.success === true) {
                // setIsLoading(false)
                setReload(!reload)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log("catch: " + e.message);
            // alert("Catchch");
        };
    }
    const salirseRuta = async (id) => {
        console.log(id)
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id + "/uninscription", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            console.log("resposta unirse ruta" + JSON.stringify(resposta))

            if (resposta.success === true) {
                setReload(!reload)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log("catch: " + e.message);
        };
    }

    useEffect(() => {
        getUser();
        obtenerInscripciones(ruta.id)
    }, [reload]);

    const numeroInscripciones = inscripciones.length;
    return (
        <>
            {isLoading ? <></>
                :
                // numeroInscripciones < ruta.max_users ?
                    <View key={(ruta.id)} style={styles.containerPadre}>

                        <View key={(ruta.id)} style={{ flexDirection: 'row', paddingBottom: 10 }}>

                            <View style={{paddingHorizontal: 60, paddingVertical: 35 }}>
                            <Image source={require("./CapturaAPP.png")} style={{ borderColor: 'skyblue', borderWidth: 2,width: 120, height: 70, position: 'absolute' }}></Image>
                            

                            </View>
                            <View style={{ flex: 1, paddingLeft: 15, }}>
                            {ruta.type_vehicle=="moto"? <FontAwesome5 name="motorcycle" size={24} color="skyblue" />:
                            <FontAwesome5 name="car" size={24} color="skyblue"/>
}


                                <StyledText>{ruta.name}</StyledText>
                                <StyledText>{ruta.description}</StyledText>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: "center" }}>
                                <StyledText>MaxUsers</StyledText>
                                <StyledText>{ruta.max_users}/10</StyledText>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <StyledText>NumStops</StyledText>
                                <StyledText>{ruta.num_stops}</StyledText>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row'}}>
                            <View style={{flexDirection:"row"}}>
                            <View style={{ alignItems: "center" }}>
                                <StyledText fontWeight='bold'>MaxUsers</StyledText>
                                <StyledText>{ruta.max_users}/10</StyledText>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <StyledText>NumStops</StyledText>
                                <StyledText>{ruta.num_stops}</StyledText>
                            </View>

                            </View>
                            
                            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                            <View style={{padding:20, flexDirection: 'row', justifyContent:"space-around"}} >
                                {usuari.route_id == ruta.id && ruta.author_id != usuari.id?
                                    <Button title="Salir de la ruta" onPress={() => salirseRuta(ruta.id)} />
                                    :
                                    <></>
                                }
                                {usuari.route_id == null ?
                                    <Button title="Unirme" onPress={() => unirseRuta(ruta.id)} />
                                    :
                                    <></>
                                }
                                {ruta.author_id == usuari.id ?
                                    <>
                                        <Button title="Editar" onPress={() => RouteEdit(ruta.id)}></Button>
                                        <Button title="Eliminar" onPress={() => eliminarRuta(ruta.id)}></Button>
                                    </>
                                    :
                                    <></>
                                }
                                <Button title="Ver" onPress={() => ShowRoute(ruta.id)}></Button>

                            </View>

                            </View>
                            
                        </View>


                    </View>
                    // : <></>

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
        flexDirection:"column"
        
    },
    buttonEliminar: {
        backgroundColor: "red",
        color: "red"
    }
})

export default RutaList