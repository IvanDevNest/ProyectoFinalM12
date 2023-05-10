import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



//paginas
import CreateRoute from "./CreateRoute";
import RutasList from "./RutasList";
import ShowRoute from "./ShowRoute";
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
            <Tab.Screen name="ShowRoute" component={ShowRoute} />
        </Tab.Navigator>
    );
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}