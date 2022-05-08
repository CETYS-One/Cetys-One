import { useNavigation } from "@react-navigation/native";
import { HStack, Skeleton, VStack, Button, Text } from "native-base";
import qs from "qs";
import React, { Suspense } from "react";
import { useContext } from "react";
import { Dimensions, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { ProductsByCategory, ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { getAxios } from "../../hooks/useAxios";
import Section from "./Section";

const MainSection = () => {
  const queryClient = useQueryClient();
  const { storeData } = useContext(ShopContext);
  const { user } = useAuth({});
  const navigation = useNavigation();

  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    storeData ? storeData.alias : "",
    async ({ pageParam = 0 }) => {
      const query = qs.stringify({
        _limit: 2,
        _start: pageParam,
      });

      const res = await getAxios(user?.jwt).get<ProductsByCategory>(
        `/products/byCategories/${storeData?.alias}?${query}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.cursor,
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
        <>
          {user?.user.role.type === "seller" && (
            <VStack>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductManagement")}
              >
                <Button
                  backgroundColor={storeData?.color}
                  w={"95%"}
                  m={"auto"}
                  mb={4}
                >
                  Crear Nuevo Producto
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Categories")}
              >
                <Button
                  backgroundColor={storeData?.color}
                  w={"95%"}
                  m={"auto"}
                  mb={4}
                >
                  Administrar Categorias
                </Button>
              </TouchableOpacity>
            </VStack>
          )}
          {products &&
            products.pages.map((p) =>
              Object.keys(p).map(
                (key) =>
                  key !== "cursor" && (
                    // <Text>{key}</Text>
                    <Section products={p[key]} key={key} />
                  )
              )
            )}
          <Button onPress={() => fetchNextPage()}>load</Button>
        </>
      )}
    </VStack>
  );
};

export default MainSection;
