import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-elements";
import { useHeaderHeight } from "@react-navigation/stack";

const Header = (props) => {
  return (
    <View
      style={{
        marginTop: useHeaderHeight() - 45,
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent:"flex-end", marginBottom: 15 }}>
        <Icon
          name="menu"
          type="feather"
          color="white"
          size={30}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "60%",
          }}
        >
          <Text h3 style={{ color: "white" }}>
            {props.mainState == 0 ? "Lenguaje y Cognicion" : "Memorizacion"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <Icon
            name="type"
            type="feather"
            color="white"
            size={27}
            iconStyle={props.mainState == 0 ? styles.selected : undefined}
            onPress={() => props.changeCategory(0)}
          />
          <Icon
            name="book-open"
            type="feather"
            color="white"
            size={27}
            iconStyle={props.mainState == 1 ? styles.selected : undefined}
            onPress={() => props.changeCategory(1)}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  selected: {
    borderBottomColor: "white",
    borderBottomWidth: 2.5,
  },
});
