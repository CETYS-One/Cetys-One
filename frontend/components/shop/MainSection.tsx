import { useNavigation } from "@react-navigation/native";
import { HStack, Skeleton, VStack, Button } from "native-base";
import { useContext } from "react";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "react-query";
import { ProductsByCategory, ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { getAxios } from "../../hooks/useAxios";
import Section from "./Section";

const MainSection = () => {
  const queryClient = useQueryClient();
  const { storeData } = useContext(ShopContext);
  const { user } = useAuth({});
  const navigation = useNavigation();

  const { data: products, isLoading } = useQuery(
    storeData ? storeData.alias : "",
    async () => {
      const res = await getAxios(user?.jwt).get<ProductsByCategory>(
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
        <>
          {user?.user.role.type === "seller" && (
            <VStack>
              <TouchableOpacity>
                <Button
                  onPress={() => navigation.navigate("ProductManagement")}
                  backgroundColor={storeData?.color}
                  w={"95%"}
                  m={"auto"}
                  mb={4}
                >
                  Crear Nuevo Producto
                </Button>
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  onPress={() => navigation.navigate("Categories")}
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
            Object.keys(products).map((key) => (
              <Section products={products[key]} key={key} />
            ))}
        </>
      )}
    </VStack>
  );
};

export default MainSection;
