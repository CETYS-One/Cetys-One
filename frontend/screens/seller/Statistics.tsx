import { Box, Spacer, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { IOrder } from "../../types/strapi";
import { interpolateNode } from "react-native-reanimated";

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { data: statistics } = useQuery("statistics", async () => {
    const res = await axios.get<IOrder[]>("/orders/statistics/me");
    // lo que hace esta wea es nomas retornar todas las ordenes de la cafeteria.
    // te toca a ti filtrarlo primero por dia, y de ahi obtener todo lo que hace falta
    const orders = res.data;
    // Debes de obtener la cantidad de productos vendidos, el producto mas vendido y el ingreso obtenido DE HOY.

    let util: {
      num: number;
      product: string;
      profit: number;
    } = { num: 0, product: "", profit: 0 };

    const todayOrders = orders.filter((element) => {
      let todayDate = new Date();
      let day1 = element.createdAt.split("T")[0];
      let day2 = todayDate.toISOString().split("T")[0];
      console.log(day1, day2);
      return day1 == day2;
    });

    const result = todayOrders.reduce((anterior: number, actual) => {
      anterior += actual.items.reduce((before: number, now) => {
        before += now.quantity * now.product.price;
        return before;
      }, 0);
      return anterior;
    }, 0);

    let productsName: {
      [key: string]: number;
    } = {};

    todayOrders.forEach((order) => {
      order.items.forEach((item) => {
        //console.log([productsName[item.product.name]]);
        if (productsName[item.product.name]) {
          console.log("si jala");
          productsName[item.product.name]++;
        } else {
          productsName[item.product.name] = 1;
        }
      });
    });

    let array = Object.keys(productsName);
    let max = 0;
    let name = "";
    for (let i = 0; i < array.length; i++) {
      if (productsName[array[i]] > max) {
        max = productsName[array[i]];
        name = array[i];
      }
    }
    console.log(productsName);
    console.log(max);
    console.log(name);

    util["num"] = todayOrders.length;
    util["profit"] = result;
    util["product"] = name;

    return util;
  });

  return (
    <Header title="Estadisticas de hoy">
      <VStack space={10}>
        <Box>
          <Text fontSize={18}>Productos vendidos</Text>
          <Text fontWeight={"600"} fontSize={30}>
            {statistics && statistics.num}
          </Text>
        </Box>
        <Box>
          <Text fontSize={18}>Producto mas vendido hoy</Text>
          <Text fontWeight={"600"} fontSize={30}>
            {statistics && statistics.product}
          </Text>
        </Box>
        <Box>
          <Text fontSize={18}>Ingreso obtenido</Text>
          <Text fontWeight={"600"} fontSize={30}>
            ${statistics && statistics.profit}
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
