import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import Header from "../../components/Header";
import Product from "../../components/Product";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { icons } from "../../utils/icons";
import Toast from "../../utils/toast";
import { IMAGE_URL } from "../../utils/url";

export default function Category({ navigation, route }) {
  const { name, id } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch_prods();
  }, []);

  const fetch_prods = async () => {
    try {
      const { data: res } = await common_axios.get(
        `/product?product_category_id=${id}`
      );
      if (res.data) {
        console.log(res);
        setData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  const openWhatsapp = () => {
    Linking.canOpenURL("whatsapp://send?text=Hello&phone=+918748855850")
      .then((supported) => {
        if (!supported) {
          Toast("This feature is not supported in this phone");
        } else {
          return Linking.openURL(
            "whatsapp://send?text=Hello&phone=+918748855850"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
      <View
        style={{ backgroundColor: color.white, height: "100%", width: "100%" }}
      >
        <Header
          title={name}
          bagVisible={true}
          notifyVisible={false}
          searchVisible={true}
          type="back"
        />
        <TouchableOpacity
          onPress={() => openWhatsapp()}
          style={{ position: "absolute", bottom: 100, right: 20, zIndex: 10 }}
        >
          <Image style={{ height: 67, width: 67 }} source={icons.whatsapp} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => callNumber("+918748855850")}
          style={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}
        >
          <Image style={{ height: 67, width: 67 }} source={icons.call} />
        </TouchableOpacity>
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: color.white }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
          renderItem={({ item, index }) => (
            <Product item={item} name={name} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
