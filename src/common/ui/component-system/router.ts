import Block from "./block.js";
import Route from "./route.js";

export class Router {
    static __instance: Router;

    private readonly _history = window.history;
    private _routes: Route[] = [];
    private _currentRoute: Route | null = null;

    constructor(private readonly _rootQuery: string) {
        if (Router.__instance) return Router.__instance;
        Router.__instance = this;
    }

    get currentRoute(): string | null {
        if (this._currentRoute) {
            return this._currentRoute.pathname;
        }
        return null;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this._routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window)?.location?.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    go(pathname: string) {
        this._history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    getRoute(pathname: string) {
        return this._routes.find(route => route.match(pathname));
    }

    back() {
        this._history.back();
    }

    forward() {
        this._history.forward();
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) return;

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.navigate(pathname);
    }
}

export default Router;
