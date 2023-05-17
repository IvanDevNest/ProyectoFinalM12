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
// import Routes from './Routes.js'
const RutasList = () => {
  let [rutas, setRutas] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let { filterVehicle, setFilterVehicle, filterName, setFilterName, authToken, setAuthToken, reload, myAvatarUrl, setMyAvatarUrl, usuari } = useContext(UserContext);
  let [page, setPage] = useState(1);
  let [lastpage, setLastPage] = useState("");
  const [filterValueName, setFilterValueName] = useState('');
  const [filterValueVehicle, setFilterValueVehicle] = useState('');

  const [typeFilter, setTypeFilter] = useState('');

  const [selectedVehicleType, setSelectedVehicleType] = useState('');



  const { control, handleSubmit, formState: { errors }, } = useForm();

  //setmyavatarurl
  const fetchAvatar = async () => {
    const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${usuari.id}/avatar`);
    const response = await data.json();
    console.log("fetchavatar: " + response.image_url)
    setMyAvatarUrl(response.image_url);
  };

  console.log(authToken)

  const pasarPagina = async (page, lastpage) => {
    if (page !== lastpage) {
      setPage(page + 1);

    }
  }
  const retrocederPagina = async (page) => {
    if (page !== 1) {
      setPage(page - 1);

    }
  }

  const sendLogout = async () => {
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "POST",
        body: JSON.stringify({})
      });
      const resposta = await data.json();
      console.log(resposta)
      if (resposta.success === true)
        setAuthToken("");
      else alert("La resposta no ha triomfat");
    } catch {
      console.log("Error");
      alert("Catchch");
    };
  }

  const getRoutes = async (page, filterName, filterVehicle) => {
    try {
      setIsLoading(true);
      if (filterName) {
        console.log("Entra por filtro Name: " + filterName)
        url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}&name=${filterName}`;
      }
      else if (filterVehicle) {
        console.log("Entra por filtro Vehicle: " + filterVehicle)
        url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}&type_vehicle=${filterVehicle}`;
      }
      else if (page) {
        console.log("Entra sin filtro")
        console.log("PAGINA: " + page)
        url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}`;
      }

      const data = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET",


      });
      const resposta = await data.json();
      console.log("Data: " + JSON.stringify(resposta.data))
      if (resposta.success === true) {
          console.log("resposta pages" + JSON.stringify(resposta))
          setRutas(resposta.data.data)
          console.log("SetRutas: " + resposta.data.data)

          setLastPage(resposta.data.last_page)
          console.log("last page: " + resposta.data.last_page)

        setIsLoading(false)

      } else alert("La resposta no ha triomfat");


      // Resto del código
    } catch {
      // Manejo de errores
    }
  };
  const handleFilterName = (filterValueName) => {
    setPage(1);
    console.log("ultimo filtro name:" + filterValueName)
    setFilterName(filterValueName);
    setFilterVehicle("") // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
  };
  const handleFilterVehicle = (filterValueVehicle) => {
    setPage(1);
    setFilterVehicle(filterValueVehicle);
    setFilterName(""); // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
  };

  const deleteFilter = () => {
    setFilterVehicle("")
    setFilterName(""); // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
    setPage(1);
    getRoutes(page)

  };

  useEffect(() => {
    getRoutes(page, filterName, filterVehicle)
  }, [reload, page, filterName, filterVehicle]);
  useEffect(() => {
    fetchAvatar()
  }, []);
  return (
    <>
      <Button title='Logout' onPress={() => sendLogout()}></Button>

      <View>
        <Controller
          control={control}
          name="type_vehicle"
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              placeholder={{ label: 'Como quieres filtrar?', value: null }}
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


      </View>
      {typeFilter == "Nombre" ? <><TextInput
        style={styles.input}
        placeholder="Filtrar por nombre"
        value={filterValueName}
        onChangeText={(value) => setFilterValueName(value)}
      />


        <Button title="Filtrar" onPress={() => handleFilterName(filterValueName)} />
        <Button title="Borrar Filtro" onPress={deleteFilter} /></> : <View>
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
        <Button title="Filtrar" onPress={() => handleFilterVehicle(filterValueVehicle)} />
        <Button title="Borrar Filtro" onPress={deleteFilter} />


      </View>}



      {/* Resto del código */}
      {isLoading ?
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Image source={require("./Loader.gif")} style={{ width: 200, height: 100 }}></Image>
        </View>
        :
        <>
          <FlatList data={rutas}
            renderItem={({ item: ruta }) => (
              <RutaList {...ruta} />
            )}>
          </FlatList>
          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 5 }}>

            {page == 1 ? <Button title='Anterior' disabled onPress={() => retrocederPagina(page)}></Button>

              :
              <Button title='Anterior' onPress={() => retrocederPagina(page)} color={'#00ACFF'}></Button>
            }
            {page == lastpage ? <Button title='Siguiente' disabled onPress={() => pasarPagina(page, lastpage)}></Button>

              :
              <Button title='Siguiente' onPress={() => pasarPagina(page, lastpage)}></Button>
            }


          </View>
        </>}



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