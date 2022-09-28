import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import { images } from '../../utils/icons';
import common_axios from "../../utils/axios";
import { WebView } from 'react-native-webview';

export default function StepsDescription({ navigation, route }) {

    const [data, setData] = useState([{ id: "1", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "2", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "3", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "4", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" },]);
    const width = Dimensions.get("window").width
    const { name, id, desc } = route.params;

    // useEffect(() => {
    //     fetch_data()
    // }, [])

    // const fetch_data = async () => {
    //     const { data } = await common_axios.get(`/subcategory?category_id=${id}`);
    //     console.log(data)
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
            <View style={{ height: "100%", width: "100%", backgroundColor: color.white }}>
                <ListHeader title={name} />
                <TouchableOpacity onPress={() => navigation.navigate("Category", { id, name })} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: 45, bottom: 15, right: 15, left: 15, backgroundColor: color.primary, borderRadius: 5, zIndex: 1 }}>
                    <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_bold }}>View products</Text>
                </TouchableOpacity>
                {/* <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    style={{ backgroundColor: color.white }}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => <ListHeader title={name} />}
                    ListFooterComponent={() => <ListFooter name={name} id={id} navigation={navigation} />}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ borderRadius: 5, elevation: 5, shadowColor: color.black, shadowOpacity: 0.4, shadowOffset: { height: 3, width: 0 }, shadowRadius: 3, marginBottom: 10, width: width * 0.45, height: width * 0.45 }}>
                            <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%', borderRadius: 5 }} />
                        </TouchableOpacity>
                    )}
                /> */}
                <WebView
                    style={{ height: '100%', width: '100%' }}
                    source={{ html: desc }}
                />
            </View>
        </SafeAreaView>
    )
}

const ListHeader = ({ title }) => (
    <View style={{ width: '100%', backgroundColor: color.white }}>
        <Header title={title} bagVisible={false} notifyVisible={false} searchVisible={false} type='back' />
        {/* <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 18, color: color.black, ...GlobalStyles.dm_sans_bold }}>How to pick my peas?</Text>
            <Text style={{ fontSize: 12, color: color.black, marginTop: 10, ...GlobalStyles.dm_sans_regular }}>Go to your profile.Scroll down and click on -languages. Choose your language by clicking on it</Text>
        </View> */}
    </View>
)

const ListFooter = ({ navigation, id, name }) => (
    <View style={{ width: '100%', padding: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Category", { id, name })}>
            <Text style={{ fontSize: 14, color: color.darkBlue, textDecorationLine: "underline", textDecorationColor: color.darkBlue, ...GlobalStyles.dm_sans_bold }}>View Products</Text>
        </TouchableOpacity>
        <View style={{ borderBottomColor: "rgba(0, 0, 0, 0.3)", borderBottomWidth: 1, width: "100%", marginVertical: 25 }} />
        <View>
            <Text style={{ fontSize: 14, color: color.black, ...GlobalStyles.dm_sans_bold }}>What is the difference between field peas and garden peas?</Text>
            <Text style={{ fontSize: 12, color: color.black, marginTop: 10, ...GlobalStyles.dm_sans_regular }}>Go to your profile.Scroll down and click on -languages. Choose your language by clicking on it</Text>
        </View>
    </View>
)