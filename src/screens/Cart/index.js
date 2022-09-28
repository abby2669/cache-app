import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import Header from "../../components/Header";
import { color } from "../../utils/color";
import Feather from "@expo/vector-icons/Feather";
import Button from "../../components/Button";
import { GlobalStyles } from "../../utils/globalStyles";
import common_axios from "../../utils/axios";
import { FlatList } from "react-native-gesture-handler";
import { IMAGE_URL } from "../../utils/url";
import Loader from "../../components/Loader";

export default function Cart({ navigation }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch_cart();
  }, []);

  const remove = async (id, item_id) => {
    setLoading(true);
    try {
      const { data } = await common_axios.delete("/removecart", {
        data: {
          cart: id,
          item: item_id,
        },
      });
      setTimeout(() => {
        fetch_cart();
      }, 500);
    } catch (e) {
      alert("An error occured");
      setLoading(false);
      console.log(e?.response?.data?.message);
    }
  };

  const fetch_cart = async () => {
    setLoading(true);
    try {
      const { data } = await common_axios.get("/getcart");
      console.log(data);
      if (data.data?.length > 0) {
        setCart(data.data[0].cart_items ? data.data[0].cart_items : []);
        setTotal(data.data[0].total);
      } else {
        setCart([]);
        setTotal(0);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Loader
        Header={() => (
          <Header
            type="back"
            rightBtnVisible={false}
            right_text={"Edit"}
            onRightBtnPress={() => navigation.navigate("EditProfile")}
            title={"Cart"}
          />
        )}
      />
    );
  }

  if (!cart || cart?.length == 0) {
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
          <Header
            type="back"
            rightBtnVisible={false}
            right_text={"Edit"}
            onRightBtnPress={() => navigation.navigate("EditProfile")}
            title={"Cart"}
          />
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
              <Feather name={"shopping-bag"} size={41} color={color.black} />
              <Text
                style={{
                  color: color.black,
                  marginTop: 15,
                  fontSize: 24,
                  textAlign: "center",
                  ...GlobalStyles.semi_bold_text600,
                }}
              >
                0 Items!
              </Text>
              <Text
                style={{
                  color: "rgba(10, 10, 10, 0.7)",
                  marginTop: 15,
                  fontSize: 14,
                  textAlign: "center",
                  ...GlobalStyles.regular_text,
                }}
              >
                Add items to cart and continue shopping
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
                ...GlobalStyles.semi_bold_text600,
              }}
              title="Go to Home"
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
        <Header
          type="back"
          rightBtnVisible={false}
          right_text={"Edit"}
          onRightBtnPress={() => navigation.navigate("EditProfile")}
          title={"Cart"}
        />
        <View
          style={{
            height: "100%",
          }}
        >
          <FlatList
            data={cart}
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: 15, width: "100%" }}
            ListFooterComponent={() => <View style={{ height: 330 }} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDescription", {
                    name: item.product_name,
                    cat: "Product",
                    id: item.product_id,
                  })
                }
                style={{
                  height: 145,
                  width: "90%",
                  marginHorizontal: "5%",
                  borderRadius: 20,
                  shadowColor: color.black,
                  shadowOffset: { height: 3, width: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  elevation: 5,
                  backgroundColor: color.white,
                  marginTop: 20,
                  flexDirection: "row",
                  padding: 2,
                }}
              >
                <View
                  style={{
                    borderRadius: 20,
                    width: "30%",
                    backgroundColor: "#EBEBEB",
                  }}
                >
                  <Image
                    source={{
                      uri: item.images?.length > 0 ? item.images[0].file : "",
                    }}
                    style={{
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "64%",
                    paddingVertical: 10,
                    marginLeft: "4%",
                  }}
                >
                  <Text
                    style={{ ...GlobalStyles.semi_bold_text600 }}
                    numberOfLines={1}
                  >
                    {item.product_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: color.grey,
                      marginTop: 3,
                      ...GlobalStyles.regular_text,
                    }}
                    numberOfLines={1}
                  >
                    ({item.variant})
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>
                      ₹
                      <Text style={{ ...GlobalStyles.semi_bold_text600 }}>
                        {item.offer_price ? item.offer_price : item.price}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: color.grey,
                        textDecorationLine: "line-through",
                        marginLeft: 5,
                      }}
                    >
                      ₹
                      <Text
                        style={{
                          fontSize: 10,
                          color: color.grey,
                          textDecorationLine: "line-through",
                          ...GlobalStyles.regular_text,
                        }}
                      >
                        {item.price}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <View>
                      <Text
                        style={{
                          fontSize: 8,
                          marginTop: 10,
                          color: color.semiBlack,
                          ...GlobalStyles.semi_bold_text,
                        }}
                      >
                        Quantity
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            width: 60,
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
                            {item.variant}
                          </Text>
                        </View>
                        <Text
                          onPress={() =>
                            remove(item.cart_id, item.cart_item_id)
                          }
                          style={{
                            fontSize: 10,
                            color: color.red,
                            ...GlobalStyles.regular_text,
                          }}
                        >
                          Remove
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 15,
            paddingBottom: 15,
            backgroundColor: color.white,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              ...GlobalStyles.dm_sans_bold,
            }}
          >
            Price details
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 15,
              borderTopColor: "#CECECE",
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderBottomColor: "#CECECE",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: "rgba(108, 108, 108, 1)",
                ...GlobalStyles.regular_text,
              }}
            >
              Price ({cart?.length} {cart?.length < 2 ? "item" : "items"})
            </Text>
            <Text style={{ color: color.black }}>
              ₹
              <Text
                style={{ color: color.black, ...GlobalStyles.regular_text }}
              >
                {total}
              </Text>
            </Text>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                        <Text style={{ color: "rgba(108, 108, 108, 1)", ...GlobalStyles.regular_text }}>Delivery charges</Text>
                        <Text style={{ color: color.black, ...GlobalStyles.dm_sans_regular }}>₹99</Text>
                    </View> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 5,
              paddingVertical: 12,
            }}
          >
            <Text
              style={{ color: color.black, ...GlobalStyles.semi_bold_text }}
            >
              Amount Payable
            </Text>
            <Text style={{ color: color.black }}>
              ₹
              <Text
                style={{ color: color.black, ...GlobalStyles.semi_bold_text }}
              >
                {total}
              </Text>
            </Text>
          </View>
          <Button
            onPress={() => navigation.navigate("OrderSummary")}
            titleStyle={{
              color: color.white,
              fontSize: 16,
              ...GlobalStyles.semi_bold_text600,
            }}
            title="Buy now"
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
