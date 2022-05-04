import {
  RouteProp,
  TabRouter,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
} from "native-base";
import { useContext, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";
import Header from "../../components/common/Header";
import ImageThumbnail from "../../components/ProductEdit/ImageThumbnail";
import { ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { ICategories, IProduct, UploadFile } from "../../types/strapi";
import { uploadPhoto } from "../../util/uploadPhoto";
import { RootStackParams } from "../Pages";

interface FormTypes {
  name: string;
  description: string;
  price: number;
  images: ImagePicker.ImageInfo[];
  uploadedImages: UploadFile[];
  categories: string;
}

const ProductEdit = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const queryClient = useQueryClient();

  const route =
    useRoute<RouteProp<{ Detail: { product: IProduct } }, "Detail">>();

  const product = route.params?.product;

  const { user } = useAuth({});
  const axios = useAxios(user?.jwt);
  const { storeData } = useContext(ShopContext);

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    async () => {
      const res = await axios.get<ICategories[]>("/categories/me");
      return res.data;
    }
  );

  const formInitialValues: FormTypes = {
    name: product ? product.name : "",
    description: product ? product.description : "",
    price: product ? product.price : 0,
    uploadedImages: product ? product.photos : [],
    images: [],
    categories: product ? product.category._id : "",
  };

  const [photosUploaded, setPhotosUploaded] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadFiles = async (images: ImagePicker.ImageInfo[]) => {
    const files: UploadFile[] = [];
    for (const [index, image] of images.entries()) {
      setPhotosUploaded(`Subiendo foto ${index + 1}/${images.length}`);

      const file = await uploadPhoto(image);
      if (!file) {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: "Hubo un error subiendo las fotos",
        });
        return;
      }

      files.push(file);
    }
    setPhotosUploaded("");
    return files;
  };

  const handleSubmit = async (values: FormTypes) => {
    setIsSubmitting(true);

    const files = await uploadFiles(values.images);
    if (!files) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "No se puede subir el producto en este momento",
      });
      setIsSubmitting(false);

      return;
    }

    try {
      if (product) {
        const res = await axios.put(`/products/${product._id}`, {
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.categories,
          from: storeData?.alias,
          photos: [
            ...values.uploadedImages.map((f) => f._id),
            ...files?.map((f) => f._id),
          ],
        });
      } else {
        const res = await axios.post("/products", {
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.categories,
          from: storeData?.alias,
          photos: files?.map((f) => f._id),
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "No se puede subir el producto en este momento",
      });
      setIsSubmitting(false);
      return;
    }

    Toast.show({
      type: "success",
      text1: "Exito!",
      text2: "Producto subido correctamente",
    });
    queryClient.invalidateQueries(storeData?.alias);
    navigation.navigate("AllProducts");
    setIsSubmitting(false);
  };

  return (
    <Header
      title={product ? "Editar Producto" : "Agregar Producto"}
      isLoading={isLoadingCategories}
    >
      <Text fontWeight={"700"} fontSize={"23px"}>
        Manos a la obra!
      </Text>
      <Text fontWeight={"400"} fontSize={"13"} color={"gray.600"}>
        Haz las modificaciones que sean necesarias, nosotros nos encargaremos
        del resto
      </Text>
      <Box h={"800px"} mt={10}>
        <Formik
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            name: Yup.string().required("El nombre es requerido"),
            description: Yup.string().required("La descripcion es requerida"),
            price: Yup.number().moreThan(0, "El precio debe ser mayor a 0"),
            categories: Yup.string().required("La categoria es requerida"),
          })}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            // @ts-ignore
            <KeyboardAwareScrollView
              extraScrollHeight={100}
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
            >
              <ScrollView showsVerticalScrollIndicator={true}>
                <FormControl isInvalid={touched.name && !!errors.name}>
                  <FormControl.Label>Nombre *</FormControl.Label>
                  <Input
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={touched.description && !!errors.description}
                >
                  <FormControl.Label>Descripcion *</FormControl.Label>
                  <TextArea
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    isInvalid={touched.description && !!errors.description}
                    value={values.description}
                  />
                  <FormControl.ErrorMessage>
                    {errors.description}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.price && !!errors.price}>
                  <FormControl.Label>Precio (MXN)*</FormControl.Label>
                  <Input
                    keyboardType={
                      Platform.OS === "android" ? "numeric" : "number-pad"
                    }
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    value={`${values.price}`}
                  />
                  <FormControl.ErrorMessage>
                    {errors.price}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={touched.categories && !!errors.categories}
                >
                  <FormControl.Label>Categoria</FormControl.Label>
                  <Select
                    isDisabled={isLoadingCategories}
                    selectedValue={values.categories}
                    onValueChange={(value) =>
                      setFieldValue("categories", value)
                    }
                  >
                    {categories &&
                      categories.map((category) => (
                        <Select.Item
                          value={category._id}
                          label={category.name}
                          key={category._id}
                        />
                      ))}
                  </Select>
                  <FormControl.ErrorMessage>
                    {errors.categories}
                  </FormControl.ErrorMessage>
                </FormControl>
                {product && product.photos.length > 0 && (
                  <FormControl>
                    <FormControl.Label>Imagenes Subidas</FormControl.Label>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <HStack space={4}>
                        {values.uploadedImages.map((image) => (
                          <ImageThumbnail
                            key={image._id}
                            src={image.url}
                            onImageUpload={() => {}}
                            deleteImage={(deletedId) =>
                              setFieldValue(
                                "uploadedImages",
                                values.uploadedImages.filter(
                                  (image) => image.url !== deletedId
                                )
                              )
                            }
                          />
                        ))}
                      </HStack>
                    </ScrollView>
                  </FormControl>
                )}
                <FormControl>
                  <FormControl.Label>Imagenes</FormControl.Label>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <HStack space={4}>
                      {values.images.map((image) => (
                        <ImageThumbnail
                          key={image.uri}
                          src={image.uri}
                          onImageUpload={(result) =>
                            setFieldValue("images", [...values.images, result])
                          }
                          deleteImage={(deletedId) =>
                            setFieldValue(
                              "images",
                              values.images.filter(
                                (image) => image.uri !== deletedId
                              )
                            )
                          }
                        />
                      ))}
                      <ImageThumbnail
                        onImageUpload={(result) =>
                          setFieldValue("images", [...values.images, result])
                        }
                      />
                    </HStack>
                  </ScrollView>
                  <FormControl.Label>{photosUploaded}</FormControl.Label>
                </FormControl>
                <TouchableOpacity>
                  <Button
                    type="submit"
                    onPress={() => handleSubmit()}
                    borderRadius="10"
                    backgroundColor={storeData?.color}
                    mt={10}
                    py={4}
                    isLoading={isSubmitting}
                  >
                    {product ? "Editar Producto" : "Crear Producto"}
                  </Button>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </Box>
    </Header>
  );
};
export default ProductEdit;
