import Block from "./block";
import { BlockConstructor, Router } from "./common-interfaces";

function createRedirect(destination: string, router?: Router): BlockConstructor {
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
