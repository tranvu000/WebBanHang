import multer from "multer";
import path from "path";
import moment from "moment";

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./storage/user/avatar'))
  },

  filename: (req, file, cb) => {
    cb(null, moment().unix() + '-' + file.originalname)
  }
});

const storageLogo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./storage/brand/logo'))
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
  storage: storageAvatar,

  limit: {
    fileSize: 250000
  },

  fileFilter
});

export const uploadLogoMiddleware = multer({
  storage: storageLogo,

  limit: {
    fileSize: 250000
  },

  fileFilter
})