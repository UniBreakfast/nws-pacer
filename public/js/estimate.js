const radios = document.querySelectorAll('[name="scale"]')

radios.forEach(radio => radio.onchange = handleScaleChange)

const issue = new Issues
issue.add('confidence', 'if it is really that low you should probably seek professional help, some web app may be not good enough')

function handleScaleChange() {
  if (this.checked) {
    radios.forEach(radio => {
      if (+radio.value > +this.value)
        radio.closest('label').classList.remove('focused')
      else radio.closest('label').classList.add('focused')
    })
    if (this.value == 1) {
      nextBtn.disabled = true
      this.closest('label').classList.add('critical')
      issue.show()
    } else {
      nextBtn.disabled = false
      document.querySelector('.critical')?.classList.remove('critical')
      issue.hide()
    }
  }
}
