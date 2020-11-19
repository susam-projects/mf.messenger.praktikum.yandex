import "./login.scss";
import loginPageTemplate from "./login.hbs";
import Button from "../../common/components/button/button";
import Block from "../../common/component-system/block";
import TextField from "../../common/components/text-field/text-field";
import TextFieldsValidator, {
    REQUIRED_LOGIN_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../common/component-utils/text-fields-validator";
import LoginController from "../controller/login-controller";

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
}

export default LoginPage;
