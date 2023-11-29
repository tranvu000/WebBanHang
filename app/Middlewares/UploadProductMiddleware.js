import multer from "multer";
import path from 'path';
import moment from "moment";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname === 'images') {
//       cb (null, path.resolve('./storage/product/any/images'))
//     } else if (file.fieldname === 'video') {
//       cb (null, path.resolve('./storage/product/any/video'))
//     } else {
//       cb (null, path.resolve('./storage/product/any/classifies/image'))
//     }
//   },

//   filename: (req, file, cb) => {
//     cb (null, moment().unix() + '-' + file.originalname)
//   }
// });

const fileFilter = (req, file, cb) => {
  const allowMimes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/avi', 'video/wmv'];

  if (allowMimes.includes(file.mimetype)) {
    cb (null, true)
  } else {
    cb (new Error ('Invalid the type'))
  }
};

const uploadProductMiddleware = multer ({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 50000000
  },

  fileFilter
});

export default uploadProductMiddleware;