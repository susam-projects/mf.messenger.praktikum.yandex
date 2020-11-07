import Button from "../../common/ui/components/button/button.js";
import Block from "../../common/ui/component-system/block.js";
import signUpPageTemplate from "./sign-up.template.js";
import TextField from "../../common/ui/components/text-field/text-field.js";
import TextFieldsValidator, {
    createConfirmPasswordValidator,
    createTextFieldInfo,
    REQUIRED_LOGIN_VALIDATOR,
    NAME_VALIDATOR,
    REQUIRED_PHONE_VALIDATOR,
    REQUIRED_EMAIL_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../common/ui/component-utils/text-fields-validator.js";
import SignUpController from "../controller/sign-up-controller.js";

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
    private _controller = new SignUpController();

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
                isRequired: true,
                label: "Телефон",
                placeholder: "+7 111 111 11 11",
                errorText: "Неправильный телефон",
                name: "phone",
            }),

            signUpButton: new Button({
                className: "sign-up-page__button-full-width",
                label: "Зарегистрироваться",
                variant: "primary",
                onClick: async () => {
                    if (this._validator.validate()) {
                        if (
                            !(await this._controller.signUp({
                                first_name: this.props.firstNameField.value,
                                second_name: this.props.secondNameField.value,
                                email: this.props.emailField.value,
                                login: this.props.loginField.value,
                                password: this.props.passwordField.value,
                                phone: this.props.phoneField.value,
                            }))
                        ) {
                            alert("Ошибка регистрации!");
                            return;
                        }
                        this._router.go("/chats");
                    }
                },
            }),

            goToLoginButton: new Button({
                className: "sign-up-page__button-full-width margin-top-16",
                label: "Войти",
                variant: "text-primary",
                onClick: () => {
                    this._router.go("/");
                },
            }),
        });

        this._validator = new TextFieldsValidator([
            createTextFieldInfo(this.props.loginField, REQUIRED_LOGIN_VALIDATOR),
            createTextFieldInfo(this.props.emailField, REQUIRED_EMAIL_VALIDATOR),
            createTextFieldInfo(this.props.passwordField, REQUIRED_PASSWORD_VALIDATOR),
            createTextFieldInfo(
                this.props.confirmPasswordField,
                createConfirmPasswordValidator(this.props.passwordField),
            ),
            createTextFieldInfo(this.props.firstNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.secondNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.phoneField, REQUIRED_PHONE_VALIDATOR),
        ]);
    }
}

export default SignUpPage;
