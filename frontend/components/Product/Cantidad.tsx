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
} from "native-base";
import { useEffect, useState } from "react";

interface PropTypes {
  onChange: (value: number) => void;
  value: number;
}

const Cantidad = ({ onChange, value }: PropTypes) => {
  function addOne() {
    onChange(value + 1);
  }

  function reduceOne() {
    onChange(Math.max(1, value - 1));
  }

  return (
    <VStack alignItems={"center"} space={2}>
      <Text fontSize={"20px"}>Cantidad</Text>
      <HStack justifyContent={"center"} alignItems={"center"} space={3}>
        <Button
          bgColor={"white"}
          color={"black"}
          borderRadius={"10000"}
          h={"40px"}
          w={"40px"}
          onPress={reduceOne}
          borderWidth={"1px"}
          borderColor={"gray.300"}
        >
          <Text fontWeight={"bold"} fontSize={10}>
            -
          </Text>
        </Button>
        <Text>{value}</Text>
        <Button
          bgColor={"white"}
          color={"black"}
          borderRadius={"10000"}
          h={"40px"}
          w={"40px"}
          borderWidth={"1px"}
          borderColor={"gray.300"}
          onPress={addOne}
        >
          <Text fontWeight={"bold"} fontSize={10} textAlign={"center"}>
            +
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default Cantidad;
