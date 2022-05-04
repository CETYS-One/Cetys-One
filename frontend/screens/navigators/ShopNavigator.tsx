import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { ShopContext } from "../../context/ShopProvider";
import Shop from "../shop/Shop";
import { Text } from "native-base";

export type IAuthNav = {
  DVolada: any;
  Cafeteria: any;
  Honey: any;
};

const ShopNavs = () => {
  const { handleStoreChange } = useContext(ShopContext);

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [routes] = useState([
    {
      key: "Honey",
      title: "Honey Wellness",
      color: "#fbbf24",
      isLoading: false,
      alias: "Honey",
    },
    {
      key: "Cafeteria",
      title: "Cafeteria CETYS",
      color: "#f59e0b",
      isLoading: false,
    },
    { key: "DVolada", title: "D'Volada", color: "#16a34a" },
  ]);

  useEffect(() => {
    handleShopChange(0);
  }, []);

  const handleShopChange = async (newIndex: number) => {
    if (isLoading) return;
    setIndex(newIndex);
    setIsLoading(true);

    const key = routes[newIndex].key;
    if (key !== "DVolada" && key !== "Cafeteria" && key !== "Honey") return;

    // Aqui es donde agarraria datos del servidor
    handleStoreChange(key);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* @ts-ignore */}
      <BottomNavigation
        shifting
        navigationState={{ index, routes }}
        onIndexChange={handleShopChange}
        renderScene={({ route, jumpTo }) => {
          switch (route.key) {
            case "Honey":
              return (
                // <Text>{routes[0].title}</Text>
                <Shop
                  isLoading={isLoading}
                  name={routes[0].title}
                  alias={routes[0].key}
                  color={routes[0].color}
                />
              );
            case "Cafeteria":
              return (
                // <Text>{routes[1].title}</Text>
                <Shop
                  isLoading={isLoading}
                  name={routes[1].title}
                  alias={routes[1].key}
                  color={routes[1].color}
                />
              );
            case "DVolada":
              return (
                // <Text>{routes[2].title}</Text>
                <Shop
                  isLoading={isLoading}
                  name={routes[2].title}
                  alias={routes[2].key}
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
