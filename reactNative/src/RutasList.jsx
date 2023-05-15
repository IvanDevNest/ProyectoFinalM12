import React, { useContext } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import RutaList from './RutaList';
import { UserContext } from './userContext';
import StyleText from './StyledText';
// import Routes from './Routes.js'
const RutasList = () => {
  let [rutas, setRutas] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let { authToken, setAuthToken, reload } = useContext(UserContext);
  let [page, setPage] = useState(1);
  let [lastpage, setLastPage] = useState("");
  const [filter, setFilter] = useState('');


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

  const getRoutes = async (page, filter) => {
    try {
      setIsLoading(true);
      let url = `http://equip04.insjoaquimmir.cat/api/routes`;

      if (filter) {
        url += `?name=${encodeURIComponent(filter)}`;
      } else if (page) {
        url += `?page=${page}`;
      }

      const data = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET",
      });

      // Resto del código
    } catch {
      // Manejo de errores
    }
  };

  useEffect(() => {
    getRoutes(page, filter)
  }, [reload, page, filter]);

  return (
    <>
      <Button title='Logout' onPress={() => sendLogout()}></Button>
      <TextInput
        placeholder="Filtrar por nombre"
        value={filter}
        onChangeText={(text) => setFilter(text)}
      />
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


export default RutasList