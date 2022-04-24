import { NavigationContainer } from "@react-navigation/native";
import LoadingSplash from "../LoadingSlapsh";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import Welcome from "../user/Welcome";

import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Cart from "../shop/Cart";
import Profile from "../user/Profile";
import OrderHistory from "../shop/OrderHistory";
import ShopNavigator from "./ShopNavigator";
import { useAuth } from "../../hooks/useAuth";
import Product from "../shop/Product";

export type IAuthNav = {
  Splash: any;
  Welcome: any;
  Login: any;
  Signup: any;
  History: any;
  Cart: any;
  Profile: any;
  Product: any;
  Shop: any;
};

const Stack = createNativeStackNavigator<IAuthNav>();

const MainNavigator = () => {
  const { user } = useAuth({});
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={LoadingSplash} />
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="History" component={OrderHistory} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Shop" component={ShopNavigator} />
            <Stack.Screen name="Product" component={Product} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
