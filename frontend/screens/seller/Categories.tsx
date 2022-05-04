import { useFormik, validateYupSchema } from "formik";
import {
  Button,
  Box,
  VStack,
  Input,
  IconButton,
  AddIcon,
  FormControl,
  Spinner,
  Text,
} from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Header from "../../components/common/Header";
import { ICategories } from "../../types/strapi";
import { View } from "react-native";
import { AnimatedBox, AnimatedText } from "../../components/common/Animated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatePresence } from "moti";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";

const Categories = () => {
  const { storeData } = useContext(ShopContext);
  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);

  const { values, handleChange, handleBlur, resetForm, submitForm } = useFormik(
    {
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        if (!values.name) return;
        addCategory.mutate(values.name);
        resetForm({ values: { name: "" } });
      },
    }
  );

  const queryClient = useQueryClient();

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    async () => {
      const res = await axios.get<ICategories[]>("/categories/me");
      return res.data;
    }
  );

  const addCategory = useMutation(
    async (name: string) => await axios.post("/categories/me", { name }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        Toast.show({
          type: "success",
          text1: "Exito!",
          text2: "Categoria creada",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Hubo un error creando la categoria",
        });
      },
    }
  );

  const deleteCategory = useMutation(
    async (id: string) => await axios.delete(`/categories/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        Toast.show({
          type: "success",
          text1: "Exito!",
          text2: "Categoria eliminada correctamente",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Hubo un error eliminando la categoria",
        });
      },
    }
  );

  const renderRightView = (onDelete: () => void, isLoading: boolean) => (
    <Box
      bg={"red.500"}
      alignItems={"flex-end"}
      justifyContent={"center"}
      roundedRight={4}
    >
      <TouchableOpacity onPress={() => onDelete()}>
        <Box w={"100px"}>
          {isLoading ? (
            <Spinner color={"white"} />
          ) : (
            <Text textAlign={"center"} color={"white"} px={4} fontSize={12}>
              Eliminar
            </Text>
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );

  return (
    <Header title="Categorias" isLoading={isLoadingCategories}>
      <VStack space={2}>
        <FormControl mb={4}>
          <FormControl.Label>Nombre de la categoria</FormControl.Label>
          <Input
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            InputRightElement={
              addCategory.isLoading ? (
                <Spinner color={storeData?.color} mr={2} />
              ) : (
                <IconButton
                  onPress={submitForm}
                  icon={<AddIcon color={storeData?.color} />}
                />
              )
            }
          />
        </FormControl>

        <AnimatePresence>
          {categories &&
            categories.map((category) => (
              <AnimatedBox
                key={category._id}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                mb={2}
              >
                <Swipeable
                  renderRightActions={() =>
                    renderRightView(
                      () => deleteCategory.mutate(category._id),
                      deleteCategory.isLoading
                    )
                  }
                  key={category._id}
                >
                  <Box
                    w={"100%"}
                    py={4}
                    px={2}
                    rounded={4}
                    background={"gray.50"}
                    borderLeftColor={storeData?.color}
                    borderLeftWidth={4}
                  >
                    {category.name}
                  </Box>
                </Swipeable>
              </AnimatedBox>
            ))}
        </AnimatePresence>
        {/* <Box w={"100%"} py={4} px={2} rounded={4} background={"gray.100"}>
            Hamburguesas
            </Box> */}
      </VStack>
    </Header>
  );
};
export default Categories;
