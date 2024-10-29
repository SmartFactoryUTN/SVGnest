async function buildSVGPart(userIdentifier, parts, isBin) {

    const svgFiles = parts.map(part => {

        let key;

        if (isBin){
            key = `${userIdentifier}/containers/${part.uuid}.svg`;
        }else{
            key = `${userIdentifier}/moldes/${part.uuid}.svg`;
        }

        return {
            bucket: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada",
            key: key,
            count: part.quantity
        };
    });

    try {
        return await combineSvgs(svgFiles);
    } catch (error) {
        console.error(`Error trying to combine SVG: ${error.message}`);
    }

}

// Fetch SVG files, repeat them based on count, and combine
async function combineSvgs(svgFiles) {
    let combinedSvgContent = '';

    for (const [index, svgFile] of svgFiles.entries()) {
        try {
            const svgContent = await fetchSvgFromS3(svgFile.bucket, svgFile.key);
            const uniquePrefix = `file${index + 1}`;
            const sanitizedContent = sanitizeSvgContent(svgContent, uniquePrefix);

            // Repeat the SVG content based on the count
            for (let i = 0; i < svgFile.count; i++) {
                combinedSvgContent += `${sanitizedContent}\n`;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            console.error(`Error fetching or processing SVG from S3 bucket: ${svgFile.bucket}`);
        }
    }

    // Create the combined SVG content with one root <svg> element
    const outputSvgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" height="3000" width="3000" viewBox="0 0 3000 3000" style="background-color:white">
        ${combinedSvgContent}
    </svg>
    `;

    console.log(`Combined SVG result ${outputSvgContent}`);
    return outputSvgContent;
}

// Function to fetch an SVG file from AWS S3
async function fetchSvgFromS3(bucket, key) {


    try {
        const config = require('./config');
        const AWS = require('aws-sdk');
        // Configure the AWS SDK
        const s3 = new AWS.S3(config);

        const params = {
            Bucket: bucket,
            Key: key,
        };
        const data = await s3.getObject(params).promise();
        return data.Body.toString();
    } catch (error) {
        console.error(`Failed to fetch SVG from S3: ${error.message}`);
        throw error;
    }
}


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

module.exports.buildSVGPart = buildSVGPart
