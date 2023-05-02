import React from 'react'
import { FlatList } from 'react-native'
import { useState } from 'react';
import { useEffect } from 'react';
import { View,Text } from 'react-native';
const RutasList = () => {
    let [rutas, setRutas] = useState("");
    let [isLoading, setIsLoading] = useState(true);

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
    <FlatList data={rutas}
    renderItem={({item:ruta})=>(
        <RutasList {...ruta}/>
    )}>
    </FlatList>

  )
}

export default RutasList