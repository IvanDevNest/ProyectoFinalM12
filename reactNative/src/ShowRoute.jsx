import React from 'react'

import { useState } from 'react';
import { View,Button,Text } from 'react-native';
import { useEffect } from 'react';
const ShowRoute = (route) => {
    const [ruta, setRuta] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/routes/1", {
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




    return (
        <View>
            {isLoading ?
                <Text>Cargando...</Text>
                :
                <View>
                    <Text>{route.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>user.img_profile</Text>
                        <Text>user.name</Text>
                    </View>
                    <View>{route.URL_maps}</View>
                    <Text>{route.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text>Falta saber como cojo los usuarios que hay inscritos</Text>
                            <Text>{route.start_time}</Text>
                        </View>
                        <View>
                            <Text>{route.start_time}</Text>
                            <Text>{route.estimated_duration}</Text>
                        </View>
                    </View>
                    <Button title="Unirme" />

                </View>
            }
        </View>


    )

}
export default ShowRoute