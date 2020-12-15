import { readFileSync } from 'fs';
import { join } from 'path';
import R from 'ramda';

type Tuple = [number, number, number];

const solution = (path: string) => {
  const EXPECTED_AMOUNT = 2020;

  const read = (path: string) =>
    R.pipe(
      readFileSync,
      R.toString,
      R.split('\n'),
      R.map(parseInt),
    )(path);

  const data = read(path);

  const func = R.curry((a: number, b: number, c: number) =>
    R.and(
      R.and(R.not(R.equals(a, b)), R.not(R.equals(b, c))),
      R.equals(R.sum([a, b, c]), EXPECTED_AMOUNT),
    ),
  );

  const truthy = (value: unknown) => R.complement(R.isNil)(value);

  const tuple = R.reduceWhile(
    (acc: Tuple) => R.not(R.sum(acc)),
    (acc: Tuple, a: number) => {
      const funcOfA = func(a);

      const b = R.find((b) => truthy(R.find(funcOfA(b), data)), data);
      const c = R.find(funcOfA(b), data);

      return c ? [a, b, c] : acc;
    },
    [0, 0, 0],
    data,
  );

  return R.product(tuple);
};

const path = join(__dirname, './input.txt');

console.log(solution(path));
