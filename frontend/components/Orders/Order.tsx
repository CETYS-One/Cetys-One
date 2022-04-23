import {
  Text,
  Box,
  View,
  HStack,
  VStack,
  Image,
  Flex,
  SunIcon,
  WarningIcon,
  ChevronDownIcon,
  Accordion,
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
const Order = () => {
  const [estado, setestado] = useState(false);
  const revisado = () => setestado(!estado);

  return (
    <Box w={"100%"} maxW={"360px"}>
      <TouchableOpacity onPress={revisado} activeOpacity={1}>
        <HStack
          w={"100%"}
          bgColor={"amber.100"}
          h={"120px"}
          borderRadius={"20px"}
          borderWidth={"1px"}
          borderColor={"gray.300"}
          shadow={9}
        >
          <Image
            source={{ uri: "http://oefa.com/fotos/DSCNG222.jpg" }}
            alt={"hola"}
            h={"100%"}
            w={"100px"}
            resizeMode="cover"
            borderLeftRadius={"20px"}
          />
          <VStack w={"250"} justifyContent={"space-between"}>
            <HStack p={"5px"} justifyContent={"space-between"}>
              <VStack>
                <Text fontSize={"18px"}>Daniel B.</Text>
                <Text>12:00</Text>
              </VStack>
              {estado ? (
                <WarningIcon size={"30px"} color={"amber.400"} />
              ) : (
                <Text></Text>
              )}
            </HStack>
            <HStack justifyContent={"center"} alignItems={"flex-end"} p={"5px"}>
              <ChevronDownIcon size={"25px"} />
              <Text
                fontSize={"20px"}
                fontWeight={"bold"}
                position={"absolute"}
                right={2}
                bottom={1}
              >
                $200
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};
export default Order;
