import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";
import { Overlay, Text, Icon, Divider } from "react-native-elements";
import GlobalContext from "../context/GlobalContext";
import Loader from "./Loader";

const initialState = {
  handleAudio: false,
  handleUcLogo: true,
  handleDscLogo: false,
  handleAnim: false
};

const initialLoaderState = {
  opacity: new Animated.Value(0)
};

const ImageLoaderUce = props => {
  const [loadState, setLoadState] = useState(initialLoaderState);

  const onLoad = () =>{
    Animated.timing(loadState.opacity, {
      toValue: 1,
      duration:500,
      useNativeDriver:true
    }).start()
  }
  return(
    <Animated.Image
    onLoad={onLoad}
    {...props}
    style={[
      {
        opacity: loadState.opacity,
        transform: [
          {
          scale: loadState.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0.05, 1],
          })
          },
        ],
      },
      props.style,
    ]}
    />
  )
};

const ImageLoaderFono = props => {
  const [loadState, setLoadState] = useState(initialLoaderState);

  const onLoad = () =>{
    Animated.timing(loadState.opacity, {
      toValue: 1,
      duration:500,
      useNativeDriver:true
    }).start()
  }
  return(
    <Animated.Image
    onLoad={onLoad}
    {...props}
    style={[
      {
        opacity: loadState.opacity,
        transform: [
          {
          scale: loadState.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0.05, 1],
          })
          },
        ],
      },
      props.style,
    ]}
    />
  )
};

const Intro = ({navigation}) => {
  const [state, setState] = useState(initialState);
  const { glState, setGlState } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(function () {
      setState({ ...state, handleUcLogo: false, handleDscLogo:true });
    }, 3000);
    setTimeout( () =>{
      setState({...state, handleUcLogo: false, handleDscLogo: false, handleAnim: true})
    }, 6000);
    setTimeout( () =>{
      setState({...state, handleUcLogo: false, handleAudio: true,})
    }, 21000);
    }, []);

  const audioSetter = async (status) => {
    setState({...state, handleAudio: false});
    if (status == "on"){
      await setGlState({...glState, audioOn: true});
      navigation.navigate("Main");
    } else if ( status == "off"){
      await setGlState({...glState, audioOn: false});
      navigation.navigate("Main");
    }
    else{
      console.error("Not handle Status")
    }
  };

  return (
    <View style={styles.container}>
      {state.handleUcLogo ?
        <ImageLoaderUce 
        style={styles.uceLogo}
        source={require("../assets/sello_uce.png")}
        />
      :
      undefined
      }
      {state.handleDscLogo ?
        <ImageLoaderFono
        style={styles.uceLogo}
        source={require("../assets/disc.jpg")}
        /> 
        :
        undefined
      }
      {state.handleAnim ?
        <Loader />
          :
        undefined
      }
      <Overlay
  isVisible={state.handleAudio}
  style={styles.overlay}
  borderRadius={12}
  windowBackgroundColor="grey"
  overlayBackgroundColor="#FEFFFF"
>
  <View style={styles.container}>
    <Text h4 style={{ textAlign: "center", color: "#17252A" }}>
    Estimulación comunicativa, cognitiva y motivacional en el adulto mayor, 
    se recomienda activar el audio para tener una
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
  uceLogo:{
    width: "75%",
    height: 270,
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


/* <ImageLoaderUce 
style={styles.uceLogo}
source={require("../assets/sello_uce.png")}
/>
 */


/* <Loader />
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
</Overlay> */