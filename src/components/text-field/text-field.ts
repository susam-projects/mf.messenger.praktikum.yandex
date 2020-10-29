import Block from "../../utils/ui/block.js";
import textFieldTemplate from "./text-field.template.js";
import { noop } from "../../utils/useful-functions/func-utils.js";

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
        super("div", textFieldTemplate, Object.assign({}, DEFAULT_PROPS, props));
    }

    protected bindContent() {
        const input = this.element.querySelector("input");

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

        this.isError = this.props.isError!;
    }

    get value(): string {
        const input = this.element.querySelector("input");
        return (input && input.value) ?? "";
    }

    get name(): string {
        const input = this.element.querySelector("input");
        return (input && input.name) ?? "";
    }

    set isError(value: boolean) {
        const root = this.element.querySelector(".root");
        if (value) {
            root?.classList.add("text-field_error");
        } else {
            root?.classList.remove("text-field_error");
        }
    }
}

export default TextField;
