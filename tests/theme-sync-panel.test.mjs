import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { fileURLToPath } from 'node:url'

const panel = fileURLToPath(new URL('../scripts/theme-sync-panel.mjs', import.meta.url))
const sync = fileURLToPath(new URL('../scripts/theme-sync.mjs', import.meta.url))

function removeFixture(root) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const dest = path.join(root, entry.name)
    if (entry.isDirectory() && !fs.lstatSync(dest).isSymbolicLink()) removeFixture(dest)
    else {
      fs.chmodSync(dest, 0o666)
      fs.unlinkSync(dest)
    }
  }
  fs.rmdirSync(root)
}

function put(root, name, text) {
  const dest = path.join(root, name)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, text)
}

function waitForPanel(child) {
  return new Promise((resolve, reject) => {
    let output = ''
    const timeout = setTimeout(() => reject(new Error(`Panel did not start:\n${output}`)), 10000)
    child.stdout.on('data', (chunk) => {
      output += chunk
      const matched = output.match(/Theme sync panel: (http:\/\/127\.0\.0\.1:\d+)/)
      if (!matched) return
      clearTimeout(timeout)
      resolve(matched[1])
    })
    child.stderr.on('data', (chunk) => {
      output += chunk
    })
    child.once('error', (error) => {
      clearTimeout(timeout)
      reject(error)
    })
    child.once('exit', (code) => {
      clearTimeout(timeout)
      reject(new Error(`Panel exited early (${code}):\n${output}`))
    })
  })
}

test('local panel previews and applies a first sync with its page token', async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ink-panel-test-'))
  const source = path.join(root, 'theme')
  const target = path.join(root, 'blog')
  for (const dir of [source, target]) {
    fs.mkdirSync(dir)
    assert.equal(spawnSync('git', ['init', '-q', dir]).status, 0)
    put(dir, 'package.json', '{"name":"astro-theme-ink"}\n')
    put(dir, 'src/components/PostCard.astro', 'original\n')
  }
  fs.mkdirSync(path.join(source, 'scripts'), { recursive: true })
  fs.copyFileSync(sync, path.join(source, 'scripts/theme-sync.mjs'))
  for (const dir of [source, target]) {
    assert.equal(spawnSync('git', ['add', '.'], { cwd: dir }).status, 0)
    assert.equal(
      spawnSync(
        'git',
        ['-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-qm', 'initial'],
        { cwd: dir }
      ).status,
      0
    )
  }

  const child = spawn(
    process.execPath,
    [panel, '--source', source, '--target', target, '--port', '0', '--no-open'],
    { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true }
  )
  const exited = once(child, 'exit')
  t.after(async () => {
    if (child.exitCode === null) child.kill()
    await exited
    removeFixture(root)
  })

  const url = await waitForPanel(child)
  const page = await fetch(url)
    .then((response) => response.text())
    .catch((error) => {
      throw new Error(`Panel page request failed: ${error.message}; ${error.cause?.message ?? ''}`)
    })
  const token = page.match(/const token = "([a-f0-9]+)"/i)?.[1]
  assert.ok(token, 'the panel page includes a request token')

  const body = { action: 'preview', source, target, init: true, allowDirty: false }
  const denied = await fetch(`${url}/api/sync`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })
  assert.equal(denied.status, 403)

  const preview = await fetch(`${url}/api/sync`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-ink-sync-token': token },
    body: JSON.stringify(body)
  })
  const previewData = await preview.json()
  assert.equal(preview.status, 200)
  assert.equal(previewData.ok, true)
  assert.match(previewData.log, /Preview only/)
  assert.equal(fs.existsSync(path.join(target, '.theme-sync.json')), false)

  const apply = await fetch(`${url}/api/sync`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-ink-sync-token': token },
    body: JSON.stringify({ ...body, action: 'apply' })
  })
  const applyData = await apply.json()
  assert.equal(apply.status, 200)
  assert.equal(applyData.ok, true)
  assert.match(applyData.log, /Applied/)
  assert.equal(fs.existsSync(path.join(target, '.theme-sync.json')), true)
})
