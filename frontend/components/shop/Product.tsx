import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Box, Flex, AspectRatio, Spacer, VStack } from "native-base";
import { Share, TouchableOpacity, Image } from "react-native";
import { RootStackParams } from "../../screens/Pages";
import { SharedElement } from "react-navigation-shared-element";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopProvider";
import { IProduct } from "../../types/strapi";
import { AnimatedBox } from "../common/Animated";

interface PropTypes extends IProduct {}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

const Product = (props: PropTypes) => {
  const { name, price, photos, id } = props;

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { storeData } = useContext(ShopContext);

  return (
    <>
      <AnimatedBox
        w={120}
        h={200}
        shadow={"1"}
        bgColor={"gray.50"}
        borderRadius={"10px"}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Product", { product: props })}
        >
          <SharedElement id={id}>
            <Image
              source={{
                uri: photos[0]
                  ? photos[0].url
                  : "https://www.takeoutlist.com/assets/images/food_default.png",
              }}
              style={{
                aspectRatio: 1 / 1,
                width: 120,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </SharedElement>
        </TouchableOpacity>
        <VStack w={"100%"} px={"8px"} py={2}>
          <Text>{truncate(name, 20)}</Text>
        </VStack>
        <Text
          color={storeData?.color}
          fontWeight={"bold"}
          position={"absolute"}
          bottom={1}
          left={2}
        >
          ${price}
        </Text>
      </AnimatedBox>
    </>
  );
};
export default Product;
