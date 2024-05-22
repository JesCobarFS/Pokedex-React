import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5"
import { Image } from "react-native";

//navegacion
import FavoriteNavigation from "./navigation/FavoriteNavigation";
import PokedexNavigation from "./navigation/PokedexNavigation";
import AccountNavigation from "./navigation/AccountNavigation";



const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <Tab.Navigator initialRouteName="PokedexNavigation">

            <Tab.Screen name="favoriteNavigation" component={FavoriteNavigation} options={{
                tabBarLabel:"Favoritos",
                headerShown:false,
                tabBarIcon:({color, size}) => (
                    <Icon name="heart" color={color} size={size}/>
                )
            }}/>

            <Tab.Screen name="PokedexNavigation" component={PokedexNavigation} options={{
                tabBarLabel:"",
                headerShown:false,
                tabBarIcon: () => renderPokeball()
            }}/>

            <Tab.Screen name="AccountNavigation" component={AccountNavigation} options={{
                tabBarLabel:"Mi cuenta",
                headerShown:false,
                tabBarIcon: ({color, size}) => (
                    <Icon name="user" color={color} size={size}/>
                ) 
            }}/>
        </Tab.Navigator>
    );
}


function renderPokeball() {
    return(
        <Image
            source={ require('../assets/pokeball.png') }
            style={{ width: 75, height: 75, top: -15}}
        />
    )
}
