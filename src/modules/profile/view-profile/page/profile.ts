import Button from "../../../../ui/components/button/button.js";
import Block from "../../../../ui/component-system/block.js";
import profilePageTemplate from "./profile.template.js";
import ViewProfileController from "../controller/view-profile-controller.js";

interface ProfilePageProps {
    editButton: Block;
    logoutButton: Block;
}

class ProfilePage extends Block<ProfilePageProps> {
    private readonly _controller = new ViewProfileController();

    constructor() {
        super("div", profilePageTemplate, {
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

    bindContent() {
        const backLine = this.element?.querySelector("#back-line");
        const editButton = this.element?.querySelector("#edit-button");
        const logoutButton = this.element?.querySelector("#logout-button");

        backLine?.addEventListener("click", event => {
            event.preventDefault();
            this._router.go("/chats");
        });

        this.props.editButton.init(editButton);
        this.props.logoutButton.init(logoutButton);
    }
}

export default ProfilePage;
