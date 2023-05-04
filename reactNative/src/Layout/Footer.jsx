import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';

export const Footer = () => {
  return (
    <Text>FOOTER</Text>
  )
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
