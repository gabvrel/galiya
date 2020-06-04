import React from "react";
import { View, TouchableOpacity, StyleSheet, } from "react-native";
import { Icon, Card, Text } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";


const catDataLanguage= [
  {
    id:0,
    title: "Medidas para el Covid-19",
    tipo: " ",
    img: require("../../assets/covidMain.jpg")
  },
  {
    id:1,
    title: "Analisis Selectivo",
    tipo: " ",
    img: require("../../assets/analisis_selectivo.jpg")
  },
  ,
  {
    id:2,
    title: "Sopa de Letras",
    tipo: "Selectiva",
    img: require("../../assets/sopa_de_letras.jpg")
  }
];

const catDataMemory = [
  {
    id:0,
    title: "Memorización Visual",
    tipo: " ",
    img: require("../../assets/memorise.jpg")
  },
  {
    id:1,
    title: "Memorización Auditiva",
    tipo: " ",
    img: require("../../assets/sound.jpg")
  },
];

const Categories = props => {

  const navigate = (id) => {
    switch (id){
      case 0:
        return props.navigation.navigate(props.mainState == 0 ? "Language": "Memorise");
      case 1:
        return props.navigation.navigate(props.mainState == 0 ? "Analisis" : "MemorySound");
      case 2:
        return props.navigation.navigate("Letters");
      default: 
        return props.navigation.navigate("Main");
    }
  };

  return(
    <View style={{flex:2, backgroundColor:"#141414"}}>
      <FlatList
        data={props.mainState == 0 ? catDataLanguage : catDataMemory}
        numColumns={2}
        renderItem={({item})=>(
        <TouchableOpacity
        style={{flex:1}}
          onPress={()=>navigate(item.id)}> 
          <Card
          id={item.id}
          image={item.img}
          imageStyle={{height:170}}
          containerStyle={{flex:1,backgroundColor:"#1B1B1B", borderWidth: 0, marginLeft:7, marginRight:5}}>
          <View>
            <Text h3 style={{color:"white"}}>{item.title}</Text>
            <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap"}}>
            <Text h4 style={{color:"#947f58", borderBottomColor:"#947f58", borderBottomWidth: 2}}>{item.tipo}</Text>
            <Text></Text>
            </View>
            <Icon
              raised
              name="volume-2" 
              type="feather" 
              size={20}
              iconStyle={{color:"#E2AC6B"}}
              containerStyle={{position:"absolute", top: -178, right:-10}}
            />
          </View>
          </Card>
        </TouchableOpacity>       
        )}
        keyExtractor={item=>item.id.toString()}
      />
    </View>
  )
};

export default Categories;