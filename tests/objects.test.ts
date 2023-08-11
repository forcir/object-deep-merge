import { isMap, isSet, isObjectLiteral, objectKeys } from "../src/objects.js";

test(`isMap works as expected`, () => {
    expect(isMap(new Map())).toBe(true);

    expect(isMap(new Set())).toBe(false);
    expect(isMap({})).toBe(false);
    expect(isMap(Object())).toBe(false);
    expect(isMap(String())).toBe(false);
    expect(isMap(Number())).toBe(false);
    expect(isMap(BigInt(0))).toBe(false);
    expect(isMap(Boolean())).toBe(false);
    expect(isMap(Symbol())).toBe(false);
    expect(isMap(undefined)).toBe(false);
    expect(isMap(null)).toBe(false);
});

test(`isSet works as expected`, () => {
    expect(isSet(new Set())).toBe(true);

    expect(isSet(new Map())).toBe(false);
    expect(isSet({})).toBe(false);
    expect(isSet(Object())).toBe(false);
    expect(isSet(String())).toBe(false);
    expect(isSet(Number())).toBe(false);
    expect(isSet(BigInt(0))).toBe(false);
    expect(isSet(Boolean())).toBe(false);
    expect(isSet(Symbol())).toBe(false);
    expect(isSet(undefined)).toBe(false);
    expect(isSet(null)).toBe(false);
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
