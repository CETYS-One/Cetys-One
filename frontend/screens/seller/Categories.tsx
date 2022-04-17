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
} from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Header from "../../components/common/Header";
import { ICategories } from "../../types/strapi";
import axios from "../../util/axios";

const Categories = () => {
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
      const res = await axios.get<ICategories[]>("/categories");
      return res.data;
    }
  );

  const addCategory = useMutation(
    async (name: string) => await axios.post("/categories", { name }),
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

  const renderRightView = (onDeleteHandler: any) => (
    <Box w={90} alignContent={"center"} m={0}>
      <Button colorScheme={"red"}></Button>
    </Box>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
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
                  <Spinner color={"amber.500"} mr={2} />
                ) : (
                  <IconButton
                    onPress={submitForm}
                    icon={<AddIcon color={"amber.500"} />}
                  />
                )
              }
            />
          </FormControl>

          {categories &&
            categories.map((category) => (
              <Swipeable
                renderRightActions={(progress, dragX) =>
                  renderRightView(() => {})
                }
                // onSwipeableOpen={(direction) => console.log(direction)}
                rightOpenVale={-100}
                key={category._id}
              >
                <Box
                  w={"100%"}
                  py={4}
                  px={2}
                  rounded={4}
                  background={"gray.50"}
                  borderLeftColor={"amber.500"}
                  borderLeftWidth={4}
                >
                  {category.name}
                </Box>
              </Swipeable>
            ))}
          {/* <Box w={"100%"} py={4} px={2} rounded={4} background={"gray.100"}>
            Hamburguesas
            </Box> */}
        </VStack>
      </Header>
    </SafeAreaView>
  );
};
export default Categories;
