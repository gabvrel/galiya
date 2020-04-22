import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card, Text, Icon, Header } from "react-native-elements";
import GlobalContext from "../context/GlobalContext";
import * as Speech from "expo-speech";

const MainData = [
  {
    id: 0,
    label: "Lenguaje y Cognicion",
    img: require("../assets/language.jpg"),
    info: "Lenguaje y comunicacion"
  },
  {
    id: 1,
    label: "Memorizacion",
    img: require("../assets/memory.jpg"),
    info: "Memorizacion"
  },
  {
    id: 2,
    label: "En desarrollo",
    img: require("../assets/loading.jpg"),
    info: "Aguanta que aun no acabo"
  },
];

const Main = ({navigation}) => {
  const { glState, setGlState } = useContext(GlobalContext);

  useEffect(()=>{
    if(glState.audioOn){
      Speech.speak("Está es una aplicación que permitirá escoger íconos qué representan  áreas en las cuáles va iniciar la estimulación por favor selecciona una categoria")
    }
  },[])

  const helper = (type) => {
    Speech.speak(type)
  };

  const selectCategory = (category) => {
    console.log(category)
    switch(category){
      case 0:
        console.log(0)
        return navigation.navigate("Language")
      case 1:
        console.log(1)
        return navigation.navigate()
      default:
        return 
    }

  };

  return (
    <SafeAreaView style={styles.container} force>
    <Header
    leftComponent={{ icon: 'menu', color: 'black' }}
    rightComponent={{ icon: 'home', color: 'black' }}
    containerStyle={styles.header}
    />
      <ScrollView>
        {MainData.map((el, index) => {
          return (
            <TouchableOpacity key={index}
            onPress={()=>selectCategory(el.id)}>
              <Card
                containerStyle={styles.card}
                image={el.img}
                imageWrapperStyle={styles.imageStyle}
              >
                <Text style={styles.heading}>
                {el.label}
                </Text>
                <Icon
                name="question-circle"
                type="font-awesome"
                size={35}
                containerStyle={styles.icon}
                onPress={()=>helper(el.info)}
                />
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header:{
    height:60,
    paddingBottom: 25,
    backgroundColor: "white",
    borderBottomColor: "grey"
  },  
  card: {
    flex: 1,
    borderRadius: 15,
    marginTop: 15
  },
  imageStyle: {
    borderRadius: 15,
    overflow: "hidden",
  },
  heading: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "700",
  },
  icon: {
      position: "absolute",
      top: -140,
      right: 10,
      zIndex: 9
  }
});

export default Main;
