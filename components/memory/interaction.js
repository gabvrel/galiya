import React, { useState, useContext, useEffect, useMemo } from "react";
import { View, StyleSheet, SafeAreaView, Image, Modal } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import Swiper from "react-native-swiper";

let handleArray = [
  {
    id: 0,
    src: require("../../assets/analisis/alimentos/pastel.jpg"),
    correct: false,
  },
  {
    id: 1,
    src: require("../../assets/analisis/alimentos/veduras.jpg"),
    correct: false,
  },
  {
    id: 2,
    src: require("../../assets/analisis/alimentos/pescado.jpg"),
    correct: false,
  },
  {
    id: 3,
    src: require("../../assets/analisis/animales/delfines.jpg"),
    correct: false,
  },
  {
    id: 4,
    src: require("../../assets/analisis/animales/oso.jpg"),
    correct: false,
  },
  {
    id: 5,
    src: require("../../assets/analisis/transporte/carro.jpg"),
    correct: false,
  },
  {
    id: 6,
    src: require("../../assets/analisis/transporte/tren.jpg"),
    correct: false,
  },
  {
    id: 7,
    src: require("../../assets/analisis/vestimenta/camiseta.jpg"),
    correct: false,
  },
  {
    id: 8,
    src: require("../../assets/analisis/vestimenta/chaqueta.jpg"),
    correct: false,
  },
  {
    id: 9,
    src: require("../../assets/analisis/vestimenta/pantalon.jpg"),
    correct: false,
  },
];

let randomChoiseArray = [
  [0, 2, 6, 4, 9],
  [1, 3, 5, 7, 8],
  [2, 5, 6, 7, 9],
];

let results = {
  correct: 0,
  incorrect: 0,
};

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

let data = shuffle(handleArray);

let payloadIndex = Math.floor(Math.random() * randomChoiseArray.length);

randomChoiseArray[payloadIndex].forEach((el, i) => {
  data[el].correct = true;
});

let startData = data.filter((el, i) => {
  return el.correct == true;
});

const initialState = {
  interaction: false,
  interData: data,
  handleCorrect: "",
  index: 0
};

const handleState = {
  isLoaded: false,
};

let interval;

const Interaction = ({ nav }) => {
  const [state, setState] = useState(initialState);
  const [load, setLoad] = useState(handleState);
  const [count, setCount] = useState(15);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setLoad({ ...load, isLoaded: true });
    interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count == 0) {
      clearInterval(interval);
      setState({ ...state, interaction: true });
    }
  }, [count]);

  const checkAnswer = (element, type) => {
    let setter = type;
    let payloadCorrect = "";

    if (setter == element.correct) {
      results.correct += 1;
      payloadCorrect = "Correcto";
    } else {
      results.incorrect += 1;
      payloadCorrect = "Incorrecto";
    }
    setState({ ...state, handleCorrect: payloadCorrect });
    if (state.index +1 == handleArray.length){
      setModalVisible(true);
    } else  {
    setChange();
    }
  };

  const setChange = () => {
    setTimeout(() => {
      setState({ ...state, handleCorrect: "", index: state.index + 1 });
    }, 500);
  };

  if (load.isLoaded) {
    if (state.interaction) {
      return (
              <View style={styles.slide1}>

              <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
              <View style={{ marginTop: 50, paddingTop:15, paddingLeft: 25, paddingRight:25 }}>
                <Text h3 style={{textAlign: "center"}}>
                  Ha finalizado exitosamente esta seccion, 
                  puede repetir esta seccion o salir al 
                  menu principal.
                </Text>
                <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 15}}>
                  <View style={{flexDirection:"column"}}>
                  <Icon
                    raised
                    name="log-out"
                    type="feather"
                    color="#f50"
                    size={45}
                    onPress={()=>nav.navigate("Main")}
                  />
                  <Text h4 style={{textAlign:"center"}}>Salir</Text>
                  </View>
                </View>
              </View>
            </Modal>

                <Text h2 style={{ marginBottom: 15 }}>
                  {state.handleCorrect}
                </Text>
                <Image source={handleArray[state.index].src} style={{ width: 275, height: 225 }} />
                <View style={{ marginTop: 15 }}>
                  <Icon
                    raised
                    name="thumbs-up"
                    type="feather"
                    color="#f50"
                    size={35}
                    onPress={() => checkAnswer(handleArray[state.index], true)}
                  />
                  <Icon
                    raised
                    name="thumbs-down"
                    type="feather"
                    color="#f50"
                    size={35}
                    onPress={() => checkAnswer(handleArray[state.index], false)}
                  />
                </View>
              </View>
      );
    } else
      return (
        <Swiper style={styles.wrapper} showsButtons loop={true}>
          {startData.map((el, index) => {
            return (
              <View key={el.id} style={styles.slide1}>
                <Text h2>{count}</Text>
                <Image source={el.src} style={{ width: 275, height: 225 }} />
                <Text h2 style={styles.text}>
                  {index + 1}
                </Text>
              </View>
            );
          })}
        </Swiper>
      );
  } else {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading....</Text>
      </View>
    );
  }
};

export default Interaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
