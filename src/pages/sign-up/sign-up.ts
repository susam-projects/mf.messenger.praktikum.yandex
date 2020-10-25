import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import simpleRouter from "../../utils/simple-router.js";
import signUpPageTemplate from "./sign-up.template.js";

interface SignUpPageProps {
    signUpButton: Block;
    goToLoginButton: Block;
}

class SignUpPage extends Block<SignUpPageProps> {
    constructor() {
        super("div", signUpPageTemplate, {
            signUpButton: new Button({
                label: "Зарегистрироваться",
                variant: "primary",
                onClick() {
                    simpleRouter.setPage("chats");
                },
            }),
            goToLoginButton: new Button({
                label: "Войти",
                variant: "text-primary",
                onClick() {
                    simpleRouter.setPage("login");
                },
            }),
        });
    }

    bindContent() {
        const signUpButton = this.element.querySelector("#sign-up-button");
        const goToLoginButton = this.element.querySelector("#go-to-login-button");

        this.props.signUpButton._bindContent(signUpButton);
        this.props.goToLoginButton._bindContent(goToLoginButton);
    }
}

export default SignUpPage;
