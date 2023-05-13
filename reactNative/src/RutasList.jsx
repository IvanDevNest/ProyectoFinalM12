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


  const pasarPagina = async (page,lastpage) => {

    if(page !== lastpage){
      setPage(page + 1);

    }
   
    

    
  }
  const retrocederPagina = async (page) => {
    
    if(page !== 1){
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
  const obtenerInscripciones = async (id) => {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/inscriptions/?route_id=${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("Inscripciones: " + JSON.stringify(resposta))
                setInscripciones(resposta.data)
                setIsLoading(false)

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    }
    const getRoutes = async (page) => {
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
    }
  useEffect(() => {
   getRoutes(page)
  }, [reload, page]);

  return (
    <>
    <Button title='Logout' onPress={() => sendLogout()}></Button>
      {isLoading? <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
        <Image source={require("./Loader.gif")} style={{width:200, height:100}}></Image>
        </View>:<>
      <FlatList data={rutas}
          renderItem={({ item: ruta }) => (
                <RutaList {...ruta} />
          )}>
        </FlatList>
        <View style={{flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent:'space-around', paddingVertical:5}}>

        {page==1? <Button title='Anterior' disabled onPress={() => retrocederPagina(page)}></Button>

        :
        <Button title='Anterior' onPress={() => retrocederPagina(page)  }></Button>
        }
        {page==lastpage? <Button title='Siguiente' disabled onPress={() => pasarPagina(page,lastpage)}></Button>

        :        
        <Button title='Siguiente' onPress={() => pasarPagina(page,lastpage)}></Button>
        }

        
      </View></>}
        
       

    </>
  )
}


export default RutasList