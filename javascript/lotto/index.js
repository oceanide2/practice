const lotto = (function () {
  const maxCount = 6;
  const maxValue = 45;

  const getMaxInt = function (value) {
    return Math.floor(Math.random() * value);
  };

  const getNumber = function (count, value) {
    const selectedNumber = [];

    // make array with incremental value from 1 to value + 1
    const numberPool = [...Array(value + 1).keys()].map((i) => i + 1);

    for (let i = 0; i < count; i++) {
      const index = getMaxInt(numberPool.length);
      selectedNumber.push(numberPool[index]);
      numberPool.splice(index, 1);
    }

    return selectedNumber;
  };

  const printNumber = function (numbers) {
    const ball = document.querySelector('.ball');

    // remove all child nodes
    while (ball.hasChildNodes()) {
      ball.removeChild(ball.firstChild);
    }

    numbers.forEach((number) => {
      const node = document.createElement('span');
      node.innerHTML = number;
      ball.appendChild(node);
    });
  };

  const setButtonHandler = function () {
    const lotto_number = getNumber(maxCount, maxValue);
    printNumber(lotto_number);
  };

  const clearButtonHandler = function () {
    displayInitNumber(maxCount);
  };

  const displayInitNumber = function (count) {
    const initNumber = [...Array(count).keys()].map((i) => '-');
    // const initNumber = Array.from({ length: count }, i => '-');
    printNumber(initNumber);
  };

  const init = function () {
    displayInitNumber(maxCount);

    const setButton = document.querySelector('.button.set');
    const clearButton = document.querySelector('.button.clear');

    setButton.addEventListener('click', setButtonHandler);
    clearButton.addEventListener('click', clearButtonHandler);
  };

  return {
    init: init,
  };
})();

lotto.init();
