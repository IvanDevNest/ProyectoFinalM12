import React from 'react'
import { useContext } from 'react';
import { UserContext } from './userContext';
import Header from './Layout/Header'
import { Footer } from './Layout/Footer'
import RutasList from './RutasList'
import AppBar from './AppBar';
import { View } from 'react-native';
import { Switch, Route, Redirect } from 'react-native';
import Routes from './Routes';
import CreateRoute from './CreateRoute';

export const MainPage = () => {

  return (
    <View>
      <AppBar></AppBar>
        <Switch>
          <Route path='/routes' exact>
            <RutasList></RutasList>

          </Route>
          <Route path='/create' exact>
            <CreateRoute></CreateRoute>
            
          </Route>
          <Redirect to='/'/>
        </Switch>
      <Footer></Footer>
    </View>

  )
}
