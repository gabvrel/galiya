import React, {useState, useContext, useEffect, useMemo} from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Image } from "react-native-elements";
import * as Speech from "expo-speech";
import { useHeaderHeight  } from '@react-navigation/stack';
import Interaction from "./interaction";

const initialState= {
    helpOff: false
  }

const Letters = props => {
    const [ state, setState ] = useState(initialState);

    return (
        <View style={styles.container}>
        <View style={{marginTop: useHeaderHeight()+20}}>
        { !state.helpOff ?
        <Card>
        <View style={{alignItems:"center"}}>
          <Image
            source={require("../../assets/letters/letters_intro.gif")}
            style={{ width: 200, height: 315, marginBottom: 10 }}
            resizeMode="contain"
          />
          <Text style={{fontSize:17, textAlign:"center"}}>Encuentre las palabras visibles en la parte inferior de la pantalla que
          corresponda a la sopa de letras, una vez marcada la palabra correcta se marcará de color azul
          </Text>
          <Button title="Entendido" onPress={()=>setState({...state, helpOff: true})} buttonStyle={{marginTop:7, backgroundColor:"#947f58"}} />
        </View>
        </Card>
        :
        <Interaction nav={props.navigation}/>
        }
        </View>
      </View>
    )
}

export default Letters;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  }
});




