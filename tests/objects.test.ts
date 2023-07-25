import { isMap, isSet, isObjectLiteral, objectKeys } from "../src/objects.js";

test(`isMap works as expected`, () => {
    expect(isMap(Map)).toBe(true);
    expect(isMap(Set)).toBe(false);
});

test(`isSet works as expected`, () => {
    expect(isSet(Set)).toBe(true);
    expect(isSet(Map)).toBe(false);
});

test(`isObjectLiteral works as expected`, () => {
    expect(isObjectLiteral({})).toBe(true);
    expect(isObjectLiteral(Object())).toBe(true);

    expect(isObjectLiteral(String())).toBe(false);
    expect(isObjectLiteral(Number())).toBe(false);
    expect(isObjectLiteral(BigInt(0))).toBe(false);
    expect(isObjectLiteral(Boolean())).toBe(false);
    expect(isObjectLiteral(Symbol())).toBe(false);
    expect(isObjectLiteral(undefined)).toBe(false);
    expect(isObjectLiteral(null)).toBe(false);
});

test(`objectKeys works as expected`, () => {
    expect(objectKeys({ repo: "object-deep-merge" })).toStrictEqual(["repo"]);
});
