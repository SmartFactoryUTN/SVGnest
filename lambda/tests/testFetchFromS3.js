const AWS = require('aws-sdk');

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

// Create the parameters for calling listObjects
const bucketName = config.bucketName;

let bucketParams = {
    Bucket: bucketName,
};

s3.listBuckets((err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});


async function getS3Object(params) {
    return await s3.getObject(params).promise();
}

const params = {
    // The name of the bucket you're reading from
    Bucket: config.bucketName,
    // The name of the file in that bucket, you're trying to GET
    Key: 'result/767d8a55-f6ca-4a9b-9b49-6aa10da7ca3c/result.svg'
};

getS3Object(params)
    .then(data => {
        console.log(`Data fetched successfully.\n`);
        console.log(`Data Body: ${data.Body}\n`);
        console.log(`Data Etag: ${data.ETag}\n`);
    })
    .catch(err => {
        console.error(`Failed to upload file: ${err.message}`);
    });
