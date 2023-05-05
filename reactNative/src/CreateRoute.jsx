import React, { useState } from 'react';
import { View,  Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import RNPickerSelect from 'react-native-picker-select';

const CreateRoute = () => {
    const [rutas, setRutas] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

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
                console.log("okey")
         } 
        // else setError(resposta.message);
        } catch (e) {
            console.log(e.err);
            alert(e.err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Información de la ruta</Text>
            <Text style={styles.label}>Nombre de la ruta</Text>
            <CustomInput
                name="name"
                 placeholder="Nombre de la ruta"
                control={control}
                rules={{ required: 'duracion is required' }}
                style={styles.input}
            />
            <View style={styles.row}>
                <View style={[styles.col, { marginRight: 5 }]}>
                    <Text style={styles.label}>Hora inicio</Text>
                    <CustomInput
                        name="start_time"
                        control={control}
                        rules={{ required: 'duracion is required' }}
                        style={styles.halfInput}
                    />
                </View>
                <View style={styles.col}>
                    <Text style={styles.label}>Vehículo</Text>
                    <CustomInput
                        name="type_vehicle"
                        control={control}
                        rules={{ required: 'duracion is required' }}
                        style={styles.halfInput}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.col, { marginRight: 5 }]}>
                    <Text style={styles.label}>Distancia aproximada</Text>
                    <CustomInput
                        name="distance"
                        
                         placeholder="30km-35km"
                        control={control}
                        rules={{
                            required: 'Distancia es requerida',
                        }}
                        style={styles.halfInput}
                    />
                </View>
                <View style={styles.col}>
                    <Text style={styles.label}>Duración</Text>
                    <CustomInput
                        name="estimated_duration"
                        control={control}
                        rules={{
                            required: 'Duración es requerida',
                        }}
                        style={styles.halfInput}
                    />
                </View>
            </View>
            <Text style={styles.label}>
                URL de Google Maps con símbolo de ayuda para enseñar cómo coger la URL
            </Text>
            <CustomInput
                name="URL_maps"
                 placeholder="https://www.google.com/maps/dir/?api=1&origin=..."
                control={control}
                rules={{ required: 'URL de Google Maps is required' }}
                style={styles.input}
            />
            <View style={styles.row}>
                <View style={[styles.col, { marginRight: 5 }]}>
                    <Text style={styles.label}>Velocidad de la ruta</Text>
                    <CustomInput
                        name="id_route_style"
                         placeholder="lento.."
                        control={control}
                        rules={{
                            required: 'Velocidad de la ruta es requerida',
                        }}
                        style={styles.halfInput}
                    />
                </View>
                <View style={styles.col}>
                    <Text style={styles.label}>Numero de paradas</Text>
                    <CustomInput
                        name="num_stops"
                        
                        control={control}
                        rules={{
                            required: 'Numero de paradas es requerida',
                        }}
                        style={styles.halfInput}
                    />
                </View>
           
                  
            </View>
            <Text style={styles.label}>Maximo de personas</Text>
                    <CustomInput
                        name="max_users"
                        control={control}
                        rules={{
                            required: 'Maximo de personas es requerida',
                        }}
                        style={styles.halfInput}
                    />
            <Text style={styles.label}>Descripción</Text>
            <CustomInput
                name="description"
                 placeholder="Descripción de la ruta"
                control={control}
                rules={{ required: 'Descripción is required' }}
                style={styles.input}
            />

            <Button title="Crear Ruta" onPress={handleSubmit(onSubmit)} />

    
        </View>
    )
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },

    container: {
        backgroundColor:'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    halfWidthContainer: {
        width: '48%',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'purple',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
// });


export default CreateRoute;
