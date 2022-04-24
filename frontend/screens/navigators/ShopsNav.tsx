import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { ShopContext } from "../../context/ShopProvider";
import Shop from "../shop/Shop";
enableScreens(false);

export type IAuthNav = {
  DVolada: any;
  Cafeteria: any;
  Honey: any;
};

const Stack = createSharedElementStackNavigator();
const ShopNavs = () => {
  const { handleStoreChange, isLoading } = useContext(ShopContext);

  const [index, setIndex] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  const [routes] = useState([
    {
      key: "Honey",
      title: "Honey Wellness",
      color: "#fbbf24",
    },
    { key: "Cafeteria", title: "Cafeteria CETYS", color: "#f59e0b" },
    { key: "DVolada", title: "D'Volada", color: "#16a34a" },
  ]);

  useEffect(() => {
    handleShopChange(0);
  }, []);

  const handleShopChange = (newIndex: number) => {
    // setIsLoading(true);
    setIndex(newIndex);

    const key = routes[newIndex].key;
    if (key !== "DVolada" && key !== "Cafeteria" && key !== "Honey") return;

    // Aqui es donde agarraria datos del servidor
    handleStoreChange(key);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
  };

  return (
    <>
      <BottomNavigation
        shifting
        navigationState={{ index, routes }}
        onIndexChange={handleShopChange}
        renderScene={({ route, jumpTo }) => {
          switch (route.key) {
            case "Honey":
              return (
                <Shop
                  isLoading={isLoading}
                  name={routes[0].title}
                  color={routes[0].color}
                />
              );
            case "Cafeteria":
              return (
                <Shop
                  isLoading={isLoading}
                  name={routes[1].title}
                  color={routes[1].color}
                />
              );
            case "DVolada":
              return (
                <Shop
                  isLoading={isLoading}
                  name={routes[2].title}
                  color={routes[2].color}
                />
              );
          }
        }}
        renderIcon={({ route, color }) => {
          switch (route.key) {
            case "Honey":
              return <FontAwesome5 name="apple-alt" size={19} color={color} />;
            case "Cafeteria":
              //@ts-ignore
              return <Ionicons name="fast-food" size={24} color={color} />;
            case "DVolada":
              return (
                //@ts-ignore
                <MaterialCommunityIcons name="coffee" size={24} color={color} />
              );
          }
        }}
      />
    </>
  );
};

export default ShopNavs;
