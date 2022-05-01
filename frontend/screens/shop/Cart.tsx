import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Center,
  ChevronRightIcon,
  ChevronLeftIcon,
  Button,
} from "native-base";
import { useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { ShopContext } from "../../context/ShopProvider";
import { Stores } from "../../types/strapi";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { AnimatedBox } from "../../components/common/Animated";
import { AnimatePresence } from "moti";

const Cart = () => {
  const {
    shoppingCart,
    editShoppingCartItem,
    removeShoppingCartItem,
    storeData,
  } = useContext(ShopContext);

  const swipeRef = useRef<{ [key: string]: Swipeable | null }>({});
  const lastOpen = useRef("");

  const truncate = (str: string, max: number) => {
    if (str.length > max) {
      return str.slice(0, max) + "...";
    }
    return str;
  };

  const renderRightView = (onDelete: () => void, isLoading: boolean) => (
    <Box
      bg={"red.500"}
      alignItems={"flex-end"}
      justifyContent={"center"}
      roundedRight={4}
    >
      <TouchableOpacity
        onPress={() => onDelete()}
        style={{
          width: 100,
          height: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text textAlign={"center"} color={"white"} px={4}>
          Eliminar
        </Text>
      </TouchableOpacity>
    </Box>
  );

  return (
    <Header title="Carrito">
      {shoppingCart &&
        (Object.keys(shoppingCart) as Array<Stores>).map((shop) => (
          <>
            {shoppingCart[shop].length > 0 && (
              <Box key={shop} mb={10}>
                <VStack space={3}>
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    color={storeData?.color}
                  >
                    {shop}
                  </Text>
                  {shoppingCart[shop].map((item) => (
                    <AnimatedBox
                      key={item.id}
                      from={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Swipeable
                        ref={(ref) => (swipeRef.current[item.id] = ref)}
                        onSwipeableRightWillOpen={() => {
                          console.log(Object.keys(swipeRef.current));
                          if (item.id !== lastOpen.current) {
                            swipeRef.current[lastOpen.current]?.close();
                          }
                        }}
                        onSwipeableRightOpen={() => {
                          lastOpen.current = item.id;
                        }}
                        renderRightActions={() =>
                          renderRightView(() => {
                            return removeShoppingCartItem(shop, item.id);
                          }, false)
                        }
                      >
                        <Box
                          borderColor={"gray.200"}
                          borderWidth={1}
                          borderRadius={4}
                          h={100}
                          backgroundColor={"white"}
                          style={{ overflow: "hidden" }}
                        >
                          <HStack position={"relative"} w="100%">
                            <Center w="30%" h={100} background={"amber.100"}>
                              <Image
                                source={{
                                  uri: item.product.photos[0]
                                    ? item.product.photos[0].url
                                    : "https://www.takeoutlist.com/assets/images/food_default.png",
                                }}
                                borderLeftRadius={4}
                                resizeMode={"cover"}
                                w="100%"
                                h="100"
                                alt="src"
                              />
                            </Center>
                            <VStack
                              padding={3}
                              h={100}
                              w="70%"
                              flexWrap={"wrap"}
                            >
                              <Text fontWeight={"bold"}>
                                {item.quantity}x{" "}
                                {truncate(item.product.name, 20)}
                              </Text>
                              <Text fontSize={"xs"} flexWrap={"wrap"}>
                                {truncate(item.description, 30)}
                              </Text>
                              <HStack
                                marginTop={"auto"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                              >
                                <Text>
                                  ${item.product.price * item.quantity}
                                </Text>
                                <ChevronLeftIcon />
                              </HStack>
                            </VStack>
                          </HStack>
                        </Box>
                      </Swipeable>
                    </AnimatedBox>
                  ))}
                  <Text ml={"auto"} fontWeight={"bold"} fontSize={"xl"}>
                    $
                    {shoppingCart[shop].reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )}
                  </Text>
                  <Button bgColor={storeData?.color}>Realizar Pedido</Button>
                </VStack>
              </Box>
            )}
          </>
        ))}
    </Header>
  );
};

export default Cart;
