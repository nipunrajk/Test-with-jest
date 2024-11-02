import movies from "./movies";

describe("favourite movies", () => {
  let myMovies = [];
  beforeEach(() => {
    myMovies = [
      {
        title: "chapter 3",
        rate: 9,
      },
    ];
  });
  test("can add a movie", () => {
    movies.add(myMovies, "john wickr");
    expect(myMovies).toMatchSnapshot();
  });

  test("rate a movie", () => {
    movies.rate(myMovies[0], 5);
    expect(myMovies).toMatchSnapshot();
  });
});
