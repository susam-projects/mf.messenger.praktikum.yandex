import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import FormValidator, { LOGIN_VALIDATOR, PASSWORD_VALIDATOR } from "../../utils/form-validator.js";
import loginPageTemplate from "./login.template.js";
import simpleRouter from "../../utils/simple-router.js";

interface LoginPageProps {
    loginButton: Block;
    goToSignUpButton: Block;
}

const VALIDATORS = {
    login: LOGIN_VALIDATOR,
    password: PASSWORD_VALIDATOR,
};

class LoginPage extends Block<LoginPageProps> {
    private validator: FormValidator | undefined;

    constructor() {
        super("div", loginPageTemplate, {
            loginButton: new Button({
                variant: "primary",
                label: "Авторизоваться",
                onClick: () => {
                    if (this.validator!.validate()) {
                        simpleRouter.setPage("chats");
                    }
                },
            }),
            goToSignUpButton: new Button({
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
        const form = this.element.querySelector("form");

        this.props.loginButton._bindContent(loginButtonContainer);
        this.props.goToSignUpButton._bindContent(goToSignUpButton);

        this.validator = new FormValidator(VALIDATORS, form!);
    }
}

export default LoginPage;
