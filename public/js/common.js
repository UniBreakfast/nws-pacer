const {stringify} = JSON,  {assign, values, fromEntries} = Object
let body, mousedownTime



const sounds = {
  click: new Audio('mp3/button.mp3'),
  touch: new Audio('mp3/punch.mp3'),
}
sounds.touch.volume = .1

const sides = {left: 'right', right: 'left', up: 'down', down: 'up'}


const fixTitle = () => document.title = 'Pacer '+document.title

EventTarget.prototype.on = addEventListener


on('load', () => {
  ({body} = document)
  const {darkTheme, sideToComeFrom: side} = localStorage
  if (darkTheme) body.classList.add('dark-theme')

  delete localStorage.sideToComeFrom
  body.classList.add(side)
  setTimeout(() => {
    body.classList.remove(side)
    if (side) body.ontransitionend = () => {
      body.querySelector('[autofocus]')?.focus()
      body.ontransitionend = null
    }
    else body.querySelector('[autofocus]')?.focus()
  })
  body.hidden = false
})

on('keydown', ({code, ctrlKey, altKey, shiftKey}) => {
  if (ctrlKey && altKey && code=='KeyD') {
    body.classList.toggle('dark-theme')
    if (body.classList.contains('dark-theme')) localStorage.darkTheme = true
    else delete localStorage.darkTheme
  }
})

on('mousedown', ({timeStamp}) => mousedownTime = timeStamp)

on('mouseup', ({target: {tagName}, timeStamp}) => {
  if (tagName!='BUTTON' && timeStamp-mousedownTime<200) play('touch')
})

on('click', ({target: {tagName, dataset: {url, side}}}) => {
  if (tagName=='BUTTON') play('click')

  if (tagName=='BUTTON' && url) setTimeout(goTo, 150, url, side)
})



function play(sound) {
  sound = sounds[sound]
  sound.currentTime = 0
  sound.play()
  setTimeout(() => sound.pause(), sound.duration*999)
}

function goTo(url, side) {
  ({body} = document)
  localStorage.sideToComeFrom = side
  side = sides[side]
  body.classList.add(side)
  if (!side) location.href = url
  body.on('transitionend', () => location.href = url)
}

async function checkIn() {
  const response = await fetch('/api/checkin')
  if (response.ok && (await response.json()).session) return true
}

function formatDateTime(jsonDate) {
  const local = new Date(jsonDate).toLocaleString()
  const formatParts = local.match(/^(\d\d)\.(\d\d)\.(\d{4}), (\d\d:\d\d):\d\d$/)
  if (!formatParts) return local
  const [_, date, month, year, time] = formatParts
  return `${year}-${month}-${date}, ${time}`
}


class Issues extends Array {
  add(name, issue) { this.push({name, issue}) }
  require(name) { this.push({name, issue: 'required'}) }

  show() {
    this.hide()
    const issues = Issues.last = document.createElement('ul')
    issues.classList.add('issues')
    issues.append(...this.map(issue => assign(document.createElement('li'),
      {innerText: values(issue).join(': ')})))
    body.append(issues)
    issues.onanimationend = () => issues.remove()
  }

  hide() {
    if (Issues.last) Issues.last.style.animationName = "issues-off"
  }
}
