import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { useRoute } from '@react-navigation/native';

import { View, Button, Text } from 'react-native';

const ShowRoute = () => {
    const [ruta, setRuta] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { usuari, authToken } = useContext(UserContext);



    const route = useRoute();
    const objectId = route.params.objectId;


    useEffect(() => {
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
    }, []);

    const unirseRuta = async () => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/1/inscribirse", {
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

                setIsLoading(false)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }
    return (
        <View>
            {isLoading ?
                <Text>Cargando...</Text>
                :
                <View>
                    <Text>Nombre de la ruta</Text>
                    <Text>{ruta.name}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>{usuari.img_profile}</Text>
                        <Text>{usuari.name}</Text>
                        <Text>{usuari.id_role}</Text>

                    </View>
                    <Text>URL maps</Text>
                    <Text>{ruta.URL_maps}</Text>

                    <Text>Descripcion</Text>
                    <Text>{ruta.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <View>

                                <Text>n de usuarios</Text>
                                <Text>Falta saber como cojo los usuarios que hay inscritos</Text>

                            </View>
                            <View>
                                <Text>Hora de inicio</Text>
                                <Text>{ruta.start_time}</Text>

                            </View>
                        </View>
                        <View>
                            <Text>Duracion estimada</Text>
                            <Text>{ruta.estimated_duration}</Text>
                        </View>
                        <View>
                            <Text>Km</Text>
                            <Text>{ruta.distance}</Text>
                        </View>
                    </View>

                    {ruta.author_id == usuari.id ?
                        <>
                            <Button title="Editar"></Button>
                            <Button title="Eliminar" onPress={(e) => Eliminar(e, ruta.id)}></Button>
                        </>
                        :
                        <></>
                    }
                    {usuari.id_route == null ?
                        <Button title="Unirme" onPress={() => unirseRuta()} />
                        :
                        <></>
                    }




                </View>
            }
        </View>


    )

}
export default ShowRoute