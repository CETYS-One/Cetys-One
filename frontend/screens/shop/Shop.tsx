import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { NavigationContainer } from "@react-navigation/native";
import axios from "../../util/axios";
import MainPage from "../../components/shop/MainPage";
import Product from "./Product";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Shop = () => {
  async function getProduct() {
    const res = await axios.get("/products");
    setProductos(res.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const [productos, setProductos] = useState([]);

  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 5,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer independent={true}>
      {/* @ts-ignore */}
      <Stack.Navigator
        initialRouteName="shop"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="shop" component={MainPage} />
        <Stack.Screen
          name="product"
          component={Product}
          sharedElements={() => {
            return ["imagen"];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Shop;
