import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "../../util/axios";
import MainPage from "../../components/shop/MainPage";
import Product from "./Product";
import { Image } from "react-native";
import * as React from "react";
import {
  createSharedElementStackNavigator,
  SharedElement,
} from "react-navigation-shared-element";
import { TouchableOpacity } from "react-native";

const Shop = () => {
  const navigation = useNavigation();
  async function getProduct() {
    const res = await axios.get("/products");
    setProductos(res.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const [productos, setProductos] = useState([]);

  return (
    <>
      <MainPage />
    </>
  );
};

export default Shop;
