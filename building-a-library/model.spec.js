// Test driven development modal

import Modal from "./model";

test("modal structure", () => {
  expect(new Modal()).toEqual(
    expect.objectContaining({
      $collection: expect.any(Array), //here prefix $ is used to mark as internal property.
      record: expect.any(Function),
      all: expect.any(Function),
      find: expect.any(Function),
      update: expect.any(Function),
    })
  );
});

describe("record", () => {
  const heroes = [{ id: 1, name: "super man" }, { name: "spiderman" }];
  test("can add data to the collection", () => {
    const modal = new Modal();
    modal.record(heroes);
    expect(modal.$collection).toEqual([
      heroes[0],
      {
        id: expect.any(Number),
        name: heroes[1].name,
      },
    ]);
  });

  test("gets called when data is passed to the modal", () => {
    const modal = new Modal();
    const spy = jest.spyOn(modal, "record");
    modal.record(heroes);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("all", () => {
  test("return empty model", () => {
    const modal = new Modal();
    expect(modal.all()).toEqual([]);
  });

  test("return modal data", () => {
    const modal = new Modal([{ name: "super man" }, { name: "spiderman" }]);
    expect(modal.all().length).toBe(2);
  });

  test("orginal data remains intact", () => {
    const modal = new Modal([{ name: "super man" }, { name: "spiderman" }]);
    const data = modal.all();
    data[0].name = "Joker";

    expect(modal.$collection[0].name).toBe("super man");
  });
});

describe("find", () => {
  const heroes = [{ id: 1, name: "super man" }, { name: "spiderman" }];

  test("return null if nothing matches", () => {
    const modal = new Modal();
    expect(modal.find(1)).toEqual(null);
  });

  test("return a matching entry", () => {
    const modal = new Modal(heroes);
    expect(modal.find("spiderman")).toEqual(heroes[1]);
  });
});

describe("update", () => {
  const heroes = [{ id: 1, name: "batman" }];

  let modal;
  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(heroes));
    modal = new Modal(dataset);
  });

  test("an entry by id", () => {
    modal.update(1, { name: "Joker" });
    expect(modal.find(1).name).toBe("Joker");
  });
  test("extend a entry by id", () => {
    modal.update(1, { cape: true });
    expect(modal.find(1)).toEqual(
      expect.objectContaining({
        name: "batman",
        cape: true,
      })
    );
  });
  test("return false if no entry matches", () => {
    expect(modal.update(2, {})).toBe(false);
  });
});
