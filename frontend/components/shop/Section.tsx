import {
  Text,
  Box,
  Image,
  Flex,
  HStack,
  VStack,
  ScrollView,
  Button,
  Skeleton,
} from "native-base";
import React, { Suspense, useState } from "react";
import { useContext } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ShopContext } from "../../context/ShopProvider";
import { useInfiniteScrollView } from "../../hooks/useInfiniteScrollView";
import { IProduct } from "../../types/strapi";
import Product from "./Product";
// import Product from "./Product";

interface PropTypes {
  products: IProduct[];
}

const PRODUCTS_PER_PAGE = 3;

const Section = (props: PropTypes) => {
  const { products } = props;

  const { itemsShown, fetchItems, hasMorePages, isLoading } =
    useInfiniteScrollView(
      products,
      PRODUCTS_PER_PAGE,
      (cursor) => cursor + PRODUCTS_PER_PAGE,
      800
    );

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const reachedEnd =
      e.nativeEvent.layoutMeasurement.width + e.nativeEvent.contentOffset.x >=
      e.nativeEvent.contentSize.width - 10;
    if (reachedEnd && !isLoading && hasMorePages) {
      fetchItems();
    }
  };

  return (
    <Box>
      <VStack>
        <Box pl={"10px"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {products[0].category.name}
          </Text>
        </Box>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        >
          <HStack
            flexDirection={"row"}
            overflow={"hidden"}
            mt={"10px"}
            space={"3"}
            paddingBottom={"10px"}
            paddingLeft={"8px"}
          >
            {itemsShown &&
              itemsShown.map((product) => (
                <Product key={product.id} {...product} />
              ))}
            {hasMorePages && (
              <VStack>
                <Skeleton h={120} w={10} />
                <Skeleton.Text h={"80px"} w={10} mt={4} />
              </VStack>
            )}
          </HStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};
export default Section;
