const fs = require('fs');
const path = require('path');

const distPath = 'dist';
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

let htmlContent = fs.readFileSync('index.html', 'utf8');
const cssContent = fs.readFileSync('style.css', 'utf8');
const talksData = fs.readFileSync('data.json', 'utf8');
const scriptContent = fs.readFileSync('script.js', 'utf8');

htmlContent = htmlContent.replace('<link rel="stylesheet" href="style.css">', `<style>${cssContent}</style>`);

const talksScript = `const talksData = ${talksData};
${scriptContent}`;
htmlContent = htmlContent.replace('<script src="script.js"></script>', `<script>${talksScript}</script>`);


fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent);

console.log('Website built successfully! Your single page application is in the dist folder.');
