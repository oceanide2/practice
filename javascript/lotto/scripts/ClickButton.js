import { validateElement } from './validation.js'

function ClickButton({ $target, onClick }) {
  if (!(this instanceof ClickButton)) {
    throw new Error('ClickButton must be called with new')
  }
  validateElement($target)

  const clickHandler = (e) => {
    onClick()
  }

  this.bindEvents = function () {
    this.$target.addEventListener('click', clickHandler)
  }

  this.init = function () {
    this.$target = $target
    this.onclick = onClick

    this.bindEvents()
  }
  this.init()
}

export default ClickButton
