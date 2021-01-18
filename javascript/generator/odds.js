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


log(...odds(5));
log([...odds(5), ...odds(3)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(5);
log(a);
log(b);
log(rest);

