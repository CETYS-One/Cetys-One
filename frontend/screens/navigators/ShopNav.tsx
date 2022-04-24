import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useQuery } from "react-query";
import { useAxios } from "../../hooks/useAxios";
import Cart from "../shop/Cart";
import OrderHistory from "../shop/OrderHistory";
import Product from "../shop/Product";
import Profile from "../user/Profile";
import ShopNavs from "./ShopsNav";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const Stack = createStackNavigator();

const ShopNav = () => {
  const axios = useAxios();
  // const { data: products } = useQuery("products", async () => {
  //   const res = await axios.get("/products");
  //   return await res.data;
  // });

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="Shop"
        screenOptions={{ headerShown: false }}
        // defaultScreenOptions={{ gestureDirection: "vertical" }}
      >
        <Stack.Screen name="Shop" component={ShopNavs} />
        <Stack.Screen
          name="Product"
          component={Product}
          // sharedElementsConfig={(route) => [route.params.product.id]}
        />
        <Stack.Screen name="History" component={OrderHistory} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </>
  );
};

export default ShopNav;
