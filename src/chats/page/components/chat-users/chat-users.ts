import Block from "../../../../common/ui/component-system/block.js";
import chatUsersTemplate from "./chat-users.template.js";

class ChatUsersBlock extends Block {
    constructor() {
        super("div", chatUsersTemplate, {
            onUserClick: () => {
                console.log("user click");
            },

            users: [
                {
                    id: 1,
                    name: "Имя пользователя",
                    avatar: "",
                    role: "Админ",
                    canRemove: false,
                    canAdd: false,
                },
                {
                    id: 2,
                    name: "Пользователь 2",
                    avatar: "",
                    role: "Пользователь",
                    canRemove: true,
                    canAdd: false,
                },
                {
                    id: 3,
                    name: "Пользователь 3",
                    avatar: "",
                    role: "",
                    canRemove: false,
                    canAdd: true,
                },
            ],
        });
    }
}

export default ChatUsersBlock;
