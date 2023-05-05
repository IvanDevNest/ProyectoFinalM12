import React from "react";
import { View, Text, StyleSheet,Button } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";



const RutaList = (ruta) => (
    <View key={(ruta.id)} style={styles.containerPadre}>

        <View key={(ruta.id)}style={{flexDirection:'row',paddingBottom:10}}>

            <View style={{backgroundColor:'red',paddingHorizontal:60, paddingVertical:35, borderColor:'black', borderWidth: 2}}>

            </View>
                <View style={{flex:1, paddingLeft:15}}> 
                    <StyledText>{ruta.name}</StyledText>
                    <StyledText>{ruta.description}</StyledText>
                </View>
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{alignItems:"center"}}>
            <StyledText>MaxUsers</StyledText>
            <StyledText>{ruta.max_users}/10</StyledText>
            </View>
            <View style={{alignItems:"center"}}>
            <StyledText>  NumStops</StyledText>
            <StyledText>  {ruta.num_stops}</StyledText>
            </View>

        </View>
        <View style={{flexDirection:'row',}}>
            <View style={{alignItems:"center"}}>
                <StyledText fontWeight='bold'>MaxUsers</StyledText>
                <StyledText>{ruta.max_users}/10</StyledText>
            </View>
            <View style={{alignItems:"center"}}>
                <StyledText>  NumStops</StyledText>
                <StyledText>  {ruta.num_stops}</StyledText>
            </View>
            <View style={{  marginLeft:110}}>
                <Button title="Unirme"></Button>
            </View>
        </View>
        
 
    </View>


)
const styles = StyleSheet.create({
    containerPadre:{
        padding:20,
        paddingBottom:5,
        paddingTop:5,
        borderColor:'black',
        borderWidth: 1,
        marginBottom:10,
    }
})


export default RutaList