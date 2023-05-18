import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useState } from "react";
import { UserContext } from "./userContext";
import { useEffect } from "react";

import { FontAwesome5 } from '@expo/vector-icons';


// import { View, ActivityIndicator } from "react-native";




//paginas
import CreateRoute from "./CreateRoute";
import RutasList from "./RutasList";
import ShowRoute from "./ShowRoute";
import RouteEdit from "./RouteEdit";
import UserEdit from "./UserEdit";
import ShowUser from "./ShowUser";
import ShowMyUser from "./ShowMyUser";
import Chat from "./Chat/Chat";
import { Ionicons } from '@expo/vector-icons'; 
import Paginavip from "./Paginavip";
import ShowJoinedRoute from "./ShowJoinedRoute";

// import { AuthContext } from "./AuthContext";
// import LoginRegister from "./Auth/LoginRegister";
const HomeStackNavigator = createNativeStackNavigator();
function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="RutasList" screenOptions={{ headerShown: false }}>
            <HomeStackNavigator.Screen
                name="RutasList"
                component={RutasList}
            />
            <HomeStackNavigator.Screen
                name="ShowRoute"
                component={ShowRoute}
            />
            <HomeStackNavigator.Screen
                name="RouteEdit"
                component={RouteEdit}
            />
            <HomeStackNavigator.Screen
                name="ShowUser"
                component={ShowUser}
            />
            <HomeStackNavigator.Screen
                name="ShowMyUser"
                component={ShowMyUser}
            />
            <HomeStackNavigator.Screen
                name="UserEdit"
                component={UserEdit}
            />

        </HomeStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    const [showJoinedRoute, setShowJoinedRoute] = useState(false);
    let { usuari, authToken } = useContext(UserContext);

    

    useEffect(() => {
      // Lógica para determinar si se muestra la pantalla "Joined"
      // Obtén el usuario desde alguna fuente de datos
      console.log("RouteID: "+usuari.route_id)
  
      if (usuari.route_id != null) {
        setShowJoinedRoute(true);
      } else {
        setShowJoinedRoute(false);
      }
      console.log("Joined Route: "+showJoinedRoute)
    }, [usuari.route_id]);
  
    return (
        <Tab.Navigator 
        
            initialRouteName="listar"
            screenOptions={{
                tabBarActiveTintColor: 'skyblue',
                tabBarInactiveTintColor: 'black',
                headerShown: false

            }}>
            <Tab.Screen name="Lista de las rutas" component={MyStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color} />)
                }} />
            <Tab.Screen name="create" component={CreateRoute}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="add-road" size={size} color={color} />)

                }}
            />
            <Tab.Screen name="user" component={ShowMyUser}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-circle" size={size} color={color} />)

                }}
            />
            {showJoinedRoute && (
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
            ),
          }}
        />
      )}
            <Tab.Screen name="Vip" component={Paginavip}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="diamond" size={24} color="#D4AF37"/>)
                }}
            />
             {showJoinedRoute && (
        <Tab.Screen
          name="Joined"
          component={ShowJoinedRoute}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="map-marker-alt" size={24} color="black" />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
export default function Navigation() {

    // const {isLoading, authToken} = useContext(AuthContext)
    // if (isLoading){
    //     <View style={{flex:1,justifyContent:"center",alignItems:"center" }}>
    //         <ActivityIndicator sieze={'large'}/>
    //     </View>
    // }
    return (
        <NavigationContainer>
            {/* {authToken !== null ? <MyTabs/> : <LoginRegister/>} */}
            <MyTabs />
        </NavigationContainer>
    )
}