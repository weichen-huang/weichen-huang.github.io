import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const source = readFileSync(new URL('../src/scripts/daylight.js', import.meta.url), 'utf8')
const periods = ['morning', 'midday', 'evening', 'night', 'midnight']
const scenes = periods.map((id, i) => ({
  id,
  label: id,
  src: `${id}.webp`,
  srcset: `${id}.webp 1920w`,
  alt: `${id} landscape`,
  copyPosition: { x: 50, y: 50 + i }
}))
const settled = () => new Promise(setImmediate)
function page(initialHour, { failOnce = false } = {}) {
  let hour = initialHour
  let interval
  let labelParsed = false
  const events = {}
  const label = { textContent: '' }
  const styles = {}
  const layers = [0, 1].map(() => ({
    visible: false,
    classList: {
      toggle(_name, visible) {
        this.owner.visible = visible
      }
    },
    decode: async () => {
      if (failOnce) {
        failOnce = false
        throw new Error('Image unavailable')
      }
    }
  }))
  layers.forEach((layer) => {
    layer.classList.owner = layer
  })
  const hero = {
    dataset: {},
    querySelectorAll: () => layers,
    style: {
      setProperty: (name, value) => {
        styles[name] = value
      }
    }
  }
  const document = {
    hidden: false,
    getElementById: (id) =>
      ({
        'daylight-scenes': { textContent: JSON.stringify(scenes) },
        'daylight-hero': hero,
        'daylight-label': labelParsed ? label : null
      })[id],
    addEventListener: (event, callback) => {
      events[event] = callback
    }
  }
  vm.runInNewContext(source, {
    document,
    Date: class {
      getHours() {
        return hour
      }
    },
    window: {
      setInterval: (callback) => {
        interval = callback
      },
      addEventListener: (event, callback) => {
        events[event] = callback
      }
    }
  })
  // The inline script runs before the label exists in the parsed document.
  labelParsed = true
  return {
    hero,
    layers,
    label,
    styles,
    document,
    setHour: (value) => {
      hour = value
    },
    tick: () => interval(),
    trigger: (event) => events[event]()
  }
}

test('uses the visitor’s local hour at every requested boundary, including midnight wraparound', async () => {
  for (const [hour, expected] of [
    [0, 'midnight'],
    [4, 'midnight'],
    [5, 'morning'],
    [8, 'morning'],
    [9, 'midday'],
    [14, 'midday'],
    [15, 'evening'],
    [18, 'evening'],
    [19, 'night'],
    [21, 'night'],
    [22, 'midnight'],
    [23, 'midnight']
  ]) {
    const p = page(hour)
    await settled()
    assert.equal(p.hero.dataset.period, expected, `local hour ${hour}`)
    assert.equal(
      p.layers.filter((layer) => layer.src).length,
      1,
      'only requests the selected photo'
    )
    assert.equal(p.layers.find((layer) => layer.visible)?.alt, `${expected} landscape`)
    assert.equal(
      p.styles['--hero-copy-y'],
      `${scenes.find((scene) => scene.id === expected).copyPosition.y}%`
    )
  }
})

test('crossfades on a boundary and updates after returning from sleep or another tab', async () => {
  const p = page(18)
  await settled()
  const original = p.layers.find((layer) => layer.visible)
  p.setHour(19)
  await p.tick()
  assert.equal(p.hero.dataset.period, 'night')
  assert.equal(original.visible, false)
  assert.equal(p.layers.filter((layer) => layer.visible).length, 1)
  p.setHour(22)
  p.trigger('visibilitychange')
  await settled()
  assert.equal(p.hero.dataset.period, 'midnight')
  p.setHour(5)
  await p.trigger('pageshow')
  assert.equal(p.hero.dataset.period, 'morning')
})

test('retries a failed initial image instead of leaving the homepage permanently blank', async () => {
  const p = page(9, { failOnce: true })
  await settled()
  assert.equal(
    p.layers.some((layer) => layer.visible),
    false
  )
  await p.tick()
  assert.equal(p.hero.dataset.period, 'midday')
  assert.equal(p.layers.filter((layer) => layer.visible).length, 1)
})
