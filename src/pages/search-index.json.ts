import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { projects } from '@/data/projects'
import { config } from '@/site-config'
import { stripMarkdown, withBase } from '@/utils'
import { getPostRawMarkdown, getProjectRawMarkdown } from '@/utils/server'

/**
 * Prerendered JSON index used by the client-side search page.
 * Kept dependency-free: plain markdown is stripped to text at build time.
 */
export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft && !data.demo)

  const index = posts.map((post) => ({
    slug: post.id.replace(/\/index$/, ''),
    title: post.data.title,
    description: post.data.description,
    date: post.data.publishDate.toISOString(),
    content: stripMarkdown(getPostRawMarkdown(post.id)),
    url: withBase(`/writing/${post.id.replace(/\/index$/, '')}`)
  }))

  index.push(
    ...projects.map((project) => ({
      slug: `projects/${project.slug}`,
      title: project.title,
      description: project.description,
      date: '2025-01-01T00:00:00.000Z',
      content: `${project.context} ${project.paragraphs.join(' ')} ${project.highlights.join(' ')} ${project.sourceId ? stripMarkdown(getProjectRawMarkdown(project.sourceId)) : ''}`,
      url: withBase(`/projects/${project.slug}`)
    }))
  )
  index.push({
    slug: 'bio',
    title: 'Bio',
    description: 'About Weichen Huang',
    date: '2025-01-01T00:00:00.000Z',
    content: config.home.hero.about,
    url: withBase('/bio')
  })
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}
