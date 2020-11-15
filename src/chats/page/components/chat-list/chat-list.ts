import Block from "../../../../common/ui/component-system/block.js";
import chatListTemplate from "./chat-list.template.js";
import IconButton from "../../../../common/ui/components/icon-button/icon-button.js";
import { ChatInfo } from "../../../controller/chats-controller.js";
import { findClosest, findNode } from "../../../../common/ui/utils/dom-utils.js";

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
            ...Object.assign({}, DEFAULT_PROPS, props),

            createChatButton: new IconButton({
                iconClassName: "icon-plus",
                onClick: () => {
                    this.props.onCreateChat!();
                },
            }),
        });
    }

    protected bindContent() {
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
