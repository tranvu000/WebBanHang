import firebase from "../config/firebase.js";
import moment from "moment";
import {responseError} from "../Common/helpers.js";

const firebaseMiddleware = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("Error: No files found")
  };

  const blob = firebase.bucket.file(moment().unix() + '-' + req.file.originalname);

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobWriter.on('error', (err) => {
    res.status(500).json(responseError(err, 500))
  });

  blobWriter.on('finish', async() => {
    const options = {
      version: 'V2',
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60
    };

    res.status(200).send(await blob.getSignedUrl(options))
  });

  blobWriter.end(req.file.buffer);

  next();
};

export default firebaseMiddleware;