import { checkAll } from "./array-utils.js";

export type InputValidators = Record<string, InputValidator>;
export type InputValidator = RegExp | ValidatorFunction;
type ValidatorFunction = (value: string, inputs: NodeListOf<HTMLInputElement>) => boolean;

class FormValidator {
    constructor(
        private inputValidators: Record<string, InputValidator> = {},
        private inputs: NodeListOf<HTMLInputElement>,
    ) {
        inputs && bindValidators(inputs, this.inputValidators);
    }

    validate(): boolean {
        const inputs = this.inputs;
        return !!inputs && checkAll(inputs, input => processValidation(input, this.inputValidators, inputs));
    }
}

function bindValidators(inputs: NodeListOf<HTMLInputElement>, validators: Record<string, InputValidator>) {
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            processValidation(input, validators, inputs);
        });
        input.addEventListener("focus", () => {
            processValidation(input, validators, inputs);
        });
    });
}

const ERROR_CLASS = "text-field_error";

function processValidation(
    input: HTMLInputElement,
    validators: Record<string, InputValidator>,
    inputs: NodeListOf<HTMLInputElement>,
): boolean {
    const validator = validators[input.name];
    let result = false;
    if (validator && validator instanceof RegExp) {
        result = validator.test(input.value);
    }
    if (validator && validator instanceof Function) {
        result = validator(input.value, inputs);
    }

    if (result) {
        (input.parentNode as HTMLDivElement).classList.remove(ERROR_CLASS);
    } else {
        (input.parentNode as HTMLDivElement).classList.add(ERROR_CLASS);
    }

    return result;
}

// "~ are not allowed.
// it doesn't have any special meaning, just disallow some characters in order to complete the task
export const MESSAGE_VALIDATOR = /^[A-ZА-ЯЁ\s\d_\-,.;@#$%^&*()]+$/i;

export default FormValidator;
