require('dotenv').config({ path: '.env' })

// Lưu các data lấy từ biến môi trường
export const baseUrl = process.env.REACT_APP_BASE_URL
