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
  ScrollView,
  ChevronLeftIcon,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Description from "../../components/Product/Description";
import Cantidad from "../../components/Product/Cantidad";
import Comentario from "../../components/Product/Comentario";
import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import React from "react";

const Product = () => {
  return (
    <ScrollView
      h={"100%"}
      bgColor={"white"}
      showsVerticalScrollIndicator={false}
    >
      <Flex w={"100%"}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            padding: 20,
          }}
        >
          <ChevronLeftIcon color="black" size={5} position={"absolute"} />
        </TouchableOpacity>
        <SharedElement id={"imagenProducto"}>
          <Image
            w={"100%"}
            h={"400px"}
            source={{
              uri: "https://barradeideas.com/wp-content/uploads/2019/09/fast-food.jpg",
            }}
            alt="hola"
          />
        </SharedElement>
      </Flex>

      <VStack
        borderRadius={"30px"}
        mt={"-30px"}
        bgColor={"white"}
        alignItems={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        space={10}
        paddingTop={"28px"}
        py={"20px"}
      >
        <VStack space={6} alignItems={"center"}>
          {/* <Text>hola</Text> */}
          <Description />
          <Cantidad />
          <Comentario />
        </VStack>

        <Button
          type="submit"
          borderRadius="10"
          backgroundColor={"amber.500"}
          py={4}
          w={"90%"}
        >
          Agregar a carro
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Product;
