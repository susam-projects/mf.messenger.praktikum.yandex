import Block from "../../../../common/component-system/block";
import profileFieldTemplate from "./profile-field.template";

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
        super("div", profileFieldTemplate, { ...DEFAULT_PROPS, ...props });
    }
}

export default ProfileField;
