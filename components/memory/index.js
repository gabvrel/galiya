import React, { useState, useContext, useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Image } from "react-native-elements";
import * as Speech from "expo-speech";
import { useHeaderHeight } from "@react-navigation/stack";
import Interaction from "./interaction";

const initialState = {
  helpOff: false,
};
const MemoryBasic = (props) => {
  const [state, setState] = useState(initialState);

  if (!state.helpOff) {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: useHeaderHeight() + 20 }}>
          <Card>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/memory/memoryBasic.gif")}
                style={{ width: 200, height: 315, marginBottom: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 17, textAlign: "center" }}>
                Memorice las imágenes que se presentará a continuación, tebdra un limite de tiempo, luego se le presentáran mas imágenes
                distractoras cuales debe identificar si corresponde o no a la secuencia presentada, para lo cual debe seleccionar el pulgar arriba
                si la imagen estaba en la secuencia mostrada de lo contrario pulgar abajo
              </Text>
              <Button
                title="Entendido"
                onPress={() => setState({ ...state, helpOff: true })}
                buttonStyle={{ marginTop: 7, backgroundColor: "#947f58" }}
              />
            </View>
          </Card>
        </View>
      </View>
    );
  } else return <Interaction nav={props.navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
});

export default MemoryBasic;
