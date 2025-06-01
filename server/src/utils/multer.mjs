import multer from "multer";
import path from "path";
import fs from "fs/promises";
// --- Multer 配置 ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
// 文件过滤器
const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith('image/')
      ? cb(null, true)
      : cb(new Error('只允许上传图片文件'), false);
};
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1204 // 5MB
  }
});
