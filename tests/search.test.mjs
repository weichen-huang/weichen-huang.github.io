import assert from 'node:assert/strict'
import test from 'node:test'
import { searchPosts } from '../src/utils/search.ts'

const post = (slug, fields = {}) => ({
  slug,
  title: 'An article',
  description: '',
  content: '',
  date: '2026-01-01',
  ...fields
})

test('title relevance wins over descriptions and newer body matches', () => {
  const posts = [
    post('body', { content: 'Astro', date: '2026-09-01' }),
    post('description', { description: 'Astro' }),
    post('title', { title: 'Astro guide' })
  ]
  assert.deepEqual(
    searchPosts(posts, ' ASTRO ').map((p) => p.slug),
    ['title', 'description', 'body']
  )
  assert.equal(posts[0].slug, 'body') // ranking does not reorder the original index
})

test('search finds text beyond 4000 characters and handles Chinese, empty and missing queries', () => {
  const posts = [post('long', { content: '正文内容'.repeat(1200) + '全文尾部标记' })]
  assert.equal(searchPosts(posts, '全文尾部标记')[0].slug, 'long')
  assert.deepEqual(searchPosts(posts, '   '), [])
  assert.deepEqual(searchPosts(posts, 'not present'), [])
})

test('equally relevant matches are ordered newest first', () => {
  const posts = [
    post('old', { title: 'Guide' }),
    post('new', { title: 'Guide', date: '2026-02-01' })
  ]
  assert.deepEqual(
    searchPosts(posts, 'guide').map((p) => p.slug),
    ['new', 'old']
  )
})
