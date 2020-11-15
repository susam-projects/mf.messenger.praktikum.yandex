import Block from "../../component-system/block.js";
import iconButtonTemplate from "./icon-button.template.js";
import { noop } from "../../utils/func-utils.js";
import { findNode } from "../../ui-utils/dom-utils.js";

interface IconButtonProps {
    className?: string;
    iconClassName?: string;
    onClick?: () => void;
}

const DEFAULT_PROPS: Partial<IconButtonProps> = {
    className: "",
    iconClassName: "",
    onClick: noop,
};

class IconButton extends Block<IconButtonProps> {
    constructor(props: IconButtonProps) {
        super("div", iconButtonTemplate, Object.assign({}, DEFAULT_PROPS, props));
    }

    protected bindContent() {
        const button = findNode(this.element, "button");

        button?.addEventListener("click", event => {
            event.preventDefault();
            this.props.onClick!();
        });
    }
}

export default IconButton;
