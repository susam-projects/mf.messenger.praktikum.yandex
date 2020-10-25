import Block from "../../utils/block.js";
import FormValidator, { InputValidators, MESSAGE_VALIDATOR } from "../../utils/form-validator.js";
import simpleRouter from "../../utils/simple-router.js";
import chatPageTemplate from "./chats.template.js";

// interface ChatsPageProps {
//     sendMessageButton: Block;
// }

const VALIDATORS: InputValidators = {
    message: MESSAGE_VALIDATOR,
};

class ChatsPage extends Block {
    private validator: FormValidator | undefined;

    constructor() {
        super("div", chatPageTemplate);
    }

    bindContent() {
        const userInfo = this.element.querySelector("#user-info");
        const messageField = this.element.querySelector("#message-field");
        const messageInput = messageField?.querySelectorAll("input");
        const sendMessageButton = this.element.querySelector("#send-message");

        userInfo?.addEventListener("click", event => {
            event.preventDefault();
            simpleRouter.setPage("profile");
        });

        this.validator = new FormValidator(VALIDATORS, messageInput!);

        const trySendMessage = () => {
            if (!this.validator?.validate()) {
                alert("Некорректное сообщение!");
            }
        };

        messageInput?.forEach(input => {
            input.addEventListener("keypress", (event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    trySendMessage();
                }
            });
        });

        sendMessageButton?.addEventListener("click", event => {
            event.preventDefault();
            trySendMessage();
        });
    }
}

export default ChatsPage;
