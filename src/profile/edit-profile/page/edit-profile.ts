import Button from "../../../common/components/button/button.js";
import Block from "../../../common/component-system/block.js";
import editProfilePageTemplate from "./edit-profile.template.js";
import TextFieldsValidator, {
    createConfirmPasswordValidator,
    createTextFieldInfo,
    DISPLAY_NAME_VALIDATOR,
    ifFieldIsNotEmpty,
    REQUIRED_LOGIN_VALIDATOR,
    NAME_VALIDATOR,
    PASSWORD_VALIDATOR,
    REQUIRED_PASSWORD_VALIDATOR,
    PHONE_VALIDATOR,
    REQUIRED_EMAIL_VALIDATOR,
} from "../../../common/component-utils/text-fields-validator.js";
import TextField from "../../../common/components/text-field/text-field.js";
import EditProfileController from "../controller/edit-profile-controller.js";
import { findNode } from "../../../common/ui-utils/dom-utils.js";

interface EditProfilePageProps {
    avatar: string | null;
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
    private _validator!: TextFieldsValidator;
    private _controller!: EditProfileController;

    constructor() {
        super("div", editProfilePageTemplate, {
            avatar: null,

            loginField: new TextField({
                label: "Логин",
                placeholder: "username",
                errorText: "Неправильный логин",
                name: "login",
            }),

            displayNameField: new TextField({
                label: "Отображаемое имя",
                placeholder: "Василий Тёркин",
                errorText: "Неправильное отображаемое имя",
                name: "login",
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
                onClick: async () => {
                    if (this._validator.validate()) {
                        const avatarInput = findNode<HTMLInputElement>(this.element, "#avatar-input");
                        const avatar = avatarInput?.files![0] ?? undefined;

                        if (
                            await this._controller.update({
                                avatar,
                                login: this.props.loginField.value,
                                displayName: this.props.displayNameField.value,
                                firstName: this.props.firstNameField.value,
                                secondName: this.props.secondNameField.value,
                                phone: this.props.phoneField.value,
                                email: this.props.emailField.value,
                                oldPassword: this.props.oldPasswordField.value,
                                newPassword: this.props.newPasswordField.value,
                            })
                        ) {
                            this._router.go("/profile");
                        } else {
                            alert("error updating profile!");
                        }
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
            createTextFieldInfo(this.props.loginField, REQUIRED_LOGIN_VALIDATOR),
            createTextFieldInfo(this.props.displayNameField, DISPLAY_NAME_VALIDATOR),
            createTextFieldInfo(this.props.firstNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.secondNameField, NAME_VALIDATOR),
            createTextFieldInfo(this.props.phoneField, PHONE_VALIDATOR),
            createTextFieldInfo(this.props.emailField, REQUIRED_EMAIL_VALIDATOR),
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

    init() {
        this._controller = new EditProfileController();
        super.init();
    }

    componentDidMount() {
        this._updateProfileData();
    }

    async show() {
        await this._updateProfileData();
        super.show();
    }

    private async _updateProfileData() {
        const profileData = await this._controller.getProfileData();
        if (!profileData) return;
        this.props.loginField.setProps({ defaultValue: profileData.login });
        this.props.displayNameField.setProps({ defaultValue: profileData.displayName });
        this.props.firstNameField.setProps({ defaultValue: profileData.firstName });
        this.props.secondNameField.setProps({ defaultValue: profileData.secondName });
        this.props.phoneField.setProps({ defaultValue: profileData.phone });
        this.props.emailField.setProps({ defaultValue: profileData.email });
        this.setProps({ avatar: profileData.avatar });
    }
}

export default EditProfilePage;
