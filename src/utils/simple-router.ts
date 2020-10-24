import Block from "./block";

const simpleRouter = {
    _page: "",
    _pages: {} as Record<string, Block>,
    _appRoot: document.getElementById("app"),
    registerPage(name: string, pageComponent: Block) {
        this._pages[name] = pageComponent;
        return this;
    },
    setPage(name: string) {
        this._page = name;
        this.renderCurrentPage();
        return this;
    },
    renderCurrentPage() {
        if (!this._appRoot) return;
        const pageComponent = this._pages[this._page];
        removeAllChildren(this._appRoot);
        this._appRoot.appendChild(pageComponent.getContent());
    },
};

function removeAllChildren(node: HTMLElement) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

// for tests
// @ts-ignore
window.simpleRouter = simpleRouter;

export default simpleRouter;
