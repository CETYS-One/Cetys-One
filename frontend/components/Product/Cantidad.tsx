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
import { useState } from "react";

const Cantidad = () => {
  const [quantity, setQuantity] = useState(1);

  function addOne() {
    setQuantity(quantity + 1);
  }

  function reduceOne() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <VStack alignItems={"center"} space={2}>
      <Text fontSize={"20px"}>Cantidad</Text>
      <HStack justifyContent={"center"} alignItems={"center"} space={3}>
        <Button
          bgColor={"white"}
          color={"black"}
          borderRadius={"100px"}
          h={"40px"}
          w={"40px"}
          onPress={reduceOne}
          borderWidth={"1px"}
          borderColor={"gray.300"}
        >
          <Text fontWeight={"bold"} adjustsFontSizeToFit>
            -
          </Text>
        </Button>
        <Text>{quantity}</Text>
        <Button
          display={"flex"}
          bgColor={"white"}
          color={"black"}
          borderRadius={"10000"}
          h={"40px"}
          w={"40px"}
          borderWidth={"1px"}
          borderColor={"gray.300"}
          onPress={addOne}
          alignItem={"center"}
          justifyContent={"center"}
        >
          <Text
            display={"flex"}
            fontWeight={"bold"}
            adjustsFontSizeToFit
            alignItems={"center"}
            justifyContent={"center"}
            style={{ textAlign: "center", textAlignVertical: "center" }}
          >
            +
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default Cantidad;
