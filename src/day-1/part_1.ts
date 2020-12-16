import { join } from 'path';
import R from 'ramda';

import { read } from '../utils/functions';

type Tuple = [number, number];

const solution = (path: string) => {
  const EXPECTED_AMOUNT = 2020;

  const data = R.pipe(read, R.map(parseInt))(path);

  const func = R.curry((a: number, b: number) =>
    R.and(
      R.not(R.equals(a, b)),
      R.equals(R.sum([a, b]), EXPECTED_AMOUNT),
    ),
  );

  const tuple = R.reduceWhile(
    (acc: Tuple) => R.not(R.sum(acc)),
    (acc: Tuple, a: number) => {
      const b = R.find(func(a), data);
      return b ? [a, b] : acc;
    },
    [0, 0],
    data,
  );

  return R.product(tuple);
};

const path = join(__dirname, './input.txt');

console.log(solution(path));
