import { checkAll, ensureArray, find } from "./array-utils";

describe("find", () => {
    it("can find element in an array", () => {
        expect(find([1, 2, 3], item => item === 2)).toEqual(2);
    });

    it("returns only first matching element", () => {
        expect(find(["1", "1", "3"], item => item === "1")).toEqual("1");
    });

    it("returns null when find nothing", () => {
        expect(find(["123", "something"], item => item === "i'm not there")).toBeNull();
    });
});

describe("checkAll", () => {
    it("returns true if all match", () => {
        expect(checkAll([1, 1, 1], item => item === 1)).toEqual(true);
    });

    it("returns false if something is not match", () => {
        expect(checkAll(["", "", "not match", ""], item => item === "")).toEqual(false);
    });

    it("returns true for empty array", () => {
        expect(checkAll([], () => false)).toEqual(true);
    });

    it("calls predicate on every item", () => {
        const predicate = jest.fn(() => false);
        checkAll([3, "34", {}], predicate);
        expect(predicate).toBeCalledTimes(3);
    });
});

describe("ensureArray", () => {
    it("converts non array to an array", () => {
        expect(ensureArray("some-value")).toEqual(["some-value"]);
    });

    it("acts as identity for an array", () => {
        const testArray = ["test", "values"];
        expect(ensureArray(testArray)).toBe(testArray);
    });
});
