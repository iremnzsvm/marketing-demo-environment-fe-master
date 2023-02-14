import { dev } from './dev';
import { prod } from './prod';
import { test } from './test';

const conf = {
  dev,
  prod,
  test,
};

export default {
  ...conf[process.env.REACT_APP_STAGE],
};
