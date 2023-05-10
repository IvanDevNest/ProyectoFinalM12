import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//paginas
import CreateRoute from "./CreateRoute";
import RutasList from "./RutasList";
import ShowRoute from "./ShowRoute";

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="listar" component={RutasList}/>
            <Tab.Screen name="create" component={CreateRoute}/>
            <Tab.Screen name="ShowRoute" component={ShowRoute}/>
        </Tab.Navigator>
    );
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}