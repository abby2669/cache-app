import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CONSTANTS } from "../../Constants";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { icons } from "../../utils/icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";

export default function Vehicle({ item }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: CONSTANTS.SCREEN_WIDTH - 30,
        borderRadius: 20,
        marginHorizontal: 15,
        backgroundColor: color.white,
        elevation: 8,
        shadowColor: color.black,
        shadowOffset: { height: 3, width: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        paddingVertical: 15,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          borderBottomColor: "rgba(0, 0, 0, 0.6)",
          borderBottomWidth: 0.5,
          paddingBottom: 15,
        }}
      >
        <Image source={icons.truck} style={{ width: 25, height: 20 }} />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ ...GlobalStyles.bold_text, fontSize: 14 }}>
            {item.category?.name} / {item.vehicle_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Ionicons
              color={"rgba(0, 0, 0, 0.6)"}
              name="ios-location-outline"
              size={16}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                marginLeft: 5,
                ...GlobalStyles.regular_text,
              }}
            >
              {item.short_address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Feather color={"rgba(0, 0, 0, 0.6)"} name="user" size={16} />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                marginLeft: 5,
                ...GlobalStyles.regular_text,
              }}
            >
              {item.username}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingTop: 15,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ width: "50%" }}>
          <Button
            filled={true}
            onPress={() =>
              navigation.navigate(CONSTANTS.SCREENS.vehicleDetails, { item })
            }
            titleStyle={{ ...GlobalStyles.regular_text, fontSize: 12 }}
            style={{ width: "80%", height: 35 }}
            title={"VIEW DETAILS"}
          />
        </View>
        <View
          style={{
            width: "50%",
            justifyContent: CONSTANTS.JUSTIFY_CONTENT.center,
            alignItems: CONSTANTS.ALIGN_ITEMS.end,
          }}
        >
          <View>
            <Text style={{ fontSize: 12, ...GlobalStyles.regular_text }}>
              Updated:{" "}
              {new Date(item.updated).getDate() +
                "/" +
                (new Date(item.updated).getMonth() + 1) +
                "/" +
                new Date(item.updated).getFullYear()}
            </Text>
            <Text style={{ fontSize: 12, ...GlobalStyles.regular_text }}>
              Distance: {Math.trunc(item.dist?.calculated / 1000)} KM
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
