import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import FormValidator, {
    AVATAR_VALIDATOR,
    CONFIRM_PASSWORD_VALIDATOR,
    DISPLAY_NAME_VALIDATOR,
    InputValidators,
    LOGIN_VALIDATOR,
    NAME_VALIDATOR,
    PHONE_VALIDATOR,
    PASSWORD_VALIDATOR,
    EMAIL_VALIDATOR,
    IF_FIELD_IS_NOT_EMPTY,
    REQUIRED_PASSWORD_VALIDATOR,
} from "../../utils/form-validator.js";
import simpleRouter from "../../utils/simple-router.js";
import editProfilePageTemplate from "./edit-profile.template.js";

interface EditProfilePageProps {
    saveButton: Block;
    cancelButton: Block;
}

const VALIDATORS: InputValidators = {
    avatar: AVATAR_VALIDATOR,
    login: LOGIN_VALIDATOR,
    display_name: DISPLAY_NAME_VALIDATOR,
    first_name: NAME_VALIDATOR,
    second_name: NAME_VALIDATOR,
    phone: PHONE_VALIDATOR,
    email: EMAIL_VALIDATOR,
    oldPassword: PASSWORD_VALIDATOR,
    newPassword: IF_FIELD_IS_NOT_EMPTY("oldPassword", REQUIRED_PASSWORD_VALIDATOR),
    confirmPassword: CONFIRM_PASSWORD_VALIDATOR("newPassword"),
};

class EditProfilePage extends Block<EditProfilePageProps> {
    private validator: FormValidator | undefined;

    constructor() {
        super("div", editProfilePageTemplate, {
            saveButton: new Button({
                variant: "primary",
                label: "Сохранить",
                onClick: () => {
                    if (this.validator!.validate()) {
                        simpleRouter.setPage("profile");
                    }
                },
            }),
            cancelButton: new Button({
                variant: "neutral",
                label: "Отменить",
                onClick: () => {
                    simpleRouter.setPage("profile");
                },
            }),
        });
    }

    bindContent() {
        const form = this.element.querySelector("form")!;
        const formInputs = form.querySelectorAll("input");
        const saveButton = this.element.querySelector("#save-button");
        const cancelButton = this.element.querySelector("#cancel-button");

        this.validator = new FormValidator(VALIDATORS, formInputs);

        this.props.saveButton.init(saveButton);
        this.props.cancelButton.init(cancelButton);
    }
}

export default EditProfilePage;
