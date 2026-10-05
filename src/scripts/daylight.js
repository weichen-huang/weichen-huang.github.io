// Inline execution starts the chosen photo request as soon as the hero is parsed.
;(() => {
  const data = document.getElementById('daylight-scenes')
  const hero = document.getElementById('daylight-hero')
  if (!data || !hero) return
  const scenes = JSON.parse(data.textContent)
  const layers = [...hero.querySelectorAll('.hero-photo')]
  let currentPeriod = ''
  let activeLayer = 0
  let request = 0

  const periodAt = (hour) => {
    if (hour >= 5 && hour < 9) return 'morning'
    if (hour >= 9 && hour < 15) return 'midday'
    if (hour >= 15 && hour < 19) return 'evening'
    if (hour >= 19 && hour < 22) return 'night'
    return 'midnight'
  }
  const update = async () => {
    const period = periodAt(new Date().getHours())
    if (period === currentPeriod) return
    const scene = scenes.find((item) => item.id === period)
    const initial = !currentPeriod
    currentPeriod = period
    const version = ++request
    const next = layers[initial ? activeLayer : 1 - activeLayer]
    if (initial) {
      hero.style.setProperty('--hero-copy-x', `${scene.copyPosition.x}%`)
      hero.style.setProperty('--hero-copy-y', `${scene.copyPosition.y}%`)
    }
    next.alt = scene.alt
    next.sizes = '100vw'
    next.srcset = scene.srcset
    next.src = scene.src
    try {
      await next.decode()
    } catch {
      if (version === request) currentPeriod = ''
      return
    }
    if (version !== request) return
    layers.forEach((layer) => layer.classList.toggle('is-visible', layer === next))
    activeLayer = layers.indexOf(next)
    hero.style.setProperty('--hero-copy-x', `${scene.copyPosition.x}%`)
    hero.style.setProperty('--hero-copy-y', `${scene.copyPosition.y}%`)
    hero.dataset.period = period
  }
  update()
  // Reevaluate local time at boundaries, after sleep, and when returning to the tab.
  window.setInterval(update, 15000)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) update()
  })
  window.addEventListener('pageshow', update)
})()
