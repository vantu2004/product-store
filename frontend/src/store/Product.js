import { create } from "zustand"; // Sử dụng named import thay vì default import

// Tạo store để quản lý sản phẩm
export const useProductStore = create((set) => ({
  // Trạng thái ban đầu là danh sách sản phẩm rỗng
  products: [],

  setProducts: (products) => set({ products }),

  // Tạo sản phẩm mới
  createProduct: async (newProduct) => {
    // Kiểm tra các trường bắt buộc
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Missing required fields" };
    }

    try {
      // Gửi yêu cầu POST để tạo sản phẩm mới
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct), // Chuyển đổi đối tượng JS thành chuỗi JSON
      });

      // Kiểm tra nếu server trả về lỗi
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Chuyển đổi phản hồi từ server thành JSON
      const data = await response.json();

      // Nếu phản hồi thành công, thêm sản phẩm vào store
      set((state) => ({
        products: [...state.products, data], // Thêm sản phẩm mới vào danh sách
      }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return {
        success: false,
        message: "An error occurred while creating the product",
      };
    }
  },

  // Lấy danh sách sản phẩm
  fetchProducts: async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      set({ products: data });

      return { success: true, message: "Products fetched successfully" }; // Trả về danh sách sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, message: "Failed to fetch products" }; // Trả về lỗi
    }
  },

  // Xoa san pham
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Failed to delete product" };
    }
  },

  updateProduct: async (id, updatedProduct) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? updatedProduct : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Failed to update product" };
    }
  },
}));
