const simpleRouter = {
    _page: '',
    _pages: {},
    _appRoot: document.getElementById('app'),
    registerPage(name, templateText) {
        this._pages[name] = Handlebars.compile(templateText);
        return this;
    },
    setPage(pageName) {
       this._page = pageName;
       this.renderCurrentPage();
       return this;
    },
    renderCurrentPage() {
        const pageHtmlText = this._pages[this._page]();
        const fragment = this._createFragment(pageHtmlText);
        this._removeAllChildren(this._appRoot);
        this._appendFragment(this._appRoot, fragment);
        return this;
    },
    _createFragment(htmlText) {
        const fragment = document.createDocumentFragment();
        const root = document.createElement('div');
        root.innerHTML = htmlText;
        fragment.appendChild(root);
        return fragment;
    },
    _appendFragment(node, fragment) {
        node.appendChild(fragment);
    },
    _removeAllChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
};

simpleRouter
    .registerPage('login', loginPageTemplate)
    .registerPage('sign-up', signUpPageTemplate);
