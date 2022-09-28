import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import common_axios from '../../utils/axios';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import { IMAGE_URL } from '../../utils/url';

export default function Steps({ navigation, route }) {

    const [data, setData] = useState([]);
    const { name, id } = route.params;

    useEffect(() => {
        fetch_steps()
    }, [])

    const fetch_steps = async () => {
        try {
            const { data: res } = await common_axios.get(`/subcategory?category_id=${id}`)
            console.log(res)
            if (res.data) {
                setData(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: color.white }}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text style={{ color: color.primary, textAlign: "center", marginTop: 15, ...GlobalStyles.semi_bold_text600 }}>No Data</Text>}
                ListHeaderComponent={() => <ListHeader navigation={navigation} content_visible={data.length != 0} title={name} />}
                ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("StepsDescription", { id: item.id, name: item.subcategory_name, desc: item.discription })} style={{ padding: 15, borderRadius: 10, elevation: 5, shadowColor: color.black, shadowOpacity: 0.4, shadowOffset: { height: 3, width: 0 }, shadowRadius: 3, backgroundColor: color.white, marginBottom: 10, marginHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: `${IMAGE_URL}${item.subcategory_image}` }} style={{ height: 50, width: 50, borderRadius: 5 }} />
                        <View style={{ marginLeft: 20, maxWidth: "75%" }}>
                            <Text numberOfLines={2} style={{ color: color.primary, fontSize: 16, ...GlobalStyles.dm_sans_bold }}>{item.subcategory_name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const ListHeader = ({ title, content_visible, navigation }) => (
    <View style={{ width: '100%', backgroundColor: color.white }}>
        <Header title={title} bagVisible={false} notifyVisible={false} searchVisible={false} type='back' onNotifyPress={() => navigation.navigate("Notifications")} />
        {content_visible ? <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 18, color: color.primary, textAlign: 'center', ...GlobalStyles.dm_sans_bold }}>Steps to follow</Text>
        </View> : null}
    </View>
)