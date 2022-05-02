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
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ProductCard from "../common/ProductCard";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";

interface PropTypes {
  alias: string;
}
const Order = ({ alias }: PropTypes) => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: orders, isLoading } = useQuery(`orders-${alias}`, async () => {
    const res = await axios.get<IOrder[]>(`orders/me`);
    return res.data;
  });

  return (
    <>
      <TouchableOpacity onPress={() => setOpen((open) => !open)}>
        <ProductCard
          name="Daniel Barocio"
          price={200}
          description={"12:00 PM"}
          photo={""}
          borderLeftWidth={5}
          mb={2}
          renderIcon={open ? <ChevronDownIcon /> : <ChevronUpIcon />}
        />
      </TouchableOpacity>
      {open && (
        <Box w="95%" marginX="auto">
          <ProductCard
            name="Daniel Barocio"
            price={200}
            description={"12:00 PM"}
            photo={""}
            borderLeftWidth={5}
            renderIcon={<></>}
          />
        </Box>
      )}
    </>
  );
};
export default Order;
