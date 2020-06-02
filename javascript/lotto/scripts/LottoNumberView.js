import { validateElement } from './validation.js'

function LottoNumberView({ $target, numbers }) {
  if (!(this instanceof LottoNumberView)) {
    throw new Error('LottoNumberView must be called with new')
  }
  validateElement($target)

  this.render = function () {
    const htmlString = this.numbers
      .map((number) => `<span>${number}</span>`)
      .join('')

    this.$target.innerHTML = htmlString
  }

  this.setState = function (nextData) {
    this.numbers = nextData
    this.render()
  }

  this.init = function () {
    this.numbers = numbers
    this.$target = $target
  }

  this.init()
  this.render()
}

export default LottoNumberView
