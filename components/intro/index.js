import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { Overlay, Text, Icon, Divider } from "react-native-elements";
import Loader from "./Loader";

const initialState = {
  handleUcLogo: true,
  handleDscLogo: false,
  handleStrLogo: false,
  handleAnim: false,
};

const initialLoaderState = {
  opacity: new Animated.Value(0),
};

const ImageLoaderUce = (props) => {
  const [loadState, setLoadState] = useState(initialLoaderState);

  const onLoad = () => {
    Animated.timing(loadState.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
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
              }),
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

const ImageLoaderFono = (props) => {
  const [loadState, setLoadState] = useState(initialLoaderState);

  const onLoad = () => {
    Animated.timing(loadState.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
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
              }),
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

const ImageStrange = (props) => {
  const [loadState, setLoadState] = useState(initialLoaderState);

  const onLoad = () => {
    Animated.timing(loadState.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
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
              }),
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

const Intro = ({ finishLoad }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setTimeout(() => {
      setState({ 
        ...state, 
        handleUcLogo: false, 
        handleDscLogo: true 
      });
    }, 2000);

    setTimeout(() => {
      setState({
        ...state,
        handleUcLogo: false,
        handleDscLogo: false,
        handleStrLogo: true,
      });
    }, 4000);

    setTimeout(() => {
      setState({ 
        ...state, 
        handleUcLogo: false,
        handleDscLogo: false,
        handleStrLogo: false,
        handleAnim: true  
      });
    }, 6000);

    setTimeout(() => {
      finishLoad()
    }, 20800);
  }, []);

  return (
    <View style={styles.container}>
      {state.handleUcLogo ? (
        <ImageLoaderUce
          style={styles.uceLogo}
          source={require("../../assets/sello_uce.png")}
        />
      ) : undefined}
      {state.handleDscLogo ? (
        <ImageLoaderFono
          style={styles.uceLogo}
          source={require("../../assets/disc.jpg")}
        />
      ) : undefined}
      {state.handleStrLogo ? (
        <ImageStrange
          style={styles.strLog}
          source={require("../../assets/logo_strange.jpg")}
        />
      ) : undefined}
      {state.handleAnim ? <Loader /> : undefined}
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
  uceLogo: {
    width: "75%",
    height: 270,
  },
  strLog:{
    width: "95%",
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
