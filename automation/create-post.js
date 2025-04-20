const fs = require("fs");
const path = require("path");
const readline = require("readline");
const chalk = require("chalk");
const { exit } = require("process");

// Paths to the authors.yml and tags.yml files
const authorsFilePath = path.join(__dirname, "../blog/authors.yml");
const tagsFilePath = path.join(__dirname, "../blog/tags.yml");

function main() {
  readYAMLFile(authorsFilePath, (err, authors) => {
    if (err) return console.error("Error reading authors.yml:", err);

    const authorNames = Object.keys(authors);
    if (!authorNames.length)
      return console.log("No authors found in authors.yml.");

    selectFromList(
      "Who is writing this post?",
      authorNames,
      (selectedAuthor) => {
        askQuestion("What is the title of the blog post? ", (title) => {
          readYAMLFile(tagsFilePath, (err, tags) => {
            if (err) return console.error("Error reading tags.yml:", err);

            const tagNames = Object.keys(tags);
            if (!tagNames.length)
              return console.log("No tags found in tags.yml.");
            selectFromList(
              "Select a matching tag (you can add more later):",
              tagNames,
              (selectedTag) => {
                console.log(`Author: ${selectedAuthor}`);
                console.log(`Title: ${title}`);
                console.log(`Tags: ${selectedTag}`);
                createMarkdownFile(selectedAuthor, title, [selectedTag]);
              }
            );
          });
        });
      }
    );
  });
}

// Utility to read and parse YAML files
function readYAMLFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return callback(err);
    callback(null, parseYAML(data));
  });
}

// Simple YAML parser
function parseYAML(yamlString) {
  return yamlString.split("\n").reduce((result, line) => {
    const trimmed = line.trim();
    if (trimmed && !line.startsWith(" ")) {
      const key = trimmed.replace(":", "").trim();
      result[key] = true;
    }
    return result;
  }, {});
}

// Display a list and allow the user to select an option
function selectFromList(prompt, items, callback) {
  let selectedIndex = 0;

  function displayList() {
    console.clear();
    console.log(prompt);
    items.forEach((item, index) => {
      const prefix = index === selectedIndex ? chalk.blue(">") : " ";
      const itemColor = index === selectedIndex ? chalk.blue(item) : item;
      console.log(`${prefix} ${itemColor}`);
    });
  }

  displayList();

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", (str, key) => {
    if (key.name === "up") {
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      displayList();
    } else if (key.name === "down") {
      selectedIndex = (selectedIndex + 1) % items.length;
      displayList();
    } else if (key.name === "return") {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      callback(items[selectedIndex]);
    }
  });

  // Keep the process running until a selection is made
  process.stdin.resume();
}

// Prompt the user with a question
function askQuestion(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(question, (answer) => {
    rl.close();
    callback(answer);
  });
}

// Create a markdown file for the blog post
function createMarkdownFile(author, title, tags) {
  const date = new Date().toISOString().split("T")[0];
  const firstWord = title.split(" ")[0].toLowerCase();
  const fileName = `${date}-${firstWord}.md`;
  const filePath = path.join(__dirname, "../blog", fileName);

  const content = `---
slug: ${title}
title: ${title}
authors: ${author}
tags: [${tags.join(", ")}]
---

# ${title}

Write your content here...
`;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error creating markdown file:", err);
    } else {
      console.log(`Markdown file created: ${filePath}`);
      exit(0);
    }
  });
}

// Run the script
main();
