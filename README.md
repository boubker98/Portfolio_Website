# Portfolio & Second Brain

A personal portfolio website and digital garden ("Second Brain") built with Next.js and Tailwind CSS. This project serves as a showcase of my work and a repository for my thoughts and notes, designed to integrate with Obsidian-style markdown content.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Content:** MDX / Markdown (with [gray-matter](https://github.com/jonschlinkert/gray-matter) & [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote))
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** [date-fns](https://date-fns.org/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## 📂 Project Structure

- `src/app/portfolio`: Portfolio projects showcase.
- `src/app/brain`: Second Brain / Digital Garden implementation.
- `content/notes`: Directory for markdown/MDX content (Obsidian vault integration).

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Content Management

The "Second Brain" section is powered by markdown files. Place your markdown notes in `content/notes`. These files can be frontmatter-enriched for better metadata handling.

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
