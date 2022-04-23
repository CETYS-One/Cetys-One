import {
  Box,
  Text,
  Flex,
  Center,
  VStack,
  HStack,
  TextArea,
  Button,
  ScrollView,
  ChevronLeftIcon,
  AspectRatio,
} from "native-base";
import { TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Description from "../../components/Product/Description";
import Cantidad from "../../components/Product/Cantidad";
import Comentario from "../../components/Product/Comentario";
import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import React from "react";
import { AnimatedVStack } from "../../components/common/Animated";

const Product = () => {
  return (
    <>
      <ScrollView
        h={"100%"}
        bgColor={"white"}
        showsVerticalScrollIndicator={false}
      >
        <Flex w={"100%"}>
          <ChevronLeftIcon color="black" size={5} position={"absolute"} />
          <SharedElement id={"hola"}>
            <Image
              source={{
                uri: "https://cdn.colombia.com/gastronomia/2011/08/26/burritos-de-carne-3657.jpg",
              }}
              style={{ height: 400 }}
              resizeMode="cover"
            />
          </SharedElement>
        </Flex>

        <AnimatedVStack
          borderRadius={"30px"}
          mt={"-30px"}
          bgColor={"white"}
          alignItems={"center"}
          w={"100%"}
          justifyContent={"space-between"}
          space={10}
          paddingTop={"28px"}
          py={"20px"}
          from={{ opacity: 0, translateY: 500 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 1000,
          }}
        >
          <VStack space={6} alignItems={"center"}>
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
        </AnimatedVStack>
      </ScrollView>
    </>
  );
};

export default Product;
