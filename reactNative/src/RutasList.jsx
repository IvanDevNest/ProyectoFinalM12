import React,{useContext} from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View,Text ,Button} from 'react-native';
import RutaList from './RutaList';
import { UserContext } from './userContext';
import StyleText from './StyledText';
import Routes from './Routes.js'
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
        <RutaList {...ruta}/>
    )}>
    </FlatList>
    </>
  )
}


export default RutasList