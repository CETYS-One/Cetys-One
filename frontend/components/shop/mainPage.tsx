import { Box, Flex, HStack, Text, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "../common/Header";
import MainSection from "./MainSection";

const MainPage = () => {
  return (
    <Header title={"Tienda"} searchBar container={false}>
      <MainSection />
    </Header>
  );
};

export default MainPage;
