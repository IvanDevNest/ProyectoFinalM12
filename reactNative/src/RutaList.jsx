import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";



const RutaList = (ruta) => (
    <View>
        <StyledText fontSize="body">{ruta.name}</StyledText>
    </View>

)


export default RutaList