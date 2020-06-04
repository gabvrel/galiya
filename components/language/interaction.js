import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { Card, Text, Icon } from "react-native-elements";

const items = [
  {
    id: 0,
    name: "Salir solo cuado sea caluroso",
    code: -1,
    correct: false,
    img: require("../../assets/language/calor.jpg"),
    info: "Es falso que el virus no se propage con altas temperaturas",
  },
  {
    id: 1,
    name: "Usar hojas de eucalipto",
    code: -1,
    correct: false,
    img: require("../../assets/language/hojas-eucalipto.jpg"),
    info:
      "Aunque tenga propiedades medicinales no ayuda a combatir ni prevenir el Covid-19",
  },
  {
    id: 2,
    name: "Dejar a los niños salir libremente",
    code: -1,
    correct: false,
    img: require("../../assets/language/ninos.jpg"),
    info:
      "Aunque los niños no esten dentro del grupo de peligro ellos pueden contagiar a otros que si esten",
  },
  {
    id: 3,
    name: "Automedicarse",
    code: -1,
    correct: false,
    img: require("../../assets/language/pildoras.jpg"),
    info: "La automedicacion puede resultar faltal",
  },
  {
    id: 4,
    name: "Desinfectar ropa y articulos",
    code: 5,
    correct: true,
    img: require("../../assets/language/Desinfectar.jpg"),
    info: "Antes de entrar a casa desinfecte su ropa y compras",
  },
  {
    id: 5,
    name: "Cuando regrese a su casa",
    code: 4,
    correct: true,
    img: require("../../assets/language/home.jpg"),
    info: "Una vez termine sus actividades en el exterior",
  },
  {
    id: 6,
    name: "Distancia Social",
    code: 2,
    correct: true,
    img: require("../../assets/language/distance.png"),
    info: "Siempre mantenga una distancia de al menos 2 metros entre personas",
  },
  {
    id: 7,
    name: "Lavarse las manos con jabon liquido",
    code: 6,
    correct: true,
    img: require("../../assets/language/jabon_liquido.jpg"),
    info: "Siempre lave sus manos despues de llegar a casa",
  },
  {
    id: 8,
    name: "Tener Alcohol",
    code: 3,
    correct: true,
    img: require("../../assets/language/alcohol.jpg"),
    info:
      "Simpre lleve consigo alcohol o desifectante cuando se disponga a salir",
  },
  {
    id: 9,
    name: "Use guantes, gorras, gafas",
    code: 1,
    correct: true,
    img: require("../../assets/language/guantes.jpg"),
    info: "Es recomendable usar guantes, guafes para salir a la calle",
  },
  {
    id: 10,
    name: "Usar Mascarillas",
    code: 0,
    correct: true,
    img: require("../../assets/language/mascarilla.jpg"),
    info: "Es primordial el uso de mascarilla certificada para salir",
  },
];

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const initialPayload = {
  payloadCorrect: "",
  payloadNumber: 0,
  payloadInfo: "",
};

const initialState = {
  testArray: shuffle(items),
  payloadNumber: 0,
};

// Gab make it automatic
let correctAnswers = 7;

const Interaction = ({nav}) => {
  const [state, setState] = useState(initialState);
  const [payload, setPayload] = useState(initialPayload);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (state.payloadNumber == correctAnswers) {
      finish();
    }
  }, [state.payloadNumber]);

  const checkResult = (el) => {
    if (el.code === state.payloadNumber) {
      delItem(el);
      setPayload({
        ...payload,
        payloadCorrect: "Correcto!",
        payloadInfo: el.info,
      });
    } else if (el.correct) {
      setPayload({
        ...payload,
        payloadCorrect: "Orden Incorrecto!",
        payloadInfo: "Seleccione bien el orden",
      });
    } else {
      setPayload({
        ...payload,
        payloadCorrect: "Incorrecto!",
        payloadInfo: el.info,
      });
    }
    restartNull();
  };

  const delItem = (item) => {
    let payload = state.testArray;
    let finalArray = payload.filter((el, i) => {
      return el.id !== item.id;
    });
    setState({
      ...state,
      testArray: finalArray,
      payloadNumber: state.payloadNumber + 1,
    });
  };

  const restartNull = () => {
    setTimeout(() => {
      setPayload({ ...payload, payloadCorrect: "", payloadInfo: "" });
    }, 10000);
  };

  const finish = () => {
    setModalVisible(true);
  };

  const reset = () => {
    setState(initialState);
    setPayload(initialPayload);
    setModalVisible(false)
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text
          h4
          style={{
            color: "#947f58",
            borderBottomColor: "#947f58",
            borderBottomWidth: 2,
          }}
        >
          Elija el orden correcto
        </Text>
        <Text></Text>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ marginTop: 50, paddingTop:15, paddingLeft: 25, paddingRight:25 }}>
          <Text h3 style={{textAlign: "center"}}>
            Ha finalizado exitosamente esta seccion, puede repetir la seccion o
            regresar al menu principal.
          </Text>
          <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 15}}>
          <View style={{flexDirection:"column"}}>
            <Icon
                raised
                name="rotate-ccw"
                type="feather"
                color="#f50"
                size={45}
                onPress={reset}
              />
              <Text h4 style={{textAlign:"center"}}>Repetir</Text>
            </View>
            <View style={{flexDirection:"column"}}>
            <Icon
              raised
              name="log-out"
              type="feather"
              color="#f50"
              size={45}
              onPress={() => nav.navigate("Main")}
            />
            <Text h4 style={{textAlign:"center"}}>Salir</Text>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={state.testArray}
        horizontal={true}
        style={{ backgroundColor: "#1B1B1B" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => checkResult(item)}
            style={{ borderColor: "white" }}
          >
            <Card
              image={item.img}
              imageStyle={{ height: 200 }}
              containerStyle={{ width: 200, borderWidth: 0 }}
            >
              <View style={{ height: 75 }}>
                <Text h4>{item.name}</Text>
              </View>
              <Icon
                raised
                name="volume-2"
                type="feather"
                size={20}
                iconStyle={{ color: "#E2AC6B" }}
                containerStyle={{
                  position: "absolute",
                  top: -198,
                  right: 0,
                  opacity: 0.8,
                }}
              />
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View
        style={{
          alignItems: "center",
          height: "42%",
          justifyContent: "space-evenly",
        }}
      >
        <Text h2 style={{ color: "#947f58" }}>
          {payload.payloadCorrect}
        </Text>
        <Text h3 style={{ color: "white" }}>
          Respondidas {state.payloadNumber} de {correctAnswers}
        </Text>
        <Text h4 style={{ color: "#947f58", textAlign: "center" }}>
          {payload.payloadInfo}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Interaction;
