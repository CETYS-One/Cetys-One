import { useContext, useRef } from "react";
import DrawerNav from "react-native-drawer";
import DrawerContent from "../../components/common/Drawer";
import { ShopContext } from "../../context/ShopProvider";
import ShopNav from "./ShopNav";

export type UserNav = {
  ShopsNav: any;
  Profile: any;
  Cart: any;
  OrderHistory: any;
};

const UserNav = () => {
  const drawerRef = useRef<DrawerNav>(null);
  const { setDrawerRef, isDrawerOpen } = useContext(ShopContext);

  return (
    <>
      {/* @ts.ignore */}
      <DrawerNav
        content={<DrawerContent />}
        ref={(ref) => setDrawerRef(ref)}
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        tweenEasing={"easeInOutCubic"}
      >
        <ShopNav />
      </DrawerNav>
    </>
  );
};

export default UserNav;
