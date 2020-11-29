import Block from "../../component-system/block";
import menuTemplate from "./menu.hbs";
import { findClosest, findNode, toggleClass } from "../../ui-utils/dom-utils";

interface MenuProps {
    className?: string;
    items?: MenuItem[];
    onClick?: (itemId: string) => void;
}

interface MenuItem {
    id: string;
    label: string;
    iconClass?: string;
    isDanger?: boolean;
}

const DEFAULT_PROPS: Partial<MenuProps> = {
    className: "",
    items: [],
    onClick: () => {},
};

const CLASS_OPEN = "open";

class Menu extends Block<MenuProps> {
    constructor(props: MenuProps) {
        super("div", menuTemplate, { ...DEFAULT_PROPS, ...props });
    }

    protected bindContent(): void {
        const menu = findNode(this.element, ".menu");

        menu?.addEventListener("click", event => {
            const menuItem = findClosest<HTMLElement>(event.target as Element, ".menu__item");
            if (!menuItem) return;
            const itemId = menuItem.dataset.id ?? "";
            this.props.onClick!(itemId);
        });
    }

    show(): void {
        this.element.classList.add(CLASS_OPEN);
    }

    hide(): void {
        this.element.classList.remove(CLASS_OPEN);
    }

    toggle(): void {
        toggleClass(this.element, CLASS_OPEN);
    }
}

export default Menu;
