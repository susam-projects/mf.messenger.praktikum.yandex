import { noop } from "../../../../common/infrastructure/utils/func-utils.js";
import Block from "../../../../common/ui/component-system/block.js";
import Button from "../../../../common/ui/components/button/button.js";
import deleteChatTemplate from "./delete-chat.template.js";

interface DeleteChatProps {
    getChatName?: () => string;
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
}

const DEFAULT_PROPS: Required<DeleteChatProps> = {
    getChatName: () => "",
    onDeleteClick: noop,
    onCancelClick: noop,
};

interface DeleteChatInnerProps {
    chatName: string;
    deleteButton: Block;
    cancelButton: Block;
}

class DeleteChatBlock extends Block<DeleteChatInnerProps> {
    private readonly _getChatName: () => string;

    constructor({
        getChatName = DEFAULT_PROPS.getChatName,
        onDeleteClick = DEFAULT_PROPS.onDeleteClick,
        onCancelClick = DEFAULT_PROPS.onCancelClick,
    }: DeleteChatProps) {
        super("div", deleteChatTemplate, {
            chatName: getChatName(),

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

        this._getChatName = getChatName;
    }

    show() {
        this.props.chatName = this._getChatName();
        super.show();
    }
}

export default DeleteChatBlock;
