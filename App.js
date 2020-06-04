import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from "react-native-elements";
import Main from "./components";
import Language from "./components/language";
import Analisis from "./components/analisis";
import Letters from "./components/letters";
import Memory from "./components/memory";
import memorySound from "./components/memorySound";
import Info from "./components/info";

const Stack = createStackNavigator();

const Router = props => (
    <NavigationContainer>
      {
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown:false,
            }}
          />
          <Stack.Screen
          name="Language"
          component={Language}
          options={{
            title: "Prevencion contra el Covid-19",
            headerTransparent:true,
            headerTitleStyle:{color: "white"},
            headerTintColor:"white"
          }}
          />
          <Stack.Screen
          name="Analisis"
          component={Analisis}
          options={{
            title: "Analisis Selectivo",
            headerTransparent:true,
            headerTitleStyle:{color: "white"},
            headerTintColor:"white"
          }}
          />
          <Stack.Screen
          name="Letters"
          component={Letters}
          options={{
            title: "Sopa Letras",
            headerTransparent:true,
            headerTitleStyle:{color: "white"},
            headerTintColor:"white"
          }}
          />
          <Stack.Screen
          name="Memorise"
          component={Memory}
          options={{
            title: "Memorizacion",
            headerTransparent:true,
            headerTitleStyle:{color: "white"},
            headerTintColor:"white"
          }}
          />
          <Stack.Screen
          name="MemorySound"
          component={memorySound}
          options={{
            title: "Memorizacion por sonido",
            headerTransparent:true,
            headerTitleStyle:{color: "white"},
            headerTintColor:"white"
          }}
          />
          <Stack.Screen
          name="Info"
          component={Info}
          options={{
            title: "Acerca de Galiya",
            headerTransparent:true,
            headerTitleStyle:{color: "white"},
            headerTintColor:"white"
          }}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
);

const App = () => {
  return (
      <Router />
  );
};

export default App;
