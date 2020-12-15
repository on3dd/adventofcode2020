import { readFileSync } from 'fs';
import { join } from 'path';
import R from 'ramda';

const solution = (path: string) => {
  const YEAR = 2020;

  const read = R.pipe(
    readFileSync,
    R.toString,
    R.split('\n'),
    R.map(parseInt),
  );

  const data = read(path);

  const func = R.curry((a: number, b: number, c: number) => {
    const numbersAreNotEqual = R.and(
      R.not(R.equals(a, b)),
      R.not(R.equals(b, c)),
    );

    const sumAreEqual = R.equals(R.sum([a, b, c]), YEAR);

    return R.and(numbersAreNotEqual, sumAreEqual);
  });

  const truthy = (value: any) => {
    return R.complement(R.isNil)(value);
  };

  const tuple = R.reduce(
    (acc: [number, number, number], a: number) => {
      const funcOfA = func(a);

      const b = R.find((b) => truthy(R.find(funcOfA(b), data)), data);
      const c = R.find(funcOfA(b), data);

      return c ? [a, b, c] : acc;
    },
    [0, 0, 0],
    data,
  );

  // 44211152
  return R.product(tuple);
};

const path = join(__dirname, './input.txt');

console.log(solution(path));
