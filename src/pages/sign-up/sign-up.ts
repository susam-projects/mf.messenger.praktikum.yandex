import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import FormValidator, {
    CONFIRM_PASSWORD_VALIDATOR,
    EMAIL_VALIDATOR,
    LOGIN_VALIDATOR,
    NAME_VALIDATOR,
    PASSWORD_VALIDATOR,
    PHONE_VALIDATOR,
} from "../../utils/form-validator.js";
import simpleRouter from "../../utils/simple-router.js";
import signUpPageTemplate from "./sign-up.template.js";

interface SignUpPageProps {
    signUpButton: Block;
    goToLoginButton: Block;
}

const VALIDATORS = {
    login: LOGIN_VALIDATOR,
    email: EMAIL_VALIDATOR,
    password: PASSWORD_VALIDATOR,
    confirm_password: CONFIRM_PASSWORD_VALIDATOR,
    first_name: NAME_VALIDATOR,
    second_name: NAME_VALIDATOR,
    phone: PHONE_VALIDATOR,
};

class SignUpPage extends Block<SignUpPageProps> {
    private validator: FormValidator | undefined;

    constructor() {
        super("div", signUpPageTemplate, {
            signUpButton: new Button({
                label: "Зарегистрироваться",
                variant: "primary",
                onClick: () => {
                    if (this.validator!.validate()) {
                        simpleRouter.setPage("chats");
                    }
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
        const form = this.element.querySelector("form")!;
        const formInputs = form.querySelectorAll("input");

        this.props.signUpButton._bindContent(signUpButton);
        this.props.goToLoginButton._bindContent(goToLoginButton);

        this.validator = new FormValidator(VALIDATORS, formInputs);
    }
}

export default SignUpPage;