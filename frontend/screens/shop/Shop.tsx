import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { NavigationContainer } from "@react-navigation/native";
import axios from "../../util/axios";
import MainPage from "../../components/shop/mainPage";
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

  const Stack = createSharedElementStackNavigator();
  return (
    <>
      <MainPage />
    </>
  );
};

export default Shop;
