import { format } from "date-fns";
import { Box, Text, Flex, ChevronLeftIcon, VStack } from "native-base";
import qs from "qs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { AnimatedBox } from "../../components/common/Animated";
import Header from "../../components/common/Header";
import Order from "../../components/OrderHistory/Order";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";

const OrderHistory = () => {
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: orders, isLoading } = useQuery("orders", async () => {
    const query = qs.stringify({
      _sort: "createdAt:desc",
      _limit: 5,
    });

    const res = await axios.get<IOrder[]>(`orders/user/me?${query}`);
    return res.data;
  });

  return (
    <Header title="Ordenes" isLoading={isLoading}>
      <VStack space={4}>
        {orders &&
          orders.map((order) => (
            <AnimatedBox
              key={order.id}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Order
                to={order.to}
                status={order.status}
                name={order.to}
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
            </AnimatedBox>
          ))}
      </VStack>
    </Header>
  );
};

export default OrderHistory;
