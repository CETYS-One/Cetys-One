import { Box, Flex, HStack, Text, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../common/Header";
import MainSection from "./MainSection";

{
  /* @ts-ignore */
}
const MainPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title={"Tienda"} searchBar container={false}>
        <MainSection navigation={navigation} />
      </Header>
    </SafeAreaView>
  );
};

export default MainPage;
