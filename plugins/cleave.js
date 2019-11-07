import Cleave from 'cleave.js'

const cleave = {
  name: 'cleave',
  bind(el, binding) {
    const input = el.querySelector('input')
    input._vCleave = new Cleave(input, binding.value)
  },
  unbind(el) {
    const input = el.querySelector('input')
    input._vCleave.destroy()
  }
}

export default {
  directives: { cleave },
  data() {
    return {
      masks: {
        amount: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand'
        },
        numeral: {
          numericOnly: true
        }
      }
    }
  }
}
