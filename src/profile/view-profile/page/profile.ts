import Button from "../../../common/ui/components/button/button.js";
import Block from "../../../common/ui/component-system/block.js";
import profilePageTemplate from "./profile.template.js";
import ViewProfileController from "../controller/view-profile-controller.js";
import ProfileField from "./components/profile-field.js";

interface ProfilePageProps {
    avatar: string | null;
    loginField: Block;
    displayNameField: Block;
    firstNameField: Block;
    secondNameField: Block;
    phoneField: Block;
    emailField: Block;
    editButton: Block;
    logoutButton: Block;
}

const NO_DATA = "---";

class ProfilePage extends Block<ProfilePageProps> {
    private _controller!: ViewProfileController;

    constructor() {
        super("div", profilePageTemplate, {
            avatar: null,

            loginField: new ProfileField({
                label: "Логин",
                value: NO_DATA,
            }),

            displayNameField: new ProfileField({
                label: "Отображаемое имя",
                value: NO_DATA,
            }),

            firstNameField: new ProfileField({
                label: "Имя",
                value: NO_DATA,
            }),

            secondNameField: new ProfileField({
                label: "Фамилия",
                value: NO_DATA,
            }),

            phoneField: new ProfileField({
                label: "Телефон",
                value: NO_DATA,
            }),

            emailField: new ProfileField({
                label: "Почта",
                value: NO_DATA,
            }),

            editButton: new Button({
                className: "profile-page__buttons-gap",
                variant: "text-primary",
                label: "Редактировать",
                onClick: () => {
                    this._router.go("/edit-profile");
                },
            }),

            logoutButton: new Button({
                className: "profile-page__buttons-gap",
                variant: "text-danger",
                label: "Выйти",
                onClick: async () => {
                    await this._controller.logout();
                    this._router.go("/");
                },
            }),
        });
    }

    async init() {
        this._controller = new ViewProfileController();
        super.init();
    }

    componentDidMount() {
        this._updateUserInfo();
    }

    bindContent() {
        const backLine = this.element?.querySelector("#back-line");

        backLine?.addEventListener("click", event => {
            event.preventDefault();
            this._router.go("/chats");
        });
    }

    async show() {
        await this._updateUserInfo();
        super.show();
    }

    private async _updateUserInfo() {
        const userInfo = await this._controller.getUserInfo();
        this.props.loginField.setProps({ value: userInfo?.login || NO_DATA });
        this.props.displayNameField.setProps({ value: userInfo?.display_name || NO_DATA });
        this.props.firstNameField.setProps({ value: userInfo?.first_name || NO_DATA });
        this.props.secondNameField.setProps({ value: userInfo?.second_name || NO_DATA });
        this.props.phoneField.setProps({ value: userInfo?.phone || NO_DATA });
        this.props.emailField.setProps({ value: userInfo?.email || NO_DATA });
        this.setProps({ avatar: userInfo?.avatar });
    }
}

export default ProfilePage;
