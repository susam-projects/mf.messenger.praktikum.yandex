import Block from "../../../ui/component-system/block.js";
import FormValidator, { InputValidators, MESSAGE_VALIDATOR } from "../../../ui/component-utils/form-validator.js";
import chatPageTemplate from "./chats.template.js";
import IconButton from "../../../ui/components/icon-button/icon-button.js";
import { toggleClass } from "../../../ui/utils/dom-utils.js";
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
                    const actionsMenu = this.element.querySelector("#chat-actions-menu")!;
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
        const createChatButton = this.element.querySelector("#create-chat-button");
        const chatActionsButton = this.element.querySelector("#chat-actions-button");
        const smilesButton = this.element.querySelector("#smiles-button");
        const addDocumentButton = this.element.querySelector("#add-document-button");
        const addImageButton = this.element.querySelector("#add-image-button");
        const addVideoButton = this.element.querySelector("#add-video-button");
        const messageField = this.element.querySelector("#message-field");
        const messageInput = messageField?.querySelectorAll("input");
        const sendMessageButton = this.element.querySelector("#send-message");

        userInfo?.addEventListener("click", event => {
            event.preventDefault();
            this._router.go("/profile");
        });

        this.props.createChatButton.init(createChatButton);
        this.props.chatActionsButton.init(chatActionsButton);
        this.props.smilesButton.init(smilesButton);
        this.props.addDocumentButton.init(addDocumentButton);
        this.props.addImageButton.init(addImageButton);
        this.props.addVideoButton.init(addVideoButton);

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
