import EventBus from './event-bus';

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_BIND: "flow:bind",
    };

    _element = null;
    _meta = null;
    _template = null;

    constructor(tagName = "div", template = '', props = {}) {
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

    _compileTemplate(template) {
        return Handlebars.compile(template);
    }

    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            set(target, prop, value) {
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
            }
        });
    }

    _registerEvents(eventBus) {
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
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.eventBus.emit(Block.EVENTS.FLOW_BIND);
    }

    componentDidMount(oldProps) {}

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
            this.eventBus.emit(Block.EVENTS.FLOW_BIND);
        }
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps(nextProps) {
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        removeAllChildren(this.element)
        this.element.innerHTML = this.render();
    }

    render() {
        const textProps = {};
        for (let key in this.props) {
            if (this.props[key] instanceof Block) {
                textProps[key] = this.props[key].render();
            } else {
                textProps[key] = this.props[key];
            }
        }
        return this._template(textProps);
    }

    _bindContent(parent) {
        if (parent) {
            this._element = parent.querySelector('.root');
        }
        if (!this.element) {
            console.error('nothing to bind to!');
        }
        this.bindContent();
    }

    bindContent() {}

    getContent() {
        return this.element;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export default Block;
