import Router from "./router";
import Block from "./block";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import createRedirect from "./redirect";
import { wait } from "../utils/async-utils";

describe("Router", () => {
    class NonSingletonRouter extends Router {
        protected init() {
            return this;
        }
    }

    class TestBlock extends Block {
        constructor() {
            super(undefined, "<div data-testId='test-block'>TestBlock</div>");
        }
    }

    class TestBlock1 extends Block {
        constructor() {
            super(undefined, "<div data-testId='test-block1'>TestBlock1</div>");
        }
    }

    class TestBlock2 extends Block {
        constructor() {
            super(undefined, "<div data-testId='test-block2'>TestBlock2</div>");
        }
    }

    beforeEach(() => {
        createAppContainer();
        window.history.pushState({}, "", "/");
    });

    afterEach(() => {
        clearDocument();
    });

    function createAppContainer() {
        const div = document.createElement("div");
        div.id = "app";
        document.body.appendChild(div);
    }

    function clearDocument() {
        const children = document.body.childNodes;
        for (let child of children) {
            document.body.removeChild(child);
        }
    }

    it("is singleton", () => {
        const inst1 = new Router("");
        const inst2 = new Router("");
        const inst3 = new Router("");
        expect(inst1).toBe(inst2);
        expect(inst1).toBe(inst3);
    });

    describe("route types", () => {
        it("can register a route", () => {
            const router = new NonSingletonRouter("#app");
            router.use("/test-route", TestBlock as typeof Block);
            router.start();
            router.go("/test-route");

            const testBlock = queryByTestId(document.body, "test-block");
            expect(testBlock).toBeVisible();
        });

        it("can register a wildcard route", () => {
            const router = new NonSingletonRouter("#app");
            router.use("/wild/*", TestBlock as typeof Block);
            router.start();

            expect(queryByTestId(document.body, "test-block")).toBeNull();

            router.go("/wild/1");
            expect(queryByTestId(document.body, "test-block")).toBeVisible();

            router.go("/wild/some/other");
            expect(queryByTestId(document.body, "test-block")).toBeVisible();

            router.go("/wild/");
            expect(queryByTestId(document.body, "test-block")).not.toBeVisible();

            router.go("/wild");
            expect(queryByTestId(document.body, "test-block")).not.toBeVisible();

            router.go("/wilder/1");
            expect(queryByTestId(document.body, "test-block")).not.toBeVisible();
        });

        it("can register redirect", async () => {
            const router = new NonSingletonRouter("#app");
            router.use("/redirect", createRedirect("/redirected-to", router));
            router.use("/redirected-to", TestBlock as typeof Block);
            router.start();

            expect(queryByTestId(document.body, "test-block")).toBeNull();

            router.go("/redirect");
            await wait(300);

            expect(router.currentRoute).toEqual("/redirected-to");
            expect(queryByTestId(document.body, "test-block")).toBeVisible();
        });
    });

    describe("current route", () => {
        it("matches current location", () => {
            const router = new NonSingletonRouter("#app");
            router.use("/test-path", Block);
            router.start();
            router.go("/test-path");
            expect(router.currentRoute).toEqual("/test-path");
        });

        it("is null before start", () => {
            const router = new NonSingletonRouter("#app");
            expect(router.currentRoute).toBeNull();
        });
    });

    describe("traverse", () => {
        it("shows current location page on start (root by default)", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();
        });

        it("shows current location page on start (other pages)", async () => {
            window.history.pushState({}, "", "/first");

            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStartFromFirst();
        });

        it("shows nothing on start if current location doesn't have a registered route", () => {
            window.history.pushState({}, "", "/non-existent-route");

            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStartFromUnknown();
        });

        it("can go to another page", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.checkFirstFirst();
        });

        it("can go to other pages several times", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.checkFirstFirst();

            tester.goSecond();
            tester.checkSecondSecond();
        });

        it("can go back single step", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.checkFirstFirst();

            await tester.goBack();
            tester.checkBackToStartWithoutSecond();
        });

        it("can go back several steps", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.goSecond();
            tester.checkSecondSecond();

            await tester.goBack();
            await tester.goBack();
            tester.checkBackToStart();
        });

        it("does nothing on going back if there is no history", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            await tester.goBack();
            tester.checkStart();
        });

        it("does nothing on going back if we already back at the start of the history", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.goSecond();
            await tester.goBack();
            await tester.goBack();
            tester.checkBackToStart();

            await tester.goBack();
            tester.checkBackToStart();
        });

        it("can go forward single step", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            await tester.goBack();
            tester.checkBackToStartWithoutSecond();

            await tester.goForward();
            tester.checkFirstFirst();
        });

        it("can go forward several steps", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.goSecond();
            await tester.goBack();
            await tester.goBack();
            tester.checkBackToStart();

            await tester.goForward();
            await tester.goForward();
            tester.checkSecondSecond();
        });

        it("does nothing on going forward if there is no history", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            await tester.goForward();
            tester.checkStart();
        });

        it("does nothing on going forward if we already at the end of the history", async () => {
            const tester = new RoutesTraverseTester();
            tester.init();
            tester.checkStart();

            tester.goFirst();
            tester.goSecond();
            await tester.goBack();
            await tester.goForward();
            tester.checkSecondSecond();

            await tester.goForward();
            tester.checkSecondSecond();
        });

        class RoutesTraverseTester {
            private _router = new NonSingletonRouter("#app");

            init() {
                const router = this._router;
                router.use("/", TestBlock as typeof Block);
                router.use("/first", TestBlock1 as typeof Block);
                router.use("/second", TestBlock2 as typeof Block);
                router.start();
            }

            goFirst() {
                this._router.go("/first");
            }

            goSecond() {
                this._router.go("/second");
            }

            async goBack() {
                this._router.back();
                await wait(300);
            }

            async goForward() {
                this._router.forward();
                await wait(300);
            }

            checkStart() {
                expect(this._router.currentRoute).toEqual("/");
                expect(queryByTestId(document.body, "test-block")).toBeVisible();
                expect(queryByTestId(document.body, "test-block1")).toBeNull();
                expect(queryByTestId(document.body, "test-block2")).toBeNull();
            }

            checkStartFromFirst() {
                expect(this._router.currentRoute).toEqual("/first");
                expect(queryByTestId(document.body, "test-block")).toBeNull();
                expect(queryByTestId(document.body, "test-block1")).toBeVisible();
                expect(queryByTestId(document.body, "test-block2")).toBeNull();
            }

            checkStartFromUnknown() {
                expect(this._router.currentRoute).toBeNull();
                expect(queryByTestId(document.body, "test-block")).toBeNull();
                expect(queryByTestId(document.body, "test-block1")).toBeNull();
                expect(queryByTestId(document.body, "test-block2")).toBeNull();
            }

            checkFirstFirst() {
                expect(this._router.currentRoute).toEqual("/first");
                expect(queryByTestId(document.body, "test-block")).not.toBeVisible();
                expect(queryByTestId(document.body, "test-block1")).toBeVisible();
                expect(queryByTestId(document.body, "test-block2")).toBeNull();
            }

            checkSecondSecond() {
                expect(this._router.currentRoute).toEqual("/second");
                expect(queryByTestId(document.body, "test-block")).not.toBeVisible();
                expect(queryByTestId(document.body, "test-block1")).not.toBeVisible();
                expect(queryByTestId(document.body, "test-block2")).toBeVisible();
            }

            checkBackToStart() {
                expect(this._router.currentRoute).toEqual("/");
                expect(queryByTestId(document.body, "test-block")).toBeVisible();
                expect(queryByTestId(document.body, "test-block1")).not.toBeVisible();
                expect(queryByTestId(document.body, "test-block2")).not.toBeVisible();
            }

            checkBackToStartWithoutSecond() {
                expect(this._router.currentRoute).toEqual("/");
                expect(queryByTestId(document.body, "test-block")).toBeVisible();
                expect(queryByTestId(document.body, "test-block1")).not.toBeVisible();
                expect(queryByTestId(document.body, "test-block2")).toBeNull();
            }
        }
    });
});
