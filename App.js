import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Loader from "./components/Loader";
import { Overlay, Button, Text, Icon, Divider } from "react-native-elements";

const initialState = {
  isLoaded: false,
  handleAudio: true,
};

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setTimeout(function () {
      setState({ ...state, isLoaded: true });
    }, 15000);
  }, []);

  return (
    <View style={styles.container}>
      {state.isLoaded ? (
        <Overlay
          isVisible={state.handleAudio}
          style={styles.overlay}
          borderRadius={12}
          windowBackgroundColor="grey"
          overlayBackgroundColor="#FEFFFF"
        >
          <Fragment>
            <Text h4 style={{ textAlign: "center", color: "#17252A" }}>
              Bienvenido a la aplicacion dedicada para el estimulo del adulto
              mayor Galyia, se recomienda activar el audio para tener una mejor
              experiencia.
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} >
                <Icon reverse name="microphone" type="font-awesome" size={22} />
                <Text style={styles.buttonTitle}>Activar Sonido</Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity style={styles.button}>
                <Icon
                  reverse
                  name="microphone-slash"
                  type="font-awesome"
                  size={22}
                />
                <Text style={styles.buttonTitle}>Desactivar Sonido</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        </Overlay>
      ) : (
        <Loader />
      )}
    </View>
  );
}

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
    alignItems: "center"
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 15
  },
  buttonTitle: {
    fontSize: 19,
  },
});
