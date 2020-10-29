// import Block from "./block.js";

/*function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (!root) return;
    root.textContent = block.render();
    return root;
}

function isEqual(val1: unknown, val2: unknown): boolean {
    return val1 === val2;
}

class Route {
    _pathname: string;
    _blockClass: typeof Block;
    _block: Block | null;
    _props: { rootQuery: string };

    constructor(pathname: string, view: typeof Block, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
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

class Router {
    static __instance: Router;

    private readonly _rootQuery: string;
    private readonly history = window.history;
    private routes: Route[] = [];
    private _currentRoute: Route | null = null;

    constructor(rootQuery: string) {
        if (Router.__instance) return Router.__instance;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window)?.location?.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) return;

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.navigate(pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }
}*/
