import EventBus from "../../infrastructure/events/event-bus.js";
import Router from "./router.js";
import idGenerator from "../utils/id-generator.js";
import { removeAllChildren, addAttribute, createElement } from "../utils/dom-utils.js";

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
    protected readonly _router: Router;
    private _isRendering = false;
    private _innerBlocks = new Map<string, Block>();
    private _renderId = idGenerator.getNewId();

    constructor(tagName = "div", template = "", props = {} as TProps, router?: Router) {
        this._meta = {
            tagName,
            props,
            template,
        };

        this._template = this._compileTemplate(template);

        this.props = this._makePropsProxy(props);

        this._router = router || new Router("");

        this._registerEvents(this._eventBus);
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    get element(): Element {
        return this._element!;
    }

    set element(value: Element) {
        this._element = value;
        this._eventBus.emit(Block.EVENTS.FLOW_BIND);
    }

    get renderId(): string {
        return this._renderId ?? "";
    }

    getContent(): Element {
        return this.element;
    }

    init(): void {
        this._createResources();
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    componentDidMount(): void {}

    // ignore unused arguments rule so _componentDidUpdate may pass the arguments
    // @ts-ignore
    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        return true;
    }

    render(): string {
        const templateProps = {} as TemplateProps;
        this._innerBlocks.clear();
        for (let key in this.props) {
            const value = this.props[key];
            if (value instanceof Block) {
                templateProps[key] = value.render();
            } else {
                templateProps[key] = (value as unknown) as string | number;
            }
        }
        return this._addRenderId(this._template!(templateProps));
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
        if (this._element?.parentNode) {
            const newElement = createElement(this.render());
            if (newElement) {
                this._element.replaceWith(newElement);
                this._element = newElement;
            } else {
                this._element.remove();
                this._element = null;
            }
        } else {
            removeAllChildren(this.element);
            this.element.innerHTML = this.render();
        }
        this._isRendering = false;
    }

    private _bindContent(): void {
        if (!this.element) {
            console.error("Nothing to bind to!");
        }
        this.bindContent();

        Object.values(this.props)
            .filter(value => value instanceof Block)
            .forEach(block => {
                const innerBlock = block as Block;
                innerBlock.element = this.element.querySelector(`[data-render-id="${innerBlock.renderId}"]`)!;
            });
    }

    private _addRenderId(textContent: string) {
        return addAttribute(textContent, "data-render-id", this._renderId);
    }
}

export default Block;
