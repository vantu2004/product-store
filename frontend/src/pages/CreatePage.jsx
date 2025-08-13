import React from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlusSquare } from "react-icons/fa";
// Hook để điều hướng trang (React Router v6)
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/Product.js";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: 0,
    image: "",
  });

  // Màu sắc chữ được điều chỉnh theo chế độ sáng/tối
  const textColor = useColorModeValue("gray.700", "gray.100");

  // Hook dùng để chuyển hướng người dùng
  const navigate = useNavigate();

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Lấy tên trường (name) và giá trị (value) từ input
    setNewProduct((prevState) => ({
      ...prevState, // Giữ lại các giá trị cũ của state
      [name]: value, // Cập nhật giá trị mới cho trường tương ứng
    }));
  };

  const { createProduct } = useProductStore();

  const handleSubmit = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Sau khi tạo sản phẩm, điều hướng về trang chủ
    navigate("/");
  };

  return (
    <Container maxW="container.md" px={4} marginTop={10}>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        borderRadius="md"
        boxShadow="md"
        p={6} // Padding cho Box
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color={textColor}
        >
          Add a new product
        </Text>
        <Stack spacing={4} mt={4}>
          {/* Các input sẽ được xếp chồng lên nhau, khoảng cách giữa các input là 4 */}
          <FormControl>
            <FormLabel htmlFor="name">Product name</FormLabel>{" "}
            <Input
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="price">Product price</FormLabel>{" "}
            <Input
              id="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="image">Product image</FormLabel>{" "}
            <Input
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="Enter product image link"
            />
          </FormControl>

          <Button
            colorScheme="blue" // Màu sắc của nút
            leftIcon={<FaPlusSquare />}
            onClick={handleSubmit}
            size="lg"
            width="full"
          >
            Create product
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreatePage;
