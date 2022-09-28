import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { color } from '../../utils/color';
import Feather from '@expo/vector-icons/Feather'
import { GlobalStyles } from '../../utils/globalStyles';
import Button from '../../components/Button';
export default function SuccessPage({ navigation }) {
    return (
        <SafeAreaView style={{ backgroundColor: color.primary }}>
            <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: 'center', backgroundColor: color.white }}>
                <View style={{ height: 100, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: color.light_green, borderRadius: 50 }}>
                    <Feather name='check' color={color.white} size={50} />
                </View>
                <Text style={{ fontSize: 30, marginTop: 10, ...GlobalStyles.semi_bold_text }}>Order placed</Text>
                <Text style={{ fontSize: 18, marginTop: 5, maxWidth: '80%', textAlign: 'center', ...GlobalStyles.semi_bold_text }}>Your products will be delievered soon!!!</Text>
                <Button onPress={() => navigation.navigate("Home")} titleStyle={{ color: color.white, fontSize: 16 }} style={{ backgroundColor: color.primary, marginTop: 15, width: '55%', borderRadius: 50 }} title='Continue Shopping' />
            </View>
        </SafeAreaView>
    )
}