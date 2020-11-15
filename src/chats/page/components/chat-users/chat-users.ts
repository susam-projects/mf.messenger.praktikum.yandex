import Block from "../../../../common/ui/component-system/block.js";
import chatUsersTemplate from "./chat-users.template.js";

interface ChatUsersProps {
    onAddUser: (userId: number) => Promise<boolean>;
    onRemoveUser: (userId: number) => Promise<boolean>;
    getUsers: (search: string) => Promise<ChatUser[]>;
}

interface ChatUser {
    id: number;
    name: string;
}

class ChatUsersBlock extends Block {
    constructor(props: ChatUsersProps) {
        console.log(props);
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

    show() {
        // this.props.searchField.clear();
        super.show();
    }
}

export default ChatUsersBlock;
