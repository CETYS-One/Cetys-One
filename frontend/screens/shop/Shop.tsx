import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Icon, Text } from "native-base";
import { stringify } from "qs";
import * as React from "react";
import { useContext, useState } from "react";
import ActionButton from "react-native-action-button";
import { useQueryClient } from "react-query";
import { AnimatedBox } from "../../components/common/Animated";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
import { ProductsByCategory, ShopContext } from "../../context/ShopProvider";
import { useAxios } from "../../hooks/useAxios";
import ShopSplash from "./ShopSplash";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Stores } from "../../types/strapi";

interface PropTypes {
  isLoading: boolean;
  name: string;
  color: string;
  alias: string;
}

const Shop = (props: PropTypes) => {
  const { isLoading, name, color, alias } = props;

  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const navigation = useNavigation();
  const { shoppingCart } = useContext(ShopContext);

  const handleProductSearch = async (query: string) => {
    setIsLoadingSearch(true);
    const filters = stringify({
      _where: {
        _or: [{ name_contains: query }, { description_contains: query }],
      },
    });

    await queryClient.fetchQuery(alias, async () => {
      const res = await axios.get<ProductsByCategory>(
        `products/byCategories/${alias}?${filters}`
      );
      return res.data;
    });
    setIsLoadingSearch(false);
  };

  return (
    <>
      {isLoading ? (
        <ShopSplash title={name} color={color} />
      ) : (
        <Box flex={1}>
          <Header
            title={name}
            searchBar
            container={false}
            bgColor={color}
            onSearch={handleProductSearch}
            isLoadingSearch={isLoadingSearch}
          >
            <MainSection />
          </Header>
          <ActionButton
            buttonColor={color}
            renderIcon={(active) => (
              <HStack space={1}>
                <AntDesign name="shoppingcart" size={24} color="white" />
                {shoppingCart[alias as Stores].length > 0 && (
                  <Text color="white" adjustsFontSizeToFit fontWeight={"bold"}>
                    {shoppingCart[alias as Stores].length}
                  </Text>
                )}
              </HStack>
            )}
          >
            <ActionButton.Item
              buttonColor={color}
              title="Historial de ordenes"
              onPress={() => navigation.navigate("Orders")}
            >
              <FontAwesome5 name="history" size={18} color={"white"} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={color}
              title="Ver Carrito"
              onPress={() => navigation.navigate("Cart")}
            >
              <AntDesign name="shoppingcart" size={24} color="white" />
            </ActionButton.Item>
          </ActionButton>
        </Box>
      )}
    </>
  );
};

export default React.memo(Shop);
