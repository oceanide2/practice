function Person(name, first, second) {
  this.name = name;
  this.first = first;
  this.second = second;
}

Person.prototype.sum = function() {
  return this.first + this.second;
};

function PersonPlus(name, first, second, third) {
  Person.call(this, name, first, second);
  this.third = third;
}

PersonPlus.prototype = Object.create(Person.prototype);
PersonPlus.prototype.constructor = PersonPlus;

PersonPlus.prototype.sum = function() {
  return Person.prototype.sum.call(this) + this.third;
};

PersonPlus.prototype.avg = function() {
  return (this.first + this.second + this.third) / 3;
};

const kim = new Person('kim', 10, 20);
console.log(kim);
console.log(kim.sum());

const lee = new PersonPlus('lee', 10, 10, 10);
console.log(lee);
console.log(lee.sum());
console.log(lee.avg());
