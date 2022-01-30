const user1 = {
  id: 110,
  name: 'Kayson Li',
  password: 'Password!'
}
const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
console.log(
  removeProperty("password")(user1)
);
