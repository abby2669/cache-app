import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Dimensions, Image, Text } from "react-native";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";

export default function Product({ item, name }) {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDescription", {
          name: item.product_name,
          cat: name,
          id: item.id,
        })
      }
      style={{
        borderRadius: 10,
        elevation: 5,
        shadowColor: color.black,
        shadowOpacity: 0.4,
        shadowOffset: { height: 3, width: 0 },
        shadowRadius: 3,
        marginTop: 15,
        width: width * 0.45,
        height: width * 0.6,
        backgroundColor: color.white,
        padding: 5,
      }}
    >
      <Image
        source={{
          uri: item.images.length > 0 ? item.images[0].file : "",
        }}
        style={{
          height: "60%",
          width: "100%",
          borderRadius: 10,
          backgroundColor: "#EBEBEB",
          resizeMode: "contain",
        }}
      />
      <View style={{ marginTop: 15 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 12, ...GlobalStyles.semi_bold_text }}
        >
          {item.product_name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 10,
            marginTop: 5,
            color: color.semiBlack,
            ...GlobalStyles.regular_text,
          }}
        >
          (
          {item.variants.map((pr, i) => {
            return `${pr.variant}${i == item.variants.length - 1 ? "" : ", "}`;
          })}
          )
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 14, marginTop: 5, color: color.black }}
          >
            ₹
            <Text
              style={{
                fontSize: 14,
                color: color.black,
                ...GlobalStyles.semi_bold_text600,
              }}
            >
              {item.variants.length > 0
                ? item.variants[0].offer_price
                  ? item.variants[0].offer_price
                  : item.variants[0].price
                : "0"}
            </Text>
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              marginTop: 5,
              color: color.grey,
              marginLeft: 7,
              textDecorationLine: "line-through",
            }}
          >
            ₹
            <Text
              style={{
                fontSize: 10,
                marginTop: 5,
                color: color.grey,
                textDecorationLine: "line-through",
                ...GlobalStyles.semi_bold_text600,
              }}
            >
              {item.variants.length > 0 ? item.variants[0].price : ""}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
