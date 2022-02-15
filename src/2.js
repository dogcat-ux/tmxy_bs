
// export const dateChange = (time = +new Date()): string => {
const moment=require("moment")
const dateChange = (time) => {
// export const dateChange = (time: any): string => {
//   return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
  return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
};

console.log(dateChange(1646033134))
