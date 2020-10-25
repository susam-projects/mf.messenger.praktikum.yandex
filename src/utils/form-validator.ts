import { checkAll, find } from "./array-utils.js";

export type InputValidators = Record<string, InputValidator>;
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
export const REQUIRED_EMAIL_VALIDATOR = /\S+@\S+\.\S+/i;
export const EMAIL_VALIDATOR = /(^\s*$)|(^\S+@\S+\.\S+$)/i;
export const REQUIRED_PASSWORD_VALIDATOR = /[A-ZА-ЯЁ\d]{6,}/i;
export const PASSWORD_VALIDATOR = /(^$)|(^[A-ZА-ЯЁ\d]{6,}$)/i;
export const NAME_VALIDATOR = /(^\s*$)|(^[A-ZА-ЯЁ]+$)/i;
export const DISPLAY_NAME_VALIDATOR = /(^\s*$)|(^[A-ZА-ЯЁ\s]+$)/i;
export const PHONE_VALIDATOR = /(^\s*$)|(^\+?\d[\d-\s]+$)/i;
export const AVATAR_VALIDATOR = /^.*$/i;

// "~ are not allowed.
// it doesn't have any special meaning, just disallow some characters in order to complete the task
export const MESSAGE_VALIDATOR = /^[A-ZА-ЯЁ\s\d_\-,.;@#$%^&*()]+$/i;

export const ifFieldIsNotEmpty = (fieldName: string, validator: RegExp): ValidatorFunction => (value, inputs) => {
    const field = find(inputs, it => it.name === fieldName);
    return !field || !field.value || validator.test(value);
};

export const CONFIRM_PASSWORD_VALIDATOR = (passwordFieldName = "password"): ValidatorFunction => (value, inputs) => {
    const passwordInput = find(inputs, it => it.name === passwordFieldName);
    return !passwordInput || passwordInput.value === value;
};

export default FormValidator;
