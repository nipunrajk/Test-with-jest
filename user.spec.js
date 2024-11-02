import User from "./user";

describe("user", () => {
  it("name returns full name", () => {
    const user = new User({ firstName: "Nipun", lastName: "Raj" });
    expect(user.fullName).toBe("Nipun Raj");
  });
});
