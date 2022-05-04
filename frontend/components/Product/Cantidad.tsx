import {
  Box,
  Text,
  Image,
  Flex,
  Center,
  VStack,
  HStack,
  TextArea,
  Button,
  Pressable,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopProvider";

interface PropTypes {
  onChange: (value: number) => void;
  value: number;
}

const Cantidad = ({ onChange, value }: PropTypes) => {
  const { storeData } = useContext(ShopContext);
  function addOne() {
    onChange(value + 1);
  }

  function reduceOne() {
    onChange(Math.max(1, value - 1));
  }

  return (
    <VStack alignItems={"flex-start"} justifyContent={"flex-start"} space={2}>
      <Text fontSize={"20px"}>Cantidad</Text>
      <HStack alignItems={"center"} justifyContent={"center"}>
        <Pressable onPress={reduceOne} pr={5}>
          <Text fontSize={30}>-</Text>
        </Pressable>
        <Text fontSize={20} px={5}>
          {value}
        </Text>
        <Pressable onPress={addOne} pl={5}>
          <Text fontSize={30}>+</Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default Cantidad;
