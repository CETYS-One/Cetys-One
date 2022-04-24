import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Product from "../shop/Product";
import ShopSplash from "../shop/ShopSplash";
import Shop from "../shop/Shop";
import ShopNavs from "./ShopsNav";
import OrderHistory from "../shop/OrderHistory";
import Cart from "../shop/Cart";
import Profile from "../user/Profile";
enableScreens(false);

const Stack = createSharedElementStackNavigator();

const ShopNav = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Shop"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Shop" component={ShopNavs} />
        <Stack.Screen
          name="Product"
          component={Product}
          sharedElementsConfig={() => ["hola"]}
        />
        <Stack.Screen name="History" component={OrderHistory} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </>
  );
};

export default ShopNav;
