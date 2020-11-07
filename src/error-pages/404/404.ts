import Button from "../../common/ui/components/button/button.js";
import Block from "../../common/ui/component-system/block.js";
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
                    this._router.go("/chats");
                },
            }),
        });
    }
}

export default Page404;
