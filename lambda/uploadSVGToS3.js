async function uploadSVGToS3(bucketName, svgOutput, path, fs, AWS) {

    let {randomUUID} = await import('crypto');

    try {
        const s3 = new AWS.S3({apiVersion: "2006-03-01"});
        const keyPrefix = 'result/' + randomUUID() + '/'; // Optional: specify a folder in the bucket

        const tmpPath = path.join('/tmp', '/tizada');
        fs.mkdirSync(tmpPath, {recursive: true});
        fs.writeFileSync(path.join(tmpPath, 'result.svg'), svgOutput, 'utf-8');

        const filePath = path.join(tmpPath, 'result.svg');

        const fileName = path.basename(filePath);
        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: bucketName,
            Key: keyPrefix + fileName,
            Body: fileContent,
            ContentType: 'image/svg+xml'
        };

        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
        return data;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}

module.exports.uploadSVGToS3 = uploadSVGToS3
