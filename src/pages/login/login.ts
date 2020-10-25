import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import FormValidator, {
    InputValidators,
    LOGIN_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../utils/form-validator.js";
import loginPageTemplate from "./login.template.js";
import simpleRouter from "../../utils/simple-router.js";

interface LoginPageProps {
    loginButton: Block;
    goToSignUpButton: Block;
}

const VALIDATORS: InputValidators = {
    login: LOGIN_VALIDATOR,
    password: REQUIRED_PASSWORD_VALIDATOR,
};

class LoginPage extends Block<LoginPageProps> {
    private validator: FormValidator | undefined;

    constructor() {
        super("div", loginPageTemplate, {
            loginButton: new Button({
                className: "login-page__button_full-width",
                variant: "primary",
                label: "Авторизоваться",
                onClick: () => {
                    if (this.validator!.validate()) {
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
    }

    bindContent() {
        const loginButtonContainer = this.element.querySelector("#login-button");
        const goToSignUpButton = this.element.querySelector("#go-to-sign-up-button");
        const form = this.element.querySelector("form")!;
        const formInputs = form.querySelectorAll("input");

        this.props.loginButton.init(loginButtonContainer);
        this.props.goToSignUpButton.init(goToSignUpButton);

        this.validator = new FormValidator(VALIDATORS, formInputs);
    }
}

export default LoginPage;
