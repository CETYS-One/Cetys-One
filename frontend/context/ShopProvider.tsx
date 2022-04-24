import { useNavigation } from "@react-navigation/native";
import { QuestionOutlineIcon } from "native-base";
import * as React from "react";
import { useState } from "react";
import Drawer from "react-native-drawer";
import { useQueryClient } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { getAxios, useAxios } from "../hooks/useAxios";
import { IProduct, IUserToken } from "../types/strapi";
import { AuthContext } from "./AuthProvider";
import { stringify } from "qs";

type Stores = "Honey" | "DVolada" | "Cafeteria";

interface IShopContext {
  storeData?: IStoreData;
  handleStoreChange: (store: Stores) => void;
  handleSearch: (query: string) => Promise<ProductsByCategory>;
}

interface PropTypes {
  children: React.ReactNode;
}

interface IStoreData {
  alias: string;
  name: string;
  color: string;
}

const StoreData = {
  Honey: {
    alias: "Honey",
    name: "Honey Wellness",
    color: "#fbbf24",
  },
  DVolada: {
    alias: "DVolada",
    name: "D'Volada",
    color: "#16a34a",
  },
  Cafeteria: {
    alias: "Cafeteria",
    name: "Cafeteria Cetys",
    color: "#f59e0b",
  },
};

export const ShopContext = React.createContext<IShopContext>({
  storeData: StoreData["Cafeteria"],
  handleStoreChange: () => {},
  handleSearch: async () => {
    return new Promise(() => {});
  },
});

export interface ProductsByCategory {
  [key: string]: IProduct[];
}

const ShopProvider = ({ children }: PropTypes) => {
  const [storeData, setStoreData] = useState<IStoreData>(
    StoreData["Cafeteria"]
  );

  const { user } = React.useContext(AuthContext);
  const axios = useAxios(user?.jwt);
  const queryClient = useQueryClient();

  const handleStoreChange = (store: Stores) => {
    setStoreData(StoreData[store]);
  };

  const handleSearch = async (query: string) => {
    const filters = stringify({
      _where: {
        _or: [{ name_contains: query }, { description_contains: query }],
      },
    });

    return await queryClient.fetchQuery(storeData.alias, async () => {
      const res = await axios.get<ProductsByCategory>(
        `products/byCategories/${storeData.alias}?${filters}`
      );
      return res.data;
    });
  };

  return (
    <ShopContext.Provider
      value={{
        storeData,
        handleStoreChange,
        handleSearch,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopProvider;
