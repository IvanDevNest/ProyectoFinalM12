import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Text, TextInput, KeyboardAvoidingView, SafeAreaView, Platform, FlatList, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import RNPickerSelect from 'react-native-picker-select';
import { UserContext } from './userContext';
import { useNavigation } from '@react-navigation/native';

const CreateRoute = () => {
    // const [rutas, setRutas] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    let { usuari, authToken, setReload, reload } = useContext(UserContext);
    const [error, setError] = useState("");
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }, } = useForm();
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

        }
    };

    return (
        <ScrollView>
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
                     <Controller
                        control={control}
                        name="type_vehicle"
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RNPickerSelect
                                placeholder={{ label: 'Selecciona una opción...', value: null }}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                items={[
                                    { label: 'Moto', value: 'Moto' },
                                    { label: 'Coche', value: 'Coche' }
                                ]}
                                value={value}
                            />
                        )}
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
                name="url_maps"
                placeholder="https://www.google.com/maps/dir/?api=1&origin=..."
                control={control}
                rules={{ required: 'URL de Google Maps is required' }}
            />
            <View>
                <View>
                    <Text>Velocidad de la ruta</Text>
                    <Controller
                        control={control}
                        name="id_route_style"
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RNPickerSelect
                                placeholder={{ label: 'Selecciona una opción...', value: null }}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                items={[
                                    { label: 'Del chill', value: '1' },
                                    { label: 'Animado', value: '2' },
                                    { label: 'A gas', value: '3' },
                                ]}
                                value={value}
                            />
                        )}
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
            <Controller
                control={control}
                name="max_users"
                defaultValue="10"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RNPickerSelect

                        placeholder={{ label: 'Selecciona una opción...', value: null }}
                        onValueChange={onChange}
                        onBlur={onBlur}
                        items={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                            { label: '5', value: '5' },
                            { label: '6', value: '6' },
                            { label: '7', value: '7' },
                            { label: '8', value: '8' },
                            { label: '9', value: '9' },
                            { label: '10', value: '10' },
                        ]}
                        value={value}
                    />
                )}
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

        </ScrollView >

    )
}


export default CreateRoute;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    }
})