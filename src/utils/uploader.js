import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dkhdxxnld",
  api_key: "778167159871757",
  api_secret: "ponsOqv8dQw4kjkJZICe5ZHEkbg",
});

const storage = multer.memoryStorage();

const uploader = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Chỉ chấp nhận tệp hình ảnh"));
    }
    cb(null, true);
  },
});

export { uploader, cloudinary };
