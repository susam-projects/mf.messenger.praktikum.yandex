import Block from "../../component-system/block";
import textFieldTemplate from "./text-field.hbs";
import { noop } from "../../utils/func-utils";
import { findNode } from "../../ui-utils/dom-utils";

interface TextFieldProps {
    isRequired?: boolean;
    isError?: boolean;
    type?: "text" | "email" | "password";
    label?: string;
    placeholder?: string;
    errorText?: string;
    name?: string;
    defaultValue?: string | number;
    onChange?: (event: Event) => void;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onPressEnter?: (event: KeyboardEvent) => void;
    onPressEscape?: (event: KeyboardEvent) => void;
}

const DEFAULT_PROPS: Partial<TextFieldProps> = {
    isRequired: false,
    isError: false,
    type: "text",
    label: "",
    placeholder: "",
    errorText: "",
    name: "",
    defaultValue: "",
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onPressEnter: noop,
    onPressEscape: noop,
};

class TextField extends Block<TextFieldProps> {
    constructor(props: TextFieldProps) {
        super("div", textFieldTemplate, { ...DEFAULT_PROPS, ...props });
    }

    protected bindContent(): void {
        const input = this._getInput();

        input?.addEventListener("change", event => this.props.onChange!(event));
        input?.addEventListener("blur", event => this.props.onBlur!(event));
        input?.addEventListener("focus", event => this.props.onFocus!(event));

        input?.addEventListener("keydown", event => {
            // eslint-disable-next-line default-case
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

    render(): string {
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

    clear(): void {
        const input = this._getInput();
        if (input) input.value = "";
    }

    private _getInput() {
        return findNode<HTMLInputElement>(this.element, "input");
    }
}

export default TextField;
