import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginRegister from './src/Auth/LoginRegister';
import { UserContext } from './src/userContext';
import { MainPage } from './src/MainPage';
import { Header } from './src/Layout/Header';
import {Footer} from './src/Layout/Footer';
<<<<<<< HEAD
import { NativeRouter } from 'react-router-native';
=======
import CreateRoute from './src/CreateRoute';
>>>>>>> origin/b0.2-joel


export default function App() {
  let [authToken, setAuthToken] = useState("")
  let [usuariId, setUsuariId] = useState("")
  return (
    <NativeRouter>

    <UserContext.Provider value={{ authToken, setAuthToken, usuariId, setUsuariId }}>
<<<<<<< HEAD
      <View>
        <MainPage />
  
=======
      <View style={styles.container}>
>>>>>>> origin/b0.2-joel
        {/* {authToken ?
          <>

            
             <MainPage /> 
            <CreateRoute></CreateRoute>
          </> :
<<<<<<< HEAD
          <LoginRegister />} */}
        <StatusBar/>
=======
          <LoginRegister />}  */}
            <CreateRoute></CreateRoute>
{/* 
        <StatusBar style="auto" /> */}
>>>>>>> origin/b0.2-joel
      </View>
    </UserContext.Provider>
    </NativeRouter>


  );
}
