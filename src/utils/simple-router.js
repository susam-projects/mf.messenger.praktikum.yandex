const simpleRouter = {
    _page: '',
    _pages: {},
    _appRoot: document.getElementById('app'),
    registerPage(name, pageComponent) {
        this._pages[name] = pageComponent;
        return this;
    },
    setPage(name) {
        this._page = name;
        this.renderCurrentPage();
        return this;
    },
    renderCurrentPage() {
        const pageComponent = this._pages[this._page];
        removeAllChildren(this._appRoot);
        this._appRoot.appendChild(pageComponent.getContent());
    }
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export default simpleRouter;
