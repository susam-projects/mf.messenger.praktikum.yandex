import { noop } from "../../../../common/utils/func-utils.js";
import Block from "../../../../common/component-system/block.js";
import Button from "../../../../common/components/button/button.js";
import deleteChatTemplate from "./delete-chat.template.js";

interface DeleteChatProps {
    getChatTitle?: () => string;
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
}

const DEFAULT_PROPS: Required<DeleteChatProps> = {
    getChatTitle: () => "",
    onDeleteClick: noop,
    onCancelClick: noop,
};

interface DeleteChatInnerProps {
    chatTitle: string;
    deleteButton: Block;
    cancelButton: Block;
}

class DeleteChatBlock extends Block<DeleteChatInnerProps> {
    private readonly _getChatName: () => string;

    constructor({
        getChatTitle = DEFAULT_PROPS.getChatTitle,
        onDeleteClick = DEFAULT_PROPS.onDeleteClick,
        onCancelClick = DEFAULT_PROPS.onCancelClick,
    }: DeleteChatProps) {
        super("div", deleteChatTemplate, {
            chatTitle: "",

            deleteButton: new Button({
                label: "Удалить чат",
                variant: "danger",
                onClick: () => {
                    onDeleteClick();
                },
            }),

            cancelButton: new Button({
                label: "Отменить",
                variant: "neutral",
                onClick: () => {
                    onCancelClick();
                },
            }),
        });

        this._getChatName = getChatTitle;
    }

    show() {
        this.props.chatTitle = this._getChatName();
        super.show();
    }
}

export default DeleteChatBlock;
