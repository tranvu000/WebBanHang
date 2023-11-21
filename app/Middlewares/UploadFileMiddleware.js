import multer from "multer";

const fileFilter = (req, file, cb) => {
  const allowMimes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (allowMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid the type'))
  }
}

const uploadFileMiddleware = multer({
  storage: multer.memoryStorage(),

  limit: {
    fileSize: 250000
  },

  fileFilter
});

export default uploadFileMiddleware;