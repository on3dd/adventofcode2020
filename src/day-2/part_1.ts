import R from 'ramda';
import { join } from 'path';

import { read, truthy } from '../utils/functions';

type Item = {
  letter: string;
  password: string;
  policy: {
    min: number;
    max: number;
  };
};

const solution = (path: string) => {
  const parse = (str: string): Item => {
    const [policy, symbol, password] = R.split(' ')(str);

    const letter = R.replace(':')('')(symbol);
    const [min, max] = R.pipe(R.split('-'), R.map(parseInt))(policy);

    return {
      letter,
      password,
      policy: {
        min,
        max,
      },
    };
  };

  const data = R.pipe(read, R.filter(truthy), R.map(parse))(path);

  const func = ({ letter, password, policy }: Item) => {
    const { length } = R.match(new RegExp(letter, 'g'))(password);

    return R.both(
      R.gte(R.__, policy.min),
      R.lte(R.__, policy.max),
    )(length);
  };

  return R.length(R.filter(func, data));
};

const path = join(__dirname, './input.txt');

console.log(solution(path));
