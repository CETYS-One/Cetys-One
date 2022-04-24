import {
  Text,
  Button,
  Box,
  VStack,
  ScrollView,
  Skeleton,
  HStack,
} from "native-base";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ProductsByCategory, ShopContext } from "../../context/ShopProvider";
import { getAxios } from "../../hooks/useAxios";
import { IProduct } from "../../types/strapi";
import Section from "./Section";
const MainSection = () => {
  const queryClient = useQueryClient();
  const { storeData } = useContext(ShopContext);
  const { data: products, isLoading } = useQuery(
    storeData ? storeData.alias : "",
    async () => {
      const res = await getAxios().get<ProductsByCategory>(
        `/products/byCategories/${storeData?.alias}`
      );
      return res.data;
    },
    {
      enabled: !!storeData,
    }
  );

  return (
    <VStack>
      {isLoading ? (
        <>
          <Skeleton.Text w={150} ml={3} mt={4} lines={1} />
          <HStack>
            <VStack ml={3} mt={7} w={120}>
              <Skeleton h={120} />
              <Skeleton.Text h={80} mt={4} />
            </VStack>
            <VStack ml={3} mt={7} w={120}>
              <Skeleton h={120} />
              <Skeleton.Text h={80} mt={4} />
            </VStack>
          </HStack>
        </>
      ) : (
        products &&
        Object.keys(products).map((key) => (
          <Section products={products[key]} key={key} />
        ))
      )}
    </VStack>
  );
};

export default MainSection;
