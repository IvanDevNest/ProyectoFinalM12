import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el icono que deseas utilizar

export const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.border}></View> {/*Agrega una vista con un borde negro en la parte superior*/}
      <View style={styles.leftIcons}>
        <MaterialIcons name="notifications" size={30} color="#000000" />
        <MaterialIcons name="home" size={30} color="#000000" style={styles.iconMargin} />
      </View>
      <View style={styles.centerIcons}>
        <Text style={styles.plus}>+</Text>
      </View>
      <View style={styles.rightIcons}>
        <MaterialIcons name="message" size={30} color="#000000" />
        <MaterialIcons name="stars" size={30} color="#000000" style={styles.iconMargin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#ebebeb',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  leftIcons: {
    marginRight: 50,
    flexDirection: 'row',
  },
  rightIcons: {
    marginLeft: 50,
    flexDirection: 'row',
  },
  centerIcons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 40,
    color: '#00acff',
    fontWeight: 'bold',
  },
  iconMargin: {
    marginLeft: 10,
  },
  border: {
    borderTopWidth: 1, // Ancho del borde superior
    borderTopColor: 'black', // Color del borde superior
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
