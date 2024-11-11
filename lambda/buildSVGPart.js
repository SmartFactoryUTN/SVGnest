async function buildSVGPart(userIdentifier, parts, isBin, size) {

    const svgFiles = parts.map(part => {

        return {
            bucket: process.env.AWS_S3_BUCKET_NAME || "servicio-de-tizada",
            key: isBin? `users/${userIdentifier}/containers/${part.uuid}.svg` : `users/${userIdentifier}/moldes/${part.uuid}.svg`,
            count: part.quantity,
            height: size.height,
            width: size.width
        };
    });

    try {

        return await combineSvgs(svgFiles);
    } catch (error) {
        console.error(`Error trying to combine SVG: ${error.message}`);
    }

}

async function combineSvgs(svgFiles) {
    let combinedSvgContent = '';
    let currentY = 0;  // Initial Y position for rows
    let currentX = 0;  // Initial X position for columns
    const separation = 2800;  // Separation between shapes in the grid

    for (const [index, svgFile] of svgFiles.entries()) {
        try {
            const svgContent = await fetchSvgFromS3(svgFile.bucket, svgFile.key);
            const uniquePrefix = `file${index + 1}`;
            const sanitizedContent = sanitizeSvgContent(svgContent, uniquePrefix);

            // Repeat SVG content based on count with translation adjustments
            for (let i = 0; i < svgFile.count; i++) {
                // Adjust regex to insert transform directly in the opening tag
                const transformedContent = sanitizedContent.replace(
                    /<(rect|circle|ellipse|polygon|polyline|path)([^>]*)>/,
                    `<$1$2 transform="translate(${currentX}, ${currentY})">`
                );

                combinedSvgContent += `${transformedContent}\n`;

                // Update currentX for the next shape in the row
                currentX += separation;
                if (currentX >= separation * 4) {  // Adjust to fit the number of columns you want
                    // Move to a new row after reaching column limit
                    currentX = 0;
                    currentY += separation;
                }
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            console.error(`Error fetching or processing SVG from S3 bucket: ${svgFile.bucket}`);
        }
    }

    // Create the combined SVG content with one root <svg> element
    const outputSvgContent = `
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        height="${currentY + separation}"
        width="${separation * 4}"
        viewBox="0 0 ${separation * 4} ${currentY + separation}"
        style="background-color:white;"
    >
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
