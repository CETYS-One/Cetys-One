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
import ImageBlurLoading from "react-native-image-blur-loading";

interface PropTypes extends IProduct {}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

const Product = (props: PropTypes) => {
  const { name, price, photos, id } = props;

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { storeData } = useContext(ShopContext);
  const { user } = useAuth({});

  console.log(Dimensions.get("screen").width);
  return (
    <>
      <AnimatedBox
        w={120}
        h={220}
        // h={Dimensions.get("window").height * 0.26}
        shadow={2}
        bgColor={"gray.50"}
        borderRadius={"10px"}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() =>
            user?.user.role.type === "seller"
              ? navigation.navigate("ProductManagement", { product: props })
              : navigation.navigate("Product", { product: props })
          }
        >
          <Box>
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
              style={{
                aspectRatio: 1 / 1,
                width: 120,
                borderRadius: 10,
                resizeMode: "cover",
                borderBottomWidth: 3,
                borderColor: "#e4e4e7",
              }}
            />
          </Box>
          <Box
            h={"25%"}
            display={"flex"}
            px={2}
            justifyContent={"center"}
            mt={2}
          >
            <Text
              // fontSize={15}
              fontSize={Dimensions.get("screen").width > 390 ? 15 : 12}
            >
              {truncate(name, 20)}
            </Text>
          </Box>
          <Box px={2} mb={4}>
            <Text
              color={storeData?.color}
              fontWeight={"bold"}
              mb={8}
              fontSize={Dimensions.get("screen").width > 390 ? 17 : 13}
              // fontSize={17}
            >
              ${price}
            </Text>
          </Box>
        </TouchableOpacity>
      </AnimatedBox>
    </>
  );
};
export default Product;
