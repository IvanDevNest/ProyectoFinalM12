import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";
const Eliminar = async (e,id) => {
    
    e.preventDefault();

    try {
    const data = await fetch("http://127.0.0.1:8000/api/routes/"+id, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "DELETE",
    });
    const resposta = await data.json();
    console.log(resposta)
      if (resposta.success === true) 
        console.log("Ruta eliminada correctament")
      else alert("La resposta no ha triomfat");
  }catch{
    console.log("Error");
    alert("Catchch");
  };
}



const RutaList = (ruta) => (
    <View key={(ruta.id)} style={styles.containerPadre}>

        <View key={(ruta.id)} style={{ flexDirection: 'row', paddingBottom: 10 }}>

            <View style={{ backgroundColor: 'red', paddingHorizontal: 60, paddingVertical: 35, borderColor: 'black', borderWidth: 2 }}>

            </View>
            <View style={{ flex: 1, paddingLeft: 15 }}>
                <StyledText>{ruta.name}</StyledText>
                <StyledText>{ruta.description}</StyledText>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: "center", flex:1 }}>
                <StyledText>MaxUsers</StyledText>
                <StyledText>{ruta.max_users}/10</StyledText>
            </View>
            <View style={{ alignItems: "center" }}>
                <StyledText>  NumStops</StyledText>
                <StyledText>  {ruta.num_stops}</StyledText>
            </View>

        </View>
        <View style={{ flexDirection: 'row'}}>
            <View style={{ alignItems: "center", flex:1}}>
                <StyledText fontWeight='bold'>MaxUsers</StyledText>
                <StyledText>{ruta.max_users}/10</StyledText>
            </View>
            <View style={{ alignItems: "center"}}>
                <StyledText>  NumStops</StyledText>
                <StyledText>  {ruta.num_stops}</StyledText>
            </View>

            <View>
                <Button title="Unirme"></Button>
                <Button style={styles.buttonEliminar} title="Eliminar" onPress={(e) => Eliminar(e,ruta.id)}></Button>
            </View>
        </View>


    </View>


)
const styles = StyleSheet.create({
    containerPadre: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
    },
    buttonEliminar: {
        backgroundColor:"red",
        color:"red"
    }
})

export default RutaList