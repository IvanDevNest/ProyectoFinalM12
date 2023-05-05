import React from 'react'
import { useContext } from 'react';
import { UserContext } from './userContext';
import Header from './Layout/Header'
import { Footer } from './Layout/Footer'
import RutasList from './RutasList'
import AppBar from './AppBar';
import { Switch, View } from 'react-native';
import {Redirect } from 'react-native';
import Routes from './Routes';
import CreateRoute from './CreateRoute';



export const MainPage = () => {

  return (
    <View>
      <AppBar></AppBar>
        <RutasList></RutasList>

            
      <Footer></Footer>
    </View>

  )
}
