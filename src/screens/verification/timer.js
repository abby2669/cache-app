import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import Toast from "../../utils/toast";

function Timer({ init_seconds, api, phone }) {
  const [seconds, setSeconds] = useState(init_seconds);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }
  });

  const onResend = async () => {
    console.log(api);
    // if (seconds != 0) {
    //   Toast(`Resend in ${seconds} seconds`);
    //   return;
    // }

    // setSeconds(30);

    try {
      const { data } = await common_axios.post(api, {
        phone,
      });
      console.log(data);
      Toast(data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          color: "rgba(0,0,0,0.6)",
          marginTop: 10,
          ...GlobalStyles.regular_text,
        }}
      >
        Didn’t recieve code?{" "}
        <Text onPress={onResend} style={{ color: color.black }}>
          Resend OTP
        </Text>
      </Text>
      {seconds != 0 && (
        <Text
          style={{ textAlign: "center", color: color.black, marginTop: 15 }}
        >
          Try to resend
          <Text style={{ color: color.black }}>
            {seconds > 0 ? " in" + " " + seconds : ""}
          </Text>
        </Text>
      )}
    </View>
  );
}

export default Timer;
