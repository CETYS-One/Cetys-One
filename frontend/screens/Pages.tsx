import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import AllPages from "./AllPages";

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
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Pages = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AllPages"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AllPages" component={AllPages} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="ProductEdit" component={ProductEdit} />
        <Stack.Screen name="AllProduct" component={AllProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Pages;
