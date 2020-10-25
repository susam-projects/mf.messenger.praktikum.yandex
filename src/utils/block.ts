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

    _element: HTMLElement | null = null;
    _meta: BlockMeta | null = null;
    _template: HandlebarsTemplateDelegate<TemplateProps> | null = null;

    props: TProps;
    eventBus: EventBus;

    constructor(tagName = "div", template = "", props = {} as TProps) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
            template,
        };

        this._template = this._compileTemplate(template);

        this.props = this._makePropsProxy(props);

        this.eventBus = eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _compileTemplate(template: string) {
        return Handlebars.compile<TemplateProps>(template);
    }

    _makePropsProxy(props: TProps) {
        const self = this;
        return (new Proxy(props, {
            // @ts-ignore
            set(target: BaseProps, prop: string, value: unknown) {
                if (target[prop] === value) {
                    return true;
                }
                const oldTarget = Object.assign({}, target);
                target[prop] = value;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Forbidden");
            },
        }) as unknown) as TProps;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_BIND, this._bindContent.bind(this));
    }

    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _createResources() {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.eventBus.emit(Block.EVENTS.FLOW_BIND);
    }

    componentDidMount() {}

    _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
            this.eventBus.emit(Block.EVENTS.FLOW_BIND);
        }
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return true;
    }

    setProps(nextProps: TProps) {
        Object.assign(this.props, nextProps);
    }

    get element() {
        return this._element!;
    }

    _render() {
        if (!this.element) return;
        removeAllChildren(this.element);
        this.element.innerHTML = this.render();
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

    _bindContent(parent?: Element | null) {
        if (parent) {
            this._element = parent.querySelector(".root");
        }
        if (!this.element) {
            console.error("Nothing to bind to!");
        }
        this.bindContent();
    }

    bindContent() {}

    getContent() {
        return this.element;
    }
}

function removeAllChildren(node: HTMLElement) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export default Block;
