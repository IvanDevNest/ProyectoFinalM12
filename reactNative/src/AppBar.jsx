import React from "react";
import {StyleSheet} from "react-native"
import StyledText from "./StyledText"
import Constants from "expo-constants";
import { View } from "react-native";

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
            <StyledText fontSize='subheading' >Routes</StyledText>
            <StyledText fontSize='subheading' >|</StyledText>
            <StyledText fontSize='subheading' >Create</StyledText>
            <StyledText fontSize='subheading' >|</StyledText>
            <StyledText fontSize='subheading' >Routes</StyledText>
            <StyledText fontSize='subheading' >|</StyledText>
            <StyledText fontSize='subheading' >Create</StyledText>


        </View>
    )
}
export default AppBar