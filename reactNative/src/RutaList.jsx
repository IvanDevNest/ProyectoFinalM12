import React from "react";
import { View, Text } from "react-native";


const RutaList = (ruta) => (
    <View key={(ruta.id)}>
    <Text>{ruta.id}</Text>
    <Text>{ruta.name}</Text>
    <Text>{ruta.timetable}</Text>
    <Text>{ruta.url}</Text>
    </View>

)
export default RutaList