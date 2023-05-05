import React from "react";
import {StyleSheet} from "react-native"
import StyledText from "./StyledText"
import Constants from "expo-constants";
import { View } from "react-native";
import { Link } from "react-router-native";




const styles =StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight + 5,
        backgroundColor:"grey",
        paddingBottom: 5,
        flexDirection:'row',
        paddingHorizontal:40,
        justifyContent:"space-between"

    }

})


const AppBar = ()=>{
    return (
        <View style={styles.container}>


        </View>
    )
}
export default AppBar