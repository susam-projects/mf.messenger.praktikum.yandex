import "@testing-library/jest-dom";
import Block from "./block";

describe("Block", () => {
    describe("rendering", () => {
        it("renders no content by default", () => {
            const emptyBlock = new Block();
            expect(emptyBlock.element.innerHTML).toEqual("");
        });

        it("renders content by a given template", () => {
            const TEST_TEMPLATE = "<div>Test</div>";
            const block = new Block(undefined, TEST_TEMPLATE);
            expect(block.element).toHaveTextContent("Test");
        });

        it("renders props", () => {
            const TEST_INNER_CONTENT = "<div>{{prop1}}</div><div>{{prop2}}</div>";
            const TEST_TEMPLATE = `<div>${TEST_INNER_CONTENT}</div>`;
            const TEST_PROPS = {
                prop1: "value1",
                prop2: "value2",
            };
            const EXPECTED_RESULT = TEST_INNER_CONTENT.replace("{{prop1}}", TEST_PROPS.prop1).replace(
                "{{prop2}}",
                TEST_PROPS.prop2,
            );

            const block = new Block(undefined, TEST_TEMPLATE, TEST_PROPS);
            expect(block.element.firstElementChild!.innerHTML).toEqual(EXPECTED_RESULT);
        });

        it("renders nothing if there is no appropriate prop", () => {
            const TEST_INNER_CONTENT = "<div>{{prop1}}</div><div>{{prop2}}</div>";
            const TEST_TEMPLATE = `<div>${TEST_INNER_CONTENT}</div>`;
            const TEST_PROPS = {
                prop1: "value1",
            };

            const expected = TEST_INNER_CONTENT.replace("{{prop1}}", TEST_PROPS.prop1).replace("{{prop2}}", "");
            const block = new Block(undefined, TEST_TEMPLATE, TEST_PROPS);
            expect(block.element.firstElementChild!.innerHTML).toEqual(expected);
        });

        it("ignores surplus props", () => {
            const TEST_INNER_CONTENT = "<div>{{prop1}}</div><div>{{prop2}}</div>";
            const TEST_TEMPLATE = `<div>${TEST_INNER_CONTENT}</div>`;
            const TEST_PROPS = {
                prop1: "value1",
                prop2: "value2",
                prop3: "some-value-3",
            };
            const block = new Block(undefined, TEST_TEMPLATE, TEST_PROPS);

            const expected = TEST_INNER_CONTENT.replace("{{prop1}}", TEST_PROPS.prop1).replace(
                "{{prop2}}",
                TEST_PROPS.prop2,
            );
            expect(block.element.firstElementChild!.innerHTML).toEqual(expected);
        });

        it("renders inner blocks", () => {
            const INNER_BLOCK_TEMPLATE = "<div>Inner</div>";
            const BLOCK_TEMPLATE = "<div>{{{inner}}}</div>";
            const innerBlock = new Block(undefined, INNER_BLOCK_TEMPLATE);
            const block = new Block(undefined, BLOCK_TEMPLATE, { inner: innerBlock });

            expect(block.element.firstElementChild!.innerHTML).toContain("Inner");
        });

        it("renders all inner blocks", () => {
            const INNER_BLOCK_1_TEMPLATE = "<div>Inner</div>";
            const INNER_BLOCK_2_TEMPLATE = "<div>Inner2</div>";
            const INNER_BLOCK_3_TEMPLATE = "<div>Inner3</div>";
            const BLOCK_TEMPLATE = "<div>{{{inner1}}}</div><div>{{{inner2}}}</div><div>{{{inner3}}}</div>";
            const innerBlock1 = new Block(undefined, INNER_BLOCK_1_TEMPLATE);
            const innerBlock2 = new Block(undefined, INNER_BLOCK_2_TEMPLATE);
            const innerBlock3 = new Block(undefined, INNER_BLOCK_3_TEMPLATE);
            const block = new Block(undefined, BLOCK_TEMPLATE, {
                inner1: innerBlock1,
                inner2: innerBlock2,
                inner3: innerBlock3,
            });

            expect(block.element.innerHTML).toContain("Inner");
            expect(block.element.innerHTML).toContain("Inner2");
            expect(block.element.innerHTML).toContain("Inner3");
        });
    });

    describe("binding", () => {
        class TestBlock extends Block {
            componentDidMount!: ReturnType<typeof jest.fn>;
            bindContent!: ReturnType<typeof jest.fn>;
            boundTo!: Element | null;
            elementType!: string;

            init() {
                this.componentDidMount = jest.fn();
                this.bindContent = jest.fn(() => {
                    this.boundTo = this.element;
                    this.elementType = this.element.tagName;
                });
                super.init();
            }

            superInit() {
                super.init();
            }
        }

        it("binds on creation", () => {
            const block = new TestBlock();
            expect(block.bindContent).toHaveBeenCalled();
        });

        it("initially binds to a given node type", () => {
            const spanBlock = new TestBlock("span");
            const divBlock = new TestBlock("div");
            const buttonBlock = new TestBlock("button");

            expect(spanBlock.elementType).toEqual("SPAN");
            expect(divBlock.elementType).toEqual("DIV");
            expect(buttonBlock.elementType).toEqual("BUTTON");
        });

        it("binds to div by default", () => {
            const block = new TestBlock();
            expect(block.elementType).toEqual("DIV");
        });

        it("can be bound to a given node", () => {
            const block = new TestBlock();
            const node = document.createElement("div");
            block.element = node;
            expect(block.boundTo).toBe(node);
        });

        it("calls componentDidMount on creation", () => {
            const block = new TestBlock();
            expect(block.componentDidMount).toBeCalled();
        });

        it("doesn't call componentDidMount when bound to a node", () => {
            const block = new TestBlock();
            block.componentDidMount.mockClear();
            block.element = document.createElement("div");
            expect(block.componentDidMount).not.toBeCalled();
        });

        it("binds inner block to it's node", () => {
            const inner = new TestBlock(undefined, "<p>Inner</p>");
            new TestBlock(undefined, "<div>{{{inner}}}</div>", { inner });

            expect(inner.element).toHaveTextContent("Inner");
            expect(inner.bindContent).toHaveBeenCalled();
        });

        it("rebinds inner block on rerender", () => {
            const inner = new TestBlock(undefined, "<p>Inner</p>");
            const block = new TestBlock(undefined, "<div>{{{inner}}} - {{prop}}</div>", { inner, prop: "value" });

            inner.bindContent.mockClear();
            block.setProps({ prop: "newValue" });
            expect(inner.element).toHaveTextContent("Inner");
            expect(inner.bindContent).toHaveBeenCalled();
        });
    });

    describe("props change", () => {
        type JestSpy = ReturnType<typeof jest.fn>;

        class TestBlock<T> extends Block<T> {
            oldProps?: T;
            newProps?: T;
            bindContent!: ReturnType<typeof jest.fn>;

            init() {
                this.render = jest.fn(() => super.render());
                this.bindContent = jest.fn();
                this.componentDidUpdate = jest.fn((oldProps: T, newProps: T) => {
                    this.oldProps = Object.assign({}, oldProps);
                    this.newProps = Object.assign({}, newProps);
                    return super.componentDidUpdate(oldProps, newProps);
                });
                super.init();
            }
        }

        class TrueUpdateBlock extends Block {
            init() {
                this.render = jest.fn();
                this.componentDidUpdate = jest.fn(() => true);
                super.init();
            }
        }

        class FalseUpdateBlock extends Block {
            init() {
                this.render = jest.fn();
                this.componentDidUpdate = jest.fn(() => false);
                super.init();
            }
        }

        it("rerenders on prop change", () => {
            const block = new TestBlock(undefined, undefined, { prop1: "value1" });
            (block.render as JestSpy).mockClear();
            block.setProps({ prop1: "newValue1" });
            expect(block.render).toBeCalled();
        });

        it("doesn't rerender on setting prop to the same value", () => {
            const block = new TestBlock(undefined, undefined, { prop1: "value1" });
            (block.render as JestSpy).mockClear();
            block.setProps({ prop1: "value1" });
            expect(block.render).not.toBeCalled();
        });

        it("doesn't rerender when calling setProps with empty object", () => {
            const block = new TestBlock(undefined, undefined, { prop1: "value1" });
            (block.render as JestSpy).mockClear();
            block.setProps({});
            expect(block.render).not.toBeCalled();
        });

        it("doesn't call componentDidUpdate on creation", () => {
            const block = new TestBlock(undefined, undefined, { prop1: "value1" });
            expect(block.componentDidUpdate).not.toBeCalled();
        });

        it("calls componentDidUpdate on props change", () => {
            const block = new TestBlock(undefined, undefined, { prop1: "value1" });
            block.setProps({ prop1: "newValue" });
            expect(block.componentDidUpdate).toBeCalled();
        });

        it("calls componentDidUpdate with old and new props", () => {
            const INITIAL_PROPS = { prop1: "value1" };
            const CHANGED_PROPS = { prop1: "newValue" };
            const block = new TestBlock(undefined, undefined, Object.assign({}, INITIAL_PROPS));
            block.setProps(Object.assign({}, CHANGED_PROPS));
            expect(block.oldProps).toStrictEqual(INITIAL_PROPS);
            expect(block.newProps).toStrictEqual(CHANGED_PROPS);
        });

        it("rerenders on props change if componentDidUpdate returns true", () => {
            const block = new TrueUpdateBlock(undefined, undefined, { props1: "value1" });
            (block.render as JestSpy).mockClear();
            block.setProps({ prop1: "newValue" });
            expect(block.render).toBeCalled();
        });

        it("doesn't rerender on props change if componentDidUpdate returns false", () => {
            const block = new FalseUpdateBlock(undefined, undefined, { props1: "value1" });
            (block.render as JestSpy).mockClear();
            block.setProps({ prop1: "newValue" });
            expect(block.render).not.toBeCalled();
        });

        it("rerenders all inner blocks on props change", () => {
            const inner1 = new TestBlock(undefined, "<p>Inner1</p>");
            const inner2 = new TestBlock(undefined, "<p>Inner2</p>");
            const TEST_TEMPLATE = "<div>{{prop}}</div></div><div>{{{inner1}}}</div><div>{{{inner2}}}</div>";
            const block = new Block(undefined, TEST_TEMPLATE, { prop: "value", inner1, inner2 });
            (inner1.render as JestSpy).mockClear();
            (inner2.render as JestSpy).mockClear();
            block.setProps({ prop: "newValue" });

            expect(inner1.render).toBeCalled();
            expect(inner2.render).toBeCalled();
        });

        it("rebinds on rerender", () => {
            const block = new TestBlock(undefined, undefined, { prop: "value" });
            block.bindContent.mockClear();
            block.setProps({ prop: "newValue" });
            expect(block.bindContent).toBeCalled();
        });
    });

    describe("provides access", () => {
        test("to current props", () => {
            const block = new Block(undefined, undefined, { prop: "value" });
            expect(block.props.prop).toEqual("value");
            block.setProps({ prop: "newValue" });
            expect(block.props.prop).toEqual("newValue");
        });

        test("to container / parent node", () => {
            const inner = new Block(undefined, "<div>InnerBlock</div>");
            const block = new Block(undefined, "<div>{{{inner}}}</div>", { inner });
            expect(block.element).toBeInstanceOf(Element);
            expect(inner.element).toBeInstanceOf(Element);
        });
    });
});
