import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";



const RutaList = (ruta) => (
    <View key={(ruta.id)}style={{borderColor:'black', borderWidth: 1,marginBottom:10, marginTop: Constants.statusBarHeight}}>

            <View key={(ruta.id)}style={{flexDirection:'row'}}>

        <View style={{backgroundColor:'red',paddingHorizontal:100, paddingVertical:50, borderColor:'black', borderWidth: 2}}>

        </View>
        <View style ={{flex:1,borderColor:'black', borderWidth: 1}       }>
            <StyledText big bold >{ruta.name}</StyledText >
            <StyledText>DescripcionDescripcionDescripcionDescripcionDescripcionDescripcion</StyledText>
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


export default RutaList