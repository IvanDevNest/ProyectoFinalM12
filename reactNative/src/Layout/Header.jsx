import React,{ useState ,useContext,useEffect} from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants'
import { UserContext } from '../userContext';
// import logo from 'reactNative/src/logo.png';

const Header = () => {
  let [userImage, setUserImage] = useState("");
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let { setUsuari,authToken} = useContext(UserContext);

  const getUser = async ()=> {
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer '  + authToken, 
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log(JSON.stringify(resposta))
        // setUsername(resposta.user.name);
        // setRoles(resposta.roles);
         setUsuari(resposta.user)
        // setUsuariId(resposta.user.id)
        // // console.log(usuari);
        setIsLoading(false)
      }        
      else setError(resposta.message);
    } catch(e){
      console.log(e.message);
      // alert("Catchch");
    }; 
       
}
useEffect(() => {
  getUser();
},[]);


  return (
    <View style={{marginTop: Constants.statusBarHeight}}>
      {isLoading ?
        <><Text>cargando...</Text></>
        :
        <View style={styles.container}>
          {/* <Image source={logo} style={styles.logo} /> */}
          <Image source={userImage} style={styles.userImage} />
        </View>
      }
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: '#ebebeb',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 300,
    position: 'fixed',
    top: 0,
    left: 0


  },
  logo: {
    width: 40,
    height: 40,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
