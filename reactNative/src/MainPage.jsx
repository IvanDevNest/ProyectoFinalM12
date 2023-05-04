import React from 'react'
import { useContext } from 'react';
import { UserContext } from './userContext';

import Header from './Layout/Header'
import { Footer } from './Layout/Footer'
import RutasList from './RutasList'
import AppBar from './AppBar';
import { View } from 'react-native';

export const MainPage = () => {

  return (
    <View>
      <AppBar></AppBar>
      <RutasList></RutasList>
      <Footer></Footer>
    </View>

  )
}
