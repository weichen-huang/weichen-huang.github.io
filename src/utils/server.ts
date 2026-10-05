import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

import { readingTime, stripMarkdown, withBase } from './index'

export type Post = CollectionEntry<'blog'>

/** Public URL of a post. Folder-based posts (`mailserver/index.md`) keep the
 *  folder name in the URL (`/blog/mailserver`). */
export function postUrl(postId: string): string {
  return withBase(`/writing/${postId.replace(/\/index$/, '')}`)
}

/** Raw markdown of every post, keyed by its path (used for reading-time & search index). */
const rawPosts = import.meta.glob<string>('/src/content/blog/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true
})

/** Raw markdown source of a post (empty string if missing). */
export function getPostRawMarkdown(postId: string): string {
  return (
    rawPosts[`/src/content/blog/${postId}.md`] ?? rawPosts[`/src/content/blog/${postId}.mdx`] ?? ''
  )
}

const rawProjects = import.meta.glob<string>('/src/content/projects/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})
export function getProjectRawMarkdown(id: string): string {
  return rawProjects[`/src/content/projects/${id}.md`] ?? ''
}

/** Estimate reading time from the post's raw markdown (CJK-aware).
 *  Note: Astro ≥5.18 no longer provides `remarkPluginFrontmatter.minutesRead`,
 *  so we compute it ourselves. */
export function getPostReadingTime(post: Post): number {
  return readingTime(stripMarkdown(getPostRawMarkdown(post.id)))
}

/** All published posts (drafts excluded). */
export async function getBlogCollection(): Promise<Post[]> {
  return getCollection('blog', ({ data }) => !data.draft && !data.demo && data.kind !== 'activity')
}

/** Newest first. */
export function sortMDByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
}

/** Group posts by year (descending). */
export function groupByYear(posts: Post[]): Map<number, Post[]> {
  const groups = new Map<number, Post[]>()
  for (const post of sortMDByDate(posts)) {
    const year = post.data.publishDate.getUTCFullYear()
    groups.set(year, [...(groups.get(year) ?? []), post])
  }
  return groups
}
