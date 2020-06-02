import { MAX_COUNT, MIN_VALUE, MAX_VALUE } from './constant.js'
import { getRandomInt } from './util.js'

export const getLottoNumbers = () => {
  const numbers = []

  while (numbers.length !== MAX_COUNT) {
    const number = getRandomInt(MIN_VALUE, MAX_VALUE)
    if (!numbers.includes(number)) {
      numbers.push(number)
    }
  }
  return numbers
}
