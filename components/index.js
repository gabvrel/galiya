import React, { useEffect, useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button
} from "react-native";
import * as Speech from "expo-speech";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./main/Header";
import Categories from "./main/Categories";
import Loader from "./intro/";


const initialState = {
  loadDone: false,
  category: 0
};

const Main = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const setCategory = (type) => {
    setState({...state, category:type})
  };

  const loadDone = () => {
    setState({...state, loadDone: true})
  };

  if (!state.loadDone){
    return <Loader finishLoad={loadDone} />
  } else 
  return (
    <SafeAreaView style={styles.container} force>
      <LinearGradient
        colors={["#d9b47d","#b07c54"]}
        style={{
          flex: 1,
        }}
        start={[0, 1]}
        end={[1, 0]}>
        <Header changeCategory={(type)=>setCategory(type)} mainState={state.category}/>
        <Categories navigation={navigation} mainState={state.category}/>
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});


export default Main;
