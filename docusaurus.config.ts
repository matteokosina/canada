import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import tailwindPlugin from "./plugins/tailwind-config.cjs";
import aliasPlugin from "./plugins/alias-config.cjs";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Rotation abroad',
  tagline: 'Follow me on my adventure in Vancouver',
  favicon: 'img/leaf.png',

  // Set the production url of your site here
  url: 'https://matteokosina.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/canada/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'matteokosina', // Usually your GitHub org/user name.
  projectName: 'canada', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    tailwindPlugin,
    aliasPlugin,
  ],

  presets: [
    [
      'classic',
      {
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/matteokosina/canada/blob/main',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/leaf.png',
    navbar: {
      title: 'Rotation abroad',
      logo: {
        alt: 'Logo',
        src: 'img/leaf.png',
      },
      items: [
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/matteokosina/canada',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Socials',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/matteokosina',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/matteokosina/canada',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Matteo Kosina. Built with ❤️, Docusaurus and Shadcn.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
