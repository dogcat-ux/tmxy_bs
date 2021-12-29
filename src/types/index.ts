export enum Code {
  SuccessCode = 200,
  NullCode = 10003,
  NoMatchCode = 10007,
  TokenExpired = 30001,
}
export const server = 'http://139.9.196.99:3000/';
export const avatarUrl =
  server + 'static/imgs/avatar/' + localStorage.getItem('stu_number') + '.jpg';
