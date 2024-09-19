const AWS = require('aws-sdk');

const config = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET || "dummy",
    region: process.env.AWS_S3_BUCKET_REGION || "us-east-2"
}

// Set the AWS credentials and region
const lambda = new AWS.Lambda({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
    maxRetries: 0 // Disable retries
});

const params = {
    FunctionName: 'arn:aws:lambda:us-east-2:593749507085:function:servicio-de-tizada', // The name or ARN of the Lambda function
    InvocationType: 'Event', // 'Event' makes the invocation asynchronous
    Payload: JSON.stringify({
        user: "a038a4d2-8502-455f-a154-aa87b1cc3fec",
        parts: [
            {
                "uuid": "moldeA",
                "quantity": 1
            },
            {
                "uuid": "moldeB",
                "quantity": 1
            },
            {
                "uuid": "moldeC",
                "quantity": 1
            }
        ],
        bin: {
            "uuid": "contenedorA",
            "quantity": 1
        },
        configuration: {
            "maxIterations": 5,
            "materialUtilization": 50,
            "timeout": 0
        }
    }), // The payload you want to pass to the Lambda function
};

lambda.invoke(params, (err, data) => {
    if (err) {
        console.error('Error invoking Lambda function:', err);
    } else {
        console.log('Lambda invoked successfully:', data);
    }
});
