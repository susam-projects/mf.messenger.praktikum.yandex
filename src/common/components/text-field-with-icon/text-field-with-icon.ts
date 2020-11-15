import Block from "../../component-system/block.js";
import textFieldWithIconTemplate from "./text-field-with-icon.template.js";
import { noop } from "../../utils/func-utils.js";
import { findNode } from "../../ui-utils/dom-utils.js";

interface TextFieldWithIconProps {
    className?: string;
    iconClassName?: string;
    placeholder?: string;
    name?: string;
    defaultValue?: string | number;
    onIconClick?: () => void;
    onChange?: (event: Event) => void;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onPressEnter?: (event: KeyboardEvent) => void;
    onPressEscape?: (event: KeyboardEvent) => void;
}

const DEFAULT_PROPS: Partial<TextFieldWithIconProps> = {
    className: "",
    iconClassName: "",
    name: "",
    onIconClick: noop,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onPressEnter: noop,
    onPressEscape: noop,
};

class TextFieldWithIcon extends Block<TextFieldWithIconProps> {
    constructor(props: TextFieldWithIconProps) {
        super("div", textFieldWithIconTemplate, Object.assign({}, DEFAULT_PROPS, props));
    }

    protected bindContent() {
        const input = this._getInput();

        input?.addEventListener("change", event => this.props.onChange!(event));
        input?.addEventListener("blur", event => this.props.onBlur!(event));
        input?.addEventListener("focus", event => this.props.onFocus!(event));

        input?.addEventListener("keydown", event => {
            switch (event.key) {
                case "Enter":
                    this.props.onPressEnter!(event);
                    break;
                case "Escape":
                    this.props.onPressEscape!(event);
                    break;
            }
        });
    }

    render() {
        if (this.value) {
            this.props.defaultValue = this.value;
        }
        return super.render();
    }

    get value(): string {
        const input = this._getInput();
        return (input && input.value) ?? "";
    }

    get name(): string {
        const input = this._getInput();
        return (input && input.name) ?? "";
    }

    clear() {
        const input = this._getInput();
        input && (input.value = "");
    }

    private _getInput() {
        return findNode<HTMLInputElement>(this.element, "input");
    }
}

export default TextFieldWithIcon;
