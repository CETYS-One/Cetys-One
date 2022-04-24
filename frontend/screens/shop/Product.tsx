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
import React, { useContext } from "react";
import { AnimatedVStack } from "../../components/common/Animated";
import { ShopContext } from "../../context/ShopProvider";
import { RouteProp, useRoute } from "@react-navigation/native";
import { IProduct } from "../../types/strapi";

const Product = () => {
  const { storeData } = useContext(ShopContext);

  const route =
    useRoute<RouteProp<{ Detail: { product: IProduct } }, "Detail">>();

  const { product } = route.params;
  const { name, photos, price, description, category, id, from } = product;

  return (
    <>
      <ScrollView
        h={"100%"}
        bgColor={"white"}
        showsVerticalScrollIndicator={false}
      >
        <Flex w={"100%"}>
          <ChevronLeftIcon
            color="black"
            size={5}
            position={"absolute"}
            top={"60px"}
            left={5}
          />
          <SharedElement id={id}>
            <Image
              source={{
                uri: photos[0]
                  ? photos[0].url
                  : "https://www.takeoutlist.com/assets/images/food_default.png",
              }}
              style={{ height: 400 }}
              resizeMode="cover"
            />
          </SharedElement>
        </Flex>

        <AnimatedVStack
          shadow={8}
          borderRadius={"30px"}
          mt={"-30px"}
          bgColor={"white"}
          alignItems={"center"}
          w={"100%"}
          justifyContent={"space-between"}
          alignContent={"flex-start"}
          space={10}
          paddingTop={"28px"}
          py={"20px"}
          from={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "spring",
            // duration: 500,
          }}
        >
          <VStack space={6} alignItems={"flex-start"} w={"90%"}>
            <Description
              from={from}
              name={name}
              price={price}
              description={description}
              category={category.name}
            />
          </VStack>
          <VStack w={"90%"} space={4}>
            <Cantidad />
            <Comentario />
          </VStack>

          <Button
            type="submit"
            borderRadius="10"
            backgroundColor={storeData?.color}
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
