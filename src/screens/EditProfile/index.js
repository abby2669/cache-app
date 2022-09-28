import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import { color } from "../../utils/color";
import Header from "../../components/Header";
import { GlobalStyles } from "../../utils/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import FloatingLabel from "../../components/FloatingLabel";
import * as IP from "expo-image-picker";
import common_axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../../utils/url";
import { getUser, setUserData } from "../../redux/actions/main";
import CustomPicker from "../../components/CustomPicker";
import Entypo from "@expo/vector-icons/Entypo";
import { CONSTANTS } from "../../Constants";
import Toast from "../../components/Toast/Toast";
import ImagePicker from "react-native-image-crop-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Popup from "../../components/Popup";

export default function EditProfile({ navigation }) {
  const { user_data, vehicle_types } = useSelector((state) => state.reducer);
  console.log(user_data);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState("select");
  const [location, setLocation] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [vehicle_name, set_vehicle_name] = useState("");
  const [phone_updated, set_phone_updated] = useState(false);
  const [phone_updating, set_phone_updating] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(user_data.email);
    setPhone(user_data.phone);
    setName(user_data.username);
    setImage(user_data.profile_image);
    setLocation(user_data.short_address);
    setSelected(user_data.vehicle_type);
    set_vehicle_name(user_data.vehicle_name);
  }, [user_data]);

  useEffect(() => {
    if (phone != user_data.phone && phone.length == 10) {
      set_phone_updated(true);
      set_phone_updating(false);
    } else {
      set_phone_updated(false);
    }
  }, [phone]);



  console.log(phone != user_data.phone);

  const pick_image = async () => {
    let result = await IP.launchImageLibraryAsync({
      mediaTypes: IP.MediaTypeOptions.Photos,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pick_image_multiple = async () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
      maxFiles: 4 - user_data.vehicle_images.length,
    }).then(async (images) => {
      if (user_data.vehicle_images?.length + images.length > 4) {
        Toast("You can't upload more than 4 images");
        return;
      }
      setImgUploading(true);
      console.log(images);
      const formData = new FormData();
      images.forEach((item, index) => {
        formData.append("vehicle_images[]", {
          uri: item.path,
          type: item.mime,
          name: `${"vehicle_image"}${index}.png`,
        });
      });
      const token = await AsyncStorage.getItem("access_token");
      fetch(`${BACKEND_URL}/user/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then(async (json) => {
          console.log(json);
          if (json.status == "ok") {
            Toast("Uploaded");
            dispatch(getUser());
            setImgUploading(false);
          }
        })
        .catch((e) => {
          setImgUploading(false);
          Toast("Failed to upload, please try again");
          console.log(e);
        });
    });
  };

  const update = async () => {

    if(phone_updated || phone_updating){
      if(phone_updated && !phone_updating){
        Toast("Please verify phone number");
        return
      }
      Toast("Please enter otp");
      return
    }

    let isnum = /^\d+$/.test(phone);
    let form_data = new FormData();
    if (phone.length != 10 || !isnum) {
      Toast("Enter a valid phone numner");
      return;
    }

    if (email?.length != 0 && user_data.email != email) {
      form_data.append("email", email);
    }
    if (name?.length != 0 && user_data.username != name) {
      form_data.append("username", name);
    }
    if (phone?.length != 0 && user_data.phone != phone) {
      form_data.append("phone", phone);
      form_data.append("is_verified", false);
    }
    if (vehicle_name?.length != 0 && user_data.vehicle_name != vehicle_name) {
      form_data.append("vehicle_name", vehicle_name);
    }
    if (selected?.length != 0 && user_data.vehicle_type != selected) {
      form_data.append("vehicle_type", selected);
    }
    if (image?.length != 0 && user_data.profile_image != image) {
      form_data.append("profile_image", {
        type: "image/png",
        name: `${user_data.username}.png`,
        uri: image,
      });
    }
    setLoading(true);
    // const { data } = await common_axios.post('/auth/update_profile', form_data);
    // console.log(data, 'data');
    const token = await AsyncStorage.getItem("access_token");
    fetch(`${BACKEND_URL}/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: form_data,
    })
      .then((res) => res.json())
      .then(async (json) => {
        console.log(json);
        dispatch(getUser());
        setLoading(false);
        setVisible(true);
        setTimeout(() => {
          navigation.goBack(null);
        }, 3000);
      })
      .catch((e) => {
        setLoading(false);
        setVisible(true);
        setTimeout(() => {
          navigation.goBack(null);
        }, 3000);
        console.log(e);
      });
  };

  const removeImg = async (uri) => {
    setImgUploading(true);
    const { data } = await common_axios.post("/user/remove_img", {
      uri,
    });
    dispatch(getUser());
    setImgUploading(false);
  };

  const verify = async () => {
    try {
      const { data } = await common_axios.post("/auth/change_no", {
        phone: user_data.phone,
        updated_phone: phone,
      });
      if (data.status == "ok") {
        set_phone_updated(false);
        set_phone_updating(true);
        dispatch(getUser());
        // Toast(data.msg);
      } else {
        Toast(data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const verifyDone = async () => {
    try {
      const { data } = await common_axios.post("/auth/verify", {
        phone,
        otp,
      });
      if (data.status == "ok") {
        set_phone_updated(false);
        set_phone_updating(false);
        dispatch(getUser());
        Toast(data.msg);
      } else {
        Toast(data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: color.light_primary }}>
      <StatusBar backgroundColor={color.primary} />
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
          onRightBtnPress={() => console.log("Hii")}
          title={"Edit Profile"}
        />
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get("window").width,
            alignItems: "center",
          }}
        >
          <View
            style={{ height: 70, width: 70, borderRadius: 35, marginTop: 10 }}
          >
            <Image
              source={{ uri: image ? image : "https://picsum.photos/200" }}
              style={{ height: 70, width: 70, borderRadius: 35 }}
            />
            <TouchableOpacity
              onPress={pick_image}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                position: "absolute",
              }}
            >
              <AntDesign color={color.white} size={20} name={"camerao"} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", marginTop: 27 }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  ...GlobalStyles.regular_text,
                }}
              >
                User Name
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter user name"
                style={{
                  height: 48,
                  marginTop: 10,
                  width: "100%",
                  borderRadius: 5,
                  borderWidth: 0.8,
                  paddingHorizontal: 10,
                  borderColor: "rgba(0,0,0,0.2)",
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 15,
                  ...GlobalStyles.regular_text,
                }}
              >
                Phone number
              </Text>
              <TextInput
                value={phone}
                maxLength={10}
                keyboardType={"phone-pad"}
                onChangeText={(text) => setPhone(text)}
                placeholder="Enter phone number"
                style={{
                  height: 48,
                  marginTop: 10,
                  width: "100%",
                  borderRadius: 5,
                  borderWidth: 0.8,
                  paddingHorizontal: 10,
                  borderColor: "rgba(0,0,0,0.2)",
                }}
              />
            </View>
            {phone_updated && !phone_updating && (
              <Button
                onPress={() => {
                  verify();
                }}
                style={{ width: 120, height: 35, marginTop: 10 }}
                filled={true}
                titleStyle={{ fontSize: 12, ...GlobalStyles.dm_sans_bold }}
                title="VERIFY"
              />
            )}
            {phone_updating && (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 15,
                    ...GlobalStyles.regular_text,
                  }}
                >
                  OTP
                </Text>
                <TextInput
                  value={otp}
                  maxLength={4}
                  keyboardType={"phone-pad"}
                  onChangeText={(text) => setOtp(text)}
                  placeholder="Enter OTP"
                  style={{
                    height: 48,
                    marginTop: 10,
                    width: "100%",
                    borderRadius: 5,
                    borderWidth: 0.8,
                    paddingHorizontal: 10,
                    borderColor: "rgba(0,0,0,0.2)",
                  }}
                />
                <Button
                  onPress={() => verifyDone()}
                  style={{ width: 120, height: 35, marginTop: 10 }}
                  filled={true}
                  titleStyle={{ fontSize: 12, ...GlobalStyles.dm_sans_bold }}
                  title="SUBMIT"
                />
              </View>
            )}
            <View>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 15,
                  ...GlobalStyles.regular_text,
                }}
              >
                Email
              </Text>
              <View>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Enter email ID"
                  style={{
                    height: 48,
                    marginTop: 10,
                    width: "100%",
                    borderRadius: 5,
                    borderWidth: 0.8,
                    paddingHorizontal: 10,
                    borderColor: "rgba(0,0,0,0.2)",
                  }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 15,
                  ...GlobalStyles.regular_text,
                }}
              >
                Vehcile name
              </Text>
              <View>
                <TextInput
                  value={vehicle_name}
                  onChangeText={(text) => set_vehicle_name(text)}
                  placeholder="Enter vehicle name"
                  style={{
                    height: 48,
                    marginTop: 10,
                    width: "100%",
                    borderRadius: 5,
                    borderWidth: 0.8,
                    paddingHorizontal: 10,
                    borderColor: "rgba(0,0,0,0.2)",
                  }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 15,
                  ...GlobalStyles.regular_text,
                }}
              >
                Location
              </Text>
              <TextInput
                value={location}
                editable={false}
                onChangeText={(text) => setLocation(text)}
                placeholder="Enter Location"
                style={{
                  height: 48,
                  marginTop: 10,
                  width: "100%",
                  borderRadius: 5,
                  borderWidth: 0.8,
                  paddingHorizontal: 10,
                  borderColor: "rgba(0,0,0,0.2)",
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANTS.SCREENS.selectLocationMap)
                }
                style={{
                  position: "absolute",
                  right: 0,
                  height: 48,
                  width: 48,
                  bottom: 0,
                  borderRadius: 5,
                  zIndex: 5,
                  backgroundColor: color.white,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "rgba(0,0,0,0.2)",
                  borderWidth: 0.8,
                }}
              >
                <Entypo
                  name="location-pin"
                  size={20}
                  color="rgba(0, 0, 0, 0.6)"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 20,
                  ...GlobalStyles.regular_text,
                }}
              >
                Vehicle Type
              </Text>
              <CustomPicker
                style={{ elevation: 0, marginTop: 15 }}
                val={selected}
                placeholder={{ value: "select", label: "Select vehicle type" }}
                setValue={setSelected}
                data={vehicle_types.data ? vehicle_types.data : []}
              />
            </View>
            <FlatList
              horizontal
              style={{ marginVertical: 10 }}
              data={user_data.vehicle_images ? user_data.vehicle_images : []}
              keyExtractor={(item) => item.uri}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    height: 80,
                    width: 80,
                    marginRight: 15,
                    justifyContent: "flex-end",
                  }}
                >
                  <AntDesign
                    onPress={() => removeImg(item.uri)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 2,
                    }}
                    size={20}
                    name="closecircle"
                    color="rgba(0,0,0,0.6)"
                  />
                  <Image
                    style={{
                      height: 74,
                      width: 74,
                      borderRadius: 10,
                    }}
                    source={{ uri: item.uri }}
                  />
                </View>
              )}
            />
            <Button
              onPress={pick_image_multiple}
              style={{ width: 120, height: 35, marginTop: 20 }}
              filled={true}
              deactivated={user_data.vehicle_images?.length >= 4}
              loading={imgUploading}
              titleStyle={{ fontSize: 12, ...GlobalStyles.dm_sans_bold }}
              title="UPLOAD IMAGES"
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 5,
                ...GlobalStyles.regular_text,
              }}
            >
              You can upload upto 4 images of a vehicle
            </Text>
          </View>
          <View style={{ height: 120 }} />
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
            onPress={() => update()}
            loading={loading}
            titleStyle={{
              color: color.white,
              fontSize: 16,
              ...GlobalStyles.dm_sans_bold,
            }}
            title="Save"
            style={{
              backgroundColor: color.primary,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </View>
        </ScrollView>
       
        <Popup
          title={"Profile updated successfully"}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}
