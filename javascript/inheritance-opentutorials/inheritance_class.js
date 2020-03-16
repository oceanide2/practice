class Person {
  constructor(name, first, second) {
    this.name = name;
    this.first = first;
    this.second = second;
  }
  sum() {
    return this.first + this.second;
  }
}

class PersonPlus extends Person {
  constructor(name, first, second, third) {
    super(name, first, second);
    this.third = third;
  }
  sum() {
    return super.sum() + this.third;
  }
  avg() {
    return (this.first + this.second + this.third) / 3;
  }
}

const kim = new Person('kim', 10, 20);
console.log(kim);
console.log(kim.sum());

const lee = new PersonPlus('lee', 10, 10, 10);
console.log(lee);
console.log(lee.sum());
console.log(lee.avg());
