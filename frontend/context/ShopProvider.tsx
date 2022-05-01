import { useNavigation } from "@react-navigation/native";
import { QuestionOutlineIcon } from "native-base";
import * as React from "react";
import { useState } from "react";
import Drawer from "react-native-drawer";
import { useQueryClient } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { getAxios, useAxios } from "../hooks/useAxios";
import { IProduct, IUserToken, Stores } from "../types/strapi";
import { AuthContext } from "./AuthProvider";
import { stringify } from "qs";

interface IShopContext {
  storeData?: IStoreData;
  handleStoreChange: (store: Stores) => void;
  shoppingCart: IShoppingCart;
  addShoppingCartItem: (store: Stores, newItem: IShoppingProduct) => void;
  removeShoppingCartItem: (store: Stores, id: string) => void;
  editShoppingCartItem: (
    store: Stores,
    id: string,
    item: IShoppingProduct
  ) => void;
}

interface PropTypes {
  children: React.ReactNode;
}

export interface IStoreData {
  alias: string;
  name: string;
  color: string;
}

export type IShoppingCart = {
  [key in Stores]: IShoppingProduct[];
};

export interface IShoppingProduct {
  id: string;
  product: IProduct;
  quantity: number;
  description: string;
  hour: string;
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
  addShoppingCartItem: () => {},
  removeShoppingCartItem: () => {},
  editShoppingCartItem: () => {},
  shoppingCart: { Cafeteria: [], DVolada: [], Honey: [] },
});

export interface ProductsByCategory {
  [key: string]: IProduct[];
}

const ShopProvider = ({ children }: PropTypes) => {
  const [storeData, setStoreData] = useState<IStoreData>(
    StoreData["Cafeteria"]
  );

  const [shoppingCart, setShoppingCart] = useState<IShoppingCart>({
    Cafeteria: [],
    DVolada: [],
    Honey: [],
  });

  const { user } = React.useContext(AuthContext);
  const axios = useAxios(user?.jwt);
  const queryClient = useQueryClient();

  const handleStoreChange = (store: Stores) => {
    setStoreData(StoreData[store]);
  };

  const addShoppingCartItem = (store: Stores, newItem: IShoppingProduct) => {
    setShoppingCart((shoppingCart) => {
      return { ...shoppingCart, [store]: [...shoppingCart[store], newItem] };
    });
  };

  const removeShoppingCartItem = (store: Stores, id: string) => {
    const filteredItems = shoppingCart[store].filter((s) => s.id !== id);
    setShoppingCart((shoppingCart) => {
      return { ...shoppingCart, [store]: filteredItems };
    });
  };

  const editShoppingCartItem = (
    store: Stores,
    id: string,
    item: IShoppingProduct
  ) => {
    const updateditems = shoppingCart[store].map((s) => {
      if (s.id === id) {
        return item;
      }
      return s;
    });
    setShoppingCart((shoppingCart) => {
      return { ...shoppingCart, [store]: updateditems };
    });
  };

  return (
    <ShopContext.Provider
      value={{
        storeData,
        handleStoreChange,
        shoppingCart,
        addShoppingCartItem,
        removeShoppingCartItem,
        editShoppingCartItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopProvider;
