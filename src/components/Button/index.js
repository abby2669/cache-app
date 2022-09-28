import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";

export default function Button({
  style,
  title,
  onPress,
  titleStyle,
  loading,
  filled,
  deactivated,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={deactivated}
      style={{
        width: "100%",
        height: 48,
        backgroundColor: deactivated
          ? "#B3B3B3"
          : filled
          ? color.primary
          : color.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        ...style,
      }}
    >
      {loading ? (
        <ActivityIndicator color={color.white} size={"small"} />
      ) : (
        <Text
          style={{
            color: filled ? color.white : color.primary,
            fontSize: 16,
            ...GlobalStyles.dm_sans_bold,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
