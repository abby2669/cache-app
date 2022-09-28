import { ToastAndroid, Platform } from 'react-native';

function Toast(text) {
    if (Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
            text,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            300
        );
    } else {
        alert(text)
    }
}

export default Toast;