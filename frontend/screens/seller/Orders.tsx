import { AxiosError } from "axios";
import {
  Text,
  Flex,
  Box,
  View,
  HStack,
  VStack,
  Image,
  ScrollView,
  Center,
  Pressable,
  Skeleton,
} from "native-base";
import qs from "qs";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";
import { baseURL, getErrorMessage } from "../../util/axios";
import Header from "../../components/common/Header";
import Order from "../../components/Orders/Order";
import EmptyCart from "../../assets/images/empty_cart.png";
import ImageBlurLoading from "react-native-image-blur-loading";

const Orders = () => {
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: orders, isLoading } = useQuery(
    `orders-${user?.user.cafeteria}`,
    async () => {
      const query = qs.stringify({
        _sort: "createdAt:desc",
        _where: [{ status: "pending" }],
      });
      const res = await axios.get<IOrder[]>(`orders/me?${query}`);
      return res.data.reverse();
    },
    { enabled: !!user?.user.cafeteria && !!axios }
  );
  return (
    <Header title={"Ordenes"} isLoading={isLoading}>
      <Flex w={"100%"}>
        <VStack space={3}>
          {!orders ? (
            <VStack space={2}>
              <Skeleton h={100}></Skeleton>
              <Skeleton h={100}></Skeleton>
              <Skeleton h={100}></Skeleton>
            </VStack>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <>
                <Order
                  key={order._id}
                  alias={user?.user.cafeteria ?? "Cafeteria"}
                  order={order}
                />
              </>
            ))
          ) : (
            <Center>
              <ImageBlurLoading
                source={EmptyCart}
                height={300}
                style={{ height: 300, aspectRatio: 1 / 1 }}
              />
              <Text mt={4} fontWeight={"bold"} textAlign={"center"}>
                No hay órdenes pendientes
              </Text>
              <Text mt={4} textAlign={"center"}>
                Espera a que un usuario realice un pedido
              </Text>
            </Center>
          )}
        </VStack>
      </Flex>
    </Header>
  );
};

export default Orders;
