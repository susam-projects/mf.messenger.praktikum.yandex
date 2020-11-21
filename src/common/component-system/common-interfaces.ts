export interface BlockConstructor<TProps = unknown> {
    new (tagName?: string, template?: string, props?: TProps, router?: Router): Block<TProps>;
}

export interface Block<TProps = unknown> {
    element: Element;
    readonly props: TProps;
    readonly renderId: string;

    getContent(): Element;
    init(): void;
    componentDidMount(): void;
    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean;
    render(): string;
    show(): void;
    hide(): void;
}

export interface RouterConstructor {
    new (rootQuery: string): Router;
}

export interface Router {
    readonly currentRoute: string | null;

    use(pathname: string, block: BlockConstructor): Router;
    start(): void;
    go(pathname: string): void;
    back(): void;
    forward(): void;
}

export interface RouteConstructor {
    new (pathname: string, view: Block, props: { rootQuery: string }): Route;
}

export interface Route {
    readonly pathname: string;

    navigate(pathname: string): void;
    leave(): void;
    match(pathname: string): boolean;
    render(): void;
}
