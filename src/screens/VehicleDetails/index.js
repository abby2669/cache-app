import React, { useState } from "react";
import { View, Text, Image, FlatList, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { icons } from "../../utils/icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { CONSTANTS } from "../../Constants";
import Button from "../../components/Button";
import Toast from "../../components/Toast/Toast";

export default function VehicleDetails({ navigation, route }) {
  const { item: data } = route.params;
  const [item, setItem] = useState(data);

  const callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Toast("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{ backgroundColor: color.white }}>
      <View
        style={{ backgroundColor: color.white, height: "100%", width: "100%" }}
      >
        <Header
          notifyVisible={false}
          type={"custom"}
          title={"Vehicle Details"}
        />
        <View style={{ paddingHorizontal: 15, marginTop: "10%" }}>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 15,
            }}
          >
            <Image source={icons.truck} style={{ width: 25, height: 20 }} />
            <View style={{ marginLeft: 20 }}>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
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
                    maxWidth: "95%",
                    marginLeft: 5,
                    ...GlobalStyles.regular_text,
                  }}
                >
                  {item.full_address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 13,
                }}
              >
                <Feather
                  color={"rgba(0, 0, 0, 0.6)"}
                  name="phone-call"
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
                  {item.phone}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingVertical: 12,
              paddingHorizontal: 15,
              borderBottomWidth: 0.5,
              alignItems: CONSTANTS.ALIGN_ITEMS.center,
              borderBottomColor: "rgba(0, 0, 0, 0.5)",
              borderTopWidth: 0.5,
              borderTopColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: CONSTANTS.JUSTIFY_CONTENT.center,
            }}
          >
            <View
              style={{
                width: "35%",
                alignItems: CONSTANTS.ALIGN_ITEMS.end,
                paddingRight: 20,
                borderRightColor: "rgba(0, 0, 0, 0.5)",
                borderRightWidth: 0.5,
              }}
            >
              <Text style={{ fontSize: 12, ...GlobalStyles.semi_bold_text }}>
                Updated
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 8,
                  ...GlobalStyles.regular_text,
                }}
              >
                {new Date(item.updated).getDate() +
                  "/" +
                  (new Date(item.updated).getMonth() + 1) +
                  "/" +
                  new Date(item.updated).getFullYear()}
              </Text>
            </View>
            <View
              style={{
                width: "35%",
                paddingLeft: 20,
              }}
            >
              <View style={{ alignSelf: "flex-start" }}>
                <Text style={{ fontSize: 12, ...GlobalStyles.semi_bold_text }}>
                  Distance
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 8,
                    textAlign: CONSTANTS.TEXT_ALIGN.center,
                    ...GlobalStyles.regular_text,
                  }}
                >
                  {Math.trunc(item.dist?.calculated / 1000)} KM
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 12, ...GlobalStyles.regular_text }}>
              Vehicle Images
            </Text>
            <FlatList
              horizontal
              style={{ marginTop: 10 }}
              data={item.vehicle_images ? item.vehicle_images : []}
              keyExtractor={(item) => item.uri}
              renderItem={({ item }) => (
                <Image
                  style={{
                    height: 74,
                    width: 74,
                    borderRadius: 10,
                    marginRight: 15,
                  }}
                  source={{ uri: item.uri }}
                />
              )}
            />
            <Button
              style={{ marginTop: 35 }}
              titleStyle={{ fontSize: 12, ...GlobalStyles.semi_bold_text600 }}
              filled={true}
              onPress={() => callNumber(item.phone)}
              title={"CALL NOW"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
