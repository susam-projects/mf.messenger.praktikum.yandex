import Block from "../../../../common/component-system/block";
import chatListTemplate from "./chat-list.hbs";
import IconButton from "../../../../common/components/icon-button/icon-button";
import { ChatInfo } from "../../../controller/chats-controller";
import { findClosest, findNode } from "../../../../common/ui-utils/dom-utils";

export interface ChatListPublicProps {
    className?: string;
    onCreateChat?: () => void;
    onSelectChat?: (chatId: number) => void;

    chatId?: number | null;
    chatTitle?: string | null;
    chats?: ChatInfo[];
    userName?: string | null;
    userAvatar?: string | null;
}

const DEFAULT_PROPS: Partial<ChatListPublicProps> = {
    className: "",
    onCreateChat: () => {},
    onSelectChat: () => {},
    chatId: null,
    chatTitle: null,
    chats: [],
    userName: null,
    userAvatar: null,
};

interface ChatListInnerProps {
    createChatButton: Block;
}

class ChatList extends Block<ChatListPublicProps & ChatListInnerProps> {
    constructor(props: ChatListPublicProps) {
        super("div", chatListTemplate, {
            ...DEFAULT_PROPS,
            ...props,

            createChatButton: new IconButton({
                iconClassName: "icon-plus",
                onClick: () => {
                    this.props.onCreateChat!();
                },
            }),
        });
    }

    protected bindContent(): void {
        const list = findNode(this.element, "ul");

        list?.addEventListener("click", event => {
            const listItem = findClosest<HTMLLIElement>(event.target as Element, "li");
            const id = listItem?.dataset.id;
            if (!id) return;
            this.props.onSelectChat!(Number.parseInt(id, 10));
        });
    }
}

export default ChatList;
