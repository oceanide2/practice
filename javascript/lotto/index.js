const lotto = {
  maxCount: 6,
  maxValue: 45
};

function getMaxInt(value) {
  return Math.floor(Math.random() * value);
}

function getNumber(count, value) {
  const selectedNumber = [];

  // make array with incremental value from 1 to value + 1
  const numberPool = [...Array(value + 1).keys()].map(i => i + 1);

  for (let i = 0; i < count; i++) {
    const index = getMaxInt(numberPool.length);
    selectedNumber.push(numberPool[index]);
    numberPool.splice(index, 1);
  }

  return selectedNumber;
}

function printNumber(numbers) {
  const ball = document.querySelector('.ball');

  // remove all child nodes
  while (ball.hasChildNodes()) {
    ball.removeChild(ball.firstChild);
  }

  numbers.forEach(number => {
    const node = document.createElement('span');
    node.innerHTML = number;
    ball.appendChild(node);
  });
}

function setButtonHandler() {
  const lotto_number = getNumber(lotto.maxCount, lotto.maxValue);
  printNumber(lotto_number);
}

function clearButtonHandler() {
  displayInitNumber(lotto.maxCount);
}

function displayInitNumber(count) {
  const initNumber = [...Array(count).keys()].map(i => '-');
  // const initNumber = Array.from({ length: count }, i => '-');
  printNumber(initNumber);
}

function init() {
  displayInitNumber(lotto.maxCount);

  const setButton = document.querySelector('.button.set');
  const clearButton = document.querySelector('.button.clear');

  setButton.addEventListener('click', setButtonHandler);
  clearButton.addEventListener('click', clearButtonHandler);
}

init();
