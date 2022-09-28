import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import Toast from "../../utils/toast";
import { IMAGE_URL } from "../../utils/url";
import Carousel from "react-native-banner-carousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";

export default function ProductDescription({ navigation, route }) {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);
  const { user_data } = useSelector((state) => state.reducer);

  const { name, cat, id } = route.params;
  const hide_action = route.params.hide_action;

  const addToCart = async (is_buy_now) => {
    try {
      const { data } = await common_axios.post(`/cart`, {
        qty: 1,
        variant: current.id,
        product_id: id,
      });
      if (data) {
        Toast("Added to cart");
        if (is_buy_now) {
          navigation.navigate("Cart");
        }
      }
    } catch (e) {
      Toast(
        e?.response?.data?.message
          ? e?.response?.data?.message
          : "An error occured"
      );
      console.log(e?.response?.data?.message);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await common_axios.get(`/product/${id}`);
      console.log(data);
      if (data.data) {
        setData(data.data);
        if (data.data?.variants?.length > 0) {
          setCurrent(data.data?.variants[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const changeVariant = (item) => {
    setOpen(false);
    setCurrent(item);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
      <View
        style={{ width: "100%", backgroundColor: color.white, height: "100%" }}
      >
        {!hide_action && (
          <View
            style={{
              position: "absolute",
              justifyContent: "space-between",
              alignItems: "center",
              bottom: 15,
              right: 15,
              left: 15,
              zIndex: 2,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => addToCart(true)}
              style={{
                justifyContent: "center",
                width: "47%",
                alignItems: "center",
                height: 48,
                backgroundColor: color.primary,
                borderRadius: 10,
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: color.white,
                  ...GlobalStyles.dm_sans_bold,
                }}
              >
                Buy Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addToCart()}
              style={{
                justifyContent: "center",
                width: "47%",
                alignItems: "center",
                height: 48,
                backgroundColor: color.primary,
                borderRadius: 10,
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: color.white,
                  ...GlobalStyles.dm_sans_bold,
                }}
              >
                Add to cart
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Header
          title={name}
          bagVisible={true}
          notifyVisible={false}
          searchVisible={false}
          type="back"
        />
        <ScrollView>
          <View
            style={{
              width: "100%",
              height: Dimensions.get("window").height * 0.4,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              paddingHorizontal: 35,
              backgroundColor: "#EBEBEB",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          >
            <Carousel>
              {data.images?.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: `${item.file}` }}
                    style={{
                      width: "90%",
                      height: "90%",
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                  />
                );
              })}
            </Carousel>
          </View>
          <View
            style={{
              position: "absolute",
              top: Dimensions.get("window").height * 0.45,
              right: 15,
              zIndex: 10,
            }}
          >
            <Text
              style={{
                fontSize: 8,
                color: color.semiBlack,
                ...GlobalStyles.semi_bold_text,
              }}
            >
              Quantity
            </Text>
            {!open ? (
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  minWidth: 60,
                  paddingHorizontal: 5,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: color.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 3,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: color.white,
                    ...GlobalStyles.regular_text,
                  }}
                >
                  {current.variant}
                </Text>
                <AntDesign
                  color={color.white}
                  style={{ marginLeft: 5 }}
                  name={"caretdown"}
                  size={12}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  minWidth: 60,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: color.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 3,
                  flexDirection: "row",
                }}
              >
                <FlatList
                  data={data.variants}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => changeVariant(item)}
                        style={{
                          borderTopColor: color.grey,
                          borderTopWidth: index == 0 ? 0 : 1,
                          paddingVertical: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            color: color.white,
                            ...GlobalStyles.regular_text,
                          }}
                        >
                          {item.variant}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </View>
          <View style={{ width: "100%", paddingHorizontal: 15, marginTop: 15 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                color: color.black,
                ...GlobalStyles.semi_bold_text600,
              }}
            >
              {data.product_name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                marginTop: 5,
                maxWidth: "75%",
                color: color.semiBlack,
                ...GlobalStyles.regular_text,
              }}
            >
              (
              {data?.variants?.map((pr, i) => {
                return `${pr.variant}${
                  i == data?.variants?.length - 1 ? "" : ", "
                }`;
              })}
              )
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 20, marginTop: 10, color: color.black }}
                >
                  ₹
                  <Text style={{ ...GlobalStyles.semi_bold_text600 }}>
                    {current.offer_price ? current.offer_price : current.price}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 6,
                    marginTop: 10,
                    textDecorationLine: "line-through",
                    color: color.grey,
                  }}
                >
                  ₹
                  <Text style={{ ...GlobalStyles.regular_text }}>
                    {current.offer_price ? current.price : ""}
                  </Text>
                </Text>
              </View>
            </View>
            <Text style={{ ...GlobalStyles.regular_text, marginTop: 10 }}>
              Country of Origin: {data.country || "India"}
            </Text>
            <View style={{ width: "100%", marginTop: 15, height: 300 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: color.black,
                  ...GlobalStyles.semi_bold_text600,
                }}
              >
                Description
              </Text>
              <WebView
                style={{ height: "100%", width: "100%" }}
                source={{ html: data.description ? data.description : "" }}
                androidHardwareAccelerationDisabled={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
