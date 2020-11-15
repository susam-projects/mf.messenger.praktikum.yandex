import Block from "../../../../common/component-system/block.js";
import chatUsersTemplate from "./chat-users.template.js";
import TextFieldWithIcon from "../../../../common/components/text-field-with-icon/text-field-with-icon.js";
import { ChatUserInfo } from "../../../controller/chats-controller.js";
import { findClosest, findNode } from "../../../../common/ui-utils/dom-utils.js";

interface ChatUsersPublicProps {
    onAddUser: (oldUsers: ChatUserInfo[], userId: number) => Promise<boolean>;
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

    protected bindContent() {
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
                if (!(await this.props.onAddUser(this.props.users, id))) {
                    alert("Ошибка добавления пользователя!");
                }
                return this._updateUsers();
            }
        });
    }

    async show() {
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
