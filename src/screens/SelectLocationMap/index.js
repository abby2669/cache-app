import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import Button from "../../components/Button";
import Toast from "../../components/Toast/Toast";
import { color } from "../../utils/color";
import { SafeAreaView } from "react-native-safe-area-context";
import common_axios from "../../utils/axios";
import { getUser } from "../../redux/actions/main";

function SelectLocationMap({ navigation, route }) {
  const MAPS_KEY = "AIzaSyA_nmZVriBFLHl4ZdmN7d_WVr9PEH2sZa4";
  const deviceHeight = Dimensions.get("window").height;
  const map_ref = useRef(null);
  const { user_location: my_location } = useSelector((state) => state.reducer);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({});
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  // console.log(complete_location)

  const location_update = async (e) => {
    setCoords({ lat: e.latitude, lng: e.longitude });
  };
  console.log('SelectLocationMap',JSON.stringify(my_location))

  const on_save = async () => {
    setUploading(true);
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${MAPS_KEY}`
      );
      var newLoc = {};
      if (data.status == "OK") {
        console.log(data);
        const letVar = data.results[0].address_components;
        letVar.forEach((item) => {
          item.types.forEach((qr) => {
            if (qr === "administrative_area_level_2") {
              newLoc = { ...newLoc, locality: item.long_name };
            }
            if (qr === "locality") {
              newLoc = { ...newLoc, locality: item.long_name };
            }
            if (qr === "sublocality") {
              newLoc = { ...newLoc, locality: item.long_name };
            }
            if (qr === "postal_code") {
              newLoc = { ...newLoc, pincode: item.long_name };
            }
          });
        });
        newLoc = {
          ...newLoc,
          coords: data.results[0].geometry.location,
          formatted_address: data.results[0].formatted_address,
        };
        console.log(newLoc);
        const { data: res } = await common_axios.post("/user/edit", {
          coordinates: {
            type: "Point",
            coordinates: [
              parseFloat(newLoc.coords.lng),
              parseFloat(newLoc.coords.lat),
            ],
          },
          short_address: newLoc.locality,
          full_address: newLoc.formatted_address,
        });
        console.log(res, "rr");
        if (res.status == "ok") {
          Toast("Location updated");
          dispatch(getUser());
          navigation.goBack(null);
        } else {
          setUploading(false);
          Toast("Server error");
        }
      } else {
        setUploading(false);
        Toast("Enter Correct Address");
      }
    } catch (e) {
      setUploading(false);
      console.log(e);
    }
    setUploading(false);
  };

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        backgroundColor: color.white,
      }}
    >
      <Ionicons
        style={{
          position: "absolute",
          alignSelf: "center",
          zIndex: 2,
          top: deviceHeight * 0.5 - 10,
        }}
        name="ios-pin"
        color={color.primary}
        size={50}
      />
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <MapView
          style={{ height: "100%", width: "100%" }}
          showsUserLocation={true}
          ref={map_ref}
          showsMyLocationButton={true}
          // initialRegion={my_location}
          onMapLoaded={(e) => function () {
            map_ref?.current?.animateToCoordinate({ latitude: my_location.latitude, longitude: my_location.longitude })
          }()}
          initialRegion={my_location.latitude ? { latitude: my_location.latitude, longitude: my_location.latitude, longitudeDelta: 0.1, latitudeDelta: 0.1 } : {}}

          provider={
            Platform.OS == "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          onRegionChangeComplete={(e) => location_update(e)}
        />
      </View>
      <Button
        onPress={on_save}
        loading={uploading}
        filled={true}
        style={{
          position: "absolute",
          bottom: 40,
          width: "90%",
          marginHorizontal: "5%",
        }}
        title="Save"
      />
    </SafeAreaView>
  );
}

export default SelectLocationMap;
