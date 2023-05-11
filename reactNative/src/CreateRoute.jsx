import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import RNPickerSelect from 'react-native-picker-select';
import { UserContext } from './userContext';
import { useContext } from 'react';
const CreateRoute = () => {
    // const [rutas, setRutas] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    let { usuari, authToken,setReload,reload } = useContext(UserContext);
    const [error, setError] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm();
    function onPressObject(id) {
        navigation.navigate('ShowRoute', { objectId: id });
    }
    const onSubmit = (data) => createRoute(data);
    const createRoute = async (formState) => {
        formState.author_id = usuari.id
        console.log(JSON.stringify(formState));
        try {
            const data = await fetch('http://equip04.insjoaquimmir.cat/api/routes', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                method: 'POST',
                body: JSON.stringify(formState),
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                // setRutas(resposta);
                console.log("resposta: " + JSON.stringify(resposta))
                console.log("resposta route id: " + (resposta.data.id))

                onPressObject(resposta.data.id)
                setReload(!reload)

            }
            else setError(resposta.message);
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
            {error ? <Text>{error}</Text> : <></>}
            <Button title="Crear Ruta" onPress={handleSubmit(onSubmit)} />


        </View>
    )
}


export default CreateRoute;
