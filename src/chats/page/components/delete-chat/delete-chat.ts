import { noop } from "../../../../common/infrastructure/utils/func-utils.js";
import Block from "../../../../common/ui/component-system/block.js";
import Button from "../../../../common/ui/components/button/button.js";
import deleteChatTemplate from "./delete-chat.template.js";

interface DeleteChatProps {
    chatName?: string;
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
}

const DEFAULT_PROPS: Required<DeleteChatProps> = {
    chatName: "",
    onDeleteClick: noop,
    onCancelClick: noop,
};

interface DeleteChatInnerProps {
    chatName: string;
    deleteButton: Block;
    cancelButton: Block;
}

class DeleteChatBlock extends Block<DeleteChatInnerProps> {
    constructor({
        chatName = DEFAULT_PROPS.chatName,
        onDeleteClick = DEFAULT_PROPS.onDeleteClick,
        onCancelClick = DEFAULT_PROPS.onCancelClick,
    }: DeleteChatProps) {
        super("div", deleteChatTemplate, {
            chatName,

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
    }
}

export default DeleteChatBlock;
