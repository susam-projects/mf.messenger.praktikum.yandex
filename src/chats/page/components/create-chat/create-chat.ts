import Block from "../../../../common/component-system/block";
import createChatTemplate from "./create-chat.template";
import TextField from "../../../../common/components/text-field/text-field";
import Button from "../../../../common/components/button/button";

interface CreateChatProps {
    onCreateClick?: (chatName: string) => void;
    onCancelClick?: () => void;
}

const DEFAULT_PROPS: Partial<CreateChatProps> = {
    onCreateClick: () => {},
    onCancelClick: () => {},
};

interface CreateChatInnerProps {
    chatNameField: TextField;
    createButton: Block;
    cancelButton: Block;
}

class CreateChatBlock extends Block<CreateChatInnerProps> {
    constructor({
        onCreateClick = DEFAULT_PROPS.onCreateClick!,
        onCancelClick = DEFAULT_PROPS.onCancelClick!,
    }: CreateChatProps) {
        super("div", createChatTemplate, {
            chatNameField: new TextField({
                label: "Название",
                placeholder: "Мой новый чат",
            }),

            createButton: new Button({
                className: "create-chat__button_full-width",
                label: "Создать чат",
                variant: "primary",
                onClick: () => {
                    onCreateClick(this.props.chatNameField.value);
                },
            }),

            cancelButton: new Button({
                className: "create-chat__button_full-width margin-top-16",
                label: "Отменить",
                variant: "neutral",
                onClick: () => {
                    onCancelClick();
                },
            }),
        });
    }

    show(): void {
        this.props.chatNameField.clear();
        super.show();
    }
}

export default CreateChatBlock;
