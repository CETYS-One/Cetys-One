import { Box, Spacer, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: statistics } = useQuery("statistics", async () => {
    const res = await axios.get<IOrder>("/orders/statistics");

    const orders = res.data;
    // Debes de obtener la cantidad de productos vendidos, el producto mas vendido y el ingreso obtenido DE HOY.

    return orders;
  });

  return (
    <Header title="Estadisticas de hoy">
      <VStack space={10}>
        <Box>
          <Text fontSize={18}>Productos vendidos</Text>
          <Text fontWeight={"600"} fontSize={30}>
            53
          </Text>
        </Box>
        <Box>
          <Text fontSize={18}>Producto mas vendido hoy</Text>
          <Text fontWeight={"600"} fontSize={30}>
            Hamburguesa de Pollo
          </Text>
        </Box>
        <Box>
          <Text fontSize={18}>Ingreso obtenido</Text>
          <Text fontWeight={"600"} fontSize={30}>
            1050.20
          </Text>
        </Box>
      </VStack>
      {/* {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            onChange={(_, date) => setSelectedDate(date)}
          />
        )} */}
    </Header>
  );
};

export default Statistics;
