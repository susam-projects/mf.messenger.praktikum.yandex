import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import { LOGIN_VALIDATOR, REQUIRED_PASSWORD_VALIDATOR } from "../../utils/form-validator.js";
import loginPageTemplate from "./login.template.js";
import simpleRouter from "../../utils/simple-router.js";
import TextField from "../../components/text-field/text-field.js";
import TextFieldsValidator from "../../utils/text-fields-validator.js";

interface LoginPageProps {
    userNameField: TextField;
    passwordField: TextField;
    loginButton: Block;
    goToSignUpButton: Block;
}

class LoginPage extends Block<LoginPageProps> {
    private _validator: TextFieldsValidator;

    constructor() {
        super("div", loginPageTemplate, {
            userNameField: new TextField({
                label: "Логин",
                placeholder: "username",
                errorText: "Неправильный логин",
                name: "login",
            }),

            passwordField: new TextField({
                type: "password",
                label: "Пароль",
                placeholder: "●●●●●●●●●●●",
                errorText: "Пароль должен быть: >=6 символов, буквы и цифры",
                name: "password",
            }),

            loginButton: new Button({
                className: "login-page__button_full-width",
                variant: "primary",
                label: "Авторизоваться",
                onClick: () => {
                    if (this._validator.validate()) {
                        simpleRouter.setPage("chats");
                    }
                },
            }),

            goToSignUpButton: new Button({
                className: "login-page__button_full-width",
                variant: "text-primary",
                label: "Нет аккаунта?",
                onClick() {
                    simpleRouter.setPage("sign-up");
                },
            }),
        });

        this._validator = new TextFieldsValidator([
            {
                textField: this.props.userNameField,
                validator: LOGIN_VALIDATOR,
            },
            {
                textField: this.props.passwordField,
                validator: REQUIRED_PASSWORD_VALIDATOR,
            },
        ]);
    }

    bindContent() {
        const userNameField = this.element.querySelector("#username-field");
        const passwordField = this.element.querySelector("#password-field");
        const loginButtonContainer = this.element.querySelector("#login-button");
        const goToSignUpButton = this.element.querySelector("#go-to-sign-up-button");

        this.props.userNameField.init(userNameField);
        this.props.passwordField.init(passwordField);
        this.props.loginButton.init(loginButtonContainer);
        this.props.goToSignUpButton.init(goToSignUpButton);
    }
}

export default LoginPage;
