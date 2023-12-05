import firebase from "../config/firebase.js";
import moment from "moment";
import { responseError } from "../Common/helpers.js";

export const uploadAvatarFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next();
  };

  const fileName = "user/avatar/" + moment().unix() + "-" + req.file.originalname;
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    res.status(500).json(responseError(err, 500));
  });

  blobWriter.on("finish", async () => {
    req.body.avatar = fileName;
    next();
  });

  blobWriter.end(req.file.buffer);
};

export const uploadLogoBrandFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next();
  };
  
  const fileName = "brand/logo/" + moment().unix() + "-" + req.file.originalname;
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    res.status(500).json(responseError(err, 500));
  });

  blobWriter.on("finish", async () => {
    req.body.logo = fileName;
    next();
  });

  blobWriter.end(req.file.buffer);
};

export const uploadImageCategoryFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next();
  };

  const fileName = "category/image/" + moment().unix() + "-" + req.file.originalname;
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    res.status(500).json(responseError(err, 500));
  });

  blobWriter.on("finish", async () => {
    req.body.image = fileName;
    next();
  });

  blobWriter.end(req.file.buffer);
};

export const uploadProductFirebaseMiddleware = async (req, res, next) => {
  const renderFileName = (file) => {
    let fileName;
    if (file.fieldname === "images") {
      fileName = "product_media/images/" + moment().unix() + "-" + file.originalname;
    } else if (file.fieldname === "video") {
      fileName = "product_media/video/" + moment().unix() + "-" + file.originalname;
    } else {
      fileName = "classifies/classify_values/" + moment().unix() + "-" + file.originalname;
    };

    return fileName;
  };

  const uploadFileToFirebase = async (file) => {
    const bucket = firebase.bucket
    const filename = renderFileName(file)
    const result = bucket.file(filename);
    const bf = Buffer.from(file.buffer);
    
    await result.save(bf, {
      contentType: file.mimetype,
      cacheControl: "public, max-age=31536000",
    });

    file.path = filename;
    return file
  };

  const fileUploadPromises = req.files.map(uploadFileToFirebase);
  const uploadedFiles = await Promise.all(fileUploadPromises);
  
  next();
};