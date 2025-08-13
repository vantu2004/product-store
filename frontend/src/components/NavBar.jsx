import {
  Box,
  Container,
  Flex,
  HStack,
  Stack,
  Text,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";

// Danh sách các link điều hướng trong navbar
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
];

const NavBar = () => {
  // Hook để quản lý trạng thái mở/đóng Drawer (menu mobile)
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Hook để lấy & thay đổi chế độ màu (light/dark)
  const { colorMode, toggleColorMode } = useColorMode();
  // Hook lấy thông tin đường dẫn hiện tại
  const location = useLocation();

  // Các giá trị màu sắc thay đổi theo theme
  const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.600"); // màu nền navbar
  const border = useColorModeValue("gray.200", "whiteAlpha.300"); // màu viền
  const brandGradient = "linear(to-l, #8711c1, #2472fc)"; // gradient chữ logo
  const textColor = useColorModeValue("gray.700", "gray.100"); // màu chữ
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100"); // màu nền khi hover

  // Kiểm tra đường dẫn hiện tại có khớp với link không
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Box
      as="nav"
      position="sticky" // cố định khi cuộn
      top={0}
      zIndex={100}
      bg={bg}
      backdropFilter="saturate(180%) blur(10px)" // hiệu ứng mờ nền
      borderBottom="1px solid"
      borderColor={border}
      boxShadow="sm" // đổ bóng nhẹ
    >
      <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
        <Flex h={16} align="center" justify="space-between" gap={4}>
          {/* Bên trái: nút menu mobile + logo */}
          <HStack spacing={3}>
            {/* Icon hamburger - chỉ hiện ở mobile */}
            <IconButton
              aria-label="Open menu"
              onClick={onOpen}
              icon={<FiMenu />}
              display={{ base: "inline-flex", md: "none" }}
              variant="ghost"
            />
            {/* Logo */}
            <RouterLink to="/">
              <Text
                bgGradient={brandGradient}
                bgClip="text"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="extrabold"
                letterSpacing="wide"
                textTransform="uppercase"
                lineHeight={1}
              >
                Product Store 🛒
              </Text>
            </RouterLink>
          </HStack>

          {/* Ở giữa: Link điều hướng - ẩn ở mobile */}
          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            {NAV_LINKS.map((l) => {
              const active = isActive(l.to); // xác định link nào đang active
              return (
                <Button
                  key={l.to}
                  as={RouterLink}
                  to={l.to}
                  variant="ghost"
                  size="sm"
                  fontWeight={active ? "bold" : "medium"} // in đậm nếu đang active
                  color={active ? "blue.500" : textColor} // đổi màu nếu active
                  _hover={{ bg: hoverBg }} // màu nền khi hover
                >
                  {l.label}
                </Button>
              );
            })}
          </HStack>

          {/* Bên phải: Nút Create + Nút đổi theme */}
          <HStack spacing={3}>
            <Button
              as={RouterLink}
              to="/create"
              leftIcon={<FaPlusSquare />}
              colorScheme="blue"
              size="sm"
            >
              Create
            </Button>
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              icon={colorMode === "light" ? <FaMoon /> : <FaSun />} // icon thay đổi theo theme
              color={textColor}
            />
          </HStack>
        </Flex>
      </Container>

      {/* Drawer cho menu mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              bgGradient={brandGradient}
              bgClip="text"
              fontSize="xl"
              fontWeight="extrabold"
              textTransform="uppercase"
            >
              Product Store 🛒
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={2} mt={2}>
              {NAV_LINKS.map((l) => (
                <Button
                  key={l.to}
                  as={RouterLink}
                  to={l.to}
                  justifyContent="flex-start" // canh trái
                  variant={isActive(l.to) ? "solid" : "ghost"} // active thì nền đặc
                  colorScheme={isActive(l.to) ? "blue" : undefined}
                  onClick={onClose} // đóng menu sau khi click
                >
                  {l.label}
                </Button>
              ))}
              {/* Nút Create trong menu mobile */}
              <Button
                as={RouterLink}
                to="/create"
                leftIcon={<FaPlusSquare />}
                colorScheme="blue"
                onClick={onClose}
              >
                Create
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NavBar;
