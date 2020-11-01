import Block from "../../../../../ui/component-system/block.js";
import profileFieldTemplate from "./profile-field.template.js";

interface ProfileFieldProps {
    label: string;
    value: string;
}

const DEFAULT_PROPS: ProfileFieldProps = {
    label: "",
    value: "",
};

class ProfileField extends Block<ProfileFieldProps> {
    constructor(props: ProfileFieldProps) {
        super("div", profileFieldTemplate, Object.assign({}, DEFAULT_PROPS, props));
    }
}

export default ProfileField;
