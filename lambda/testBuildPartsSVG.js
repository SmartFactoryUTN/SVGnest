const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure the AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET || "dummy",
    region: process.env.AWS_S3_BUCKET_REGION || "us-east-2",
    bucketName: process.env.AWS_S3_BUCKET_NAME || "dummy",
});

// Function to extract the inner content of an SVG file
function getInnerSvgContent(svgContent) {
    // Remove the outer <svg> tags
    return svgContent.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
}

// Function to fetch an SVG file from AWS S3
async function fetchSvgFromS3(bucket, key) {
    try {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const data = await s3.getObject(params).promise();
        return data.Body.toString('utf-8'); // Convert the file content to a string
    } catch (error) {
        console.error(`Failed to fetch SVG from S3: ${error.message}`);
        throw error;
    }
}

// Array of SVG S3 objects and how many times each should appear in the final SVG
const svgFiles = [
    { bucket: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada", key: 'a038a4d2-8502-455f-a154-aa87b1cc3fec/moldeA.svg', count: 5 },
    { bucket: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada", key: 'a038a4d2-8502-455f-a154-aa87b1cc3fec/moldeB.svg', count: 10 },
    { bucket: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada", key: 'a038a4d2-8502-455f-a154-aa87b1cc3fec/moldeC.svg', count: 20 },
];

// Fetch SVG files, repeat them based on count, and combine
async function combineSvgs() {
    let combinedSvgContent = '';

    for (const svgFile of svgFiles) {
        try {
            const svgContent = await fetchSvgFromS3(svgFile.bucket, svgFile.key);
            const innerContent = getInnerSvgContent(svgContent);

            // Repeat the SVG content based on the count
            for (let i = 0; i < svgFile.count; i++) {
                combinedSvgContent += innerContent + '\n'; // Append and add newline for separation
            }
        } catch (error) {
            console.error(`Error fetching or processing SVG from S3 bucket: ${svgFile.bucket}`);
        }
    }

    // Create the combined SVG content with one root <svg> element
    const outputSvgContent = `
    <svg xmlns="http://www.w3.org/2000/svg">
        ${combinedSvgContent}
    </svg>
    `;

    // Path to the output combined SVG file
    const outputFilePath = path.join('/tmp/tizada', 'parts.svg');

    // Write the combined content to a new SVG file
    fs.writeFileSync(outputFilePath, outputSvgContent, 'utf-8');

    console.log(`Combined SVG saved to: ${outputFilePath}`);
}

// Run the script
combineSvgs().catch((error) => {
    console.error('Failed to combine SVGs:', error.message);
});
