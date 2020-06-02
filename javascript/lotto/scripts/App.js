import LottoNumberView from './LottoNumberView.js'
import ClickButton from './ClickButton.js'
import { MAX_COUNT } from './constant.js'
import { getLottoNumbers } from './getLottoNumbers.js'

function App() {
  const onClickSetButton = () => {
    this.numbers = getLottoNumbers()
    this.setState(this.numbers)
  }

  const onClickClearButton = () => {
    this.numbers = new Array(MAX_COUNT).fill('-')
    this.setState(this.numbers)
  }

  this.setState = function (nextData) {
    this.LottoNumberView.setState(nextData)
  }

  this.init = function () {
    this.numbers = new Array(MAX_COUNT).fill('-')

    this.$LottoNumberView = document.querySelector('.ball')
    this.$setButton = document.querySelector('.button.set')
    this.$clearButton = document.querySelector('.button.clear')

    try {
      this.LottoNumberView = new LottoNumberView({
        $target: this.$LottoNumberView,
        numbers: this.numbers,
      })

      this.setButton = new ClickButton({
        $target: this.$setButton,
        onClick: onClickSetButton,
      })

      this.clearButton = new ClickButton({
        $target: this.$clearButton,
        onClick: onClickClearButton,
      })
    } catch (err) {
      console.error(err)
    }
  }

  this.init()
}

export default App
