import Button from "../../../../ui/components/button/button.js";
import Block from "../../../../ui/component-system/block.js";
import signUpPageTemplate from "./sign-up.template.js";
import TextField from "../../../../ui/components/text-field/text-field.js";
import TextFieldsValidator, {
    CONFIRM_PASSWORD_VALIDATOR,
    createTextFieldInfo,
    LOGIN_VALIDATOR,
    NAME_VALIDATOR,
    PHONE_VALIDATOR,
    REQUIRED_EMAIL_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../../../ui/component-utils/text-fields-validator.js";

interface SignUpPageProps {
    loginField: TextField;
    emailField: TextField;
    passwordField: TextField;
    confirmPasswordField: TextField;
    firstNameField: TextField;
    secondNameField: TextField;
    phoneField: TextField;
    signUpButton: Block;
    goToLoginButton: Block;
}

class SignUpPage extends Block<SignUpPageProps> {
    private _validator: TextFieldsValidator;

    constructor() {
        super("div", signUpPageTemplate, {
            loginField: new TextField({
                isRequired: true,
                label: "Логин",
                placeholder: "username",
                errorText: "Неправильный логин",
                name: "login",
            }),

            emailField: new TextField({
                isRequired: true,
                type: "email",
                label: "Почта",
                placeholder: "email@example.com",
                errorText: "Неправильная почта",
                name: "email",
            }),

            passwordField: new TextField({
                isRequired: true,
                type: "password",
                label: "Пароль",
                placeholder: "≥6 символов, буквы и цифры",
                errorText: "Пароль должен содержать ≥6 символов, буквы и цифры",
                name: "password",
            }),

            confirmPasswordField: new TextField({
                isRequired: true,
                type: "password",
                label: "Пароль (ещё раз)",
                placeholder: "Подтвердите пароль",
                errorText: "Пароли не совпадают",
                name: "confirm_password",
            }),

            firstNameField: new TextField({
                label: "Имя",
                placeholder: "Михаил",
                errorText: "Неправильное имя",
                name: "first_name",
            }),

            secondNameField: new TextField({
                label: "Фамилия",
                placeholder: "Нестеров",
                errorText: "Неправильная фамилия",
                name: "second_name",
            }),

            phoneField: new TextField({
                label: "Телефон",
                placeholder: "+7 111 111 11 11",
                errorText: "Неправильный телефон",
                name: "phone",
            }),

            signUpButton: new Button({
                className: "sign-up-page__button-full-width",
                label: "Зарегистрироваться",
                variant: "primary",
                onClick: () => {
                    if (this._validator.validate()) {
                        this._router.go("/chats");
                    }
                },
            }),

            goToLoginButton: new Button({
                className: "sign-up-page__button-full-width",
                label: "Войти",
                variant: "text-primary",
                onClick: () => {
                    this._router.go("/");
                },
            }),
        });

        this._validator = new TextFieldsValidator([
            createTextFieldInfo(this.props.loginField, LOGIN_VALIDATOR),
            createTextFieldInfo(this.props.emailField, REQUIRED_EMAIL_VALIDATOR),
            createTextFieldInfo(this.props.passwordField, REQUIRED_PASSWORD_VALIDATOR),
            createTextFieldInfo(this.props.confirmPasswordField, CONFIRM_PASSWORD_VALIDATOR(this.props.passwordField)),
            createTextFieldInfo(this.props.firstNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.secondNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.phoneField, PHONE_VALIDATOR),
        ]);
    }

    bindContent() {
        const loginField = this.element.querySelector("#login-field");
        const emailField = this.element.querySelector("#email-field");
        const passwordField = this.element.querySelector("#password-field");
        const confirmPasswordField = this.element.querySelector("#confirm-password-field");
        const firstNameField = this.element.querySelector("#first-name-field");
        const secondNameField = this.element.querySelector("#second-name-field");
        const phoneField = this.element.querySelector("#phone-field");
        const signUpButton = this.element.querySelector("#sign-up-button");
        const goToLoginButton = this.element.querySelector("#go-to-login-button");

        this.props.loginField.init(loginField);
        this.props.emailField.init(emailField);
        this.props.passwordField.init(passwordField);
        this.props.confirmPasswordField.init(confirmPasswordField);
        this.props.firstNameField.init(firstNameField);
        this.props.secondNameField.init(secondNameField);
        this.props.phoneField.init(phoneField);
        this.props.signUpButton.init(signUpButton);
        this.props.goToLoginButton.init(goToLoginButton);
    }
}

export default SignUpPage;
