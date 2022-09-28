import React from "react";
import { View, Text, Image } from "react-native";
import { color } from "../../utils/color";
import Header from "../../components/Header";
import { GlobalStyles } from "../../utils/globalStyles";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Notification({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: color.light_primary }}>
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          backgroundColor: color.white,
        }}
      >
        <Header type="back" title={"Notification"} />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              marginTop: -100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name={"bell"} size={41} color={color.black} />
            <Text
              style={{
                color: color.black,
                marginTop: 15,
                fontSize: 24,
                textAlign: "center",
                ...GlobalStyles.dm_sans_bold,
              }}
            >
              No Notifications yet!
            </Text>
            <Text
              style={{
                color: "rgba(10, 10, 10, 0.7)",
                maxWidth: "90%",
                marginTop: 15,
                fontSize: 14,
                textAlign: "center",
                ...GlobalStyles.dm_sans_regular,
              }}
            >
              Simply browse and Explore app and get notification
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 15,
            left: "5%",
            right: "5%",
            height: 60,
          }}
        >
          <Button
            onPress={() => navigation.goBack(null)}
            titleStyle={{
              color: color.white,
              fontSize: 16,
              ...GlobalStyles.dm_sans_bold,
            }}
            title="Back to Home"
            style={{
              backgroundColor: color.primary,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
