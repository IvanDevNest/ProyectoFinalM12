import React, { useContext } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
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

  console.log(authToken)


  const pasarPagina = async (page) => {

    setPage(page + 1);
  }
  const retrocederPagina = async (page) => {

    setPage(page - 1);
  }

  const sendLogout = async (e) => {

    e.preventDefault();

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
  useEffect(() => {
    setIsLoading(true)

    fetch("http://equip04.insjoaquimmir.cat/api/routes?page=" + page, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET",

    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log("resposta pages" + JSON.stringify(resposta))
        setRutas(resposta.data.data)
        setLastPage(resposta.data.last_page)
        console.log(resposta.data.last_page)

        setIsLoading(false)

      })

      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });
  }, [reload, page]);


  return (
    <>
      <Button title="Logout" onPress={(e) => sendLogout(e)}></Button>
      {isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Image source={require('./Loader.gif')} style={{ width: 200, height: 230 }}></Image></View> : <View>
        <FlatList data={rutas}
          renderItem={({ item: ruta }) => (
            <RutaList {...ruta} />

          )}>
        </FlatList>
        {lastpage == 1 ?
          <></> :
          page == lastpage ?
            <Button title="Anterior" onPress={() => retrocederPagina(page)} ></Button> :
            <View>
              {page == 1 ? <Button title="Siguiente" onPress={() => pasarPagina(page)}></Button>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}><Button title="Anterior" onPress={() => retrocederPagina(page)} ></Button>
                  <Button title="Siguiente" onPress={() => pasarPagina(page, lastpage)}></Button> </View>}

            </View>


        }


      </View>}

    </>
  )
}


export default RutasList