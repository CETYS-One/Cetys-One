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
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ProductCard from "../common/ProductCard";
const Order = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen((open) => !open)}>
        <ProductCard
          name="Daniel Barocio"
          price={200}
          description={"12:00 PM"}
          photo={""}
          borderLeftWidth={5}
        />
      </TouchableOpacity>
      {open && (
        <Box w="90%" marginX="auto">
          <ProductCard
            name="Daniel Barocio"
            price={200}
            description={"12:00 PM"}
            photo={""}
            borderLeftWidth={5}
          />
        </Box>
      )}
    </>
  );
};
export default Order;
