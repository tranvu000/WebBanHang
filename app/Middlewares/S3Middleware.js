import moment from "moment";
import s3 from "../config/s3.js";

const s3Middleware = (req, res, next) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: moment().unix() + '-' + req.file.originalname,
    Body: req.file.buffer
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).send('Error uploading file');
    };

    res.send('File uploaded successfully');
  });

  next();
};

export default s3Middleware;