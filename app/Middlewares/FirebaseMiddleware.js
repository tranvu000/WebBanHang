import firebase from "../config/firebase.js";
import moment from "moment";
import {responseError} from "../Common/helpers.js";

export const uploadAvatarFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found")
  };
  const fileName = 'user/avatar/' + moment().unix() + '-' + req.file.originalname;
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobWriter.on('error', (err) => {
    res.status(500).json(responseError(err, 500))
  });

  blobWriter.on('finish', async() => {
    req.body.avatar = fileName;
    next();
  });

  blobWriter.end(req.file.buffer);
};

export const uploadLogoBrandFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found")
  };
  const fileName = 'brand/logo/' + moment().unix() + '-' + req.file.originalname;
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  
  blobWriter.on('error', (err) => {
    res.status(500).json(responseError(err, 500))
  });

  blobWriter.on('finish', async() => {
    req.body.logo = fileName;
    next();
  });

  blobWriter.end(req.file.buffer);
};

export const uploadImageCategoryFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found")
  };
  const fileName = 'category/image/' + moment().unix() + '-' + req.file.originalname;
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  
  blobWriter.on('error', (err) => {
    res.status(500).json(responseError(err, 500))
  });

  blobWriter.on('finish', async() => {
    req.body.image = fileName;
    next();
  });

  blobWriter.end(req.file.buffer);
};

export const uploadProductFirebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found")
  };

  let fileName;

  if (file.fieldname === 'images') {
    fileName = 'product_media/images/' + moment().unix() + '-' + req.file.originalname;
  } else if (file.fieldname === 'video') {
    fileName = 'product_media/video/' + moment().unix() + '-' + req.file.originalname;
  } else {
    fileName = 'classifies/classify_values/' + moment().unix() + '-' + req.file.originalname;
  }
  const blob = firebase.bucket.file(fileName);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  
  blobWriter.on('error', (err) => {
    res.status(500).json(responseError(err, 500))
  });

  blobWriter.on('finish', async() => {
    if (file.fieldname === 'images') {
      req.body.images = fileName;
    } else if (file.fieldname === 'video') {
      req.body.video = fileName;
    } else {

    }
    next();
  });

  blobWriter.end(req.file.buffer);
};

