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


const ShowJoinedRoute = () => {
    let { usuari, authToken } = useContext(UserContext);
    const { inscripciones, isSaving = true, error = "", ruta, isLoading, page, lastpage, } = useSelector((state) => state.routes);
    const [reload, setReload] = useState(false);
    const [authorRuta, setAuthorRuta] = useState([]);

    const [avatarUrl, setAvatarUrl] = useState(null);

    dispatch = useDispatch();


    useEffect(() => {
        console.log("User: "+JSON.stringify(usuari))
        dispatch(getRoute(usuari.route_id,authToken));

    }, [usuari.route_id]);

    
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
                        <Button title="Salir de la ruta" onPress={() => {dispatch(salirseRuta(usuari.route_id,authToken,setReload,reload))}} />
                        :
                        <></>
                    }
                    {ruta.author_id == usuari.id ?
                        <>
                            <Button title="Editar" onPress={() => RouteEdit(objectId)}></Button>
                            <Button title="Eliminar" onPress={() => {dispatch(eliminarRuta(objectId, authToken,setReload,reload))}}></Button>
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


export default ShowJoinedRoute