import Block from "../../component-system/block.js";
import iconButtonTemplate from "./icon-button.template.js";
import { noop } from "../../../infrastructure/utils/func-utils.js";

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
        const button = this.element.querySelector("button");

        button?.addEventListener("click", event => {
            event.preventDefault();
            this.props.onClick!();
        });
    }
}

export default IconButton;
