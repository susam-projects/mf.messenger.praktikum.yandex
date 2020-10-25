import Button from "../../components/button/button.js";
import Block from "../../utils/block.js";
import simpleRouter from "../../utils/simple-router.js";
import page500Template from "./500.template.js";

interface Page500Props {
    goToChatsButton: Block;
}

class Page500 extends Block<Page500Props> {
    constructor() {
        super("div", page500Template, {
            goToChatsButton: new Button({
                variant: "text-primary",
                label: "К чатам",
                onClick: () => {
                    simpleRouter.setPage("chats");
                },
            }),
        });
    }

    bindContent() {
        const goToChatsButton = this.element.querySelector("#go-to-chats-button");
        this.props.goToChatsButton._bindContent(goToChatsButton);
    }
}

export default Page500;
