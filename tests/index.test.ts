import { merge } from "../src/index.js";

describe(`expect merge function to correctly merge two objects with a depth of 1`, () => {
  test(`bigint`, () => {
    expect(merge({ foo: BigInt(0) }, { bar: BigInt(1) })).toMatchObject({
      foo: BigInt(0),
      bar: BigInt(1),
    });
  });

  test(`boolean`, () => {
    expect(merge({ foo: false }, { bar: true })).toMatchObject({
      foo: false,
      bar: true,
    });
  });

  test(`number`, () => {
    expect(merge({ foo: 0 }, { bar: 1 })).toMatchObject({
      foo: 0,
      bar: 1,
    });
  });

  test(`string`, () => {
    expect(merge({ foo: "no" }, { bar: "yes" })).toMatchObject({
      foo: "no",
      bar: "yes",
    });
  });

  test(`symbol`, () => {
    expect(JSON.stringify(merge({ foo: Symbol("no") }, { bar: Symbol("yes") }))).toStrictEqual(
      JSON.stringify({
        foo: Symbol("no"),
        bar: Symbol("yes"),
      }),
    );
  });

  test(`null`, () => {
    expect(merge({ foo: null }, { bar: null })).toMatchObject({
      foo: null,
      bar: null,
    });
  });

  test(`undefined`, () => {
    expect(merge({ foo: undefined }, { bar: undefined })).toMatchObject({});
  });
});
