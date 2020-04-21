import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card, Text, Tile, Icon } from "react-native-elements";
import GlobalContext from "../context/GlobalContext";

const MainData = [
  {
    id: 0,
    label: "Lenguaje y Cognicion",
    img: require("../assets/language.jpg"),
  },
  {
    id: 1,
    label: "Memorizacion",
    img: require("../assets/memory.jpg"),
  },
  {
    id: 2,
    label: "En desarrollo",
    img: require("../assets/loading.jpg"),
  },
];

const Main = () => {
  useEffect(()=>{
    console.log(GlobalContext)
  },[])
  return (
    <SafeAreaView style={styles.container} force>
      <ScrollView>
        {MainData.map((el, index) => {
          return (
            <TouchableOpacity key={index}>
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
                onPress={()=>{
                    console.log("question")
                }}
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
    marginTop: 25
  },
  card: {
    flex: 1,
    borderRadius: 15,
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
