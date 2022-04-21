import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "../../util/axios";
import mainPage from "../../components/shop/mainPage";
import Product from "./Product";
import * as React from "react";

const Shop = () => {
  async function getProduct() {
    const res = await axios.get("/products");
    setProductos(res.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const [productos, setProductos] = useState([]);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="shop"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="shop" component={mainPage} />
        <Stack.Screen name="product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Shop;
