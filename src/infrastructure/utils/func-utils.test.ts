import { identity, noop } from "./func-utils";

describe("noop", () => {
    it("is defined", () => {
        expect(noop).toBeDefined();
    });
});

describe("identity", () => {
    it("returns something equal to the argument", () => {
        expect(identity(null)).toEqual(null);
        expect(identity(3)).toEqual(3);
        expect(identity("a")).toEqual("a");
        expect(identity({})).toEqual({});
    });

    it("returns the passed argument", () => {
        expect(identity({})).not.toBe({});
        const obj = {};
        expect(identity(obj)).toBe(obj);
    });
});
