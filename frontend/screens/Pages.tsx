import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./user/Login";
import Password from "./user/Password";
import Profile from "./user/Profile";
import SignUp from "./user/SignUp";
import Shop from "./shop/Shop";
import Product from "./shop/Product";
import OrderHistory from "./shop/OrderHistory";
import Cart from "./shop/Cart";
import Statistics from "./seller/Statistics";
import ProductEdit from "./seller/ProductEdit";
import Orders from "./seller/Orders";
import AllProducts from "./seller/AllProducts";
import Welcome from "./user/Welcome";
import AllPages from "./AllPages";
import Categories from "./seller/Categories";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
enableScreens(false);

export type RootStackParams = {
  AllPages: any;
  SignUp: any;
  Login: any;
  Password: any;
  Profile: any;
  Shop: any;
  Product: any;
  OrderHistory: any;
  Cart: any;
  Orders: any;
  Statistics: any;
  ProductEdit: any;
  AllProduct: any;
  Welcome: any;
  Categories: any;
};

const Stack = createSharedElementStackNavigator<RootStackParams>();

const Pages = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AllPages"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AllPages" component={AllPages} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen
          name="Product"
          component={Product}
          sharedElementsConfig={() => {
            return ["hola"];
          }}
        />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="ProductEdit" component={ProductEdit} />
        <Stack.Screen name="AllProduct" component={AllProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Pages;
