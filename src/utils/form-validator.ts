import { checkAll, find } from "./array-utils.js";

type InputValidator = RegExp | ValidatorFunction;

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

export const LOGIN_VALIDATOR = /^[A-Za-z][\w-]{2,}$/i;
export const EMAIL_VALIDATOR = /\S+@\S+\.\S+/i;
export const PASSWORD_VALIDATOR = /[A-ZА-Я\d]{6,}/i;
export const NAME_VALIDATOR = /(^\s*$)|(^[A-ZА-Я]+$)/i;
export const PHONE_VALIDATOR = /(^\s*$)|(^\+?\d[\d-\s]+$)/i;
export const CONFIRM_PASSWORD_VALIDATOR: ValidatorFunction = (value, inputs) => {
    const passwordInput = find(inputs, it => it.name === "password");
    return !passwordInput || passwordInput.value === value;
};

export default FormValidator;
