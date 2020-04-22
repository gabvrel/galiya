import React, {useState} from "react";
import  GlobalContext  from "./context/GlobalContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "./components/Intro";
import Main from "./components/Main";
import Language from "./components/Language";


const Stack = createStackNavigator();

const initialState = {
  audioOn: false
}

const Router = () => (
  <NavigationContainer>
        {
          <Stack.Navigator initialRouteName="Intro" 
          screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Intro" component={Intro}/>
            <Stack.Screen name="Main" component={Main}/>
            <Stack.Screen name="Language" component={Language} />
          </Stack.Navigator>
        }
  </NavigationContainer>
)

const App = () => {
  const [glState, setGlState] = useState(initialState)

  return (
    <GlobalContext.Provider value={{glState, setGlState}}>
      <Router/>
    </GlobalContext.Provider>
  );
};

export default App;
