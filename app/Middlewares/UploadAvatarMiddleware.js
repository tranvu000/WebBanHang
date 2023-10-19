import multer from "multer";
import path from "path";
import moment from "moment";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./storage/user/avatar'))
  },

  filename: (req, file, cb) => {
    cb(null, moment().unix() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowMimes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (allowMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid the type'))
  }
}

export const uploadAvatarMiddleware = multer({
  storage,

  limit: {
    fileSize: 250000
  },

  fileFilter
})