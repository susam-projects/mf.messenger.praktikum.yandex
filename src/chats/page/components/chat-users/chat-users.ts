import Block from "../../../../common/ui/component-system/block.js";
import chatUsersTemplate from "./chat-users.template.js";

class ChatUsersBlock extends Block {
    constructor() {
        super("div", chatUsersTemplate);
    }
}

export default ChatUsersBlock;
