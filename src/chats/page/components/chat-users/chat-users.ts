import Block from "../../../../common/ui/component-system/block.js";
import chatUsersTemplate from "./chat-users.template.js";
import TextFieldWithIcon from "../../../../common/ui/components/text-field-with-icon/text-field-with-icon.js";

interface ChatUsersPublicProps {
    onAddUser: (userId: number) => Promise<boolean>;
    onRemoveUser: (userId: number) => Promise<boolean>;
    getUsers: (search: string) => Promise<ChatUser[]>;
}

interface ChatUser {
    id: number;
    name: string;
    avatar: string | null;
    role: string | null;
    canRemove: boolean;
    canAdd: boolean;
}

interface ChatUsersInternalProps {
    onUserClick: () => void;
    searchField: Block;
    users: ChatUser[];
}

class ChatUsersBlock extends Block<ChatUsersInternalProps> {
    constructor(props: ChatUsersPublicProps) {
        console.log(props);
        super("div", chatUsersTemplate, {
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

            onUserClick: () => {
                console.log("user click");
            },

            searchField: new TextFieldWithIcon({
                className: "search-field",
                iconClassName: "search-field__icon",
                placeholder: "Поиск",
            }),
        });
    }

    show() {
        // this.props.searchField.clear();
        super.show();
    }
}

export default ChatUsersBlock;
