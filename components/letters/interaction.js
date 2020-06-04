import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, TouchableOpacity,
   SafeAreaView, StyleSheet, Button, TextInput,
    InteractionManager, Modal } from "react-native";
import { Card, Text, Icon } from "react-native-elements";

const words = ["salud", "mirar", "pera", "perno", "carro"];

const data = [
         {letter: "s",
          id:0,
          order:[0],
          type:[0]},
         {letter: "a",
          id:1,
          order:[1],
          type:[0]},
         {letter:"l",
          id:2,
          order:[2],
          type:[0]},
         {letter: "u",
          id:3,
          order:[3],
          type:[0]}, 
         {letter: "d",
          id:4,
          order:[4],
          type:[0]},
          {letter: "m",
          id:5,
          order:[0],
          type:[1]}, 
         {letter: "o",
          id:6,
          order:[-1],
          type:[-1]},
          {letter: "c",
          id:7,
          order:[-1],
          type:[-1]}, 
         {letter: "p",
          id:8,
          order:[0],
          type:[2]},
          {letter: "p",
          id:9,
          order:[0],
          type:[3]}, 
         {letter: "x",
          id:10,
          order:[-1],
          type:[-1]},
          {letter: "i",
          id:11,
          order:[1],
          type:[1]}, 
         {letter: "l",
          id:12,
          order:[-1],
          type:[-1]},
          {letter: "e",
          id:13,
          order:[1],
          type:[2,3]}, 
         {letter: "q",
          id:14,
          order:[4],
          type: [-1]},
          {letter: "c",
          id:15,
          order:[0],
          type: [4]}, 
         {letter: "a",
          id:16,
          order:[1],
          type: [4]},
          {letter: "r",
          id:17,
          order:[2,2,2],
          type:[1,3,4]}, 
         {letter: "r",
          id:18,
          order:[2,3],
          type: [2,4]},
          {letter: "o",
          id:19,
          order:[4],
          type:[4]}, 
         {letter: "h",
          id:20,
          order:[4],
          type:[-1]},
          {letter: "n",
          id:21,
          order:[3],
          type:[3]}, 
         {letter: "g",
          id:22,
          order:[4],
          type: [-1]},
          {letter: "a",
          id:23,
          order:[3,3],
          type: [1,2]}, 
         {letter: "w",
          id:24,
          order:[4],
          type:[-1]},
          {letter: "o",
          id:25,
          order:[4],
          type:[3]}, 
         {letter: "j",
          id:26,
          order:[4],
          type:[-1]},
          {letter: "x",
          id:27,
          order:[3],
          type:[-1]}, 
         {letter: "z",
          id:28,
          order:[4],
          type:[-1]},
          {letter: "r",
          id:29,
          order:[4],
          type:[1]}];

let handleCount;
let handleType;
let handleLength = 0;

let handleFinalResult = 0;

const getLength = (type) => (handleLength = words[type].length);

let arrRefs = [];
let arrRefsHandle = [];

const initialData = [
  {title: "salud", correct: false},
  {title: "mirar", correct: false},
  {title: "pera", correct: false},
  {title: "perno", correct: false},
  {title: "carro", correct: false}
];

const initialState = {
  data: initialData,
  isLoaded: false
};

const Interaction = ({nav}) => {
  const [state, setState] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    setState({...state, isLoaded: true})
  },[]);

  useEffect(()=>{
    if (handleFinalResult == words.length){
      FinishAll()
    }
  },[state])

  const getIndex = (itemTypes) =>{
    for (let i = 0; i <= itemTypes.length; i++){
      if (handleType.includes(itemTypes[i])){
        handleType = itemTypes[i];
        break;
      }
    }
  };

  const handleResult = (item) => {
    //case of first atempt
    if (item.order == 0){
      handleType = item.type;
      handleCount=1;
      getLength(item.type);
      arrRefs[item.id].setNativeProps({
        style: styles.test
      });
      arrRefsHandle.push(item.id)
    }else if (item.order == 1 && handleCount == 1){
      getIndex(item.type);
      arrRefs[item.id].setNativeProps({
        style: styles.test
      })
      handleCount+=1;
      arrRefsHandle.push(item.id)
    }else if (item.type.includes(handleType) &&  item.order.includes(handleCount) && handleCount > 1){
    //case of final guess
    if (handleLength == handleCount+1){
      arrRefsHandle.push(item.id);
      onFinish()
      handleCount = -1;
      handleType = -1;
      handleLength = 0;
    //case of normal correct guess
    } else {
      arrRefs[item.id].setNativeProps({
        style: styles.test
      })
      handleCount+=1;
      arrRefsHandle.push(item.id)
    }
  } 
  // case of incorrect guess
  else {
    onError();
    handleCount = -1;
    handleType = -1;
    handleLength = 0;
  }
  };

  // Finish a single word
  const onFinish = () => {
    handleFinalResult += 1;
    let handleTitleArray = state.data;
    arrRefsHandle.forEach((el, i)=>{
      arrRefs[el].setNativeProps({
        style: styles.success
      })
    });
    arrRefsHandle= [];
    handleTitleArray[handleType].correct = true;
    setState({...state, data: handleTitleArray});
  };

  const onError = () => {
    arrRefsHandle.forEach((el, i)=>{
      arrRefs[el].setNativeProps({
        style: styles.bloq
      })
    });
    arrRefsHandle= []; 
  };

  // Finish the entire seccion
  const FinishAll = ()=>{
    setModalVisible(true);
  };

  const reset = () => {
    console.log("reset")
/*     setState(initialState);
    setModalVisible(false);
    handleFinalResult = 0;
    setState({...state, isLoaded: true}) */
  };

  const myStyles = [
    styles.bloq
  ];

  return (
    <SafeAreaView>
    {state.isLoaded ?
      <View>
      <FlatList 
      data = {data}
      renderItem={({item}) => 
      <TouchableOpacity
      ref={boxContent => arrRefs[item.id] = boxContent}
      onPress={()=>{handleResult(item)}}
      style={myStyles}
      >
        <Text
        style={{
        color:"white",
        fontSize: 32
      }}>
        {item.letter}
        </Text>
      </TouchableOpacity>
    }
    keyExtractor={item => item.id.toString()}
    horizontal={false}
    numColumns={5}
     />
     <View style={{flexDirection:"row", justifyContent:"space-around"}}>
        {state.data.map((item, index)=>{
          return(
            <TextInput 
            key={index} 
            style ={[item.correct ? styles.correct : styles.text]}
            defaultValue={item.title}
            editable={false}/>
          )
        })}
     </View>
     </View>
      :
    <Text>Loading..</Text>
    }

    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ marginTop: 50, paddingTop:15, paddingLeft: 25, paddingRight:25 }}>
          <Text h3 style={{textAlign: "center"}}>
            Ha finalizado exitosamente esta seccion, 
            puede repetir esta seccion o salir al 
            menu principal.
          </Text>
          <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 15}}>
          <View style={{flexDirection:"column"}}>
            <Icon
                raised
                name="rotate-ccw"
                type="feather"
                color="#f50"
                size={45}
                /* onPress={reset} */
              />
              <Text h4 style={{textAlign:"center"}}>Repetir</Text>
            </View>
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

    </SafeAreaView>
  );
};

export default Interaction;


const styles = StyleSheet.create({
  bloq:{
    backgroundColor: "blue",
    width: 52,
    height: 52,
    margin:10,
    justifyContent:"center",
    alignItems: "center"
  },
  text:{
    color:"white",
    fontSize:25
  },
  correct:{
    color: "blue",
    fontSize:25
  },
  test:{
    backgroundColor:"red"
  },
  success:{
    backgroundColor:"green"
  },
  done:{
    textDecorationStyle:"dashed"
  }
});
