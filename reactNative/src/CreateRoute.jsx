import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import RNPickerSelect from 'react-native-picker-select';

const CreateRoute = () => {
    const [rutas, setRutas] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
  
     const { control, handleSubmit, formState: { errors }, } = useForm();
     const onSubmit = data => createRoute(data)
     const createRoute = async (formState) => {
         console.log(JSON.stringify(formState))
         setError("");   
         try {
             const data = await fetch("http://127.0.0.1:8000/routes/", {
                 headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                 },
                 method: "POST",
                 body: JSON.stringify(formState),

             });
             const resposta = await data.json();
             if (resposta.success === true) {
                 setRutas(resposta)
             }
             else setError(resposta.message);
         } catch (e) {
             console.log(e.err);
             alert(e.err);
         };
     }

    

    return (
        <View>
            <Text>Informacion de la ruta</Text>
            <Text>Nombre de la ruta</Text>
            <CustomInput
                name="name"
                placeholder="30m-1h"
                control={control}
                rules={{ required: 'duracion is required' }}
            />
            <Text>Hora inicio</Text>
            <CustomInput
                name="start_time"
                placeholder=""
                control={control}
                rules={{ required: 'duracion is required' }}
            />

            <Text>Duracion estimada</Text>
            <CustomInput
                name="estimated_duration"
                secureTextEntry
                control={control}
                rules={{
                    required: 'Duracion estimada is required',

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
         
                <Text >Selecciona una opción:</Text>
                 <RNPickerSelect
                    placeholder={{ label: 'Selecciona una opción...', value: null }}
                    onValueChange={(value) => setSelectedValue(value)}
                    items={[ 
                        { label: 'Motiko', value: '1' },
                        { label: 'Cochesitu', value: '2' }
                    ]}
                    value={selectedValue}
                /> 
          

            {/* <CustomInput
                name="Vehiculo"
                secureTextEntry
                placeholder="Seleccionar vehiculo.."
                control={control}
                rules={{
                    required: 'Vehiculo is required',
                }}
            /> */}
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
            <Text>Velocidad de la ruta</Text>
            <CustomInput
                name="id_route_style"
                secureTextEntry
                placeholder="caracol.."
                control={control}
                rules={{
                    required: 'Velocidad de la ruta is required',
                }}
            />
            <Text>Numero de paradas</Text>
            <CustomInput
                name="num_stops"
                secureTextEntry
                placeholder="Paradas.."
                control={control}
                rules={{
                    required: 'Numero de paradas is required',
                }}
            />
            <Text>Maximo de participantes</Text>
            <CustomInput
                name="max_users"
                secureTextEntry
                placeholder="10"
                control={control}
                rules={{
                    required: 'Maximo de participantes is required',
                }}
            />
            <Text>Description</Text>
            <CustomInput
                name="description"
                secureTextEntry
                placeholder="Description.."
                control={control}
                rules={{
                    required: 'Description is required',
                }}
            />
            <Button title="Enviar Formulario"
                onPress={handleSubmit(onSubmit)}
            ></Button>
        </View>
    )
}

export default CreateRoute
