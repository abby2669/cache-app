import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import BottomSheet, {
  TouchableOpacity,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { Platform } from "react-native";
import CustomPicker from "../CustomPicker";
import Vehicle from "../Vehicle";
import { useSelector } from "react-redux";
import Animated from "react-native-reanimated";

export default function BottomSheetComp({ bottomSheetRef,data, selected, setSelected }) {
  // const bottomSheetRef = useRef(null);
  const [index,setIndex] = useState(1)
  const [animatedIndex,setAnimatedIndex] = useState(new Animated.Value(0))
  const { vehicle_types } = useSelector((state) => state.reducer);
  const snapPoints = useMemo(
    () => [Platform.OS == "android" ? "20%" : "15%", "80%"],
    []
  );
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  
  //  setTimeout(() => {
  //   bottomSheetRef.current.collapse()
  //  }, 1000);


  }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {(data?.length) == 0 ? (
        selected == "select" ? (
          <Text
            style={{
              fontSize: 12,
              color: "#B76C28",
              textAlign: "center",
              ...GlobalStyles.regular_text,
            }}
          >
            No vehicles found around this location
          </Text>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 15 }}>
              <Text
                style={{
                  color: color.primary,
                  fontSize: 20,
                  ...GlobalStyles.semi_bold_text600,
                }}
              >
                Vehicle List
              </Text>
              <CustomPicker
                style={{ elevation: 10, backgroundColor: color.white }}
                val={selected}
                placeholder={{ value: "select", label: "Select vehicle type" }}
                setValue={setSelected}
                data={vehicle_types.data && vehicle_types.data.length > 0 ? vehicle_types.data : []}
              />
            </View>
            {/* <BottomSheetFlatList
              ListFooterComponent={() => <View style={{ height: 20 }} />}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Vehicle item={item} />}
            /> */}
            <FlatList
              ListFooterComponent={() => <View style={{ height: 20 }} />}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Vehicle item={item} />}
            />
          </View>
        )
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                color: color.primary,
                fontSize: 20,
                ...GlobalStyles.semi_bold_text600,
              }}
            >
              Vehicle List
            </Text>
            <CustomPicker
              style={{ elevation: 10, backgroundColor: color.white }}
              val={selected}
              placeholder={{ value: "select", label: "Select vehicle type" }}
              setValue={setSelected}
              data={vehicle_types.data && vehicle_types.data.length > 0 ? vehicle_types.data : []}
            />
          </View>

          <FlatList
            ListFooterComponent={() => <View style={{ height: 20 }} />}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Vehicle item={item} />}
          />
          {/* <BottomSheetFlatList
            ListFooterComponent={() => <View style={{ height: 20 }} />}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Vehicle item={item} />}
          /> */}
        </View>
      )}
    </BottomSheet>
  );
}
