import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import simpleRouter from "../../utils/simple-router.js";
import profilePageTemplate from "./profile.template.js";

interface ProfilePageProps {
    editButton: Block;
    logoutButton: Block;
}

class ProfilePage extends Block<ProfilePageProps> {
    constructor() {
        super("div", profilePageTemplate, {
            editButton: new Button({
                variant: "text-primary",
                label: "Редактировать",
                onClick: () => {
                    simpleRouter.setPage("edit-profile");
                },
            }),
            logoutButton: new Button({
                variant: "text-danger",
                label: "Выйти",
                onClick: () => {
                    simpleRouter.setPage("login");
                },
            }),
        });
    }

    bindContent() {
        const backButton = this.element.querySelector("#back-button");
        const editButton = this.element.querySelector("#edit-button");
        const logoutButton = this.element.querySelector("#logout-button");

        backButton?.addEventListener("click", event => {
            event.preventDefault();
            simpleRouter.setPage("chats");
        });

        this.props.editButton._bindContent(editButton);
        this.props.logoutButton._bindContent(logoutButton);
    }
}

export default ProfilePage;
