# Running a personal blog

This guide is for the real blog repository. Keep your posts, personal images, domain, deployment settings and `src/site-config.ts` there; keep reusable components, styles and theme tooling in the theme repository.

## Local workflow

```powershell
cd D:\Code\Blog
pnpm install
pnpm dev
```

Use `pnpm check` for content and type diagnostics, `pnpm test` after theme changes, `pnpm build` to produce `dist/`, and `pnpm preview` to inspect that production output locally. `pnpm format` writes formatting changes.

Set the public canonical domain in `astro.config.ts` using a real `https://` URL. Sitemap entries, canonical URLs, RSS and social URLs use that setting.

## Configure the site

Edit `src/site-config.ts` for the site identity, navigation, home-page copy, footer, social links, blog page size, search, Waline comments and visit counters. Paths for `site.avatar`, `site.favicon` and `site.ogImage` must point to real files under `public/`.

`home.recentPosts` accepts `0` to hide the home-page list. Any positive number is capped at five posts. Footer quotes are enabled by default; use `footer.showQuote: false` to hide them.

## Write a post

Create a `.md` or `.mdx` file in `src/content/blog/`. The filename becomes the last URL segment. A folder post at `src/content/blog/notes/index.md` publishes at `/blog/notes`.

```markdown
---
title: 'Post title'
description: 'A concise summary for lists, search and metadata.'
publishDate: 2026-09-07
updatedDate: 2026-09-08 # optional
tags: [astro, writing]
language: 'English' # optional
draft: false # optional; hidden from listings, RSS and search when true
comment: true # optional; per-post comment switch
---

Write in Markdown.
```

Titles allow up to 80 characters and descriptions up to 200. Posts are ordered by `publishDate`. Use `draft: true` for local preview only; a static build still creates its URL, so never put sensitive material in a draft.

Use a local, article-relative asset for an optimized cover image:

```yaml
heroImage:
  src: ../../assets/cover.png
  alt: 'A descriptive cover image'
```

For a body image, write a standalone Markdown image. Its alt text becomes the visible caption. Images lazy-load, can be opened with a keyboard-accessible native dialog, and retain their caption if an external image is unavailable.

```markdown
![A meaningful description used as the caption](/images/guide.png)
```

Reusable body images belong under `public/` and are referenced with a root-relative path. The theme sync deliberately does not copy personal assets.

## Markdown additions

KaTeX supports `$inline$` and `$$display$$` math. Use a `mermaid` fenced block for diagrams. Code fences provide a language label, copy button and automatic folding after 15 lines. Add `title="file.ts"` to name a block; use `[!code highlight]`, `[!code ++]`, and `[!code --]` in a comment to highlight, add, or remove a line.

## Publish and sync the theme

Before publishing, inspect the page locally and run `pnpm check` and `pnpm build`. Confirm images, captions, links, mobile layout and the final `dist/` with `pnpm preview`.

To bring approved theme changes into the blog, preview first and then apply:

```powershell
cd D:\Code\astro-theme-ink
pnpm theme:sync --target ../Blog
pnpm theme:sync --target ../Blog --apply
```

Read [theme-sync.md](./theme-sync.md) for conflict handling. Include `.theme-sync.json` in the blog commit and do not edit it by hand.

When you are already in the blog directory, call the synced script with an explicit source instead:

```powershell
pnpm theme:sync --source ../astro-theme-ink --target .
pnpm theme:sync --source ../astro-theme-ink --target . --apply
```

Do not skip the preview and run `--apply` first. Inspect every listed `UPDATE`, `ADD` or `DELETE` before writing it.

You can also launch the same workflow in a local visual panel from the theme directory:

```powershell
pnpm theme:sync:ui
```

It opens `http://127.0.0.1:4175`, does not commit, push or deploy, and stops when its terminal closes or receives Ctrl+C.
