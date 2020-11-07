import Block from "../../common/ui/component-system/block.js";
import FormValidator, { InputValidators, MESSAGE_VALIDATOR } from "../../common/ui/component-utils/form-validator.js";
import chatPageTemplate from "./chats.template.js";
import IconButton from "../../common/ui/components/icon-button/icon-button.js";
import { findNode, toggleClass } from "../../common/ui/utils/dom-utils.js";
import ChatsController from "../controller/chats-controller.js";

interface ChatsPageProps {
    // sendMessageButton: Block;
    createChatButton: Block;
    chatActionsButton: Block;
    smilesButton: Block;
    addDocumentButton: Block;
    addImageButton: Block;
    addVideoButton: Block;
}

const VALIDATORS: InputValidators = {
    message: MESSAGE_VALIDATOR,
};

class ChatsPage extends Block<ChatsPageProps> {
    private _validator!: FormValidator;
    private readonly _controller = new ChatsController();

    constructor() {
        super("div", chatPageTemplate, {
            createChatButton: new IconButton({
                iconClassName: "icon-plus",
                onClick: () => {
                    console.log("create chat click");
                },
            }),
            chatActionsButton: new IconButton({
                iconClassName: "icon-vertical-dots",
                onClick: () => {
                    const actionsMenu = findNode(this.element, "#chat-actions-menu")!;
                    toggleClass(actionsMenu, "open");
                },
            }),
            smilesButton: new IconButton({
                iconClassName: "icon-smile",
                onClick: () => {
                    console.log("open smiles menu");
                },
            }),
            addDocumentButton: new IconButton({
                iconClassName: "icon-document",
                onClick: () => {
                    console.log("open document selector");
                },
            }),
            addImageButton: new IconButton({
                iconClassName: "icon-image",
                onClick: () => {
                    console.log("open image selector");
                },
            }),
            addVideoButton: new IconButton({
                iconClassName: "icon-video",
                onClick: () => {
                    console.log("open video selector");
                },
            }),
        });

        this._controller.getAppUserInfo().then(info => {
            console.log(info);
        });
    }

    bindContent() {
        const userInfo = this.element.querySelector("#user-info");
        const messageField = this.element.querySelector("#message-field");
        const messageInput = messageField?.querySelectorAll("input");
        const sendMessageButton = this.element.querySelector("#send-message");

        userInfo?.addEventListener("click", event => {
            event.preventDefault();
            this._router.go("/profile");
        });

        this._validator = new FormValidator(VALIDATORS, messageInput!);

        const trySendMessage = () => {
            if (!this._validator.validate()) {
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
