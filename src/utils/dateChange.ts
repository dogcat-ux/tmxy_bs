import moment from 'moment';

// export const dateChange = (time = +new Date()): string => {
export const dateChange = (time: any): string => {
// export const dateChange = (time: any): string => {
//   return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
  return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
};

export const dateChangeDay = (time = +new Date()): string => {
  return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD');
};

export const toTimeStamp = (time: any) => {
  return parseInt((time.valueOf() / 1000).toString());
};

export const timeStampToMoement = (time: any) => {
  return moment.utc(time * 1000).add(8, 'hours');
};
