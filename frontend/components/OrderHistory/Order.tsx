import { Feather } from "@expo/vector-icons";
import { endOfDay } from "date-fns";
import { useState } from "react";
import {
  Flex,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Pressable,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";
import Expand from "./Expand";
import { IShoppingProduct } from "../../context/ShopProvider";

interface PropTypes {
  name: string;
  to: string;
  date: string;
  price: number;
  products: number;
  items: IShoppingProduct[];
}

const Order = (props: PropTypes) => {
  const { name, to, date, price, products, items } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);

  function setExpanded() {
    setIsExpanded(!isExpanded);
  }
  return (
    <Pressable
      onPress={setExpanded}
      borderWidth={2}
      borderColor={"gray.100"}
      borderRadius={4}
    >
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingLeft={"20px"}
        paddingRight={"10px"}
      >
        <VStack justifyContent={"space-between"} py={"10px"}>
          <Text fontSize={"20px"}>{name}</Text>
          <Text fontSize={"15px"} color={"gray.600"}>
            {products} Producto(s)
          </Text>
          <Text fontSize={"15px"} marginTop={3}>
            ${price}
          </Text>
        </VStack>
        <VStack justifyContent={"space-between"} borderWidth={0} h={100}>
          <Text fontSize={"15px"}>{date}</Text>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text color={"amber.400"} fontWeight={"bold"} fontSize={"20px"}>
              {to}
            </Text>
            {isExpanded ? (
              <ChevronUpIcon size={"20px"} />
            ) : (
              <ChevronDownIcon size={"20px"} onPress={setExpanded} />
            )}
          </HStack>
        </VStack>
      </HStack>
      {isExpanded ? <Expand /> : null}
    </Pressable>
  );
};

export default Order;
