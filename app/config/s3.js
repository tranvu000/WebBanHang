import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: proccess.env.AWS_DEFAULT_REGINON,
});

const s3 = new AWS.S3();

export default s3;