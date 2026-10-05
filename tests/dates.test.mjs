import assert from 'node:assert/strict'
import test from 'node:test'
import { formatDate } from '../src/utils/index.ts'

test('publication dates retain their calendar day regardless of the build time zone', () => {
  const previous = process.env.TZ
  try {
    for (const zone of ['America/New_York', 'America/Los_Angeles', 'Asia/Tokyo']) {
      process.env.TZ = zone
      assert.equal(formatDate(new Date('2022-06-14')), 'June 14, 2022')
      assert.equal(formatDate(new Date('2022-01-01')), 'January 1, 2022')
      assert.equal(formatDate(new Date('2022-06-14'), 'en-US', { month: '2-digit', day: '2-digit' }), '06/14')
    }
  } finally {
    if (previous === undefined) delete process.env.TZ
    else process.env.TZ = previous
  }
})
