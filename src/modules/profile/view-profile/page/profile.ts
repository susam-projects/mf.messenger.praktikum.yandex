import Button from "../../../../ui/components/button/button.js";
import Block from "../../../../ui/component-system/block.js";
import simpleRouter from "../../../../ui/component-system/simple-router.js";
import profilePageTemplate from "./profile.template.js";

interface ProfilePageProps {
    editButton: Block;
    logoutButton: Block;
}

class ProfilePage extends Block<ProfilePageProps> {
    constructor() {
        super("div", profilePageTemplate, {
            editButton: new Button({
                className: "profile-page__buttons-gap",
                variant: "text-primary",
                label: "Редактировать",
                onClick: () => {
                    simpleRouter.setPage("edit-profile");
                },
            }),
            logoutButton: new Button({
                className: "profile-page__buttons-gap",
                variant: "text-danger",
                label: "Выйти",
                onClick: () => {
                    simpleRouter.setPage("login");
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
            simpleRouter.setPage("chats");
        });

        this.props.editButton.init(editButton);
        this.props.logoutButton.init(logoutButton);
    }
}

export default ProfilePage;
