const fs = require('fs');
const AWS = require('aws-sdk');
const stream = require('stream');

const config = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET || "dummy",
    region: process.env.AWS_S3_BUCKET_REGION || "us-east-2",
    bucketName: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada",
    nestingServiceHost: process.env.NESTING_SERVICE_HOST || "dummy",
}

// Configure AWS SDK
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
});

// Create S3 service object
const s3 = new AWS.S3({apiVersion: "2006-03-01"});
const filenames = process.argv.splice(2);


(()=>{
    const pass = new stream.PassThrough();
    filenames.forEach((f) => {
        const nameArr = f.split('/');
        const fStream = fs.createReadStream(f).pipe(pass);

        const params = {
            Bucket: config.bucketName,
            Key: 'a038a4d2-8502-455f-a154-aa87b1cc3fec/' +nameArr[nameArr.length-1],
            Body: fStream
        };

        s3.upload(params, function (err, data) {
            if(err) {
                throw err;
            }
            fStream.destroy();
            console.log(`File was uploaded to s3 successfully at ${data.Location}`);
        })
    });
})();

