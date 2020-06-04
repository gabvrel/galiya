import React, {useState, useContext, useEffect, useMemo} from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Image } from "react-native-elements";

 
 const Language = () => {
    return (
    <View style={styles.container}>
        <Image 
        source={require("../info/index")}
        style={{width: 75, height: 50}}
        />
        <Text>Esta es la Beta de Galya </Text>
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  }
});

export default Language;


