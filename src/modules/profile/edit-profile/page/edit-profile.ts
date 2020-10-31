import Button from "../../../../ui/components/button/button.js";
import Block from "../../../../ui/component-system/block.js";
import editProfilePageTemplate from "./edit-profile.template.js";
import TextFieldsValidator, {
    createConfirmPasswordValidator,
    createTextFieldInfo,
    DISPLAY_NAME_VALIDATOR,
    EMAIL_VALIDATOR,
    ifFieldIsNotEmpty,
    LOGIN_VALIDATOR,
    NAME_VALIDATOR,
    PASSWORD_VALIDATOR,
    PHONE_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../../../ui/component-utils/text-fields-validator.js";
import TextField from "../../../../ui/components/text-field/text-field.js";

interface EditProfilePageProps {
    loginField: TextField;
    displayNameField: TextField;
    emailField: TextField;
    oldPasswordField: TextField;
    newPasswordField: TextField;
    confirmPasswordField: TextField;
    firstNameField: TextField;
    secondNameField: TextField;
    phoneField: TextField;
    saveButton: Block;
    cancelButton: Block;
}

class EditProfilePage extends Block<EditProfilePageProps> {
    private _validator: TextFieldsValidator;

    constructor() {
        super("div", editProfilePageTemplate, {
            loginField: new TextField({
                label: "Логин",
                placeholder: "username",
                errorText: "Неправильный логин",
                name: "login",
                defaultValue: "username",
            }),

            displayNameField: new TextField({
                label: "Отображаемое имя",
                placeholder: "username",
                errorText: "Неправильное отображаемое имя",
                name: "login",
                defaultValue: "Василий Тёркин",
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

            emailField: new TextField({
                type: "email",
                label: "Почта",
                placeholder: "email@example.com",
                errorText: "Неправильная почта",
                name: "email",
            }),

            oldPasswordField: new TextField({
                type: "password",
                label: "Старый пароль",
                placeholder: "●●●●●●●●●●●",
                errorText: "Пароль должен содержать ≥6 символов, буквы и цифры",
                name: "oldPassword",
            }),

            newPasswordField: new TextField({
                type: "password",
                label: "Новый пароль",
                placeholder: "≥6 символов, буквы и цифры",
                errorText: "Пароль должен содержать ≥6 символов, буквы и цифры",
                name: "newPassword",
            }),

            confirmPasswordField: new TextField({
                type: "password",
                label: "Новый пароль (ещё раз)",
                placeholder: "Подтвердите пароль",
                errorText: "Пароли не совпадают",
                name: "confirmPassword",
            }),

            saveButton: new Button({
                className: "edit-profile-page__buttons-gap",
                variant: "primary",
                label: "Сохранить",
                onClick: () => {
                    if (this._validator!.validate()) {
                        this._router.go("/profile");
                    }
                },
            }),

            cancelButton: new Button({
                className: "edit-profile-page__buttons-gap",
                variant: "neutral",
                label: "Отменить",
                onClick: () => {
                    this._router.go("/profile");
                },
            }),
        });

        this._validator = new TextFieldsValidator([
            createTextFieldInfo(this.props.loginField, LOGIN_VALIDATOR),
            createTextFieldInfo(this.props.displayNameField, DISPLAY_NAME_VALIDATOR),
            createTextFieldInfo(this.props.firstNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.secondNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.phoneField, PHONE_VALIDATOR),
            createTextFieldInfo(this.props.emailField, EMAIL_VALIDATOR),
            createTextFieldInfo(this.props.oldPasswordField, PASSWORD_VALIDATOR),
            createTextFieldInfo(
                this.props.newPasswordField,
                ifFieldIsNotEmpty(this.props.oldPasswordField, REQUIRED_PASSWORD_VALIDATOR),
            ),
            createTextFieldInfo(
                this.props.confirmPasswordField,
                createConfirmPasswordValidator(this.props.newPasswordField),
            ),
        ]);
    }

    bindContent() {
        const loginField = this.element.querySelector("#login-field");
        const displayNameField = this.element.querySelector("#display-name-field");
        const firstNameField = this.element.querySelector("#first-name-field");
        const secondNameField = this.element.querySelector("#second-name-field");
        const phoneField = this.element.querySelector("#phone-field");
        const emailField = this.element.querySelector("#email-field");
        const oldPasswordField = this.element.querySelector("#old-password-field");
        const newPasswordField = this.element.querySelector("#new-password-field");
        const confirmPasswordField = this.element.querySelector("#confirm-password-field");
        const saveButton = this.element.querySelector("#save-button");
        const cancelButton = this.element.querySelector("#cancel-button");

        this.props.loginField.init(loginField);
        this.props.displayNameField.init(displayNameField);
        this.props.firstNameField.init(firstNameField);
        this.props.secondNameField.init(secondNameField);
        this.props.phoneField.init(phoneField);
        this.props.emailField.init(emailField);
        this.props.oldPasswordField.init(oldPasswordField);
        this.props.newPasswordField.init(newPasswordField);
        this.props.confirmPasswordField.init(confirmPasswordField);
        this.props.saveButton.init(saveButton);
        this.props.cancelButton.init(cancelButton);
    }
}

export default EditProfilePage;
