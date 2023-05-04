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
        paddingLeft: 5,
    }

})

const AppBar = ()=>{
    return (
        <View style={styles.container}>
            <StyledText ></StyledText>
            Routes

        </View>
    )
}
export default AppBar