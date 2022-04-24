import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, VStack, Button } from "native-base";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DrawerButton from "./DrawerButton";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ShopContext } from "../../context/ShopProvider";

const Drawer = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const { closeDrawer } = useContext(ShopContext);

  return (
    <>
      <SafeAreaView style={{ paddingHorizontal: 20 }}>
        <Text fontSize={20}>Hola, {user?.user.name}</Text>
        <VStack mt={10} space={2}>
          <DrawerButton
            icon={
              <MaterialCommunityIcons
                name="food-variant"
                size={24}
                color="black"
              />
            }
            text={"Cafeterias"}
            onPress={() => {
              navigation.navigate("UserNav", { screen: "Shop" });
            }}
          />
          <DrawerButton
            icon={<FontAwesome5 name="history" size={18} color={"black"} />}
            text={"Historial de Ordenes"}
            onPress={() => {
              navigation.navigate("UserNav", { screen: "History" });
            }}
          />
          <DrawerButton
            icon={<Entypo name="shopping-cart" size={24} color="black" />}
            text={"Carrito"}
            onPress={() => {
              navigation.navigate("UserNav", { screen: "Cart" });
            }}
          />
          <DrawerButton
            icon={
              <MaterialCommunityIcons
                name="face-profile-woman"
                size={24}
                color="black"
              />
            }
            text={"Perfil"}
            onPress={() => {
              navigation.navigate("UserNav", { screen: "Profile" });
            }}
          />
        </VStack>
      </SafeAreaView>
      <Button
        colorScheme={"red"}
        position={"absolute"}
        bottom={5}
        right={2}
        left={2}
        onPress={() => logout()}
      >
        Cerrar Sesion
      </Button>
    </>
  );
};
export default Drawer;
