import { addAttribute } from "./dom-utils";

describe("addAttribute", () => {
    it("works on single tag", () => {
        const withAttribute = addAttribute("<div></div>", "data-test", "value");
        expect(withAttribute).toEqual('<div data-test="value"></div>');
    });

    it("works on multiline tag", () => {
        const TEST_MARKUP = `
            <div
            >
            </div>
        `;
        const EXPECTED_RESULT = `
            <div
             data-test="value">
            </div>
        `;

        const withAttribute = addAttribute(TEST_MARKUP, "data-test", "value");
        expect(withAttribute).toEqual(EXPECTED_RESULT);
    });

    it("works on tag with attribute", () => {
        const withAttribute = addAttribute('<span data-something="vvv"></span>', "data-test", "value");
        expect(withAttribute).toEqual('<span data-something="vvv" data-test="value"></span>');
    });

    it("works on tag with inner content", () => {
        const withAttribute = addAttribute("<p>Some text</p>", "data-test", "value");
        expect(withAttribute).toEqual('<p data-test="value">Some text</p>');
    });

    it("works on tag with inner tags", () => {
        const withAttribute = addAttribute("<div><span>Some inner content</span></div>", "data-test", "value");
        expect(withAttribute).toEqual('<div data-test="value"><span>Some inner content</span></div>');
    });

    it("returns empty string for empty markup", () => {
        const withAttribute = addAttribute("", "data-test", "value");
        expect(withAttribute).toEqual("");
    });

    it("throws for invalid markup", () => {
        expect(() => addAttribute("<di<div>", "data-test", "value")).toThrow("invalid markup");
    });
});
