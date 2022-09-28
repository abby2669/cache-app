import React, { useState } from "react";
import { View, Text, Modal, Image } from "react-native";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { icons } from "../../utils/icons";

export default function Popup({ title, visible, onClose }) {
  return (
    <Modal onRequestClose={onClose} visible={visible} transparent={true}>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: color.white,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 30,
            width: "100%",
          }}
        >
          <Image style={{ height: 50, width: 50 }} source={icons.tick} />
          <Text
            style={{
              marginTop: 30,
              fontSize: 20,
              maxWidth: "75%",
              textAlign: "center",
              color: color.primary,
              ...GlobalStyles.dm_sans_bold,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
