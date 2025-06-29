const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const yaml = require("js-yaml");

// Path to the blog directory and log file
const blogDir = path.join(__dirname, "../blog");
const logFilePath = path.join(
  __dirname,
  "../src/components/RecentPost/recent-post.ts"
);

// Function to get the most recent blog post
function getMostRecentPost() {
  try {
    // Read files from blog directory
    const files = fs.readdirSync(blogDir);

    // Filter for markdown files with date pattern (YYYY-MM-DD-...)
    const mdFiles = files.filter((file) => {
      return file.match(/^\d{4}-\d{2}-\d{2}-.+\.(md|mdx)$/);
    });

    if (mdFiles.length === 0) {
      console.log("No blog posts found in the specified format");
      return null;
    }

    // Sort files by date (newest first)
    mdFiles.sort((a, b) => {
      const dateRegex = /^(\d{4}-\d{2}-\d{2})/;
      const dateAMatch = a.match(dateRegex);
      const dateBMatch = b.match(dateRegex);

      if (!dateAMatch || !dateBMatch) return 0;

      const dateA = new Date(dateAMatch[1].replace(/-/g, "/"));
      const dateB = new Date(dateBMatch[1].replace(/-/g, "/"));
      return dateB - dateA;
    });

    // Get the most recent file
    const mostRecentFile = mdFiles[0];
    const filePath = path.join(blogDir, mostRecentFile);

    // Parse the markdown file to extract front matter and content
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // Get the filename without the date prefix (removes YYYY-MM-DD-)
    const filenameWithoutDate = mostRecentFile.replace(
      /^\d{4}-\d{2}-\d{2}-/,
      ""
    );

    // Remove HTML comments from content
    const cleanContent = content.trim().replace(/<!--[\s\S]*?-->/g, "");

    // Remove markdown headings from content
    let contentWithoutHeadings = cleanContent.replace(/^#+\s+.*$/gm, "");
    contentWithoutHeadings = contentWithoutHeadings.replace(/\n/g, "");

    // Extract author information from authors.yaml
    let authorName = "Guest Author";
    let authorPictureUrl = "";

    try {
      const file = fs.readFileSync("./blog/authors.yml", "utf8");
      const authorsYaml = yaml.load(file);

      // Access data by key
      key = data.authors;
      const authorData = authorsYaml[key];
      authorName = authorData.name || "Guest Author";
      authorPictureUrl = authorData.image_url || "";
    } catch (e) {
      console.error("Error reading or parsing YAML file:", e);
    }

    return {
      title: data.title || "No Title",
      author: authorName,
      authorAvatar: authorPictureUrl,
      authorPictureUrl: authorPictureUrl,
      content: contentWithoutHeadings,
      filename: mostRecentFile,
      link: `https://matteokosina.github.io/canada/blog/${filenameWithoutDate.replace(
        ".md",
        ""
      )}`,
    };
  } catch (error) {
    console.error("Error reading blog files:", error);
    return null;
  }
}

// Function to append or create log file
function writeToLogFile(postData) {
  if (!postData) return;

  // Extract date from filename (format: YYYY-MM-DD)
  const dateMatch = postData.filename.match(/^(\d{4}-\d{2}-\d{2})/);
  const dateStr = dateMatch ? dateMatch[1] : "";

  // Convert to human readable format (e.g., "January 1, 2023")
  const humanDate = dateStr
    ? new Date(dateStr.replace(/-/g, "/")).toLocaleDateString("de", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const logEntry = `
export const recentPost = {
    title: "${postData.title}",
    author: "${postData.author}",
    authorAvatar: "${postData.authorAvatar}",
    link: "${postData.link}",
    filename: "${postData.filename}",
    date: "${humanDate}",
    content: '${postData.content}'
};
`;

  try {
    fs.writeFileSync(logFilePath, logEntry);
    console.log(`🤖Crawled recent blog successfully: ${postData.title}`);
  } catch (error) {
    console.error("❌ Error writing to log file:", error);
  }
}

// Main execution
function main() {
  const recentPost = getMostRecentPost();
  writeToLogFile(recentPost);
}

main();
