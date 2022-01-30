export enum Code {
  SuccessCode = 200,
  NullCode = 10003,
  NoMatchCode = 10007,
  TokenExpired = 30001,
}

export const SERVER = 'http://139.9.196.99:4000/';
export const firstPage = 1;
export const firstPageSize = 10;
export const TYPE_MAP = {
  '活动加分': 1,
  '额外加分': 2,
  '减分': 3,
  '额外减分': 3,
};
export const TYPE_MAP2 = {
  1: '活动加分',
  2: '额外加分',
  3: '额外减分',
};
export const TYPE=["活动加分","额外加分","额外减分"]
