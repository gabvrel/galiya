import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { DraxProvider, DraxView } from "react-native-drax";

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

let OrderIndex = 0;
const order = [
  [0, 3],
  [1, 2],
  [3, 2],
];

const data = {
  alimentos: [
    {
      id: 1,
      type: 0,
      img: require("../../assets/analisis/alimentos/carne.jpg"),
    },
    {
      id: 2,
      type: 0,
      img: require("../../assets/analisis/alimentos/frutas.jpg"),
    },
    {
      id: 3,
      type: 0,
      img: require("../../assets/analisis/alimentos/pastel.jpg"),
    },
    {
      id: 4,
      type: 0,
      img: require("../../assets/analisis/alimentos/pescado.jpg"),
    },
    {
      id: 5,
      type: 0,
      img: require("../../assets/analisis/alimentos/veduras.jpg"),
    },
  ],
  animales: [
    {
      id: 6,
      type: 1,
      img: require("../../assets/analisis/animales/aguila.jpg"),
    },
    {
      id: 7,
      type: 1,
      img: require("../../assets/analisis/animales/cocodrilo.jpg"),
    },
    {
      id: 8,
      type: 1,
      img: require("../../assets/analisis/animales/delfines.jpg"),
    },
    {
      id: 9,
      type: 1,
      img: require("../../assets/analisis/animales/kanguro.jpg"),
    },
    {
      id: 10,
      type: 1,
      img: require("../../assets/analisis/animales/oso.jpg"),
    },
  ],
  vestimenta: [
    {
      id: 11,
      type: 2,
      img: require("../../assets/analisis/vestimenta/camisa.jpg"),
    },
    {
      id: 12,
      type: 2,
      img: require("../../assets/analisis/vestimenta/camiseta.jpg"),
    },
    {
      id: 13,
      type: 2,
      img: require("../../assets/analisis/vestimenta/chaqueta.jpg"),
    },
    {
      id: 14,
      type: 2,
      img: require("../../assets/analisis/vestimenta/gabardina.jpg"),
    },
    {
      id: 15,
      type: 2,
      img: require("../../assets/analisis/vestimenta/pantalon.jpg"),
    },
  ],
  transporte: [
    {
      id: 16,
      type: 3,
      img: require("../../assets/analisis/transporte/avion.jpg"),
    },
    {
      id: 17,
      type: 3,
      img: require("../../assets/analisis/transporte/buses.jpg"),
    },
    {
      id: 18,
      type: 3,
      img: require("../../assets/analisis/transporte/carro.jpg"),
    },
    {
      id: 19,
      type: 3,
      img: require("../../assets/analisis/transporte/crucero.jpg"),
    },
    {
      id: 20,
      type: 3,
      img: require("../../assets/analisis/transporte/tren.jpg"),
    },
  ],
};

const initialState = {
  arrData: [],
  arrTitle: [],
  isLoaded: false,
};

let totalScore= {
  correct: 0,
  incorrect: 0
};

const initialTextState = {
  handleText : "",
};

const Interaction = ({nav}) => {
  const [state, setState] = useState(initialState);
  const [stateText, setStateText] = useState(initialTextState);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setInitialData();
  }, []);


  useEffect(()=>{
    if (state.arrData == 0 && state.isLoaded){
      if (OrderIndex == 2){
        setModalVisible(true)
        OrderIndex = 0;
      } else {
        OrderIndex += 1;
        setInitialData()
      }
    }
  },[state]);

  const setInitialData = () => {
    let payloadOrder = order[OrderIndex];
    let key1 = Object.keys(data)[payloadOrder[0]];
    let key2 = Object.keys(data)[payloadOrder[1]];
    let payloadArr = [...data[key1], ...data[key2]];
    setState({
      ...state,
      arrData: shuffle(payloadArr),
      isLoaded: true,
      arrTitle: [key1, key2],
    });
  };

  const reset = () => {
    setState(initialState);
    setStateText(initialTextState)
    totalScore.correct = 0;
    totalScore.incorrect = 0;
    setState({...state, isLoaded:true})
    setModalVisible(false)
  };

  const checkAnswer = (incoming, correct) => {
    let incomingType = incoming.type;
    let correctType = data[correct][0].type;
    let payloadArray = state.arrData.filter((el, i) => {
      return el.id !== incoming.id;
    });
    if (incomingType === correctType) {
      totalScore.correct += 1;
      setStateText({...stateText, handleText: "Correcto!"})
    } else {
      totalScore.incorrect += 1;
      setStateText({...stateText, handleText: "Incorrecto!"})
    }
    restartNull();
    setState({ ...state, arrData: payloadArray });
  };

  const restartNull = () => {
    setTimeout(() => {
      setStateText({ ...stateText, handleText: "" });
    }, 3500);
  };

  return (
    <DraxProvider>
      {!state.isLoaded ? (
        <Text style={{ color: "black" }}>Cargando...</Text>
      ) : (
        <View
          style={{
            height: Math.round(Dimensions.get("window").height) - 100,
            flexDirection: "row",
          }}
        >

        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ marginTop: 50, paddingTop:15, paddingLeft: 25, paddingRight:25 }}>
          <Text h3 style={{textAlign: "center"}}>
            Ha finalizado exitosamente esta seccion, respuestas correctas: <Text style={{color:"red"}}>{totalScore.correct} </Text>,
            respuestas incorrectas: <Text style={{color:"red"}}> {totalScore.incorrect}</Text>, puede repetir esta seccion o salir al 
            menu principal.
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
              onPress={()=>nav.navigate("Main")}
            />
            <Text h4 style={{textAlign:"center"}}>Salir</Text>
            </View>
          </View>
        </View>
      </Modal>

        <View style={{width: "65%"}}>
          {state.arrData.map((el, i)=>{
            return (
              <DraxView
                key={el.id}
                dragPayload={el}
                longPressDelay={0}
                hoverDraggingStyle={styles.hoverDragging}
                renderContent={({ viewState }) => {
                  return <Image source={el.img} style={styles.images} />;
                }}
              />
            )
          })}
        </View>
          <View
            style={{
              width: "35%",
              height: Math.round(Dimensions.get("window").height) - 100,
              justifyContent: "space-evenly",
              marginRight: 15,
            }}
          >
            <DraxView
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                const combinedStyles = [styles.text];
                if (receivingDrag) {
                  combinedStyles.push(styles.receiving);
                }
                return <Text style={combinedStyles}>{state.arrTitle[0]}</Text>;
              }}
              onReceiveDragDrop={(event) => {
                checkAnswer(event.dragged.payload, state.arrTitle[0])
              }}
            />
            <DraxView
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                const combinedStyles = [styles.text];
                if (receivingDrag) {
                  combinedStyles.push(styles.receiving);
                }
                return <Text style={combinedStyles}>{state.arrTitle[1]}</Text>;
              }}
              onReceiveDragDrop={(event) => {
                checkAnswer(event.dragged.payload, state.arrTitle[1])
              }}
            />
          </View>
        </View>
      )}
        <Text style={styles.popUp}>{stateText.handleText}</Text>
    </DraxProvider>
  );
};

export default Interaction;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  images: {
    borderRadius: 250,
    width: 95,
    height: 95,
    marginBottom: 25,
    marginLeft: 5,
    width: "80%",
    height: 105,
  },
  text: {
    color: "white",
    fontSize: 22,
    textAlign: "right",
    borderColor: "white",
    borderWidth: 2,
    padding: 10,
  },
  hoverDragging: {
    opacity: 0.3,
  },
  receiving: {
    backgroundColor:"blue"
  },
  popUp:{
    color: "white",
    position: "absolute",
    right: -25,
    width: 175,
    fontSize: 32,
    textDecorationLine: "underline"
  },
});


/* <View style={{position: "absolute", width: 160, height: 150,
backgroundColor:"red", top:Math.round(Dimensions.get("window").height)/2 - 150, left: "50%", right:"50%" }}>
     <Text style={{color: "white", fontSize: 42}}>{stateText}</Text>
</View> */


/* <FlatList
            data={state.arrData}
            numColumns={1}
            style={{ maxWidth: "65%" }}
            contentContainerStyle={{ width: "85%", marginRight: "15%" }}
            refreshing = {false}
            renderItem={({ item }) => (
              <DraxView
                dragPayload={item.id}
                longPressDelay={0}
                hoverDraggingStyle={styles.hoverDragging}
                renderContent={({ viewState }) => {
                  return <Image source={item.img} style={styles.images} />;
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          /> */