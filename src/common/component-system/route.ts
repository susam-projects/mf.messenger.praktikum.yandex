import { Block, BlockConstructor, Route as IRoute } from "./common-interfaces";

class Route<TProps> implements IRoute {
    _pathname: string;
    _blockClass: BlockConstructor<TProps>;
    _block: Block<TProps> | null;
    _props: { rootQuery: string };

    constructor(pathname: string, view: BlockConstructor<TProps>, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    get pathname(): string {
        return this._pathname;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return checkPath(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

function checkPath(path: string, pattern: string): boolean {
    const pathParts = path.split("/").filter(it => it !== "");
    const patternParts = pattern.split("/").filter(it => it !== "");

    let patternPartIndex = 0;

    if (pathParts.length < patternParts.length) {
        return false;
    }

    for (const pathPart of pathParts) {
        const patternPart = patternParts[patternPartIndex];

        if (patternPart === "*") {
            return true;
        }

        if (pathPart !== patternPart) {
            return false;
        }

        ++patternPartIndex;
    }

    return true;
}

function render(query: string, block: Block<unknown>) {
    const root = document.querySelector(query);
    if (!root) return;
    block.init();
    root.appendChild(block.getContent());
    return root;
}

export default Route;
