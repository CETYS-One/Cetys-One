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

  return (
    <ShopContext.Provider
      value={{
        storeData,
        handleStoreChange,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopProvider;
