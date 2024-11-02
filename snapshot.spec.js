const user = {
  name: "Nipun Raj k",
  age: "25",
  job: "Developer",
};

test("user matches", () => {
  expect(user).toMatchSnapshot();
});
