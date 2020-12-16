import { readFileSync } from 'fs';
import R from 'ramda';

export const read = (path: string) =>
  R.pipe(
    readFileSync,
    R.toString,
    R.split('\n'),
    R.map(parseInt),
  )(path);

export const truthy = (value: unknown) =>
  R.complement(R.isNil)(value);
