import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "../../utils/color";

function Container({ children, style }) {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: color.white,
          ...style,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default Container;
