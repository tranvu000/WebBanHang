import multer from "multer";
import path from "path";
import moment from "moment";

const fileFilter = (req, file, cb) => {
  const allowMimes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (allowMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid the type'))
  }
}

export const uploadFileMiddleware = multer({
  storage: multer.memoryStorage(), //lưu tạm vào bộ nhớ

  limit: {
    fileSize: 250000
  },

  fileFilter
});

// import multer from 'multer';

// const uploadAvatarS3 = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // limit file size to 5MB
//     },
// });

// export default uploadAvatarS3;