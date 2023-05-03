import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StyledText from "./StyledText";


const RutaList = (ruta) => (
    <View key={(ruta.id)}style={{borderColor:'black', borderWidth: 1,marginBottom:10,paddingRight:90}}>

            <View key={(ruta.id)}style={{flexDirection:'row'}}>

        <View style={{backgroundColor:'red',paddingHorizontal:100, paddingVertical:50, borderColor:'black', borderWidth: 2}}>

        </View>
        <View>
            <StyledText big bold >{ruta.name}</StyledText >
            <StyledText>Descripcion</StyledText>
        </View>
        </View>
        <View style={{flexDirection:'row'}}>
            
        <View>
            <Text>Paradas</Text>
            <Text>{ruta.num_stops}</Text>
        </View>
        <View>


        <Text>Max Users</Text>
        <Text>{ruta.max_users}</Text>
            <Text>Hora: {ruta.timetable}</Text>
        </View>
        </View>
    </View>

)

const styles = StyleSheet.create({
    containerMap:{
        backgroundColor:'red',
      padding:200,
      paddingBottom:5,
      paddingTop:4,
  
    },
  })
export default RutaList