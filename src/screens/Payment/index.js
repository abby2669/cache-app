import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import Header from '../../components/Header';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import common_axios from '../../utils/axios';

export default function Payment({ navigation, route }) {

    const [visible, setVisible] = useState(false)

    const { img, desc, name, cat, id, qty } = route.params;
    const { user_data } = useSelector(state => state.reducer)

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false)
                navigation.navigate("Home")
            }, 3000)
        }
    }, [visible]);

    const purchase = async () => {
        const { data } = await common_axios.post('/purchase', {
            product_id: id,
            user_id: user_data.id,
            qty
        })
        console.log(data)
        if (data.status == "1") {
            setVisible(true)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: color.primary }}>
            <View style={{ height: "100%", width: "100%", backgroundColor: color.white }}>
                <TouchableOpacity onPress={() => purchase()} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: 45, bottom: 15, right: 15, left: 15, backgroundColor: color.primary, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_bold }}>Place Order</Text>
                </TouchableOpacity>
                <Header title="Order Summary" type="back" />
                <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center', borderBottomColor: 'rgba(0, 0, 0, 0.6)', borderBottomWidth: 0.5 }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                                <Text style={{ color: color.white }}>1</Text>
                            </View>
                        </View>
                        <View style={{ width: '60%', borderTopColor: color.black, borderWidth: 1 }} />
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                                <Text style={{ color: color.white }}>2</Text>
                            </View>
                            {/* <Text style={{ fontSize: 12, textAlign: 'center', ...GlobalStyles.regular_text }}>Payment</Text> */}
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: "90%", alignSelf: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 12, textAlign: 'center', ...GlobalStyles.regular_text }}>Order summary</Text>
                        <Text style={{ fontSize: 12, textAlign: 'center', ...GlobalStyles.regular_text }}>Payment      </Text>
                    </View>
                </View>
                <View style={{ width: '100%', paddingVertical: 20, }}>
                    <Text style={{ fontSize: 16, marginLeft: 15, ...GlobalStyles.dm_sans_bold }}>Pay securely</Text>
                    <TouchableOpacity style={{ height: 80, backgroundColor: "rgba(53, 95, 67, 0.2)", alignItems: 'center', marginTop: 15, paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ height: 20, width: 20, borderColor: color.primary, borderWidth: 2, borderRadius: 10, justifyContent: "center", alignItems: 'center' }}>
                            <View style={{ height: 10, width: 10, borderColor: color.primary, borderWidth: 2, borderRadius: 10, backgroundColor: color.primary }} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_regular }}>Cash on delivery</Text>
                            <Text style={{ fontSize: 12, color: "rgba(0, 0, 0, 0.6)", ...GlobalStyles.dm_sans_regular }}>Pay it when product is delivered to you</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={visible}
                transparent={true}
            >
                <View style={{ height: '100%', width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ height: 200, width: "90%", justifyContent: 'center', alignItems: "center", backgroundColor: color.white, borderRadius: 20 }}>
                        <View style={{ height: 60, width: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                            <FontAwesome name="check" size={25} color={color.white} />
                        </View>
                        <Text style={{ color: color.primary, fontSize: 20, marginTop: 20, ...GlobalStyles.dm_sans_bold }}>Order Placed Successfully</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}