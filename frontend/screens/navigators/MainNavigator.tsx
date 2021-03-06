import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useQueryClient } from "react-query";
import { ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { IOrder, Stores } from "../../types/strapi";
import { socket } from "../../util/socket";
import LoadingSplash from "../LoadingSlapsh";
import AllProducts from "../seller/AllProducts";
import Categories from "../seller/Categories";
import Orders from "../seller/Orders";
import ProductEdit from "../seller/ProductEdit";
import Statistics from "../seller/Statistics";
import Cart from "../shop/Cart";
import OrderHistory from "../shop/OrderHistory";
import Product from "../shop/Product";
import Login from "../user/Login";
import Profile from "../user/Profile";
import SignUp from "../user/SignUp";
import Welcome from "../user/Welcome";
import ShopNavigator from "./ShopNavigator";

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
  AllProducts: any;
  Categories: any;
  Orders: any;
  ProductManagement: any;
  Statistics: any;
};

// const Stack = createStackNavigator<IAuthNav>();
const Stack = createStackNavigator<IAuthNav>();

const MainNavigator = () => {
  const { user } = useAuth({});
  const { storeData } = useContext(ShopContext);

  const queryClient = useQueryClient();
  socket.on("order", (store: Stores) => {
    if (store !== user?.user.cafeteria) return;

    Toast.show({
      type: "success",
      text1: "Nueva orden",
      text2:
        "Se ha recibido una nueva orden. Visita tu panel de ordenes para visualizarlo",
    });

    // Send notification

    queryClient.invalidateQueries(`orders-${store}`);
  });

  socket.on(`order-${user?.user.id}`, (order) => {
    // Evitando que la cafeteria reciba la notificacion o otro usuario que no pertenece
    if (user?.user.cafeteria || user?.user.id !== order.user) return;

    queryClient.invalidateQueries("orders");
    if (order.status === "done") {
      Toast.show({
        type: "success",
        text1: "Pedido Terminado",
        text2: `Tu pedido de ${order.to} fue finalizado con exito.`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Pedido Rechazado",
        text2: `Tu pedido de ${order.to} fue rechazado por la cafeteria`,
      });
    }
  });

  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={LoadingSplash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="History" component={OrderHistory} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Shop" component={ShopNavigator} />
        <Stack.Screen name="Product" component={Product} />
        {/* Seller */}
        <Stack.Screen name="AllProducts" component={AllProducts} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="ProductManagement" component={ProductEdit} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
