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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParams } from "../Pages";
import Header from "../../components/common/Header";
import Product from "../../components/shop/Product";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AllProducts = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title="Mis Productos" searchBar container={false}>
        <SimpleGrid columns={3} space={2} px={2}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </SimpleGrid>
      </Header>
    </SafeAreaView>
  );
};

export default AllProducts;
