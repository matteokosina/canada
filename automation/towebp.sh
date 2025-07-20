#!/bin/bash

# Directory containing the images
IMAGE_DIR="../static/media"

# Convert all .jpg and .jpeg files to .webp
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    # Get the file name without extension
    base_name="${file%.*}"
    # Convert to .webp
    cwebp -q 80 "$file" -o "${base_name}.webp"
done

echo "Conversion to WebP completed."