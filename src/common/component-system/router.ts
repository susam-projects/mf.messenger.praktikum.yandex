import { BlockConstructor, Route as IRoute, Router as IRouter } from "./common-interfaces";
import Route from "./route";

class Router implements IRouter {
    static __instance: Router;

    private readonly _history = window.history;
    private _routes: IRoute[] = [];
    private _currentRoute: IRoute | null = null;

    constructor(private readonly _rootQuery: string) {
        return this.init();
    }

    protected init(): Router {
        if (Router.__instance) return Router.__instance;
        return (Router.__instance = this);
    }

    get currentRoute(): string | null {
        if (this._currentRoute) {
            return this._currentRoute.pathname;
        }
        return null;
    }

    use<TProps extends unknown>(pathname: string, block: BlockConstructor<TProps>): Router {
        const route = new Route<TProps>(pathname, block, { rootQuery: this._rootQuery });
        this._routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window)?.location?.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    go(pathname: string): void {
        this._history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this._history.back();
    }

    forward(): void {
        this._history.forward();
    }

    private _onRoute(pathname: string) {
        const route = this._getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        if (!route) return;

        this._currentRoute = route;
        route.navigate(pathname);
    }

    private _getRoute(pathname: string) {
        return this._routes.find(route => route.match(pathname));
    }
}

export default Router;
