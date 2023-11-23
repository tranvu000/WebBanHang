import firebase from "../config/firebase.js";
import moment from "moment";
import {responseError} from "../Common/helpers.js";

const firebaseMiddleware = async (req, res, next) => {
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

export default firebaseMiddleware;