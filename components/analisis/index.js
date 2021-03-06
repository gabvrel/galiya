import React, {useState, useContext, useEffect, useMemo} from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Image } from "react-native-elements";
import * as Speech from "expo-speech";
import { useHeaderHeight  } from '@react-navigation/stack';
import Interaction from "./interaction";

 const initialState= {
   helpOff: false
 }
 const Analisis = props => {
  const [ state, setState ] = useState(initialState);

    return (
      <View style={styles.container}>
      <View style={{marginTop: useHeaderHeight()+20}}>
      { !state.helpOff ?
      <Card>
      <View style={{alignItems:"center"}}>
        <Image
          source={require("../../assets/analisis/intro.gif")}
          style={{ width: 200, height: 315, marginBottom: 10 }}
          resizeMode="contain"
        />
        <Text style={{fontSize:17, textAlign:"center"}}>Una cada imagen con la definicion de esta
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  }
});

export default Analisis;


