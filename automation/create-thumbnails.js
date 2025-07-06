const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Define paths

const mediaFolder = path.join(__dirname, "../static/media");
const thumbnailsFolder = path.join(__dirname, "../static/thumbnails");

// Ensure thumbnails folder exists
if (!fs.existsSync(thumbnailsFolder)) {
  fs.mkdirSync(thumbnailsFolder, { recursive: true });
}

// Fixed resolution for thumbnails
const fixedWidth = 300; // Example width
const fixedHeight = 300; // Example height

// Process images
fs.readdir(mediaFolder, (err, files) => {
  if (err) {
    console.error("Error reading media folder:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(mediaFolder, file);
    const fileExtension = path.extname(file).toLowerCase();
    const fileNameWithoutExt = path.basename(file, fileExtension);

    // Check if the file is an image
    if (
      [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"].includes(
        fileExtension
      )
    ) {
      const outputFileName = `${fileNameWithoutExt}_thumbnail.webp`;
      const outputFilePath = path.join(thumbnailsFolder, outputFileName);

      // Compress and convert to webp
      sharp(filePath)
        .resize(fixedWidth, fixedHeight, { fit: "cover" })
        .webp({ quality: 60 })
        .toFile(outputFilePath)
        .catch((err) => {
          console.error(`Error processing file ${file}:`, err);
        });
    }
  });
  console.log("🤙🏼 Thumbnail generation completed.");
});
