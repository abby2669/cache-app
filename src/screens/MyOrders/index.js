import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { color } from "../../utils/color";
import Header from "../../components/Header";
import { GlobalStyles } from "../../utils/globalStyles";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Feather from "@expo/vector-icons/Feather";
import common_axios from "../../utils/axios";
import { IMAGE_URL } from "../../utils/url";
import Loader from "../../components/Loader";
import { icons } from "../../utils/icons";

export default function MyOrders({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = async () => {
    try {
      const { data: res } = await common_axios.get("/order-list");
      console.log(res);
      if (res) {
        setData(res.data);
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
            type="custom"
            rightBtnVisible={false}
            right_text={"Edit"}
            onRightBtnPress={() => navigation.navigate("EditProfile")}
            title={"My Orders"}
          />
        )}
      />
    );
  }

  if (data?.length == 0) {
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
            type="custom"
            rightBtnVisible={false}
            right_text={"Edit"}
            onRightBtnPress={() => navigation.navigate("EditProfile")}
            title={"My Orders"}
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
                  ...GlobalStyles.dm_sans_bold,
                }}
              >
                No Orders!
              </Text>
              <Text
                style={{
                  color: "rgba(10, 10, 10, 0.7)",
                  marginTop: 15,
                  fontSize: 14,
                  textAlign: "center",
                  ...GlobalStyles.dm_sans_regular,
                }}
              >
                Order now and get requirement fulfilled
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
        style={{ height: "100%", width: "100%", backgroundColor: color.white }}
      >
        <Header
          type="custom"
          rightBtnVisible={false}
          right_text={"Edit"}
          onRightBtnPress={() => navigation.navigate("EditProfile")}
          title={"My Orders"}
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => (
            <View style={{ height: 100, width: 100 }} />
          )}
          style={{ marginTop: 10 }}
          renderItem={({ item: order }) => (
            <View
              style={{
                marginTop: 20,
                shadowColor: color.black,
                elevation: 5,
                shadowOffset: { height: 3, width: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                width: "90%",
                marginHorizontal: "5%",
                backgroundColor: color.white,
                borderRadius: 20,
                paddingHorizontal: 8,
                paddingTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  ...GlobalStyles.semi_bold_text600,
                }}
              >
                Order id: {order.order_number}
              </Text>
              <FlatList
                data={order?.items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ProductDescription", {
                          name: item.product_name,
                          cat: "Product",
                          id: item.product_id,
                          hide_action: true,
                        })
                      }
                      style={{
                        maxHeight: 150,
                        backgroundColor: color.white,
                        flexDirection: "row",
                        padding: 2,
                        borderRadius: 20,
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 20,
                          width: "30%",
                          height: "100%",
                          backgroundColor: "#EBEBEB",
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              item.images?.length > 0
                                ? item.images[0].file
                                : "",
                          }}
                          style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "64%",
                          justifyContent: "center",
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
                            maxWidth: "75%",
                            ...GlobalStyles.regular_text,
                          }}
                          numberOfLines={1}
                        >
                          (
                          {item?.variants?.map((pr, i) => {
                            return `${pr.variant}${
                              i == item?.variants?.length - 1 ? "" : ", "
                            }`;
                          })}
                          )
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
                          ></Text>
                        </View>
                        <Text
                          style={{
                            color: "#4B4B4B",
                            fontSize: 12,
                            ...GlobalStyles.regular_text,
                          }}
                        >
                          Quantity:{" "}
                          <Text style={{ ...GlobalStyles.semi_bold_text600 }}>
                            {item.variant}
                          </Text>
                        </Text>
                        {/* <Text
                        style={{
                          color: "#4B4B4B",
                          fontSize: 12,
                          ...GlobalStyles.regular_text,
                        }}
                      >
                        Order id: #{item.orderid}
                      </Text> */}
                        <Text
                          style={{
                            color: "#4B4B4B",
                            fontSize: 12,
                            marginTop: 5,
                            ...GlobalStyles.regular_text,
                          }}
                        >
                          Ordered on{" "}
                          {new Date(
                            order.created_date
                              ? order.created_date
                              : "03 jan 2020"
                          ).toDateString()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {index == order.items?.length - 1 ? null : (
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          marginVertical: 5,
                          borderBottomColor: "rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    )}
                  </>
                )}
              />
              <View
                style={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  padding: 12,
                  borderTopColor: "rgba(0, 0, 0, 0.1)",
                  borderTopWidth: 0.5,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <View>
                  {order.order_status == "Delivered" ? (
                    <Image
                      style={{ height: 18, width: 18 }}
                      source={icons.delivered}
                    />
                  ) : (
                    <Image
                      style={{ height: 18, width: 18, tintColor: "#FFD809" }}
                      source={icons.delivering}
                    />
                  )}
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    color:
                      order.order_status == "Delivered" ? "#42BE65" : "#FFD809",
                    ...GlobalStyles.semi_bold_text600,
                  }}
                >
                  {order.order_status}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    marginLeft: 10,
                    color:
                      order.order_status == "Delivered" ? "#42BE65" : "#FFD809",
                    ...GlobalStyles.regular_text,
                  }}
                >
                  {new Date(order.order_status_date).toDateString()}
                </Text>
              </View>
            </View>
          )}
        />
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
