import { Box, ChevronLeftIcon, Input, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParams } from "../Pages";
import Header from "../../components/common/Header";

const AllProducts = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title="Mis Productos">
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
      </Header>
    </SafeAreaView>
  );
};

export default AllProducts;
