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


import { store } from './src/store'
import { Provider } from 'react-redux'

export default function App() {
  let [authToken, setAuthToken] = useState("")
  let [usuariId, setUsuariId] = useState("")
  let [usuari, setUsuari] = useState([])
  let [reload, setReload] = useState(true);
  let [filterName, setFilterName] = useState("")
  let [filterVehicle, setFilterVehicle] = useState("")
  let [myAvatarUrl, setMyAvatarUrl] = useState(null);
  let [latitudeUser, setLatitudeUser] = useState(0);
  let [longitudeUser, setLongitudeUser] = useState(0);
  let [coordsCargadas, setcoordsCargadas] = useState(false);

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ filterVehicle, setFilterVehicle, filterName, setFilterName, authToken, setAuthToken, usuariId, setUsuariId, usuari,
         setUsuari, reload, setReload, myAvatarUrl, setMyAvatarUrl,latitudeUser, setLatitudeUser,longitudeUser, setLongitudeUser,coordsCargadas, setcoordsCargadas }}>
        <View style={styles.container}>
          {authToken ?
            <>
              <Header />
              <Navigation />
            </> :
            <LoginRegister />}
          {/* <Navigation/> */}


          <StatusBar style="auto" />
        </View>
      </UserContext.Provider>
    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  }
})