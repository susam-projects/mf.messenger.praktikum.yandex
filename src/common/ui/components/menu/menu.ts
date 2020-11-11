import Block from "../../component-system/block.js";
import menuTemplate from "./menu.template.js";
import { toggleClass } from "../../utils/dom-utils.js";

interface MenuProps {
    className?: string;
    items?: MenuItem[];
}

interface MenuItem {
    iconClass?: string;
    label?: string;
    isDanger?: boolean;
}

const DEFAULT_PROPS: Partial<MenuProps> = {
    className: "",
    items: [],
};

const CLASS_OPEN = "open";

class Menu extends Block<MenuProps> {
    constructor(props: MenuProps) {
        super("div", menuTemplate, Object.assign({}, DEFAULT_PROPS, props));
    }

    show() {
        this.element.classList.add(CLASS_OPEN);
    }

    hide() {
        this.element.classList.remove(CLASS_OPEN);
    }

    toggle() {
        toggleClass(this.element, CLASS_OPEN);
    }
}

export default Menu;
