import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { View,Text,Button } from 'react-native';
import { UserContext } from './userContext';

const RutasList = () => {
    let [rutas, setRutas] = useState("");
    let [isLoading, setIsLoading] = useState(true);
    let { authToken, setAuthToken } = useContext(UserContext);

  const sendLogout = async (e) => {
    
    e.preventDefault();

    try {
    const data = await fetch("http://127.0.0.1:8000/api/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer '  + authToken, 
      },
      method: "POST",
      body: JSON.stringify({ })
    });
    const resposta = await data.json();
    console.log(resposta)
      if (resposta.success === true) 
      setAuthToken("");
      else alert("La resposta no ha triomfat");
  }catch{
    console.log("Error");
    alert("Catchch");
  };
}
///////////////////////////////////////////////////////
    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/routes", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET",
    
        })
          .then((data) => data.json())
          .then((resposta) => {
            console.log(resposta)
            setRutas(resposta.data)
            console.log("entra")
            setIsLoading(false)
          
          })
    
          .catch((data) => {
            console.log(data);
            alert("Catchch");
          });
      }, []);
    
  return (
    <>
    <Button title="Logout" onPress={(e)=>sendLogout(e)}></Button>
    <FlatList data={rutas}
    renderItem={({item:ruta})=>(
        <View key={(ruta.id)}>
        <Text>{ruta.id}</Text>
        <Text>{ruta.name}</Text>
        <Text>{ruta.timetable}</Text>
        <Text>{ruta.url}</Text>

        </View>
    )}>
    </FlatList>
    </>
  )
}

export default RutasList