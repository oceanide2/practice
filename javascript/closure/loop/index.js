function closure1() {
  var list = document.querySelectorAll('li');

  // No closure is worked well
  for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function() {
      console.log(i + 'th list');
    });
  }
}

function closure2() {
  var list = document.querySelectorAll('li');

  // use anonymous function
  for (var i = 0; i < list.length; i++) {
    (function(j) {
      list[j].addEventListener('click', function() {
        console.log(j + 'th list');
      });
    })(i);
  }
}

function closure3() {
  var list = document.querySelectorAll('li');

  // use let keyword
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function() {
      console.log(i + 'th list');
    });
  }
}

function init() {
  // closure1();
  // closure2();
  closure3();
}
init();
