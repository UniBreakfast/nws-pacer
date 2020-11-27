const radios = document.querySelectorAll('[name="scale"]')

radios.forEach(radio => radio.onchange = handleScaleChange)

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
    } else {
      nextBtn.disabled = false
      document.querySelector('.critical')?.classList.remove('critical')
    }
  }
}
