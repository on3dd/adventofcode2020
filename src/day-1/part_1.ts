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

  const func = R.curry((a: number, b: number) => {
    return R.and(
      R.not(R.equals(a, b)),
      R.equals(R.sum([a, b]), YEAR),
    );
  });

  const [a, b] = R.reduce(
    (acc: [number, number], a: number) => {
      const num = R.find(func(a), data);
      return num ? [num, 2020 - num] : acc;
    },
    [0, 0],
    data,
  );

  // 1009899
  return R.multiply(a, b);
};

const path = join(__dirname, './input.txt');

console.log(solution(path));
