import aws from 'aws-sdk';

const signS3 = (req, res) => {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    signatureVersion: 'v4',
  });
  console.log('s3: ', s3);
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  console.log('filename and filetype: ', fileName, fileType);
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log('err: ', err);
      res.status(422).end();
    }

    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    };
    return (res.send(JSON.stringify(returnData)));
  });
};

export default signS3;
