import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginRegister from './src/Auth/LoginRegister';
import { UserContext } from './src/userContext';
import { NativeRouter } from 'react-router-native';
import CreateRoute from './src/CreateRoute';
import Navigation from './src/Navigation';
import ShowRoute from './src/ShowRoute';
import Header from './src/Header';


export default function App() {
  let [authToken, setAuthToken] = useState("")
  let [usuariId, setUsuariId] = useState("")
  let [usuari, setUsuari] = useState([])
  let [reload, setReload] = useState(true);
  let [filterName, setFilterName] = useState("")
  let [filterVehicle, setFilterVehicle] = useState("")


  return (

    <UserContext.Provider value={{ filterVehicle, setFilterVehicle, filterName, setFilterName, authToken, setAuthToken, usuariId, setUsuariId, usuari, setUsuari ,reload, setReload}}>
      <View style={styles.container}>
        {authToken ?
          <>
            <Header/>
            <Navigation/>
          </> :
          <LoginRegister />} 
            {/* <Navigation/> */}
           
        
        <StatusBar style="auto" />
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