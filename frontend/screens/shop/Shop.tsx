import { useNavigation } from "@react-navigation/native";
import { Box, Button, HamburgerIcon, HStack, Icon, Text } from "native-base";
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
import { Stores } from "../../types/strapi";
import { socket } from "../../util/socket";
import { useAuth } from "../../hooks/useAuth";

import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { LogOutput } from "concurrently";

interface PropTypes {
  isLoading: boolean;
  name: string;
  color: string;
  alias: string;
}

function LightenDarkenColor(col: string, amt: number) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

const Shop = (props: PropTypes) => {
  const { isLoading, name, color, alias } = props;

  const axios = useAxios();
  const queryClient = useQueryClient();

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const navigation = useNavigation();
  const { shoppingCart } = useContext(ShopContext);

  const { user, logout } = useAuth({
    onSuccessLogout: () => navigation.navigate("Welcome"),
  });

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
            showBack={false}
          >
            <MainSection />
          </Header>
          {user?.user.cafeteria ? (
            <ActionButton
              buttonColor={color}
              renderIcon={() => <HamburgerIcon color={"white"} size={6} />}
            >
              <ActionButton.Item
                buttonColor={LightenDarkenColor(color, 40)}
                title="Cerrar Sesion"
                onPress={() => logout()}
              >
                <MaterialIcons name="logout" size={24} color="white" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={LightenDarkenColor(color, 40)}
                title="Nuevo Producto"
                onPress={() => navigation.navigate("ProductManagement")}
              >
                <Entypo name="plus" size={24} color="white" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={LightenDarkenColor(color, 40)}
                title="Estadisticas"
                onPress={() => navigation.navigate("Statistics")}
              >
                <Entypo name="bar-graph" size={24} color="white" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={LightenDarkenColor(color, 40)}
                title="Categorias"
                onPress={() => navigation.navigate("Categories")}
              >
                <MaterialIcons name="category" size={24} color="white" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={LightenDarkenColor(color, 40)}
                title="Ordenes"
                onPress={() => navigation.navigate("Orders")}
              >
                <MaterialCommunityIcons
                  name="food-variant"
                  size={24}
                  color="white"
                />
              </ActionButton.Item>
              {/* <ActionButton.Item
                buttonColor={color}
                title="Mis Productos"
                onPress={() => navigation.navigate("Orders")}
              >
                <FontAwesome5 name="hamburger" size={24} color="white" />
              </ActionButton.Item> */}
            </ActionButton>
          ) : (
            <ActionButton
              buttonColor={color}
              renderIcon={(active) => (
                <HStack space={1}>
                  <AntDesign name="shoppingcart" size={24} color="white" />
                  {shoppingCart[alias as Stores].length > 0 && (
                    <Text
                      color="white"
                      adjustsFontSizeToFit
                      fontWeight={"bold"}
                    >
                      {shoppingCart[alias as Stores].length}
                    </Text>
                  )}
                </HStack>
              )}
            >
              <ActionButton.Item
                buttonColor={color}
                title="Cerrar Sesion"
                onPress={() => logout()}
              >
                <MaterialIcons name="logout" size={24} color="white" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={color}
                title="Perfil"
                onPress={() => navigation.navigate("Profile")}
              >
                <MaterialCommunityIcons
                  name="face-profile-woman"
                  size={24}
                  color="white"
                />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={color}
                title="Historial de ordenes"
                onPress={() => navigation.navigate("History")}
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
          )}
        </Box>
      )}
    </>
  );
};

export default React.memo(Shop);
