import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginRegister from './src/Auth/LoginRegister';
import { UserContext } from './src/userContext';
import { Header } from './src/Layout/Header';
import {Footer} from './src/Layout/Footer';
import { NativeRouter } from 'react-router-native';
import CreateRoute from './src/CreateRoute';
import Navigation from './src/Navigation';
import ShowRoute from './src/ShowRoute';


export default function App() {
  let [authToken, setAuthToken] = useState("")
  let [usuariId, setUsuariId] = useState("")
  let [usuari, setUsuari] = useState([])

  return (

    <UserContext.Provider value={{ authToken, setAuthToken, usuariId, setUsuariId, usuari, setUsuari }}>
      <View style={styles.container}>
        {/* {authToken ?
          <>
            <Navigation/>
          </> :
          <LoginRegister />} */}
            <Navigation/>

        {/* <CreateRoute></CreateRoute> */}
        {/* <ShowRoute></ShowRoute> */}
        {/* 
        <StatusBar style="auto" /> */}
      </View>
    </UserContext.Provider>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    justifyContent:"center",
  }
})