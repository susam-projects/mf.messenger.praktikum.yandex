import Block from "../../component-system/block";
import modalTemplate from "./modal.template";

interface ModalProps {
    content: Block;
    className?: string;
    contentClassName?: string;
    onClose?: () => void;
}

const DEFAULT_PROPS: Partial<ModalProps> = {
    className: "",
    contentClassName: "",
    onClose: () => {},
};

class Modal extends Block<ModalProps> {
    _isShown = false;

    constructor(props: ModalProps) {
        super("div", modalTemplate, Object.assign({}, DEFAULT_PROPS, props));

        window.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.hide();
            }
        });
    }

    protected bindContent() {
        const root = this.element;
        const content = this.element.querySelector(".modal-content");

        root.addEventListener("click", () => {
            this.hide();
        });

        content?.addEventListener("click", event => {
            event.stopPropagation();
        });

        if (this._isShown) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        this.props.content.show();
        (this.element as HTMLElement).style.display = "flex";
        this._isShown = true;
    }

    hide() {
        this.props.content.hide();
        super.hide();
        this._isShown = false;
        this.props.onClose!();
    }
}

export default Modal;
