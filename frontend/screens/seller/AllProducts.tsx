import {
  Box,
  Button,
  ChevronLeftIcon,
  FormControl,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RootStackParams } from "../Pages";
import Header from "../../components/common/Header";
import Product from "../../components/shop/Product";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Shop from "../shop/Shop";
import { useAuth } from "../../hooks/useAuth";
import { ShopContext } from "../../context/ShopProvider";

const AllProducts = () => {
  const { user } = useAuth({});
  const { handleStoreChange, storeData } = useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!user || !user.user.cafeteria) return;
    handleStoreChange(user.user.cafeteria);
    setIsLoading(false);
  }, [user]);

  return (
    storeData && (
      <Shop
        key={storeData.alias}
        isLoading={isLoading}
        name={"Mis Productos"}
        alias={storeData?.alias}
        color={storeData?.color}
      />
    )
  );
};

export default AllProducts;
