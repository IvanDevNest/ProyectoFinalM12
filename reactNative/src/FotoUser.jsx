import React from "react"
import { View, Text, Button, Image } from 'react-native';
const RutaList = (foto) => {

    return (
       <View>
                <Image style={{borderColor:'grey', borderWidth:2, width:150, height:100,margin:5}} source={{ uri:foto.foto}} ></Image>


       </View>

    )


}


export default RutaList