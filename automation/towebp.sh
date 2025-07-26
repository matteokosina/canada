#!/bin/bash

# Directory containing the images
IMAGE_DIR="../static/media"

# Convert all .jpg and .jpeg files to .webp
# Find the highest numbered .webp file
max_num=0
for f in "$IMAGE_DIR"/*.webp; do
    fname=$(basename "$f" .webp)
    if [[ "$fname" =~ ^[0-9]+$ ]]; then
        if (( fname > max_num )); then
            max_num=$fname
        fi
    fi
done

# Convert all .jpg and .jpeg files to .webp with incremented numbers
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    ((max_num++))
    cwebp -q 80 "$file" -o "$IMAGE_DIR/$max_num.webp"
    rm "$file"
done
done

echo "Conversion to WebP completed."