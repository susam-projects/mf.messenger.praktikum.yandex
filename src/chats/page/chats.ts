import Block from "../../common/ui/component-system/block.js";
import FormValidator, { InputValidators, MESSAGE_VALIDATOR } from "../../common/ui/component-utils/form-validator.js";
import chatPageTemplate from "./chats.template.js";
import IconButton from "../../common/ui/components/icon-button/icon-button.js";
import ChatsController from "../controller/chats-controller.js";
import Modal from "../../common/ui/components/modal/modal.js";
import CreateChatBlock from "./components/create-chat/create-chat.js";
import ChatUsersBlock from "./components/chat-users/chat-users.js";
import DeleteChatBlock from "./components/delete-chat/delete-chat.js";
import Menu from "../../common/ui/components/menu/menu.js";

interface ChatsPageProps {
    // sendMessageButton: Block;
    createChatButton: Block;
    chatActionsButton: Block;
    chatActionsMenu: Menu;
    smilesButton: Block;
    addDocumentButton: Block;
    addImageButton: Block;
    addVideoButton: Block;
    deleteChatModal: Block;
    createChatModal: Block;
    chatUsersModal: Block;
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
                    this.props.createChatModal.show();
                },
            }),

            chatActionsButton: new IconButton({
                iconClassName: "icon-vertical-dots",
                onClick: () => {
                    this.props.chatActionsMenu.toggle();
                },
            }),
            chatActionsMenu: new Menu({
                className: "chat__header__actions-menu",
                items: [
                    {
                        iconClass: "icon-edit",
                        label: "Изменить название чата",
                    },
                    {
                        iconClass: "icon-user-group",
                        label: "Управлять участниками",
                    },
                    {
                        iconClass: "icon-trash",
                        isDanger: true,
                        label: "Удалить чат",
                    },
                ],
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

            deleteChatModal: new Modal({
                contentClassName: "chats-page__delete-chat",
                content: new DeleteChatBlock({
                    chatName: "test-chat",
                    onDeleteClick: () => {
                        console.log("delete chat");
                        this.props.deleteChatModal.hide();
                    },
                    onCancelClick: () => {
                        this.props.deleteChatModal.hide();
                    },
                }),
            }),

            createChatModal: new Modal({
                content: new CreateChatBlock({
                    onCreateClick: chatName => {
                        // create new chat
                        console.log("create chat, named", chatName);
                        this.props.createChatModal.hide();
                    },
                    onCancelClick: () => {
                        this.props.createChatModal.hide();
                    },
                }),
            }),

            chatUsersModal: new Modal({
                content: new ChatUsersBlock(),
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

        this.props.chatUsersModal.show();
    }
}

export default ChatsPage;
