import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, CheckBox } from "react-native";
import { ItemInfo } from "../../../../types/Item";

interface ItemToBought {
    index: number;
    name: string;
    toggle: Function;
    deleteItem: Function;
    isBought:boolean;
  }

export const ListElement: React.FC<ItemToBought> = ({ index, name, isBought, toggle, deleteItem}) => {
    const  change = () => {
        toggle(index)
    }
  return (
    <View style={styles.container}>
        <View style={styles.toggle}>
        <CheckBox
          value={isBought}
          onValueChange={change}
          style={styles.checkbox}
        />
      <Text style={!isBought ? styles.title :styles.isBought}>{index+1}. {name} </Text>
        </View>
      <Button
          onPress={() => deleteItem(name)}
          title="Удалить"
          color="red"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between",
    width: "80vw",
    padding: 5,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  list: {
    padding: 16,
    marginTop: 16,
  },
  toggle:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  checkbox:{
    marginRight: 10
  },
  isBought:{
    textDecorationLine:"line-through",
    textAlign: "center",
    fontSize: 20,
  }
});