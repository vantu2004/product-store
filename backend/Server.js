import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/Db.js";
import ProductRoutes from "./routes/Product.route.js";
import path from "path";

// Gọi hàm config() để dotenv nạp các biến từ file .env vào process.env
dotenv.config();

// Tạo một instance của ứng dụng Express
const app = express();
const PORT = process.env.PORT || 5000;

// path.resolve() <=> process.cwd(), khi chạy "npm run dev" -> npm tìm vị trí file package.json -> trả về path nây
const __dirname = path.resolve();
console.log("cwd =", process.cwd());
console.log("__dirname (bạn đang dùng) =", path.resolve());

// chấp nhận dữ liệu dưới dạng JSON trong request
app.use(express.json());

app.use("/api/products", ProductRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve toàn bộ file tĩnh (JS/CSS/assets) đã build bởi Vite tại frontend/dist
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // vì path-to-regex là 8.2.0 nên "*" hay "/*" ko còn hợp lệ (dùng lệnh npm ls express path-to-regexp) để check phiên bản

  // Catch-all cho SPA routes NHƯNG loại trừ các route bắt đầu bằng /api/
  // Regex ^(?!\/api\/).* = mọi đường dẫn KHÔNG khởi đầu bằng "/api/"
  app.get(/^(?!\/api\/).*/, (req, res) => {
    // Trả về index.html để client-side router render trang tương ứng
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Server bắt đầu lắng nghe trên cổng 5000
app.listen(PORT, () => {
  connectDB();
});
