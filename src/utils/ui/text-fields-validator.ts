import TextField from "../../components/text-field/text-field.js";
import { checkAll } from "../useful-functions/array-utils.js";

export interface TextFieldInfo {
    textField: TextField;
    validator: InputValidator;
}

export type InputValidator = RegExp | ValidatorFunction;
type ValidatorFunction = (value: string, inputs: TextField[]) => boolean;

class TextFieldsValidator {
    private readonly _fields: TextField[];

    constructor(private readonly _data: TextFieldInfo[]) {
        this._fields = _data.map(it => it.textField);

        this._data.forEach(it => {
            it.textField.setProps({
                onBlur: () => this._processInput(it.textField, it.validator),
                onFocus: () => this._processInput(it.textField, it.validator),
            });
        });
    }

    validate(): boolean {
        return checkAll(this._data, it => this._processInput(it.textField, it.validator));
    }

    private _processInput(textField: TextField, validator: InputValidator): boolean {
        const isPassed = this._checkField(textField, validator);
        textField.isError = !isPassed;
        return isPassed;
    }

    private _checkField(field: TextField, validator: InputValidator): boolean {
        if (validator instanceof RegExp) {
            return validator.test(field.value);
        }
        return validator(field.value, this._fields);
    }
}

export function createTextFieldInfo(textField: TextField, validator: InputValidator) {
    return {
        textField,
        validator,
    };
}

export const LOGIN_VALIDATOR = /^[A-Za-z][\w-]{2,}$/i;
export const REQUIRED_EMAIL_VALIDATOR = /\S+@\S+\.\S+/i;
export const EMAIL_VALIDATOR = /(^\s*$)|(^\S+@\S+\.\S+$)/i;
export const REQUIRED_PASSWORD_VALIDATOR = /[A-ZА-ЯЁ\d]{6,}/i;
export const PASSWORD_VALIDATOR = /(^$)|(^[A-ZА-ЯЁ\d]{6,}$)/i;
export const NAME_VALIDATOR = /(^\s*$)|(^[A-ZА-ЯЁ]+$)/i;
export const DISPLAY_NAME_VALIDATOR = /(^\s*$)|(^[A-ZА-ЯЁ\s]+$)/i;
export const PHONE_VALIDATOR = /(^\s*$)|(^\+?\d[\d-\s]+$)/i;

// "~ are not allowed.
// it doesn't have any special meaning, just disallow some characters in order to complete the task
export const MESSAGE_VALIDATOR = /^[A-ZА-ЯЁ\s\d_\-,.;@#$%^&*()]+$/i;

export const ifFieldIsNotEmpty = (field: TextField, validator: RegExp): ValidatorFunction => value => {
    return !field.value || validator.test(value);
};

export const CONFIRM_PASSWORD_VALIDATOR = (passwordField: TextField): ValidatorFunction => value => {
    return passwordField.value === value;
};

export default TextFieldsValidator;
