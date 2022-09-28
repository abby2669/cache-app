import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { color } from "../../utils/color";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import axios from "axios";
import { GlobalStyles } from "../../utils/globalStyles";

export default function SearchBar({ user_location, onSelect }) {
  const [text, setText] = useState("");
  const [predictions, setPredictions] = useState([]);
  console.log(user_location);
  const auto_suggest = async () => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&location=${
        user_location.latitude
      }%2C${
        user_location.longitude
      }&radius=500&key=${"AIzaSyA_nmZVriBFLHl4ZdmN7d_WVr9PEH2sZa4"}`
    );
    if (data.predictions) {
      const arr = [];
      data.predictions?.forEach((item) => {
        arr.push({ name: item.description, id: item.place_id });
      });
      setPredictions(arr);
    }
  };

  useEffect(() => {
    if (text.length > 3) {
      auto_suggest();
    } else if (text.length == 0) {
      setPredictions([]);
    }
  }, [text]);

  return (
    <View
      style={{
        position: "absolute",
        top: 15,
        left: 15,
        right: 15,
        zIndex: 2,
      }}
    >
      <View
        style={{
          elevation: 5,
          borderRadius: 5,
          backgroundColor: color.white,
          flexDirection: "row",
          height: 40,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "12%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="search" size={16} />
        </View>
        <TextInput
          style={{ width: "76%", height: "100%", borderRadius: 5 }}
          value={text}
          placeholder="search"
          onChangeText={(text) => setText(text)}
        />
        {text.length != 0 && (
          <TouchableOpacity
            onPress={() => {
              setText("");
              setPredictions([]);
            }}
            style={{
              height: "100%",
              width: "12%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="x" size={16} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={predictions}
        keyExtractor={(item) => item.id + item.name}
        style={{
          backgroundColor: color.white,
          marginTop: 10,
          elevation: 5,
          borderRadius: 5,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setPredictions([]);
              setText("");
              onSelect(item.name);
            }}
            style={{
              padding: 8,
              borderBottomColor: color.border,
              borderBottomWidth: index == predictions.length - 1 ? 0 : 0.5,
            }}
          >
            <Text
              style={{
                color: color.primaryBlack,
                fontSize: 12,
                ...GlobalStyles.regular_text,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
