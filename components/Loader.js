import React from "react";
import { Text, Image, StyleSheet } from "react-native";


const Loader = () => {
    return(
        <Image source={require("../assets/loader.gif")}
        style={styles.loader}/>
    )
}

export default Loader;

const styles = StyleSheet.create({
    loader:{
        width: "97.5%",
        height: 325,
    }
})