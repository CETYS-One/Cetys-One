import { Box, Flex, HStack, Text, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";

const mainPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title={"Tienda"} searchBar container={false}>
        <Text>Holasfsafdsfsa</Text>
        <MainSection navigation={navigation} />
      </Header>
    </SafeAreaView>
  );
};

export default mainPage;
