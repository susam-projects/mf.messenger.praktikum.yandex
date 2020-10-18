(function () {
    window.serialize = {
        getFormData(formElement) {
            const inputs = formElement.getElementsByTagName('input');
            const result = {};
            for (const input of inputs) {
                if (input.value && input.name) {
                    result[input.name] = input.value;
                }
            }
            return result;
        },
    };
})();
