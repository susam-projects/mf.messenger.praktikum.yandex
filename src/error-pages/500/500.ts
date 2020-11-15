import Button from "../../common/components/button/button.js";
import Block from "../../common/component-system/block.js";
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
                    this._router.go("/chats");
                },
            }),
        });
    }
}

export default Page500;
