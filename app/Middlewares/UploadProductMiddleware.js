import multer from "multer";

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