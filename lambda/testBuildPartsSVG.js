const fs = require('fs');
const path = require('path');

// Function to extract inner content of an SVG file
function getInnerSvgContent(svgContent) {
    // Use a regular expression to remove the opening and closing <svg> tags
    return svgContent.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
}

// Paths to the SVG files you want to combine
const svgFiles = [
    path.join('/tmp/tizada', 'bin.svg'),
    path.join('/tmp/tizada', 'parts.svg'),
];

// Read and extract content from each SVG file
let combinedSvgContent = '';
svgFiles.forEach((filePath) => {
    const svgContent = fs.readFileSync(filePath, 'utf-8');
    const innerContent = getInnerSvgContent(svgContent);
    combinedSvgContent += innerContent + '\n'; // Append content and add newline for separation
});

// Create the combined SVG content with one root <svg> element
const outputSvgContent = `
<svg xmlns="http://www.w3.org/2000/svg">
    ${combinedSvgContent}
</svg>
`;

// Path to the output combined SVG file
const outputFilePath = path.join('/tmp/tizada', 'new-parts.svg');

// Write the combined content to a new SVG file
fs.writeFileSync(outputFilePath, outputSvgContent, 'utf-8');

console.log(`Combined SVG saved to: ${outputFilePath}`);
