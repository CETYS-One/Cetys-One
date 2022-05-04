import { Feather } from "@expo/vector-icons";
import { endOfDay } from "date-fns";
import { useContext, useState } from "react";
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
  Badge,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";
import Expand from "./Expand";
import { IShoppingProduct, ShopContext } from "../../context/ShopProvider";
import { AnimatedBox } from "../common/Animated";

interface PropTypes {
  status: "pending" | "rejected" | "done";
  name: string;
  to: string;
  date: string;
  price: number;
  products: number;
  items: IShoppingProduct[];
}

const Order = (props: PropTypes) => {
  const { storeData } = useContext(ShopContext);
  const { name, to, date, price, products, items, status } = props;
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
          <Text fontSize={"20px"} color={storeData?.color} fontWeight={"bold"}>
            {name}
          </Text>
          <Text fontSize={"15px"} color={"gray.600"}>
            {products} Producto(s)
          </Text>
          <Text fontSize={"15px"} marginTop={3}>
            ${price}
          </Text>
        </VStack>
        <VStack justifyContent={"space-between"} borderWidth={0} h={100}>
          <Text fontSize={"15px"}>{date}</Text>
          <Badge
            colorScheme={
              status === "done"
                ? "success"
                : status === "pending"
                ? "gray"
                : "error"
            }
            alignSelf="center"
          >
            {status === "done"
              ? "Completado"
              : status === "pending"
              ? "Pendiente"
              : "Rechazado"}
          </Badge>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text color={"amber.400"} fontWeight={"bold"} fontSize={"20px"}>
              {/* {to} */}
            </Text>
            <AnimatedBox
              animate={{ rotateZ: isExpanded ? "0rad" : "3.142rad" }}
            >
              <ChevronUpIcon size={"20px"} />
            </AnimatedBox>
            {/* {isExpanded ? (
            ) : (
              <ChevronDownIcon size={"20px"} onPress={setExpanded} />
            )} */}
          </HStack>
        </VStack>
      </HStack>
      {isExpanded ? <Expand items={items} /> : null}
    </Pressable>
  );
};

export default Order;
