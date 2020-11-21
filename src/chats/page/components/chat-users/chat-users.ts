import Block from "../../../../common/component-system/block";
import chatUsersTemplate from "./chat-users.template";
import TextFieldWithIcon from "../../../../common/components/text-field-with-icon/text-field-with-icon";
import { ChatUserInfo } from "../../../controller/chats-controller";
import { findClosest, findNode } from "../../../../common/ui-utils/dom-utils";

interface ChatUsersPublicProps {
    onAddUser: (userId: number) => Promise<boolean>;
    onRemoveUser: (userId: number) => Promise<boolean>;
    getUsers: (search: string) => Promise<ChatUserInfo[]>;
}

interface ChatUsersInternalProps extends ChatUsersPublicProps {
    searchField: TextFieldWithIcon;
    users: ChatUserInfo[];
}

class ChatUsersBlock extends Block<ChatUsersInternalProps> {
    constructor(publicProps: ChatUsersPublicProps) {
        super("div", chatUsersTemplate, {
            ...publicProps,

            users: [],

            searchField: new TextFieldWithIcon({
                className: "search-field",
                iconClassName: "search-field__icon",
                placeholder: "Поиск",
                onIconClick: () => this._updateUsers(),
                onPressEnter: () => this._updateUsers(),
                onBlur: () => this._updateUsers(),
            }),
        });
    }

    protected bindContent(): void {
        const list = findNode(this.element, "ul");

        list?.addEventListener("click", async event => {
            const listItem = findClosest<HTMLLIElement>(event.target as Element, "li");
            const id = Number.parseInt(listItem?.dataset?.id ?? "", 10);
            const role = listItem?.dataset?.role || null;

            if (role === "regular") {
                if (!(await this.props.onRemoveUser(id))) {
                    alert("Ошибка удаления пользователя!");
                }
                return this._updateUsers();
            }

            if (role === "null" || role === null) {
                if (!(await this.props.onAddUser(id))) {
                    alert("Ошибка добавления пользователя!");
                }
                return this._updateUsers();
            }
        });
    }

    async show(): Promise<void> {
        this.props.searchField.clear();
        await this._updateUsers();
        super.show();
    }

    private async _updateUsers(): Promise<void> {
        const searchValue = this.props.searchField.value;
        const users = await this.props.getUsers(searchValue);
        this.setProps({ users });
    }
}

export default ChatUsersBlock;
