import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Box, Flex, AspectRatio, Spacer, VStack } from "native-base";
import { Share, TouchableOpacity, Image, Dimensions } from "react-native";
import { RootStackParams } from "../../screens/Pages";
import { SharedElement } from "react-navigation-shared-element";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopProvider";
import { IProduct } from "../../types/strapi";
import { AnimatedBox } from "../common/Animated";
import { useAuth } from "../../hooks/useAuth";

interface PropTypes extends IProduct {}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

const Product = (props: PropTypes) => {
  const { name, price, photos, id } = props;

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { storeData } = useContext(ShopContext);
  const { user } = useAuth({});

  return (
    <>
      <AnimatedBox
        w={120}
        h={Dimensions.get("window").height * 0.26}
        shadow={"1"}
        bgColor={"gray.50"}
        borderRadius={"10px"}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <TouchableOpacity
          onPress={() =>
            user?.user.role.type === "seller"
              ? navigation.navigate("ProductManagement", { product: props })
              : navigation.navigate("Product", { product: props })
          }
        >
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
          <VStack w={"100%"} px={"8px"} py={2}>
            <Text fontSize={12}>{truncate(name, 20)}</Text>
            <Text color={storeData?.color} fontWeight={"bold"}>
              ${price}
            </Text>
          </VStack>
        </TouchableOpacity>
      </AnimatedBox>
    </>
  );
};
export default Product;
