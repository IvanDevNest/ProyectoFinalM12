import React from 'react'
import { useContext } from 'react';
import { UserContext } from './userContext';
import { Button } from 'react-native';

import Header from './Layout/Header'
import { Footer } from './Layout/Footer'
import RutasList from './RutasList'
import AppBar from './AppBar';
import { View } from 'react-native';
import { Switch, Route } from 'react-native';
import Routes from './Routes';

export const MainPage = () => {

  return (
    <View>
      <AppBar></AppBar>
        <Switch>
          <Route path='/routes' exact>
            <RutasList></RutasList>

          </Route>
          <Route path='/create' exact>
            
          </Route>
          <Redirect to='/'/>
        </Switch>
      <Footer></Footer>
    </View>
    
  )
}
