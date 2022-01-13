import React, { useEffect, useState } from "react";
import {  FlatList, Text, View, StyleSheet, TextInput, Button } from "react-native";
import { ItemInfo } from "../../types/Item";
import { ListElement } from "./components/Listelement";
import AsyncStorage from "@react-native-community/async-storage";

export const ShoppingList: React.FC = () => {
  // Списки для списка покупок
  const [toBuyList, setToBuyList] = useState<string[]>([]);
  const [boughtList, setBoughtList] = useState<boolean[]>([]);
  // Переменная для поля ввода
  const [text, onChangeText] = useState("");
  // Костыль
  const [thirdLeg, setThirdLeg] = useState(false);

  //localStorage.setItem("accessToken", toBuy);
  //accessToken = localStorage.getItem("accessToken");

  
  
  function addInList(){
    setToBuyList([...toBuyList, text]);
    setBoughtList([...boughtList, false]);
    console.log(toBuyList);
    console.log(boughtList);
    AsyncStorage.setItem("toBuyList", JSON.stringify([...toBuyList, text]));
    AsyncStorage.setItem("boughtList", JSON.stringify([...boughtList, false]));
    onChangeText("");
  };

  function deleteListElement(name) {
    const index = toBuyList.indexOf(name);
    boughtList.splice(index, 1);
    toBuyList.splice(index, 1);
    setThirdLeg(!thirdLeg);
    console.log(toBuyList);
    console.log(boughtList);
    AsyncStorage.setItem("toBuyList", JSON.stringify(toBuyList));
    AsyncStorage.setItem("boughtList", JSON.stringify(boughtList));
  }
  
  function toggle(index) {
    console.log("in toggle");
    
    boughtList[index]= !boughtList[index];
    AsyncStorage.setItem("boughtList", JSON.stringify(boughtList));
    setThirdLeg(!thirdLeg);
  }

  useEffect(() => {
    getToBuyList();
    getBoughtList();
  }, []);

  function getToBuyList() {
    AsyncStorage.getItem("toBuyList")
    .then((list) => {
      let jsonList = JSON.parse(list);
      setToBuyList(jsonList);
      console.log(jsonList);
    })
    .catch((error) => setToBuyList([]));
  }

  function getBoughtList() {
    AsyncStorage.getItem("boughtList")
    .then((list) => {
      let jsonList = JSON.parse(list);
      setBoughtList(jsonList);
      
      console.log(jsonList);
    })
    .catch((error) => setBoughtList([]));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список покупок</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Что купить"
        />
        <Button
          onPress={addInList}
          title="Добавить"
          color="#841584"
        />
      </View>

      <FlatList
        data={toBuyList}
        renderItem={({ item, index }) => <ListElement name={item} index={index} isBought={boughtList[index]} toggle={toggle} deleteItem={deleteListElement} ></ListElement>}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",

  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  list: {
    //padding: 30,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: "80vw",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
