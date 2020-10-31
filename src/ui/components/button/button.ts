import Block from "../../component-system/block.js";
import { noop } from "../../../infrastructure/utils/func-utils.js";
import buttonTemplate from "./button.template.js";

interface ButtonProps {
    className?: string;
    label?: string;
    onClick?: () => void;
    variant?: "primary" | "neutral" | "text-primary" | "text-danger";
}

const DEFAULT_PROPS: Partial<ButtonProps> = {
    className: "",
    onClick: noop,
    variant: "primary",
};

class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super("span", buttonTemplate, Object.assign({}, DEFAULT_PROPS, props));
    }

    bindContent() {
        const button = this.element.querySelector("button");

        button?.addEventListener("click", event => {
            event.preventDefault();
            this.props.onClick!();
        });
    }

    show(): void {
        (this.element as HTMLElement).style.display = "inline";
    }

    hide(): void {
        (this.element as HTMLElement).style.display = "none";
    }
}

export default Button;
