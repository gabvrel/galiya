import React, { useState, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  Modal
} from "react-native";
import { Text, Icon } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

const data = [
  {
    id: 0,
    title: "Evita",
    label:
      "Evitar el contacto con personas enfermas",
    image: require("../../assets/language/distance.png"),
  },
  {
    id: 1,
    title: "Higiene",
    label: "Lavarse las manos a conciencia y con frecuencia durante veinte segundos",
    image: require("../../assets/language/agua-del-grifo.jpg"),
  },
  {
    id:2,
    title: "Contacto",
    label: "No tocarse los ojos nariz ni la boca, si no se han lavado las manos",
    image: require("../../assets/language/Desinfectar.jpg")
  },
  {
    id:3,
    title: "Proteccion",
    label: "Usar tapaboca o mascarilla si se encuentra con tos o resfrio",
    image: require("../../assets/language/mascarilla.jpg")
  },
  {
    id:4,
    title: "En casa",
    label:"Evitar asistir a lugares my concurridos",
    image: require("../../assets/language/home.jpg")
  }
];

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const initialState = {
  data: shuffle(data),
  handleCount: 0,
};
const loadState = {
  isLoaded: false,
  isRecording: false,
  isResult: false,
};

const initialRecording = {
  title: "Toque para iniciar la grabacion",
  type: 0,
  recording: null,
  url: null,
};

const Interaction = ({nav}) => {
  const [state, setState] = useState(initialState);
  const [load, setLoad] = useState(loadState);
  const [rec, setRec] = useState(initialRecording);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status == "granted") {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
      setLoad({ isLoaded: true });
    } else {
      alert("Debe permitir el acceso a esta aplicacion para grabar");
      props.navigation.navigate("Main");
    }
  };

  const readTask = (task) => {
    Speech.speak(task.label, {
      onDone: () => {
        setLoad({ ...load, isRecording: true });
      },
    });
  };

  const OnRecord = async () => {
    let recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      /* recording.setOnRecordingStatusUpdate(e => console.log(e)); */
      recording.setProgressUpdateInterval(300);
      await recording.startAsync();
      /* await recording.createNewLoadedSoundAsync(); */
    } catch (err) {
      console.error(err);
    }
    setRec({ title: "Grabando...", recording, type: 1 });
  };

  const OnEndRecord = async () => {
    try {
      await rec.recording.stopAndUnloadAsync();
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    if (load.isRecording) {
      const fileUrl = rec.recording.getURI();
      rec.recording.setOnRecordingStatusUpdate(null);
      setRec({ ...rec, url: fileUrl, title: "Hecho!", type: 2, recording:null });
    }
    setTimeout(() => {
      setLoad({ ...load, isResult: true });
    }, 1000);
  };

  const playbackRecord = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: rec.url},
      { shouldPlay:true, position: 0, duration: 1, progressUpdateIntervalMillis: 50});
   try{
      await sound.playAsync();
    } catch(error){
      console.error(error)
    }
  };

  const resetData = () => {
    if (state.handleCount + 1 == data.length){
      setModalVisible(true)
    } else {
    setState({...state, handleCount: state.handleCount + 1});
    setRec({...rec, type:0, title: "Toque para iniciar la grabacion"})
    setLoad({...load, isRecording:false, isResult:false});
    }
  };

  if (load.isLoaded) {
    if (load.isRecording) {
      return (
        <View style={{ alignItems: "center" }}>

        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ marginTop: 50, paddingTop:15, paddingLeft: 25, paddingRight:25 }}>
          <Text h3 style={{textAlign: "center"}}>
            Ha finalizado exitosamente esta seccion.
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

        <Text
            h2
            style={{ color: "white", marginBottom: 55, textAlign: "center" }}
          >
            {rec.title}
          </Text>
          {load.isResult ? <Text h3 style={{color:"white", textAlign:"center", marginBottom:15}}>
          Respuesta:{"\n"}
          {state.data[state.handleCount].label}</Text> : undefined}
          {load.isResult ? <Text h3 style={{color:"white", textAlign:"center"}}>Su Respuesta: </Text> : undefined}
          {rec.type == 0 ? (
            <TouchableWithoutFeedback onPress={OnRecord}>
              <Icon
                raised
                name="volume-2"
                type="feather"
                color="#f50"
                size={75}
              />
            </TouchableWithoutFeedback>
          ) : undefined}
          {rec.type == 1 ? (
            <TouchableWithoutFeedback onPress={OnEndRecord}>
              <Icon raised name="pause" type="feather" color="#f50" size={75} />
            </TouchableWithoutFeedback>
          ) : undefined}
          {rec.type == 2 ? (
          <View>
            <TouchableWithoutFeedback onPress={playbackRecord}>
              <Icon raised name="music" type="feather" color="#f50" size={50} />
            </TouchableWithoutFeedback>
            <Text style={{color: "white"}} h3>{"\n"}Finalizar</Text>
            <TouchableWithoutFeedback onPress={resetData}>
            <Icon raised name="check" type="feather" color="#f50" size={50} />
          </TouchableWithoutFeedback>
          </View>
          ) : undefined}
        </View>
      );
    } else
      // First intro layer
      return (
        <SafeAreaView>
          <View style={{ alignItems: "center" }}>
            <Text h2 style={{ color: "white", marginBottom: 18 }}>
              {state.data[state.handleCount].title}
            </Text>
            <Image
              source={state.data[state.handleCount].image}
              style={{ maxWidth: "80%", marginBottom: 50, marginTop: 75, maxHeight:150 }}
            />
            <Icon
              raised
              name="play"
              type="feather"
              color="#f50"
              size={50}
              onPress={() => readTask(state.data[state.handleCount])}
            />
          </View>
        </SafeAreaView>
      );
  } else {
    // case component isnt load yet
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading....</Text>
      </View>
    );
  }
};

export default Interaction;
