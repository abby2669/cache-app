import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { icons, images } from "../../utils/icons";
import { useNavigation } from "@react-navigation/native";
import { CONSTANTS } from "../../Constants";

export default function Header({
  type,
  bagVisible,
  searchVisible,
  notifyVisible,
  title,
  value,
  setValue,
  onKeyPress,
  titleStyle,
}) {
  const navigation = useNavigation();

  if (type == "search") {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          backgroundColor: color.white,
          paddingVertical: 15,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Feather
            style={{ marginLeft: 0 }}
            name="arrow-left"
            color={color.primary}
            size={25}
          />
        </TouchableOpacity>
        <TextInput
          value={value}
          autoCapitalize={"none"}
          autoFocus={true}
          onChangeText={(text) => setValue(text)}
          returnKeyType="search"
          onSubmitEditing={onKeyPress}
          placeholder={"What are you looking for?"}
          style={{
            height: 45,
            width: "75%",
            backgroundColor: color.white,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            marginLeft: 10,
            paddingHorizontal: 10,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.1}
          style={{
            backgroundColor: color.white,
            height: 45,
            width: "12%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomRightRadius: 50,
            borderTopRightRadius: 50,
          }}
          onPress={() => onKeyPress()}
        >
          <Feather
            style={{ marginLeft: 0 }}
            name="search"
            color={color.black}
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (type == "custom") {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          backgroundColor: color.white,
          paddingVertical: 10,
          alignItems: "center",
          maxHeight: 60,
        }}
      >
        <TouchableOpacity
          style={{ width: "10%" }}
          onPress={() => navigation.goBack(null)}
        >
          <Feather
            style={{ marginLeft: 0 }}
            name="arrow-left"
            color={color.primary}
            size={25}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: color.primary,
            fontSize: 20,
            maxWidth: "80%",
            ...GlobalStyles.bold_text,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
        {notifyVisible ? (
          <TouchableOpacity
            style={{
              width: "10%",
              height: "100%",
              justifyContent: CONSTANTS.JUSTIFY_CONTENT.center,
            }}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image
              source={icons.notify}
              style={{
                height: 24,
                width: 24,
                marginLeft: 15,
                tintColor: color.primary,
              }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: "10%",
              height: "100%",
              justifyContent: CONSTANTS.JUSTIFY_CONTENT.center,
            }}
          />
        )}
      </View>
    );
  }

  if (type == "back") {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          backgroundColor: color.white,
          paddingVertical: 15,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Feather
              style={{ marginLeft: 0 }}
              name="arrow-left"
              color={color.primary}
              size={25}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={{
              color: color.primary,
              fontSize: 20,
              marginLeft: 15,
              width: "68%",
              ...GlobalStyles.bold_text,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {bagVisible ? (
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Image source={icons.bag} style={{ height: 20, width: 16 }} />
            </TouchableOpacity>
          ) : null}
          {searchVisible ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <Image
                source={icons.search}
                style={{ height: 20, width: 20, marginLeft: 15 }}
              />
            </TouchableOpacity>
          ) : null}
          {notifyVisible ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Image
                source={icons.notify}
                style={{
                  height: 24,
                  width: 24,
                  marginLeft: 15,
                  tintColor: color.primary,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        backgroundColor: color.white,
        paddingVertical: 3,
        paddingBottom: 8,
        alignItems: "center",
      }}
    >
      <View style={{ width: 100 }}>
        <Feather
          onPress={() => navigation.openDrawer()}
          name="menu"
          color={color.primary}
          size={20}
        />
      </View>
      <View>
        <Image source={images.header_logo} style={{ height: 52, width: 52 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 100,
          justifyContent: "flex-end",
        }}
      >
        {searchVisible ? (
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <Image
              source={icons.search}
              style={{ height: 20, width: 20, marginRight: 15, tintColor: color.primary }}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          {bagVisible ? (
            <Image source={icons.bag} style={{ height: 20, width: 16, tintColor: color.primary }} />
          ) : (
            <View style={{ height: 20, width: 16 }} />
          )}
        </TouchableOpacity>
        {notifyVisible ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image
              source={icons.notify}
              style={{
                height: 24,
                width: 24,
                marginLeft: 15,
                tintColor: color.primary,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
