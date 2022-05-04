import { Box, Button, Text, VStack } from "native-base";
import { useContext, useRef } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";
import { AnimatedBox } from "../../components/common/Animated";
import Header from "../../components/common/Header";
import ProductCard from "../../components/common/ProductCard";
import { IShoppingProduct, ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { Stores } from "../../types/strapi";

const Cart = () => {
  const {
    shoppingCart,
    editShoppingCartItem,
    removeShoppingCartItem,
    removeStore,
    storeData,
  } = useContext(ShopContext);

  const swipeRef = useRef<{ [key: string]: Swipeable | null }>({});
  const lastOpen = useRef("");
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

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
        <Text textAlign={"center"} color={"white"} px={4} fontSize={13}>
          Eliminar
        </Text>
      </TouchableOpacity>
    </Box>
  );

  const submitConfimation = (shop: Stores) => {
    Alert.alert("Realizar Pedido", "¿Estas seguro de realizar el pedido?", [
      { text: "No" },
      {
        text: "Si",
        onPress: () =>
          handleSubmit.mutate({ orders: shoppingCart[shop], shop }),
      },
    ]);
  };

  const handleSubmit = useMutation(
    async ({ orders, shop }: { orders: IShoppingProduct[]; shop: Stores }) => {
      await axios.post("/orders", {
        status: "pending",
        items: orders,
        from: user?.user._id,
        to: shop,
      });
      return { orders, shop };
    },
    {
      onSuccess: ({ orders, shop }) => {
        removeStore(shop);
        Toast.show({
          text1: "Exito!",
          text2: "Pedido realizado",
          type: "success",
        });
      },
    }
  );

  return (
    <Header title="Carrito">
      {shoppingCart &&
        (Object.keys(shoppingCart) as Array<Stores>).map((shop) => (
          <Box key={shop}>
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
                          name={truncate(
                            `${item.quantity}x ${item.product.name}`,
                            23
                          )}
                          description={truncate(item.description, 30)}
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
                  <Button
                    bgColor={storeData?.color}
                    isLoading={handleSubmit.isLoading}
                    onPress={() => submitConfimation(shop)}
                  >
                    Realizar Pedido
                  </Button>
                </VStack>
              </Box>
            )}
          </Box>
        ))}
    </Header>
  );
};

export default Cart;
