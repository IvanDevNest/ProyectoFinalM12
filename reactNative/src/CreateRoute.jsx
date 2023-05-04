import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useState } from 'react';
const CreateRoute = () => {
    const[rutas,setRutas]=useState([]);

    const { control, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = data => createRoute(data)
    const createRoute = async (formState) => {
        console.log(JSON.stringify(formState))
        //setError("");   
        try {
            const data = await fetch("http://127.0.0.1:8000/routes/", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify( formState ),
                
            });
            const resposta =  await data.json();
            if (resposta.success === true) {
                setRutas(resposta)
            }
            else setError(resposta.message);
        } catch(e) {
            console.log(e.err);
            alert(e.err);
        };
    }
    return (
        <View>
            <Text>Nombre de la ruta</Text>

            <Text>Duracion aproximda:*</Text>
            <CustomInput
                name="duracion"
                placeholder="30m-1h"
                control={control}
                rules={{ required: 'duracion is required' }}
            />

            <Text>Hora inicio</Text>
            <CustomInput
                name="hora_inicio"
                secureTextEntry
                control={control}
                rules={{
                    required: 'Hora inicio is required',
                   
                }}
            />


            <Text>Distancia</Text>
            <CustomInput
                name="Distancia"
                secureTextEntry
                placeholder="30km-35km"
                control={control}
                rules={{
                    required: 'Distancia is required',
    
                }}
            />
            <Text>Vehiculo</Text>
            <CustomInput
                name="Vehiculo"
                secureTextEntry
                placeholder="Seleccionar vehiculo.."
                control={control}
                rules={{
                    required: 'Vehiculo is required',
                }}
            />
             <Text>URL ruta Google maps(con simbolo dea ayuda para enselar como coger la url psao a paso)</Text>
            <CustomInput
                name="URL"
                secureTextEntry
                placeholder="URL..."
                control={control}
                rules={{
                    required: 'URL is required',
                }}
            /> 
            <Text>Description</Text>
            <CustomInput
                name="Description"
                secureTextEntry
                placeholder="Description.."
                control={control}
                rules={{
                    required: 'Description is required',
                }}
            />
            <Button title="Login"
                onPress={handleSubmit(onSubmit)}
            ></Button>
        </View>
    )
}

export default CreateRoute
