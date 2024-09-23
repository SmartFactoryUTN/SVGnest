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

// Function to extract the inner content of an SVG file and sanitize IDs
function sanitizeSvgContent(svgContent, uniquePrefix) {
    let sanitizedContent = svgContent
        .replace(/<\?xml[^>]+\?>/g, '') // Remove XML declaration
        .replace(/<svg[^>]*>/, '') // Remove opening <svg> tag
        .replace(/<\/svg>/, ''); // Remove closing </svg> tag

    sanitizedContent = sanitizedContent.replace(/id="([^"]+)"/g, `id="${uniquePrefix}-$1"`);
    sanitizedContent = sanitizedContent.replace(/href="#([^"]+)"/g, `href="#${uniquePrefix}-$1"`); // Update hrefs

    return sanitizedContent;
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
    let currentX = 0; // Initial x-coordinate
    let currentY = 0; // Initial y-coordinate
    const spacingX = 1500; // Horizontal spacing between SVGs
    const spacingY = 500; // Vertical spacing between SVGs

    for (const [index, svgFile] of svgFiles.entries()) {
        try {
            const svgContent = await fetchSvgFromS3(svgFile.bucket, svgFile.key);
            const uniquePrefix = `file${index + 1}`;
            const sanitizedContent = sanitizeSvgContent(svgContent, uniquePrefix);

            // Repeat the SVG content based on the count
            for (let i = 0; i < svgFile.count; i++) {
                combinedSvgContent += `
                <g transform="translate(${currentX}, ${currentY})">
                    ${sanitizedContent}
                </g>\n`;

                // Update position for the next SVG
                currentX += spacingX;
                if (currentX > 500) { // Move to next row after certain width
                    currentX = 0;
                    currentY += spacingY;
                }
            }
        } catch (error) {
            console.error(`Error fetching or processing SVG from S3 bucket: ${svgFile.bucket}`);
        }
    }

    // Create the combined SVG content with one root <svg> element
    const outputSvgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" height="6000" width="6000">
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
