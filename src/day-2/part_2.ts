import R from 'ramda';
import { join } from 'path';

import { read, truthy } from '../utils/functions';

type Item = {
  letter: string;
  password: string;
  policy: {
    first: number;
    last: number;
  };
};

const solution = (path: string) => {
  const parse = (str: string): Item => {
    const [policy, symbol, password] = R.split(' ')(str);

    const letter = R.replace(':')('')(symbol);
    const [first, last] = R.pipe(
      R.split('-'),
      R.map(parseInt),
      R.map(R.dec),
    )(policy);

    return {
      letter,
      password,
      policy: {
        first,
        last,
      },
    };
  };

  const data = R.pipe(read, R.filter(truthy), R.map(parse))(path);

  const func = ({ letter, password, policy }: Item) => {
    const eq = R.equals(letter);
    return R.xor(
      eq(password[policy.first]),
      eq(password[policy.last]),
    );
  };

  // 352
  return R.length(R.filter(func, data));
};

const path = join(__dirname, './input.txt');

console.log(solution(path));
