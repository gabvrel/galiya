import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Overlay, Text, Icon, Divider } from "react-native-elements";
import GlobalContext from "../context/GlobalContext";
import Loader from "./Loader";

const initialState = {
  handleAudio: false,
};

const Intro = ({navigation}) => {
  const [state, setState] = useState(initialState);
  const { glState, setGlState } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(function () {
      setState({ ...state, handleAudio: true });
    }, 15000);
  }, []);

  const audioSetter = async (status) => {
    setState({...state, handleAudio: false});
    if (status == "on"){
      console.log("on")
      await setGlState({...glState, audioOn: false});
      navigation.navigate("Main");
    } else if ( status == "off"){
      console.log("off");
      await setGlState({...glState, audioOn: false});
      navigation.navigate("Main");
    }
    else{
      console.error("Not handle Status")
    }
    
  };

  return (
    <View style={styles.container}>
      <Loader />
        <Overlay
          isVisible={state.handleAudio}
          style={styles.overlay}
          borderRadius={12}
          windowBackgroundColor="grey"
          overlayBackgroundColor="#FEFFFF"
        >
          <View style={styles.container}>
            <Text h4 style={{ textAlign: "center", color: "#17252A" }}>
              Bienvenido a la aplicacion dedicada para el estimulo del adulto
              mayor "Galyia", se recomienda activar el audio para tener una
              mejor experiencia.
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => audioSetter("on")}
              >
                <Icon reverse name="microphone" type="font-awesome" size={22} />
                <Text style={styles.buttonTitle}>Activar Sonido</Text>
              </TouchableOpacity>

              <Divider />

              <TouchableOpacity
                style={styles.button}
                onPress={() => audioSetter("off")}
              >
                <Icon
                  reverse
                  name="microphone-slash"
                  type="font-awesome"
                  size={22}
                />
                <Text style={styles.buttonTitle}>Desactivar Sonido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFFFF",
  },
  overlay: {
    width: "85%",
    height: 250,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  buttonTitle: {
    fontSize: 19,
  },
});