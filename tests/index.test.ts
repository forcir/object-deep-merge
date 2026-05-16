import { merge } from "../src/index.js";

describe(`happy path, 2 objects (base + override)`, () => {
    describe(`depth of 1`, () => {
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

    describe(`depth of 2`, () => {
        test(`RequestInit`, () => {
            const base: RequestInit = {
                method: "GET",
                referrer: "about:client",
            };

            const override: RequestInit = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            };

            const merged = merge(base, override);

            expect(merged).toMatchObject({
                method: "GET",
                referrer: "about:client",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        });
    });
});

describe(`security`, () => {
    test(`does not merge unsafe prototype pollution keys from parsed JSON`, () => {
        const override = JSON.parse(`{"__proto__":{"isAdmin":true},"prototype":{"polluted":true}}`);
        const merged = merge({ name: "guest" }, override) as Record<string, unknown>;

        expect(Object.keys(merged)).toStrictEqual(["name"]);
        expect(Object.hasOwn(merged, "isAdmin")).toBe(false);
        expect(merged.isAdmin).toBeUndefined();
        expect(merged.polluted).toBeUndefined();
        expect(({} as Record<string, unknown>).isAdmin).toBeUndefined();
    });

    test(`does not merge nested unsafe prototype pollution keys from parsed JSON`, () => {
        const override = JSON.parse(`{"options":{"enabled":true,"__proto__":{"isAdmin":true}}}`);
        const merged = merge({ options: {} }, override) as { options: Record<string, unknown> };

        expect(merged.options).toMatchObject({ enabled: true });
        expect(Object.hasOwn(merged.options, "isAdmin")).toBe(false);
        expect(merged.options.isAdmin).toBeUndefined();
    });
});
