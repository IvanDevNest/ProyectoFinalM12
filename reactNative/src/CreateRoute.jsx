import React, { useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, KeyboardAvoidingView, SafeAreaView, Platform, FlatList, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import RNPickerSelect from 'react-native-picker-select';
import { UserContext } from './userContext';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { createRoute } from './slices/routes/thunks';
import * as Location from 'expo-location';
import { setError } from './slices/routes/routeSlice';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

const CreateRoute = () => {

    const dispatch = useDispatch();

    const { isSaving = true, error = "" } = useSelector((state) => state.routes);
    const onSubmit = (data) => {

        dispatch(createRoute(data, authToken, ShowRoute, date, usuari, startCoords, endCoords));
    }

    let { usuari, authToken, setReload, reload, latitudeUser, longitudeUser } = useContext(UserContext);
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors }, } = useForm();

    function ShowRoute(id) {
        navigation.navigate('ShowRoute', { objectId: id });
    }

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = "Dia " + tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = "Hora " + tempDate.getHours() + ':' + tempDate.getMinutes();
        setText(fDate + ' ' + fTime)
        console.log(fDate + '(' + fTime + ')')

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);

    };
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const minDate = new Date(currentYear, new Date().getMonth());
    const maxDate = new Date(nextYear, new Date().getMonth());
    console.log(JSON.stringify(date))


    //   console.log("lat"+latitude+"long"+longitude)
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;

        if (!startCoords) {
            // Seleccionar el primer punto
            setStartCoords(coordinate);
        } else if (!endCoords) {
            // Seleccionar el segundo punto
            setEndCoords(coordinate);
        }
    };

    const handleReset = () => {
        // Reiniciar los puntos seleccionados
        setStartCoords(null);
        setEndCoords(null);
    };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCcs-5mNo4Ywp9G3w8xH1_kMKvdquIWmiw';
    console.log(latitudeUser, longitudeUser)
    console.log(startCoords, endCoords)
    return (
        <>
            <ScrollView    >
            <View style={{flex: 1,paddingBottom: 300}}>
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
                            <Text>Fecha</Text>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{text}</Text>
                                <View style={{ flex: 2, flexDirection: 'row' }}>
                                    <Button title='Seleccionar dia' onPress={() => showMode('date')} />
                                    <Button title='Seleccionar hora' onPress={() => showMode('time')} />
                                </View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        minimumDate={minDate}
                                        maximumDate={maxDate}
                                        onChange={onChange}
                                    />
                                )}

                            </View>

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
                        Marca el inicio y el final de la ruta en el mapa
                    </Text>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{
                            width: '100%',
                            height: '40%',
                        }}
                        onPress={handleMapPress}
                        initialRegion={{
                            latitude: latitudeUser,
                            longitude: longitudeUser,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    ><MapViewDirections
                            origin={startCoords}
                            destination={endCoords}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="blue"
                        />
                        {startCoords && <Marker coordinate={startCoords} />}
                        {endCoords && <Marker coordinate={endCoords} />}
                    </MapView>
                    <Button
                        title="Volver a marcar"
                        onPress={handleReset}
                        disabled={!startCoords && !endCoords}
                    />
                    {/* <CustomInput
                name="url_maps"
                placeholder="https://www.google.com/maps/dir/?api=1&origin=..."
                control={control}
                rules={{ required: 'URL de Google Maps is required' }}
            /> */}
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
                </View>
            </ScrollView >
        </>
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