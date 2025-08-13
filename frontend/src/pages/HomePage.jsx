import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useProductStore } from "../store/Product.js"; // Dùng store sản phẩm của bạn
import { Link as RouterLink } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { ProductCard } from "../components/ProductCard.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  // useEffect sẽ gọi fetchProducts khi component render lần đầu tiên hoặc khi fetchProducts thay đổi, [fetchProducts] là mảng dependency liệt kê các dependencies mà useEffect theo dõi
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Điều chỉnh số cột khi có các kích thước màn hình khác nhau
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 3 });

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" mb={6}>
          Welcome to Product Store 🛒
        </Text>

        {/* Hiển thị nút "Add New Product" chỉ khi không có sản phẩm */}
        {products.length === 0 && (
          <Button
            as={RouterLink}
            to="/create"
            colorScheme="blue"
            leftIcon={<FaPlusSquare />}
            size="lg"
            mb={6}
          >
            Add New Product
          </Button>
        )}

        {/* Hiển thị sản phẩm */}
        {products.length === 0 ? (
          <Box>
            <Text fontSize="xl" mb={4}>
              No products available
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={columns} spacing={8}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
