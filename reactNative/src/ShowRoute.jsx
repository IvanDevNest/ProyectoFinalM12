import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';

const ShowRoute = () => {
    const [ruta, setRuta] = useState([]);
    const [error, setError] = useState([]);
    const [inscripciones, setInscripciones] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    let { usuari, authToken, reload, setReload } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState(null);


    const route = useRoute();
    const objectId = route.params.objectId;

    const navigation = useNavigation();
    function RutasList() {
        navigation.navigate('RutasList');
    }

    function RouteEdit(id) {
        navigation.navigate('RouteEdit', { objectId: id });
    }
    console.log("usuariu" + JSON.stringify(usuari))

    const getRoute = async (objectId) => {

        fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET",

        })
            .then((data) => data.json())
            .then((resposta) => {
                console.log("resposta" + JSON.stringify(resposta))
                setRuta(resposta.data)
                setIsLoading(false)
            })
            .catch((data) => {
                console.log(data);
                alert("Catchch");
            });
    }

    const obtenerInscripciones = async (objectId) => {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/inscriptions/?route_id=${objectId}`, {
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

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }
    const fetchAvatar = async () => {
        const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar`);
        const response = await data.json();
        console.log("fetchavatar: " + response.image_url)
        setAvatarUrl(response.image_url);
    };


    useEffect(() => {
        getRoute(objectId);
        obtenerInscripciones(objectId);
        fetchAvatar();

    }, [reload]);

    const unirseRuta = async (objectId) => {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/routes/${objectId}/inscription`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "POST",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log(JSON.stringify(resposta))

                // setIsLoading(false)
                setReload(!reload)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }
    const salirseRuta = async (objectId) => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId + "/uninscription", {
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
            else setError(resposta.message);
        } catch (e) {
            console.log("catch: " + e.message);
            // alert("Catchch");
        };
    }

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
                RutasList()
                // setReload(!reload)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log("Catch: " + e.message);

        };
    }
    return (
        <View>
            {isLoading ?
                <Text>Cargando...</Text>
                :
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Nombre de la ruta</Text>
                    <Text>{ruta.name}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.avatar} source={{ uri: avatarUrl }}></Image>
                        <Text>{usuari.name}</Text>
                        {usuari.id_role == 4 ?
                            <Image source={require("./vip.png")} style={{ width: 50, height: 50 }}></Image>
                            : <></>
                        }

                    </View>
                    <Text style={{ fontWeight: 'bold' }}>URL maps</Text>

                    <TouchableOpacity onPress={() => Linking.openURL(ruta.url_maps)}>
                        <Text style={{ color: 'blue' }}>{ruta.url_maps}</Text>
                    </TouchableOpacity>
                
                    <Text style={{ fontWeight: 'bold' }}>Descripcion</Text>
                    <Text>{ruta.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <View>

                                <Text style={{ fontWeight: 'bold' }}>Usuarios inscritos</Text>
                                <Text>{inscripciones.length}</Text>

                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Hora de inicio</Text>
                                <Text>{ruta.start_time}</Text>

                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Duracion estimada</Text>
                            <Text>{ruta.estimated_duration}</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Distancia en Km</Text>
                            <Text>{ruta.distance}</Text>
                        </View>
                    </View>

                    {usuari.route_id == ruta.id && ruta.author_id != usuari.id ?
                        <Button title="Salir de la ruta" onPress={() => salirseRuta(objectId)} />
                        :
                        <></>
                    }
                    {usuari.route_id == null ?
                        <Button title="Unirme" onPress={() => unirseRuta(objectId)} />
                        :
                        <></>
                    }
                    {ruta.author_id == usuari.id ?
                        <>
                            <Button title="Editar" onPress={() => RouteEdit(objectId)}></Button>
                            <Button title="Eliminar" onPress={() => eliminarRuta(objectId)}></Button>
                        </> : <></>
                    }
                    {error ? <Text>{error}</Text> : <></>}



                </View>
            }
        </View>


    )

}
const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

export default ShowRoute