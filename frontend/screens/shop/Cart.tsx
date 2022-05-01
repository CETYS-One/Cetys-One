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
import ProductCard from "../../components/common/ProductCard";

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
                        <ProductCard
                          name={`${item.quantity}x ${item.product.name}`}
                          description={item.description}
                          id={item.id}
                          photo={
                            item.product.photos[0]
                              ? item.product.photos[0].url
                              : "https://www.takeoutlist.com/assets/images/food_default.png"
                          }
                          price={item.product.price * item.quantity}
                          key={item.id}
                        />
                      </Swipeable>
                    </AnimatedBox>
                  ))}
                  <Text ml={"auto"} fontWeight={"bold"} fontSize={"xl"}>
                    Total: $
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
