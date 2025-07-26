const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Define paths

const mediaFolder = path.join(__dirname, "../static/media");
const postsFolder = path.join(__dirname, "../static/posts");

// Ensure thumbnails folder exists
if (!fs.existsSync(postsFolder)) {
  fs.mkdirSync(postsFolder, { recursive: true });
}

// Fixed resolution for thumbnails
const fixedWidth = 800; // Example width
const fixedHeight = 800; // Example height

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
      const outputFilePath = path.join(postsFolder, outputFileName);

      // Compress and convert to webp
      sharp(filePath)
        .resize(fixedWidth, fixedHeight, { fit: "cover" })
        .webp({ quality: 100 })
        .toFile(outputFilePath)
        .catch((err) => {
          console.error(`Error processing file ${file}:`, err);
        });
    }
  });
  console.log("📦 Post images generation completed.");
});
