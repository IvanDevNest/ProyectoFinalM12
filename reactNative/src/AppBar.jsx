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
const AppBarTab = ({active, children, to}) => {
    return (
        <Link to={to}>
            <StyledText fontWeight='bold' style={styles.text}>
                {children}
            </StyledText>
        </Link>
    )
}

const AppBar = ()=>{
    return (
        <View style={styles.container}>
            <AppBarTab active to='/routes' fontSize='subheading' >Routes</AppBarTab>
            <AppBarTab active to='/create' fontSize='subheading' >|</AppBarTab>
            <StyledText fontSize='subheading' >Create</StyledText>
            <StyledText fontSize='subheading' >|</StyledText>
            <StyledText fontSize='subheading' >Routes</StyledText>
            <StyledText fontSize='subheading' >|</StyledText>
            <StyledText fontSize='subheading' >Create</StyledText>


        </View>
    )
}
export default AppBar