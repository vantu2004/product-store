import React from "react";
import { Box, Text, Image, Button, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from "../store/Product";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = React.useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Lấy tên trường (name) và giá trị (value) từ input
    setUpdatedProduct((prevState) => ({
      ...prevState, // Giữ lại các giá trị cũ của state
      [name]: value, // Cập nhật giá trị mới cho trường tương ứng
    }));
  };

  // Hàm xử lý kết quả trả về và hiển thị thông báo
  const handleResponse = (success, message) => {
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
  };

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(product._id);
    handleResponse(success, message); // Sử dụng hàm handleResponse để hiển thị thông báo
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );

    onClose();

    handleResponse(success, message); // Sử dụng hàm handleResponse để hiển thị thông báo
  };

  // Sử dụng useColorModeValue để thay đổi borderColor theo chế độ sáng/tối
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      boxShadow="md" // Đổ bóng cho sản phẩm
      _hover={{ boxShadow: "lg" }} // Thêm hiệu ứng hover
      transition="all 0.3s"
    >
      <Image
        src={product.image}
        alt={product.name}
        borderRadius="md"
        objectFit="cover" // Điều chỉnh ảnh để tự fit vào khung mà không bị méo
        width="100%"
        height="350px" // Kích thước ảnh cố định
      />
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        {product.name}
      </Text>

      {/* Hiển thị giá sản phẩm */}
      <Text fontSize="lg" color="green.500" fontWeight="semibold" mt={2}>
        ${product.price} {/* Giả sử price là số */}
      </Text>

      <Stack spacing={4} direction="row" mt={4} justify="center">
        {/* Thay View Details bằng 2 nút Update và Delete */}
        <IconButton icon={<FaRegEdit />} colorScheme="blue" onClick={onOpen} />
        <IconButton
          icon={<MdDeleteOutline />}
          colorScheme="red"
          onClick={() => handleDeleteProduct(product._id)}
        />
      </Stack>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form nhập liệu */}
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="name">Product Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="price">Product Price</FormLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  placeholder="Enter product price"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="image">Product Image</FormLabel>
                <Input
                  id="image"
                  name="image"
                  value={updatedProduct.image}
                  onChange={handleInputChange}
                  placeholder="Enter product image link"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
