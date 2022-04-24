import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Cart from "../shop/Cart";
import OrderHistory from "../shop/OrderHistory";
import Product from "../shop/Product";
import Profile from "../user/Profile";
import ShopNavs from "./ShopsNav";
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
          sharedElementsConfig={(route) => [route.params.product.id]}
        />
        <Stack.Screen name="History" component={OrderHistory} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </>
  );
};

export default ShopNav;
