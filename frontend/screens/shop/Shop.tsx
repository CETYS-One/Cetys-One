import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import MainSection from "../../components/shop/MainSection";
import { ShopContext } from "../../context/ShopProvider";
import { AnimatedBox } from "../../components/common/Animated";
import ShopSplash from "./ShopSplash";
import { AnimatePresence } from "moti";
//@ts-ignore
import AnimatedLoader from "react-native-animated-loader";
import LoadingSplash from "../LoadingSlapsh";
import { useQuery } from "react-query";
import { getAxios } from "../../hooks/useAxios";

interface PropTypes {
  isLoading: boolean;
  name: string;
  color: string;
  alias: string;
}

const Shop = (props: PropTypes) => {
  const { isLoading, name, color, alias } = props;

  return (
    <>
      {isLoading ? (
        <ShopSplash title={name} color={color} />
      ) : (
        <AnimatedBox
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 500, type: "timing" }}
        >
          <Header title={name} searchBar container={false} bgColor={color}>
            <MainSection />
          </Header>
        </AnimatedBox>
      )}
    </>
  );
};

export default Shop;
