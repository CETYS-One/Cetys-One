import {
  Text,
  Box,
  View,
  HStack,
  VStack,
  Image,
  Flex,
  SunIcon,
  WarningIcon,
  ChevronDownIcon,
  Accordion,
  ChevronUpIcon,
  Button,
} from "native-base";
import { Alert, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import ProductCard from "../common/ProductCard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";
import { ShopContext } from "../../context/ShopProvider";
import { AnimatedBox, AnimatedVStack } from "../common/Animated";
import qs from "qs";
import Toast from "react-native-toast-message";
import { socket } from "../../util/socket";

interface PropTypes {
  alias: string;
  order: IOrder;
}
const Order = ({ alias, order }: PropTypes) => {
  const [open, setOpen] = useState(false);

  const { storeData } = useContext(ShopContext);
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);
  const queryClient = useQueryClient();

  const cancelConfirmation = () => {
    Alert.alert("Cancelar Pedido", "¿Estas seguro que deseas el pedido?", [
      { text: "No" },
      {
        text: "Si",
        onPress: () => {
          updateOrder.mutate("rejected");
          Toast.show({
            text1: "Pedido Cancelado",
            text2: "Pedido cancelado con exito",
            type: "success",
          });
        },
      },
    ]);
  };

  const finishConfirmation = () => {
    Alert.alert(
      "Finalizar Pedido",
      "¿Estas seguro que deseas finalizar el pedido?",
      [
        { text: "No" },
        {
          text: "Si",
          onPress: () => {
            updateOrder.mutate("done");
            Toast.show({
              text1: "Pedido finalizado",
              text2: "Pedido finalizado con exito",
              type: "success",
            });
          },
        },
      ]
    );
  };

  const updateOrder = useMutation(
    async (status: string) => {
      const res = await axios.put(`orders/${order._id}?`, {
        status,
      });
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`orders-${alias}`);
      },
    }
  );

  return (
    <>
      <TouchableOpacity onPress={() => setOpen((open) => !open)}>
        <ProductCard
          name={order.from.name}
          price={order.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
          )}
          description={`${order.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          )} producto(s)`}
          photo={""}
          borderLeftWidth={5}
          mb={2}
          renderIcon={
            <Box key="1">
              <HStack alignItems={"center"} space={2}>
                {open ? (
                  <>
                    <Text>Ocultar Producto</Text>
                    <ChevronUpIcon />
                  </>
                ) : (
                  <>
                    <Text>Ver Productos</Text>
                    <ChevronDownIcon />
                  </>
                )}
              </HStack>
            </Box>
          }
        />
      </TouchableOpacity>
      {open && (
        <AnimatedVStack
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          space={2}
          borderWidth={1}
          borderColor={"gray.200"}
          p={4}
          borderRadius={4}
        >
          {order.items.map((product) => (
            <AnimatedBox key={product.id + order._id}>
              <ProductCard
                name={`${product.quantity}x ${product.product.name}`}
                price={product.quantity * product.product.price}
                description={product.description}
                photo={
                  product.product.photos[0]
                    ? product.product.photos[0].url
                    : "https://www.takeoutlist.com/assets/images/food_default.png"
                }
                renderIcon={<></>}
              />
            </AnimatedBox>
          ))}
          <Button colorScheme={"red"} onPress={cancelConfirmation}>
            Cancelar Pedido
          </Button>
          <Button bg={storeData?.color} onPress={finishConfirmation}>
            Terminar Pedido
          </Button>
        </AnimatedVStack>
      )}
    </>
  );
};
export default Order;
