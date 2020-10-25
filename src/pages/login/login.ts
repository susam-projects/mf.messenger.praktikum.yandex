import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import loginPageTemplate from "./login.template.js";
import simpleRouter from "../../utils/simple-router.js";

interface LoginPageProps {
    loginButton: Block;
    goToSignUpButton: Block;
}

class LoginPage extends Block<LoginPageProps> {
    constructor() {
        super("div", loginPageTemplate, {
            loginButton: new Button({
                variant: "primary",
                label: "Авторизоваться",
                onClick() {
                    simpleRouter.setPage("chats");
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

        this.props.loginButton._bindContent(loginButtonContainer);
        this.props.goToSignUpButton._bindContent(goToSignUpButton);
    }
}

export default LoginPage;
