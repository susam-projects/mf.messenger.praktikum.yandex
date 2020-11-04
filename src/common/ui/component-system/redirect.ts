import Block from "./block.js";

function createRedirect(destination: string): typeof Block {
    return class Redirect extends Block {
        init() {
            super.init();
            this._doRedirect();
        }

        show() {
            this._doRedirect();
        }

        private _doRedirect() {
            this._router.go(destination);
        }
    } as typeof Block;
}

export default createRedirect;
