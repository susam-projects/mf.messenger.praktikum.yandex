import Button from "../../common/ui/components/button/button.js";
import Block from "../../common/ui/component-system/block.js";
import loginPageTemplate from "./login.template.js";
import TextField from "../../common/ui/components/text-field/text-field.js";
import TextFieldsValidator, {
    REQUIRED_LOGIN_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../common/ui/component-utils/text-fields-validator.js";
import LoginController from "../controller/login-controller.js";

interface LoginPageProps {
    userNameField: TextField;
    passwordField: TextField;
    loginButton: Block;
    goToSignUpButton: Block;
}

class LoginPage extends Block<LoginPageProps> {
    private _validator: TextFieldsValidator;
    private _controller = new LoginController();

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
                errorText: "Пароль должен содержать ≥6 символов, буквы и цифры",
                name: "password",
            }),

            loginButton: new Button({
                className: "login-page__button_full-width",
                variant: "primary",
                label: "Авторизоваться",
                onClick: async () => {
                    if (!this._validator.validate()) return;
                    const password = this.props.passwordField.value;
                    const userName = this.props.userNameField.value;
                    if (!(await this._controller.login(userName, password))) {
                        alert("Неправильный логин или пароль!");
                        return;
                    }
                    this._router.go("/chats");
                },
            }),

            goToSignUpButton: new Button({
                className: "login-page__button_full-width",
                variant: "text-primary",
                label: "Нет аккаунта?",
                onClick: () => {
                    this._router.go("/sign-up");
                },
            }),
        });

        this._validator = new TextFieldsValidator([
            {
                textField: this.props.userNameField,
                validator: REQUIRED_LOGIN_VALIDATOR,
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
