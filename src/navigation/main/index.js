import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/home";
import Steps from "../../screens/Steps";
import StepsDescription from "../../screens/stepDescription";
import Category from "../../screens/Category";
import ProductDescription from "../../screens/productDescription";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyProfile from "../../screens/MyProfile";
import MyOrders from "../../screens/MyOrders";
import Notifications from "../../screens/Notifications";
import DrawerContent from "../../components/DrawerContent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "../../utils/color";
import Feather from "@expo/vector-icons/Feather";
import { GlobalStyles } from "../../utils/globalStyles";
import EditProfile from "../../screens/EditProfile";
import OrderSummary from "../../screens/orderSummary";
import Payment from "../../screens/Payment";
import AddAddress from "../../screens/AddAddress";
import SuccessPage from "../../screens/SuccessPage";
import Cart from "../../screens/Cart";
import SearchScreen from "../../screens/SearchScreen";
import Welcome from "../../screens/Welcome";
import { CONSTANTS } from "../../Constants";
import VehicleDetails from "../../screens/VehicleDetails";
import Help from "../../screens/Help";
import { useSelector } from "react-redux";
import SelectLocationMap from "../../screens/SelectLocationMap";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Steps}
        name="Steps"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={StepsDescription}
        name="StepsDescription"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Category}
        name="Category"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={ProductDescription}
        name="ProductDescription"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Notifications}
        name="Notifications"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={EditProfile}
        name="EditProfile"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={OrderSummary}
        name="OrderSummary"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Payment}
        name="Payment"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={AddAddress}
        name="AddAddress"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={SuccessPage}
        name="SuccessPage"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Cart}
        name="Cart"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={SearchScreen}
        name="SearchScreen"
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={Welcome}
        name={CONSTANTS.SCREENS.welcome}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={VehicleDetails}
        name={CONSTANTS.SCREENS.vehicleDetails}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={SelectLocationMap}
        name={CONSTANTS.SCREENS.selectLocationMap}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="MyProfile">
    <Stack.Screen
      component={MyProfile}
      name="MyProfile"
      options={{ header: () => null }}
    />
    <Stack.Screen
      component={EditProfile}
      name="EditProfile"
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

function MainNav() {
  const Drawer = createDrawerNavigator();
  const { user_data } = useSelector((state) => state.reducer);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "transparent",
        drawerItemStyle: {
          marginHorizontal: "7%",
          paddingLeft: 0,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
          marginTop: 0,
        },
        drawerInactiveTintColor: color.black,
        drawerActiveTintColor: color.primary,
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
          ...GlobalStyles.dm_sans_regular,
        },
      }}
    >
      <Drawer.Screen
        component={HomeStack}
        name="HomeStack"
        options={{
          header: () => null,
          title: "Home",
          drawerIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={18} />
          ),
        }}
      />
      {user_data?.type == "driver" && (
        <Drawer.Screen
          component={ProfileStack}
          name="My Profile"
          options={{
            header: () => null,
            title: "My Profile",
            drawerIcon: ({ color }) => (
              <Feather name="user" color={color} size={18} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

export default MainNav;
