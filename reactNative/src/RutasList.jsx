import React, { useContext } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import RutaList from './RutaList';
import { UserContext } from './userContext';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import StyleText from './StyledText';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutes, retrocederPagina, pasarPagina, deleteFilter, handleFilterName, handleFilterVehicle } from './slices/routes/thunks';
// import Routes from './Routes.js'
const RutasList = () => {
  let { filterVehicle, setFilterVehicle, filterName, setFilterName, authToken, setAuthToken, reload, latitudeUser, longitudeUser, coordsCargadas } = useContext(UserContext);

  const [filterValueName, setFilterValueName] = useState('');
  const [filterValueVehicle, setFilterValueVehicle] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const dispatch = useDispatch();
  const { isSaving = true, error = "", rutas, isLoading, page, lastpage, } = useSelector((state) => state.routes);
  const { control, handleSubmit, formState: { errors }, } = useForm();

  useEffect(() => {
    if (coordsCargadas) {
      dispatch(getRoutes(page, filterName, filterVehicle, latitudeUser, longitudeUser))
    } else {
      console.log("getRoutes " + latitudeUser, longitudeUser)
    }
  }, [reload, page, filterName, filterVehicle, coordsCargadas]);


  return (
    <>
      {coordsCargadas ? (
        <>
          <View>
            <Controller
              control={control}
              name="type_vehicle"
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value }}) => (
                <RNPickerSelect
                  placeholder={{ label: 'Sin Filtro', value: null }}
                  onValueChange={(selectedValue) => {
                    onChange(selectedValue);
                    setTypeFilter(selectedValue);
                    console.log("selected value: " + selectedValue)
                  }}
                  onBlur={onBlur}
                  items={[
                    { label: 'Nombre', value: 'Nombre' },
                    { label: 'Vehiculo', value: 'Vehiculo' }
                  ]}
                  value={typeFilter}
                />
              )}
            />
            {typeFilter === "Nombre" ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Filtrar por nombre"
                  value={filterValueName}
                  onChangeText={(value) => setFilterValueName(value)}
                />
                <Button title="Filtrar" onPress={() => { dispatch(handleFilterName(filterValueName, setFilterVehicle, setFilterName)) }} />
              </>
            ) : null}
            {typeFilter === "Vehiculo" ? (
              <View>
                <Controller
                  control={control}
                  name="type_vehicle"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <RNPickerSelect
                      placeholder={{ label: 'Elige el vehiculo:', value: null }}
                      onValueChange={(selectedValue) => {
                        onChange(selectedValue);
                        setFilterValueVehicle(selectedValue);
                        console.log("Filtro de vehiculosssssss: " + filterValueVehicle);
                      }}
                      onBlur={onBlur}
                      items={[
                        { label: 'Coche', value: 'coche' },
                        { label: 'Moto', value: 'moto' }
                      ]}
                      value={filterValueVehicle}
                    />
                  )}
                />
                <Button title="Filtrar" onPress={() => { dispatch(handleFilterVehicle(filterValueVehicle, setFilterVehicle, setFilterName)) }} />
              </View>
            ) : null}
            <Button title="Borrar Filtro" onPress={() => dispatch(deleteFilter(setFilterVehicle, setFilterName, setTypeFilter))} />



          </View>

          <>
            <FlatList
              data={rutas}
              renderItem={({ item: ruta }) => (
                <RutaList {...ruta} />
              )}
            />
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 5 }}>
              {page === 1 ? (
                <Button title='Anterior' disabled onPress={() => dispatch(retrocederPagina(page))} />
              ) : (
                <Button title='Anterior' onPress={() => dispatch(retrocederPagina(page))} color={'#00ACFF'} />
              )}
              {page === lastpage ? (
                <Button title='Siguiente' disabled onPress={() => dispatch(pasarPagina(page, lastpage))} />
              ) : (
                <Button title='Siguiente' onPress={() => dispatch(pasarPagina(page, lastpage))} />
              )}
            </View></>
        </>
      ) : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image source={require("./Loader.gif")} style={{ width: 200, height: 100 }} />
      </View>}

    </>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RutasList