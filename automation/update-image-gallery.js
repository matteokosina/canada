const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { imageSizeFromFile } = require('image-size/fromFile');

const imagesDir = path.join(__dirname, '../static/pictures');
const outputPath = path.join(__dirname, '../src/pages/gallery/_generated_.ts');

const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

(async () => {
  const files = await fsp.readdir(imagesDir);

  const imageObjects = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!validExtensions.includes(ext)) continue;

    const filePath = path.join(imagesDir, file);
    try {
      const dimensions = await imageSizeFromFile(filePath);
      imageObjects.push({
        url: `../img/${file}`, // assumes you serve static/img as /images
        width: dimensions.width,
        height: dimensions.height,
      });
    } catch (err) {
      console.warn(`⚠️  Fehler beim Verarbeiten von ${file}: ${err.message}`);
    }
  }

  const content =
    '// Auto-generated image list\n\n' +
    'export const imageList = ' +
    JSON.stringify(imageObjects, null, 2) +
    ';\n';

  fs.writeFileSync(outputPath, content);
  console.log('✅ genereated image list successfully');
})();
