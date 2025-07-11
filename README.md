# Book Tour BE

Hệ thống backend quản lý tour du lịch thông minh

## Công nghệ sử dụng

- Node.js, Express.js
- MongoDB (Mongoose)
- TypeScript
- JWT Authentication
- Nodemailer (gửi email)
- Multer (upload file)
- VNPay (tích hợp thanh toán)
- ESLint, dotenv, morgan, cors, cookie-parser

## Cấu trúc thư mục

```
src/
  controllers/      // Xử lý logic cho các route
  models/           // Định nghĩa schema MongoDB
  services/         // Xử lý nghiệp vụ
  routes/           // Định nghĩa các route
  config/           // Cấu hình hệ thống, DB, CORS, multer
  middlewares/      // Middleware xác thực, xử lý lỗi
  providers/        // Các provider (JWT, gửi mail, ...)
  utils/            // Các hàm tiện ích, types
```

## Cài đặt

1. **Clone dự án**
   ```
   git clone <repo-url>
   cd book-tour-BE/book-tour
   ```

2. **Cài đặt dependencies**
   ```
   npm install
   ```

3. **Tạo file `.env`**
   ```
   MONGO_URL=mongodb://localhost:27017/booktour
   ACCESS_TOKEN_SECRET_SIGNATURE=your_access_secret
   REFRESH_TOKEN_SECRET_SIGNATURE=your_refresh_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   VNP_TMN_CODE=your_vnpay_code
   VNP_HASH_SECRET=your_vnpay_secret
   ```

4. **Chạy dự án**
   ```
   npm run dev
   ```
   Hoặc:
   ```
   npx ts-node sever.ts
   ```

## Các API chính

- Quản lý tài khoản: Đăng ký, đăng nhập, refresh token, CRUD tài khoản
- Quản lý tour: CRUD tour, danh mục tour, đặt tour, đánh giá tour
- Quản lý khách sạn: CRUD khách sạn, loại phòng, đặt phòng, đánh giá khách sạn
- Quản lý chuyến bay: CRUD chuyến bay, hãng bay, hạng vé, đặt vé, đánh giá chuyến bay
- Tích hợp thanh toán VNPay

## Một số lưu ý

- Đảm bảo MongoDB đang chạy trên máy hoặc cloud.
- Để gửi email, cần bật "Less secure app access" cho Gmail hoặc dùng App Password.
- Để test thanh toán VNPay, sử dụng sandbox credentials.

## License

MIT

