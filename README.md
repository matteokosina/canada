# Vancouver Blog 🇨🇦

Welcome to my blog about Vancouver! This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

To install the dependencies, run:

```
$ npm install
```

### Local Development

To start a local development server and open a browser window, use:

```
$ npm start
```

Most changes will be reflected live without needing to restart the server.

## Write a Blog Post ✍🏼

To write a blog post you can utilize the create-post script that will set you up with a base skeleton for a blog post. To do so, just run:

```bash
npm run create-post
```

## Examples and Code-Snippets

### Image Carousel

> Show multiple images with captions at once in a clean and uncluttered way while staying theme-compliant (dark/light mode aware)!

<img width="745" alt="Screenshot 2025-04-19 at 13 45 26" src="https://github.com/user-attachments/assets/cf73dde6-254e-47b1-8eef-0cc363903be0" />

To use, it paste the following into your markdown file:

```javascript
import ImageGallery from "../src/components/ui/image-gallery";

<ImageGallery
  images={[
    {
      src: "https://placehold.co/600x400",
      caption: "Am Strand den Abend ausklingen lassen",
    },
    { src: "https://placehold.co/600x400", caption: "Vancouvers Skyline" },
    { src: "https://placehold.co/600x400", caption: "Stadt trifft Natur" },
  ]}
/>;
```
