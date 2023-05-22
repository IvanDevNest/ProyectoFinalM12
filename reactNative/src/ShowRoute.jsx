import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';
import { getRoute } from './slices/routes/thunks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { salirseRuta } from "./slices/routes/thunks";
import { eliminarRuta } from "./slices/routes/thunks";
import { unirseRuta } from './slices/routes/thunks';
import { obtenerInscripciones } from "./slices/routes/thunks";
import { WebView } from 'react-native-webview';
import { set } from 'react-hook-form';
import IframePlugin from '@native-html/iframe-plugin';
import { RenderHTML } from 'react-native-render-html';


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
        obtenerDatosAuthorRuta(ruta.author_id)
    }, [])

    useEffect(() => {
        dispatch(getRoute(objectId,authToken));
        dispatch(obtenerInscripciones(objectId,authToken))
    }, [reload,ruta,inscripciones]);
    
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
                    <View>
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
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});

export default ShowRoute