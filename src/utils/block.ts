import EventBus from "./event-bus.js";

interface BlockMeta {
    tagName: string;
    props: object;
    template: Handlebars.Template;
}

type BaseProps = Record<string, unknown>;

type TemplateProps = Record<string, string | number>;

class Block<TProps extends object = {}> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_BIND: "flow:bind",
    };

    props: TProps;

    private _eventBus = new EventBus();
    private _element: HTMLElement | null = null;
    private readonly _meta: BlockMeta | null = null;
    private readonly _template: HandlebarsTemplateDelegate<TemplateProps> | null = null;

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

    get element() {
        return this._element!;
    }

    getContent() {
        return this.element;
    }

    init(parent?: Element | null) {
        if (parent) {
            this._element = parent.querySelector(".root");
            this._eventBus.emit(Block.EVENTS.FLOW_BIND);
        } else {
            this._createResources();
            this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        }
    }

    componentDidMount() {}

    // ignore unused arguments rule so _componentDidUpdate may pass the arguments
    // @ts-ignore
    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return true;
    }

    render() {
        const textProps = {} as Record<string, string | number>;
        for (let key in this.props) {
            const value = this.props[key];
            if (value instanceof Block) {
                textProps[key] = value.render();
            } else {
                textProps[key] = (value as unknown) as string | number;
            }
        }
        return this._template!(textProps);
    }

    setProps(nextProps: Partial<TProps>) {
        Object.assign(this.props, nextProps);
    }

    protected bindContent() {}

    private _compileTemplate(template: string) {
        return Handlebars.compile<TemplateProps>(template);
    }

    private _makePropsProxy(props: TProps) {
        const self = this;
        return (new Proxy(props, {
            // TODO: investigate how to correctly handle index signatures / Record types
            // @ts-ignore
            set(target: BaseProps, prop: string, value: unknown) {
                if (target[prop] === value) {
                    return true;
                }
                const oldTarget = Object.assign({}, target);
                target[prop] = value;
                self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Forbidden");
            },
        }) as unknown) as TProps;
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_BIND, this._bindContent.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this._eventBus.emit(Block.EVENTS.FLOW_BIND);
    }

    private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
            this._eventBus.emit(Block.EVENTS.FLOW_BIND);
        }
    }

    private _render() {
        if (!this.element) return;
        removeAllChildren(this.element);
        this.element.innerHTML = this.render();
    }

    private _bindContent() {
        if (!this.element) {
            console.error("Nothing to bind to!");
        }
        this.bindContent();
    }
}

function removeAllChildren(node: Element) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export default Block;
