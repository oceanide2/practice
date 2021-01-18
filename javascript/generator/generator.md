## 제너레이터란?

제너레이터란 `이터레이터이자 이터러블을 생성하는 함수`이다.


## 제너레이터는 어떻게 선언하나?

제너레이터는 함수 이름 앞에 `function*`을 붙여서 선언한다.
`*`는 function 키워드나 함수 이름 중에서 어느 쪽으로 붙여도 상관없다.

```
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
```

## 제너레이터가 리턴하는 값의 타입은 무엇인가?

우선 제너레이터가 리턴하는 값이 어떤 타입을 갖는지 확인해보자.
`Object.prototype.toString.call`을 사용하여 확인해보면 `Generator`라고 출력된다

```
const a = gen();
Object.prototype.toString.call(a); // [object Generator]
```

`a`를 브라우저 콘솔에서 확인해보면 `gen {<suspended>}`라고 `GeneratorState`가
표시된다. 자세한 내용은 모르겠지만 제너레이터 함수는 실행되고 나면 멈추어 있는
상태처럼 보인다.


## 제너레이터가 리턴하는 값은 무엇인가?

제너레이터가 리턴하는 값은 이터레이터이자 이터러블이다.

우선 제너레이터가 리턴하는 값은 `Symbol.iterator`를 갖고 있는 이터러블이다.

```
const a = gen();
a[Symbol.iterator] // f [Symbol.iterator]() { [native code] }
```

`Symbol.iterator` 실행 값은 이터레이터를 반환한다. 반환된 이터레이터는
`next`메서드를 사용하여 `value`와 `done` 키값을 갖는 객체를 반환한다.

```
const a = gen();
cons iterator = a[Symbol.iterator]();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: undefine, done: true }

```

제너레이터가 반환하는 값은 이터레이터인데, 이것은 Symbol.iterator를 갖고 있으며
Symbol.iterator의 실행 값은 자기 자신을 가리킨다. 이 말은 `제너레이터`가 반환하는
값은 `well-formed 이터레이터`라는 뜻이다.

```
const a = gen();
const iterator = a[Symbol.iterator]();

console.log(iterator[Symbol.iterator]() === iterator) // true

```

## 제너레이터가 리턴하는 값은 순회할 수 있다!

제너레이터가 리턴하는 값은 이터레이터이자 이터러블이므로 `for...of`를 사용하여
순회할 수 있다.

```
for (const a of gen()) console.log(a) // 1 2 3
```

## 제너레이터를 이용해서 홀수를 출력해보자

제너레이터를 사용해서 홀수를 출력해보면 아래와 같다.

```
log = console.log;

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;

    if (a === l) return
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

const iter = odds(10);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of odds(40)) log(a);

```

## 제너레이터는 이터러블/이터레이터 프로토콜을 따른다!

제너레이터는 이터러블/이터레이터 프로토콜을 따르기 때문에, `for...of`, `전개연산자`,
`구조 분해`, `나머지 연산자` 등을 사용할 수 있다.

```
log(...odds(5)); // 1, 3, 5
log([...odds(5), ...odds(3)]); // [ 1, 3, 5, 1, 3 ]

const [head, ...tail] = odds(5);
log(head); // 1
log(tail); // [ 3, 5 ]

const [a, b, ...rest] = odds(5);
log(a);    // 1
log(b);    // 3
log(rest); // [ 5 ]
```
