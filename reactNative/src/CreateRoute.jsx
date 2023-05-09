import React, { useState } from 'react';
import { View,  Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import RNPickerSelect from 'react-native-picker-select';
import { UserContext } from './userContext';
import { useContext } from 'react';
const CreateRoute = () => {
    const [rutas, setRutas] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    let {usuari,authToken} = useContext(UserContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => createRoute(data);
    const createRoute = async (formState) => {
        console.log(JSON.stringify(formState));
        // setError('');
        try {
            const data = await fetch('http://127.0.0.1:8000/api/routes', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(formState),
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                setRutas(resposta);
                console.log("resposta: "+ JSON.stringify(resposta))
         } 
        // else setError(resposta.message);
        } catch (e) {
            console.log(e.err);
            alert(e.err);
        }
    };

    return (
        <View>
            <Text>Información de la ruta</Text>
            <Text>Nombre de la ruta</Text>
            <CustomInput
                name="name"
                placeholder="Nombre de la ruta"
                control={control}
                rules={{ required: 'duracion is required' }}
                
            />
            <View >
                <View>
                    <Text>Hora inicio</Text>
                    <CustomInput
                        name="start_time"
                        control={control}
                        rules={{ required: 'duracion is required' }}
                       
                    />
                </View>
                <View>
                    <Text>Vehículo</Text>
                    <CustomInput
                        name="type_vehicle"
                        control={control}
                        rules={{ required: 'duracion is required' }}
                    />
                    </View>
            </View>

            <View>
                <View>
                    <Text>Distancia aproximada</Text>
                    <CustomInput
                        name="distance"
                        
                         placeholder="30km-35km"
                        control={control}
                        rules={{
                            required: 'Distancia es requerida',
                        }}
                    />
                </View>
                <View>
                    <Text>Duración</Text>
                    <CustomInput
                        name="estimated_duration"
                        control={control}
                        rules={{
                            required: 'Duración es requerida',
                        }}
                    />
                </View>
            </View>
            <Text>
                URL de Google Maps con símbolo de ayuda para enseñar cómo coger la URL
            </Text>
            <CustomInput
                name="URL_maps"
                 placeholder="https://www.google.com/maps/dir/?api=1&origin=..."
                control={control}
                rules={{ required: 'URL de Google Maps is required' }}
            />
            <View>
                <View>
                    <Text>Velocidad de la ruta</Text>
                    <CustomInput
                        name="id_route_style"
                         placeholder="lento.."
                        control={control}
                        rules={{
                            required: 'Velocidad de la ruta es requerida',
                        }}
                    />
                </View>
                <View>
                    <Text>Numero de paradas</Text>
                    <CustomInput
                        name="num_stops"
                        
                        control={control}
                        rules={{
                            required: 'Numero de paradas es requerida',
                        }}
                    />
                </View>
           
                  
            </View>
            <Text>Maximo de personas</Text>
                    <CustomInput
                        name="max_users"
                        control={control}
                        rules={{
                            required: 'Maximo de personas es requerida',
                        }}
                    />
            <Text>Descripción</Text>
            <CustomInput
                name="description"
                 placeholder="Descripción de la ruta"
                control={control}
                rules={{ required: 'Descripción is required' }}
               
            />

            <Button title="Crear Ruta" onPress={handleSubmit(onSubmit)} />

    
        </View>
    )
}


export default CreateRoute;
