import Block from "../../common/component-system/block.js";
import FormValidator, { InputValidators, MESSAGE_VALIDATOR } from "../../common/component-utils/form-validator.js";
import chatPageTemplate from "./chats.template.js";
import IconButton from "../../common/components/icon-button/icon-button.js";
import ChatsController, { ChatInfo } from "../controller/chats-controller.js";
import Modal from "../../common/components/modal/modal.js";
import ChatUsersBlock from "./components/chat-users/chat-users.js";
import DeleteChatBlock from "./components/delete-chat/delete-chat.js";
import Menu from "../../common/components/menu/menu.js";
import ChatList, { ChatListPublicProps } from "./components/chat-list/chat-list.js";
import CreateChatBlock from "./components/create-chat/create-chat.js";

interface ChatsPageProps {
    chatId: number | null;
    chatTitle: string | null;
    chatAvatar: string | null;
    chats: ChatInfo[];

    userName: string;
    userAvatar: string;

    // sendMessageButton: Block;
    chatList: Block;
    chatActionsButton: Block;
    chatActionsMenu: Menu;
    smilesButton: Block;
    addDocumentButton: Block;
    addImageButton: Block;
    addVideoButton: Block;
    createChatModal: Block;
    deleteChatModal: Block;
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
            chatId: null,
            chatTitle: null,
            chatAvatar: null,
            chats: [],

            userName: "",
            userAvatar: "",

            chatList: new ChatList({
                className: "chats-page__left-menu",
                onCreateChat: () => {
                    this.props.createChatModal.show();
                },
                onSelectChat: chatId => {
                    const chat = this.props.chats.filter(it => it.id === chatId)[0];
                    if (!chat) {
                        alert("Ошибка при выборе чата!");
                        return;
                    }
                    this.setProps({
                        chatId: chat.id,
                        chatTitle: chat.title,
                        chatAvatar: chat.avatar,
                        chats: this.props.chats.map(it => ({
                            ...it,
                            selected: it.id === chatId,
                        })),
                    });
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
                        id: "users",
                        iconClass: "icon-user-group",
                        label: "Управлять участниками",
                    },
                    {
                        id: "delete",
                        iconClass: "icon-trash",
                        isDanger: true,
                        label: "Удалить чат",
                    },
                ],
                onClick: itemId => {
                    if (this.props.chatId === null) {
                        alert("Не выбран чат!");
                        this.props.chatActionsMenu.hide();
                        return;
                    }
                    if (itemId === "users") {
                        this.props.chatUsersModal.show();
                        this.props.chatActionsMenu.hide();
                        return;
                    }
                    if (itemId === "delete") {
                        this.props.deleteChatModal.show();
                        this.props.chatActionsMenu.hide();
                        return;
                    }
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

            createChatModal: new Modal({
                content: new CreateChatBlock({
                    onCreateClick: async chatTitle => {
                        if (!(await this._controller.createChat(chatTitle))) {
                            alert("Не получилось создать чат!");
                        }
                        await this._updateChatsInfo();
                        this.props.createChatModal.hide();
                    },
                    onCancelClick: () => {
                        this.props.createChatModal.hide();
                    },
                }),
            }),

            deleteChatModal: new Modal({
                contentClassName: "chats-page__delete-chat",
                content: new DeleteChatBlock({
                    getChatTitle: () => this.props.chatTitle ?? "",
                    onDeleteClick: async () => {
                        if (this.props.chatId === null) {
                            alert("Не выбран чат!");
                            return;
                        }
                        if (!(await this._controller.deleteChat(this.props.chatId))) {
                            alert("Не получилось удалить чат!");
                        }
                        await this._updateChatsInfo();
                        this.props.deleteChatModal.hide();
                    },
                    onCancelClick: () => {
                        this.props.deleteChatModal.hide();
                    },
                }),
            }),

            chatUsersModal: new Modal({
                content: new ChatUsersBlock({
                    onAddUser: async userId => {
                        if (!this.props.chatId) {
                            alert("Не выбран чат!");
                            return false;
                        }
                        return this._controller.addUser(this.props.chatId, userId);
                    },
                    onRemoveUser: async userId => {
                        if (!this.props.chatId) {
                            alert("Не выбран чат!");
                            return false;
                        }
                        return this._controller.removeUser(this.props.chatId, userId);
                    },
                    getUsers: async search => {
                        if (!this.props.chatId) {
                            alert("Не выбран чат!");
                            return [];
                        }
                        return this._controller.findUsers(this.props.chatId, search);
                    },
                }),
            }),
        });

        this._updateAppUserInfo();
        this._updateChatsInfo();
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

    async show() {
        await this._updateAppUserInfo();
        await this._updateChatsInfo();
        (this.element as HTMLElement).style.display = "flex";
    }

    setProps(props: Partial<ChatsPageProps>) {
        const chatListProps: Partial<ChatListPublicProps> = {};
        if ("chatId" in props) chatListProps.chatId = props.chatId;
        if ("chatTitle" in props) chatListProps.chatTitle = props.chatTitle ?? null;
        if ("chats" in props) chatListProps.chats = props.chats as ChatInfo[];
        if ("userName" in props) chatListProps.userName = props.userName;
        if ("userAvatar" in props) chatListProps.userAvatar = props.userAvatar;

        this.props.chatList.setProps(chatListProps);
        super.setProps(props);
    }

    private async _updateAppUserInfo() {
        const info = await this._controller.getAppUserInfo();
        this.setProps({
            userName: info.displayName,
            userAvatar: info.avatar,
        });
    }

    private async _updateChatsInfo() {
        const chats = await this._controller.getChats();
        if (chats) {
            const chatId = chats[0]?.id ?? null;
            const chatTitle = chats[0]?.title ?? null;
            const chatAvatar = chats[0]?.avatar ?? null;

            this.setProps({
                chatId,
                chatTitle,
                chatAvatar,
                chats: chats.map(it => ({
                    ...it,
                    selected: it.id === chatId,
                })),
            });
        }
    }
}

export default ChatsPage;
