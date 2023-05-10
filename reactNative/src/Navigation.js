import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// import { View, ActivityIndicator } from "react-native";




//paginas
import CreateRoute from "./CreateRoute";
import RutasList from "./RutasList";
import ShowRoute from "./ShowRoute";
// import { AuthContext } from "./AuthContext";
// import LoginRegister from "./Auth/LoginRegister";
const HomeStackNavigator = createNativeStackNavigator();
function MyStack() {
    return (
        <HomeStackNavigator.Navigator
        initialRouteName="listarScreen">
            <HomeStackNavigator.Screen
                name="listarScreen"
                component={RutasList}
            />
            <HomeStackNavigator.Screen
                name="ShowRoute"
                component={ShowRoute}
            />
        </HomeStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {

    return (
        <Tab.Navigator
            initialRouteName="listar"
            screenOptions={{
                tabBarActiveTintColor: 'skyblue',


            }}>
            <Tab.Screen name="listar" component={MyStack}
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
        </Tab.Navigator>
    );
}
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
            <MyTabs/>
        </NavigationContainer>
    )
}