import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { getCommodities, onLocationTextSearch } from "../../redux/actions/main";
import { color } from "../../utils/color";
import MapViewCustom from "../../components/MapView";
import SearchBar from "../../components/SearchBar";
import BottomSheetComp from "../../components/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import common_axios from "../../utils/axios";
import { StatusBar } from "expo-status-bar";
let isChangingReagion = false

export default function Home({ navigation }) {
  const [data, setData] = useState();
  const { user_location, user_data } = useSelector((state) => state.reducer);
  const [location, setLocation] = useState({});
  const [selected, setSelected] = useState("select");
  const dispatch = useDispatch();
  const map_ref = useRef(null);
  const bottomSheetRef = useRef(null);

  const onSelectSuggestion = (suggestion) => {
    const cb = (data) => {
      setLocation(data);
      map_ref.current.animateToRegion(
        {
          longitude: data.coords.lng,
          latitude: data.coords.lat,
          latitudeDelta: 0.019,
          longitudeDelta: 0.019,
        },
        1000
      );
    };
    dispatch(onLocationTextSearch(suggestion, cb));
  };

  const [tem_data, set_tem_data] = useState([]);

  useEffect(() => {
    if (user_location) {
      setLocation({
        coords: {
          lat: user_location.latitude,
          lng: user_location.longitude,
        },
      });
    }
  }, [user_location]);

  useEffect(() => {
    fetch_data();
  }, [location, selected]);

  const fetch_data = async () => {
    if (location.coords?.lat) {
      const { data } = await common_axios.post("/user/local", {
        lat: location.coords.lat,
        lng: location.coords.lng,
        type: selected == "select" ? null : selected,
      });
      console.log(data);
      if (data.status == "ok") {
        set_tem_data(data.data);
      }
    }
  };

  const location_update = async (e) => {
    setLocation({
      coords: {
        lat: e.latitude,
        lng: e.longitude,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar style="dark" />
      <View
        style={{ height: "100%", width: "100%", backgroundColor: color.white }}
      >
        <Header
          onBagPress={() => navigation.navigate("MyOrders")}
          type="menu"
          notifyVisible={false}
        />
        <View style={{ flex: 1 }}>
          <MapViewCustom
            location_update={location_update}
            data={tem_data}
            map_ref={map_ref}
            onMapReady={() => console.log('onMapReady')}
            onMapLoaded={() => console.log('onMapLoaded')}
            />
          <SearchBar
            onSelect={onSelectSuggestion}
            user_location={user_location}
          />
          {user_data.type != "driver" && (
            <BottomSheetComp
              selected={selected}
              setSelected={setSelected}
              data={tem_data}
              bottomSheetRef={bottomSheetRef}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
