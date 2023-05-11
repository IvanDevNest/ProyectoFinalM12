import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "./userContext";
import { useEffect } from "react";


const Eliminar = async (e, id) => {

    e.preventDefault();

    try {
        const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "DELETE",
        });
        const resposta = await data.json();
        console.log(resposta)
        if (resposta.success === true)
            console.log("Ruta eliminada correctament")
        else alert("La resposta no ha triomfat");
    } catch {
        console.log("Error");
        alert("Catchch");
    };
}




const RutaList = (ruta) => {
    let { usuari, setUsuari, authToken, setReload, reload } = useContext(UserContext);
    const navigation = useNavigation();

    function onPressObject(id) {
        navigation.navigate('ShowRoute', { objectId: id });
    }
    // console.log("ruta"+ruta.id+"usu"+JSON.stringify(usuari))

    // console.log("ruta"+ruta.author_id+"usu"+JSON.stringify(usuari.id))
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
                // setUsername(resposta.user.name);
                // setRoles(resposta.roles);
                setUsuari(resposta.user)
                // setUsuariId(resposta.user.id)
                // // console.log(usuari);
                // setIsLoading(false)
            }
            //   else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };

    }

    useEffect(() => {
        getUser();
    }, [reload]);



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
            // else setError(resposta.message);
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
                // setIsLoading(false)
                setReload(!reload)
            }
            // else setError(resposta.message);
        } catch (e) {
            console.log("catch: " + e.message);
            // alert("Catchch");
        };
    }
    return (
        <View key={(ruta.id)} style={styles.containerPadre}>

            <View key={(ruta.id)} style={{ flexDirection: 'row', paddingBottom: 10 }}>

                <View style={{ backgroundColor: 'red', paddingHorizontal: 60, paddingVertical: 35, borderColor: 'black', borderWidth: 2 }}>

                </View>
                <View style={{ flex: 1, paddingLeft: 15 }}>
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
                    <StyledText>  NumStops</StyledText>
                    <StyledText>  {ruta.num_stops}</StyledText>
                </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: "center" }}>
                    <StyledText fontWeight='bold'>MaxUsers</StyledText>
                    <StyledText>{ruta.max_users}/10</StyledText>
                </View>
                <View style={{ alignItems: "center" }}>
                    <StyledText>  NumStops</StyledText>
                    <StyledText>  {ruta.num_stops}</StyledText>
                </View>

                <View>
                    {usuari.route_id == ruta.id ?
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
                            <Button title="Editar"></Button>
                            <Button title="Eliminar" onPress={(e) => Eliminar(e, ruta.id)}></Button>
                        </>
                        :
                        <></>
                    }
                    {/* <Button style={styles.buttonEliminar} title="Eliminar" onPress={(e) => Eliminar(e, ruta.id)}></Button> */}
                    <Button title="Ver" onPress={() => onPressObject(ruta.id)}></Button>

                </View>
            </View>


        </View>

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
    },
    buttonEliminar: {
        backgroundColor: "red",
        color: "red"
    }
})

export default RutaList