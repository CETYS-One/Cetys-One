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
import ProductCard from "../common/ProductCard";
import Order from "./Order";

const MainSection = () => {
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: orders, isLoading } = useQuery(
    `orders-${user?.user.cafeteria}`,
    async () => {
      const query = qs.stringify({
        _where: [{ status: "pending" }],
      });
      const res = await axios.get<IOrder[]>(`orders/me?${query}`);
      return res.data.reverse();
    },
    { enabled: !!user?.user.cafeteria && !!axios }
  );

  return (
    <Flex w={"100%"}>
      <VStack space={3}>
        {!orders ? (
          <VStack space={2}>
            <Skeleton h={100}></Skeleton>
            <Skeleton h={100}></Skeleton>
            <Skeleton h={100}></Skeleton>
          </VStack>
        ) : (
          orders.map((order) => (
            <>
              <Order
                key={order._id}
                alias={user?.user.cafeteria ?? "Cafeteria"}
                order={order}
              />
            </>
          ))
        )}
      </VStack>
    </Flex>
  );
};

export default MainSection;
