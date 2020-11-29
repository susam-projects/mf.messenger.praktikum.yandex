import Button from "../../common/components/button/button";
import Block from "../../common/component-system/block";
import page404Template from "./404.hbs";

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
