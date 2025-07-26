const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { imageSizeFromFile } = require("image-size/fromFile");

const imagesDir = path.join(__dirname, "../static/media");
const outputPath = path.join(__dirname, "../src/pages/gallery/_generated_.ts");

const validImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
const validVideoExtensions = [".mov", ".mp4"];
const validExtensions = [...validImageExtensions, ...validVideoExtensions];

(async () => {
  // Check if imagesDir exists
  try {
    await fsp.access(imagesDir, fs.constants.F_OK);
  } catch (err) {
    console.error(`Error: Directory ${imagesDir} does not exist`);
    process.exit(0);
  }

  const files = await fsp.readdir(imagesDir);

  const mediaObjects = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!validExtensions.includes(ext)) continue;

    const filePath = path.join(imagesDir, file);
    const isVideo = validVideoExtensions.includes(ext);
    const thumbnailPath = file.replace(".webp", "_thumbnail.webp");

    try {
      const mediaObject = {
        url: `https://matteokosina.github.io/canada/media/${file}`,
        thumbnail_url: `https://matteokosina.github.io/canada/thumbnails/${thumbnailPath}`,
        type: isVideo ? "video" : "image",
      };

      // Get dimensions only for images
      if (!isVideo) {
        const dimensions = await imageSizeFromFile(filePath);
        mediaObject.width = dimensions.width;
        mediaObject.height = dimensions.height;
      }

      mediaObjects.push(mediaObject);
    } catch (err) {
      console.warn(`⚠️  Fehler beim Verarbeiten von ${file}: ${err.message}`);
    }
  }

  mediaObjects.sort((a, b) => {
    const aIndex = parseInt(path.basename(a.url).split(".")[0], 10);
    const bIndex = parseInt(path.basename(b.url).split(".")[0], 10);
    return bIndex - aIndex;
  });

  const content =
    "// Auto-generated media list\n\n" +
    "export const mediaList = " +
    JSON.stringify(mediaObjects, null, 2) +
    ";\n";

  fs.writeFileSync(outputPath, content);
  console.log("🏞️ Generated media list successfully");
})();
