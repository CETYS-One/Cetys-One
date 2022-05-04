import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Button,
  ChevronLeftIcon,
  Flex,
  ScrollView,
  VStack,
  Pressable,
} from "native-base";
import React, { useContext, useState } from "react";
import { Image } from "react-native";
import uuid from "react-native-uuid";
import { SharedElement } from "react-navigation-shared-element";
import { AnimatedBox, AnimatedVStack } from "../../components/common/Animated";
import Cantidad from "../../components/Product/Cantidad";
import Comentario from "../../components/Product/Comentario";
import Description from "../../components/Product/Description";
import Hora from "../../components/Product/Hora";
import { ShopContext } from "../../context/ShopProvider";
import { IProduct } from "../../types/strapi";
import ObjectID from "bson-objectid";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageBlurLoading from "react-native-image-blur-loading";
import Toast from "react-native-toast-message";
import { addScaleCorrection } from "framer-motion";

const Product = () => {
  const { storeData, addShoppingCartItem } = useContext(ShopContext);

  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ Detail: { product: IProduct } }, "Detail">>();

  const { product } = route.params;
  const { name, photos, price, description, category, id, from } = product;

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (values: { quantity: number; description: string }) => {
    setIsLoading(true);
    if (!storeData) return;
    if (
      storeData.alias !== "DVolada" &&
      storeData.alias !== "Cafeteria" &&
      storeData.alias !== "Honey"
    )
      return;

    addShoppingCartItem(storeData.alias, {
      product,
      quantity: values.quantity,
      description: values.description,
      hour: "",
      id: ObjectID().toHexString(),
    });

    Toast.show({
      text1: "Producto agregado",
      text2: "El producto ha sido agregado con exito al carrito",
    });
    navigation.goBack();
  };

  return (
    <>
      <ScrollView
        h={"100%"}
        bgColor={"white"}
        showsVerticalScrollIndicator={false}
      >
        <Flex w={"100%"}>
          <Pressable
            zIndex={1}
            onPress={() => navigation.goBack()}
            // backgroundColor={"amber.500"}
            position={"absolute"}
            top={"60px"}
            left={5}
            padding={6}
          >
            <ChevronLeftIcon color="black" size={5} position={"absolute"} />
          </Pressable>
          <ImageBlurLoading
            thumbnailSource={{
              uri: photos[0]
                ? photos[0].formats.thumbnail?.url
                : "https://www.takeoutlist.com/assets/images/food_default.png",
            }}
            source={{
              uri: photos[0]
                ? photos[0].url
                : "https://www.takeoutlist.com/assets/images/food_default.png",
            }}
            style={{ height: 400, resizeMode: "cover" }}
          />
        </Flex>

        <AnimatedVStack
          shadow={8}
          borderTopRadius={"30px"}
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
          <Formik
            initialValues={{ quantity: 1, description: "", hour: "" }}
            onSubmit={submitForm}
            validateOnChange={false}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <VStack space={10} w="100%" alignItems={"center"}>
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
                  <Cantidad
                    onChange={(value) => setFieldValue("quantity", value)}
                    value={values.quantity}
                  />
                  <Comentario
                    onChange={(value) => setFieldValue("description", value)}
                    value={values.description}
                  />
                  {/* <Hora
                    value={values.hour}
                    onChange={(value) => setFieldValue("hour", value)}
                  /> */}
                </VStack>

                <Button
                  type="submit"
                  borderRadius="10"
                  backgroundColor={storeData?.color}
                  py={4}
                  w={"90%"}
                  onPress={() => handleSubmit()}
                  isLoading={isLoading}
                >
                  Agregar al carrito
                </Button>
              </VStack>
            )}
          </Formik>
        </AnimatedVStack>
      </ScrollView>
    </>
  );
};

export default Product;
