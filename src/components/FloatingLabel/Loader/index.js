import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native';
import { color } from '../../utils/color';

export default function Loader({ Header }) {
    return (
        <SafeAreaView style={{ backgroundColor: color.light_primary }}>
            <View style={{ height: "100%", width: "100%", backgroundColor: color.white }}>
                <Header />
                <View style={{ height: "100%", width: "100%", backgroundColor: color.white, justifyContent: "center", alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={color.primary} />
                </View>
            </View>
        </SafeAreaView>
    )
}