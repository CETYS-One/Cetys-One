import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import Drawer from "react-native-drawer";
import { IUserToken } from "../types/strapi";

interface IShopContext {
  storeData?: IStoreData;
  handleStoreChange: (store: "Honey" | "DVolada" | "Cafeteria") => void;
  isLoading: boolean;
  setDrawerRef: (ref: Drawer | null) => void;
  drawerRef?: React.RefObject<Drawer>;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
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
  isLoading: false,
  setDrawerRef: () => {},
  drawerRef: undefined,
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

const ShopProvider = ({ children }: PropTypes) => {
  const [storeData, setStoreData] = useState<IStoreData>(
    StoreData["Cafeteria"]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setOpenDrawer] = useState(false);
  const drawerRef = React.useRef<Drawer>(null);

  const handleStoreChange = (store: "Honey" | "DVolada" | "Cafeteria") => {
    setIsLoading(true);
    setStoreData(StoreData[store]);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const setDrawerRef = (ref: Drawer | null) => {
    //@ts-ignore
    drawerRef.current = ref;
  };

  const openDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <ShopContext.Provider
      value={{
        storeData,
        handleStoreChange,
        isLoading,
        setDrawerRef,
        drawerRef,
        openDrawer,
        closeDrawer,
        isDrawerOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopProvider;
