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

    const getRoute = async (objectId) => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("resposta" + JSON.stringify(resposta))
                setRuta(resposta.data)
                await obtenerDatosAuthorRuta(resposta.data.author_id)
                setIsLoading(false)
            } else {
                setError(resposta.message);
            }
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }

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
                console.log("fetchavatar: " + resposta)
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
            if (resposta.success === true) {
                console.log("RESPOSTA GETAUTHORUSER" + JSON.stringify(resposta))
                setAuthorRuta(resposta.data)
            }
            else console.log("mensage error getuserlooking:"+resposta.message);
        } catch (e) {
            console.log(e.message);
        };

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
                // console.log("Inscripciones: " + JSON.stringify(resposta))
                setInscripciones(resposta.data)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }


    useEffect(() => {
        getRoute(objectId);
        obtenerInscripciones(objectId);
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
                // console.log(JSON.stringify(resposta))
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
            // console.log("resposta unirse ruta" + JSON.stringify(resposta))

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
                                <Text style={{ fontWeight: 'bold' }}>Fecha</Text>
                                <Text>{ruta.date}</Text>

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
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default ShowRoute