import Block from "./block.js";
import Router from "./router.js";

function createRedirect(destination: string, router?: Router): typeof Block {
    return class Redirect extends Block {
        init() {
            super.init();
            this._doRedirect();
        }

        show() {
            this._doRedirect();
        }

        private _doRedirect() {
            (router ?? this._router).go(destination);
        }
    } as typeof Block;
}

export default createRedirect;
