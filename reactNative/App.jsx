import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginRegister from './src/Auth/LoginRegister';
import { UserContext } from './src/userContext';
import { MainPage } from './src/MainPage';
import { Header } from './src/Layout/Header';
import {Footer} from './src/Layout/Footer';
import { NativeRouter } from 'react-router-native';
import CreateRoute from './src/CreateRoute';


export default function App() {
  let [authToken, setAuthToken] = useState("")
  let [usuariId, setUsuariId] = useState("")
  return (

    <UserContext.Provider value={{ authToken, setAuthToken, usuariId, setUsuariId }}>
      <View>
        <MainPage></MainPage>
      </View>
    </UserContext.Provider>


  );
}
