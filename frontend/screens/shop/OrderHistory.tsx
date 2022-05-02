import { format } from "date-fns";
import { Box, Text, Flex, ChevronLeftIcon, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import Header from "../../components/common/Header";
import Order from "../../components/OrderHistory/Order";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";

const OrderHistory = () => {
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: orders, isLoading } = useQuery("orders", async () => {
    const res = await axios.get<IOrder[]>("orders/user/me");
    return res.data;
  });

  return (
    <Header title="Historial de Ordenes">
      <VStack space={4}>
        {orders &&
          orders.map((order) => (
            <Order
              name={user?.user.name}
              date={format(new Date(order.createdAt), "y/MM/dd")}
              products={order.items.reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
              price={order.items.reduce(
                (acc, item) => acc + item.quantity * item.product.price,
                0
              )}
              items={order.items}
            />
          ))}
      </VStack>
    </Header>
  );
};

export default OrderHistory;
