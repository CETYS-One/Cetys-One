import { Menu, Pressable, HStack, Text, HamburgerIcon } from "native-base";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

const MenuContent = () => {
  const navigation = useNavigation();

  const { logout, user } = useAuth({});

  return (
    <Menu
      w="190"
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon color="white" size={6} />
          </Pressable>
        );
      }}
    >
      <Menu.Group title="Usuario">
        <Menu.Item onPress={() => navigation.navigate("Shop")}>
          <HStack space={2}>
            <MaterialCommunityIcons
              name="food-variant"
              size={20}
              color="black"
            />
            <Text>Cafeterias</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("History")}>
          <HStack space={2}>
            <FontAwesome5 name="history" size={18} color={"black"} />
            <Text>Historial de Ordenes</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("Cart")}>
          <HStack space={2}>
            <Entypo name="shopping-cart" size={24} color="black" />
            <Text>Carrito</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("Profile")}>
          <HStack space={2}>
            <MaterialCommunityIcons
              name="face-profile-woman"
              size={24}
              color="black"
            />
            <Text>Perfil</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => logout()}>
          <HStack space={2}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text>Cerrar Sesion</Text>
          </HStack>
        </Menu.Item>
      </Menu.Group>
      {/* CAFETERIAS */}
      <Menu.Group title="Cafeteria">
        <Menu.Item onPress={() => navigation.navigate("Orders")}>
          <HStack space={2}>
            <MaterialCommunityIcons
              name="food-variant"
              size={20}
              color="black"
            />
            <Text>Mis Ordenes</Text>
          </HStack>
        </Menu.Item>
        {/* <Menu.Item onPress={() => navigation.navigate("Categories")}>
          <HStack space={2}>
            <FontAwesome5 name="history" size={18} color={"black"} />
            <Text>Categorias</Text>
          </HStack>
        </Menu.Item> */}
        <Menu.Item onPress={() => navigation.navigate("AllProducts")}>
          <HStack space={2}>
            <Entypo name="shopping-cart" size={24} color="black" />
            <Text>Mis Productos</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("Statistics")}>
          <HStack space={2}>
            <MaterialCommunityIcons
              name="face-profile-woman"
              size={24}
              color="black"
            />
            <Text>Estadisticas</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("ProductManagement")}>
          <HStack space={2}>
            <MaterialCommunityIcons
              name="face-profile-woman"
              size={24}
              color="black"
            />
            <Text>Nuevo Producto</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={() => logout()}>
          <HStack space={2}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text>Cerrar Sesion</Text>
          </HStack>
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
};

export default MenuContent;
