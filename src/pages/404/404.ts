import Button from "../../components/button/button.js";
import Block from "../../utils/ui/block.js";
import simpleRouter from "../../utils/ui/simple-router.js";
import page404Template from "./404.template.js";

interface Page404Props {
    goToChatsButton: Block;
}

class Page404 extends Block<Page404Props> {
    constructor() {
        super("div", page404Template, {
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
        this.props.goToChatsButton.init(goToChatsButton);
    }
}

export default Page404;
