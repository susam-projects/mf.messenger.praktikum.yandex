import EventBus from "../../infrastructure/events/event-bus.js";

interface BlockMeta {
    tagName: string;
    props: object;
    template: Handlebars.Template;
}

interface BaseProps {
    [key: string]: unknown;
}

type TemplateProps = Record<string, string | number>;

class Block<TProps extends {} = {}> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_BIND: "flow:bind",
    };

    props: TProps;

    private _eventBus = new EventBus();
    private _element: Element | null = null;
    private readonly _meta: BlockMeta | null = null;
    private readonly _template: HandlebarsTemplateDelegate<TemplateProps> | null = null;
    private _isRendering = false;

    constructor(tagName = "div", template = "", props = {} as TProps) {
        this._meta = {
            tagName,
            props,
            template,
        };

        this._template = this._compileTemplate(template);

        this.props = this._makePropsProxy(props);

        this._registerEvents(this._eventBus);
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    get element(): Element {
        return this._element!;
    }

    getContent(): Element {
        return this.element;
    }

    init(parent?: Element | null): void {
        if (parent) {
            this._element = parent;
            this._eventBus.emit(Block.EVENTS.FLOW_BIND);
        } else {
            this._createResources();
            this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        }
    }

    componentDidMount(): void {}

    // ignore unused arguments rule so _componentDidUpdate may pass the arguments
    // @ts-ignore
    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        return true;
    }

    render(): string {
        const templateProps = {} as TemplateProps;
        for (let key in this.props) {
            const value = this.props[key];
            if (value instanceof Block) {
                templateProps[key] = value.render();
            } else {
                templateProps[key] = (value as unknown) as string | number;
            }
        }
        return this._template!(templateProps);
    }

    setProps(nextProps: Partial<TProps>): void {
        Object.assign(this.props, nextProps);
    }

    show(): void {
        (this.element as HTMLElement).style.display = "block";
    }

    hide(): void {
        (this.element as HTMLElement).style.display = "none";
    }

    protected bindContent(): void {}

    private _compileTemplate(template: string): HandlebarsTemplateDelegate<TemplateProps> {
        return Handlebars.compile<TemplateProps>(template);
    }

    private _makePropsProxy(props: TProps): TProps {
        return (new Proxy(props, {
            set: (target: BaseProps, prop: string, value: unknown) => {
                if (target[prop] === value) {
                    return true;
                }
                const oldTarget = Object.assign({}, target);
                target[prop] = value;
                this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error("Forbidden");
            },
        }) as unknown) as TProps;
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_BIND, this._bindContent.bind(this));
    }

    private _createResources(): void {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this._eventBus.emit(Block.EVENTS.FLOW_BIND);
    }

    private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
            this._eventBus.emit(Block.EVENTS.FLOW_BIND);
        }
    }

    private _render(): void {
        if (!this.element || this._isRendering) return;
        this._isRendering = true;
        removeAllChildren(this.element);
        this.element.innerHTML = this.render();
        this._isRendering = false;
    }

    private _bindContent(): void {
        if (!this.element) {
            console.error("Nothing to bind to!");
        }
        this.bindContent();
    }
}

function removeAllChildren(node: Element): void {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export default Block;
